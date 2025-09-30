// ==============
// main.js
// Punto de entrada principal de la aplicación
// ==============

// Variables globales (exportadas para uso en otros módulos)
export let canvas, ctx, panelesContainer;
export let estratos = [];
export let estratoArrastrando = null;
export let PIXELES_POR_METRO = 100;
export const IZQUIERDA_X = 200;

// Importar módulos
import { registrarTodasLasTramas } from './tramas.js';
import { registrarTodosLosSimbolos } from './simbolos.js';
import { exportarConCalidad } from './exportacion.js';
import { crearPanelEstrato } from './ui.js';

// Clase Estrato (debe estar accesible globalmente o exportada)
export class Estrato {
  constructor(alto = 150, ancho = 300, color = '#cccccc', trama = 'solido', tamanoTrama = 30, simbolo = 'ninguno', tipoBordeSuperior = 'recto') {
    this.alto = alto;
    this.ancho = ancho;
    this.color = color;
    this.trama = trama;
    this.tamanoTrama = tamanoTrama;
    this.simbolo = simbolo;
    this.tipoBordeSuperior = tipoBordeSuperior;
    this.nombre = `Estrato ${estratos.length + 1}`;
    this.topY = 0;
    this.bottomY = 0;
    this.puntoControl = {
      x: IZQUIERDA_X + ancho,
      y: 0,
      arrastrando: false,
      posicionManual: false,
      proporcionX: 1.0,
      proporcionY: 0.5
    };
    this.simbolosDerecha = [];
  }
}

// Función de dibujo principal (debe estar sincronizada con exportacion.js)
// Aquí la mantenemos para la interacción en tiempo real
export function dibujar(mostrarPuntos = true, escala = 1) {
  const profundidadTotal = calcularPosicionesEstratos();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarEscalaVertical(profundidadTotal, escala);
  dibujarEscalaHorizontal(escala);

  estratos.forEach((estrato, index) => {
    if (!estrato.puntoControl.posicionManual) {
      estrato.puntoControl.y = (estrato.topY + estrato.bottomY) / 2;
      estrato.puntoControl.x = IZQUIERDA_X + (estrato.ancho * estrato.puntoControl.proporcionX);
    }

    ctx.beginPath();
    ctx.moveTo(IZQUIERDA_X, estrato.bottomY);
    ctx.lineTo(IZQUIERDA_X, estrato.topY);
    const endX = IZQUIERDA_X + estrato.ancho;
    ctx.lineTo(endX, estrato.topY);
    ctx.quadraticCurveTo(estrato.puntoControl.x, estrato.puntoControl.y, endX, estrato.bottomY);

    const startX = IZQUIERDA_X;
    const startY = estrato.bottomY;

    // Manejo de tipos de borde inferior
    switch (estrato.tipoBordeSuperior) {
      case 'recto':
        ctx.lineTo(startX, startY);
        break;
      case 'segmentado':
        const segmentos = 5;
        const paso = (endX - startX) / segmentos;
        let xActual = endX;
        for (let i = 0; i < segmentos; i++) {
          const alturaAleatoria = 8 + startY + (Math.random() - 0.5) * 20;
          xActual -= paso;
          if (i === segmentos - 1) xActual = startX;
          ctx.lineTo(xActual, alturaAleatoria);
        }
        break;
      case 'ondulado':
        const amplitud = 5;
        const ciclos = (endX - startX) / 25;
        let prevY = startY;
        for (let x = endX; x >= startX; x -= 3) {
          const y = amplitud + startY + Math.sin((x - startX) / (endX - startX) * ciclos * Math.PI * 2) * amplitud;
          if (Math.abs(y - prevY) > 0.1 || x === endX || x === startX) {
            ctx.setLineDash([]);
            ctx.lineTo(x, y);
            prevY = y;
          }
        }
        break;
      case 'discontinuo':
      case 'inf_transparente':
      case 'sup_transparente':
      case 'sup_inf_transparente':
      case 'sup_inf_der_transparente':
      case 'vacio_1':
      case 'vacio_2':
      case 'ondulado_inf_trans':
      case 'ondulado_sup_trans':
      case 'ondulado_inf_sup_trans':
      case 'canal':
      case 'canal2':
        // Para simplificar, cerramos la figura y luego dibujamos manualmente
        ctx.lineTo(startX, startY);
        break;
      default:
        ctx.lineTo(startX, startY);
    }

    ctx.closePath();

    // Relleno
    ctx.fillStyle = estrato.color;
    ctx.fill();

    // Trama
    if (estrato.trama !== 'solido') {
      const { crearTrama } = await import('./ui.js'); // Importación dinámica para evitar dependencia circular
      const trama = crearTrama(estrato.trama, '#000000', estrato.tamanoTrama * escala);
      ctx.save();
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = trama;
      ctx.fill();
      ctx.restore();
    }

    // Borde
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1 * escala;
    ctx.stroke();

    // Símbolos a la derecha
    if (estrato.simbolosDerecha?.length > 0) {
      const { dibujarSimbolo } = await import('./exportacion.js');
      const offsetDerecha = 30 * escala;
      const espacioEntreSimbolos = 25 * escala;
      const size = 20 * escala;
      estrato.simbolosDerecha.forEach((simboloInfo, idx) => {
        const xDerecha = IZQUIERDA_X + estrato.ancho + offsetDerecha + (idx * espacioEntreSimbolos);
        const yDerecha = estrato.topY + (simboloInfo.proporcionY * estrato.alto);
        dibujarSimbolo(ctx, simboloInfo.tipo, xDerecha, yDerecha, size, '#000000');
      });
    }

    // Punto de control
    if (mostrarPuntos) {
      ctx.beginPath();
      ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2);
      ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1 * escala;
      ctx.stroke();
    }

    // Etiqueta
    ctx.fillStyle = '#000';
    ctx.font = `${12 * escala}px Arial`;
    ctx.fillText(estrato.nombre, IZQUIERDA_X - 100 * escala, estrato.topY + 50 * escala);
  });
}

// Funciones auxiliares de dibujo (pueden moverse a exportacion.js si se usa solo allí)
function calcularPosicionesEstratos() {
  let alturaTotal = 0;
  for (const estrato of estratos) {
    alturaTotal += estrato.alto;
  }
  const margenInferior = 200;
  const margenSuperior = 100;
  canvas.height = alturaTotal + margenInferior + margenSuperior;
  let yActual = alturaTotal + margenSuperior;
  for (let i = 0; i < estratos.length; i++) {
    const estrato = estratos[i];
    estrato.bottomY = yActual;
    estrato.topY = yActual - estrato.alto;
    yActual = estrato.topY;
    if (estrato.puntoControl.posicionManual) {
      estrato.puntoControl.y = estrato.topY + estrato.puntoControl.proporcionY * estrato.alto;
    } else {
      estrato.puntoControl.y = (estrato.topY + estrato.bottomY) / 2;
    }
  }
  return alturaTotal;
}

function dibujarEscalaVertical(profundidadTotal, escala = 1) {
  const inicioY = estratos.length > 0 ? estratos[0].bottomY : 100;
  const finY = estratos.length > 0 ? estratos[estratos.length - 1].topY : 800;
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#000';
  ctx.font = `${12 * escala}px Arial`;
  ctx.textAlign = 'right';
  ctx.beginPath();
  ctx.moveTo(IZQUIERDA_X - 20, finY);
  ctx.lineTo(IZQUIERDA_X - 20, inicioY);
  ctx.stroke();
  ctx.lineWidth = 1 * escala;

  const metrosTotales = profundidadTotal / PIXELES_POR_METRO;
  const intervaloMetros = metrosTotales > 100 ? 10 : metrosTotales > 20 ? 10 : 1;
  for (let metros = 0; metros <= metrosTotales; metros += intervaloMetros) {
    const y = inicioY - (metros * PIXELES_POR_METRO);
    ctx.beginPath();
    ctx.moveTo(IZQUIERDA_X - 25, y);
    ctx.lineTo(IZQUIERDA_X - 15, y);
    ctx.stroke();
    ctx.fillText(`${metros} m`, IZQUIERDA_X - 30 * escala, y + 4 * escala);
  }
  ctx.textAlign = 'start';
}

function dibujarEscalaHorizontal(escala = 1) {
  const yEscala = canvas.height - 190;
  const inicioX = IZQUIERDA_X;
  const finX = IZQUIERDA_X + 500;
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#000';
  ctx.font = `${12 * escala}px Arial`;
  ctx.textAlign = 'center';
  ctx.beginPath();
  ctx.moveTo(inicioX, yEscala);
  ctx.lineTo(finX, yEscala);
  ctx.stroke();
  ctx.lineWidth = 1 * escala;
}

// Inicialización
window.addEventListener('DOMContentLoaded', async () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  panelesContainer = document.getElementById('panelesEstratos');

  // Registrar recursos
  registrarTodasLasTramas();
  registrarTodosLosSimbolos();

  // Configurar botones
  document.getElementById('btnAgregarEstrato').addEventListener('click', agregarEstrato);
  document.getElementById('btnActualizarEscala').addEventListener('click', () => {
    PIXELES_POR_METRO = parseFloat(document.getElementById('pixelesPorMetro').value) || 100;
    dibujar();
  });

  // Botones de exportación
  document.getElementById('btnExportarPNG').addEventListener('click', () => {
    const escala = parseInt(document.getElementById('selectCalidadExportacion').value) || 2;
    exportarConCalidad(escala, 'png', () => {
      const link = document.createElement('a');
      link.download = `columna_estratigrafica_${escala}x.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });

  document.getElementById('btnExportarJPG').addEventListener('click', () => {
    const escala = parseInt(document.getElementById('selectCalidadExportacion').value) || 2;
    exportarConCalidad(escala, 'jpg', () => {
      const link = document.createElement('a');
      link.download = `columna_estratigrafica_${escala}x.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    });
  });

  document.getElementById('btnExportarSVG').addEventListener('click', () => {
    dibujar(false);
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", canvas.width);
    svg.setAttribute("height", canvas.height);
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    const bg = document.createElementNS(svgNS, "rect");
    bg.setAttribute("width", "100%");
    bg.setAttribute("height", "100%");
    bg.setAttribute("fill", "white");
    svg.appendChild(bg);

    const img = document.createElementNS(svgNS, "image");
    img.setAttribute("x", 0);
    img.setAttribute("y", 0);
    img.setAttribute("width", canvas.width);
    img.setAttribute("height", canvas.height);
    img.setAttributeNS("http://www.w3.org/1999/xlink", "href", canvas.toDataURL("image/png"));
    svg.appendChild(img);

    const serializer = new XMLSerializer();
    let svgStr = serializer.serializeToString(svg);
    svgStr = '<?xml version="1.0" standalone="no"?>\r' + svgStr;
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "columna_estratigrafica.svg";
    link.href = url;
    link.click();
    setTimeout(() => dibujar(true), 100);
  });

  document.getElementById('btnExportarPDF').addEventListener('click', () => {
    const escala = parseInt(document.getElementById('selectCalidadExportacion').value) || 2;
    exportarConCalidad(escala, 'pdf', () => {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`columna_estratigrafica_${escala}x.pdf`);
    });
  });

  // Guardar/Cargar proyecto (localStorage)
  document.getElementById('btnGuardar').addEventListener('click', () => {
    const nombre = prompt("Nombre del proyecto:", "Proyecto 1");
    if (!nombre) return;
    const proyecto = {
      pixelesPorMetro: PIXELES_POR_METRO,
      estratos: estratos.map(e => ({
        nombre: e.nombre,
        alto: e.alto,
        ancho: e.ancho,
        color: e.color,
        trama: e.trama,
        tamanoTrama: e.tamanoTrama,
        tipoBordeSuperior: e.tipoBordeSuperior,
        puntoControl: {
          proporcionX: e.puntoControl.proporcionX,
          posicionManual: e.puntoControl.posicionManual
        },
        simbolosDerecha: e.simbolosDerecha
      }))
    };
    localStorage.setItem(`columna_${nombre}`, JSON.stringify(proyecto));
    alert(`Proyecto "${nombre}" guardado!`);
  });

  document.getElementById('btnCargar').addEventListener('click', () => {
    const proyectos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('columna_')) {
        proyectos.push(key.replace('columna_', ''));
      }
    }
    if (proyectos.length === 0) {
      alert("No hay proyectos guardados.");
      return;
    }
    const nombre = prompt("Proyectos guardados:\n" + proyectos.join("\n") + "\n\nEscribe el nombre del proyecto a cargar:");
    if (!nombre) return;
    const data = localStorage.getItem(`columna_${nombre}`);
    if (!data) {
      alert("Proyecto no encontrado.");
      return;
    }
    const proyecto = JSON.parse(data);
    PIXELES_POR_METRO = proyecto.pixelesPorMetro;
    document.getElementById('pixelesPorMetro').value = PIXELES_POR_METRO;
    estratos = proyecto.estratos.map((e, i) => {
      const estrato = new Estrato(e.alto, e.ancho, e.color, e.trama, e.tamanoTrama, 'ninguno', e.tipoBordeSuperior);
      estrato.nombre = e.nombre || `Estrato ${i + 1}`;
      estrato.puntoControl.proporcionX = e.puntoControl?.proporcionX ?? 1.0;
      estrato.puntoControl.posicionManual = e.puntoControl?.posicionManual ?? false;
      estrato.simbolosDerecha = e.simbolosDerecha || [];
      return estrato;
    });
    panelesContainer.innerHTML = '';
    estratos.forEach((_, i) => crearPanelEstrato(i));
    dibujar();
  });

  // Exportar/Importar como archivo .json
  document.getElementById('btnExportarProyecto').addEventListener('click', () => {
    const nombre = prompt("Nombre del proyecto (sin extensión):", "MiColumna");
    if (!nombre) return;
    const proyecto = {
      version: "1.0",
      pixelesPorMetro: PIXELES_POR_METRO,
      estratos: estratos.map(e => ({
        nombre: e.nombre,
        alto: e.alto,
        ancho: e.ancho,
        color: e.color,
        trama: e.trama,
        tamanoTrama: e.tamanoTrama,
        tipoBordeSuperior: e.tipoBordeSuperior,
        puntoControl: {
          proporcionX: e.puntoControl.proporcionX,
          posicionManual: e.puntoControl.posicionManual
        },
        simbolosDerecha: e.simbolosDerecha
      }))
    };
    const blob = new Blob([JSON.stringify(proyecto, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nombre}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('btnImportarProyecto').addEventListener('click', () => {
    document.getElementById('inputImportarProyecto').click();
  });

  document.getElementById('inputImportarProyecto').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const proyecto = JSON.parse(event.target.result);
        if (!proyecto.estratos || !Array.isArray(proyecto.estratos)) {
          throw new Error("Archivo inválido: no contiene estratos.");
        }
        PIXELES_POR_METRO = proyecto.pixelesPorMetro || 100;
        document.getElementById('pixelesPorMetro').value = PIXELES_POR_METRO;
        estratos = proyecto.estratos.map((e, i) => {
          const estrato = new Estrato(e.alto, e.ancho, e.color, e.trama, e.tamanoTrama, 'ninguno', e.tipoBordeSuperior);
          estrato.nombre = e.nombre || `Estrato ${i + 1}`;
          estrato.puntoControl.proporcionX = e.puntoControl?.proporcionX ?? 1.0;
          estrato.puntoControl.posicionManual = e.puntoControl?.posicionManual ?? false;
          estrato.simbolosDerecha = e.simbolosDerecha || [];
          return estrato;
        });
        panelesContainer.innerHTML = '';
        estratos.forEach((_, i) => crearPanelEstrato(i));
        dibujar();
        alert(`✅ Proyecto "${file.name}" cargado correctamente.`);
      } catch (error) {
        console.error("Error al importar:", error);
        alert("❌ Error al cargar el archivo. Asegúrate de que sea un JSON válido.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // Interacción con el canvas
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    calcularPosicionesEstratos();
    for (let i = 0; i < estratos.length; i++) {
      const estrato = estratos[i];
      const dx = mouseX - estrato.puntoControl.x;
      const dy = mouseY - estrato.puntoControl.y;
      if (Math.sqrt(dx * dx + dy * dy) < 12) {
        estrato.puntoControl.arrastrando = true;
        estratoArrastrando = { estratoIndex: i };
        e.preventDefault();
        return;
      }
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!estratoArrastrando) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    calcularPosicionesEstratos();
    const estrato = estratos[estratoArrastrando.estratoIndex];
    const proporcionY = (mouseY - estrato.topY) / estrato.alto;
    estrato.puntoControl.proporcionY = Math.max(0, Math.min(1, proporcionY));
    estrato.puntoControl.y = estrato.topY + estrato.puntoControl.proporcionY * estrato.alto;
    estrato.puntoControl.x = mouseX;
    estrato.puntoControl.proporcionX = (mouseX - IZQUIERDA_X) / estrato.ancho;
    estrato.puntoControl.posicionManual = true;
    dibujar();
  });

  canvas.addEventListener('mouseup', () => {
    if (estratoArrastrando) {
      estratos[estratoArrastrando.estratoIndex].puntoControl.arrastrando = false;
      estratoArrastrando = null;
    }
  });

  // Alternar diseño
  let modoLateral = false;
  document.getElementById('btnToggleLayout').addEventListener('click', () => {
    modoLateral = !modoLateral;
    document.body.classList.toggle('layout-lateral', modoLateral);
    document.getElementById('btnToggleLayout').textContent = modoLateral
      ? '↔️ Volver a diseño centrado'
      : '↔️ Cambiar a diseño lateral';
    setTimeout(dibujar, 100);
  });

  // Pop-up
  document.getElementById('btnMostrarPopup').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupCanvas = document.getElementById('popupCanvas');
    const popupCtx = popupCanvas.getContext('2d');

    popup.style.display = 'block';
    overlay.style.display = 'block';

    popupCanvas.width = canvas.width;
    popupCanvas.height = canvas.height;

    dibujar(false);
    popupCtx.drawImage(canvas, 0, 0);
    setTimeout(() => dibujar(true), 100);
  });

  document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  });

  window.cerrarPopup = () => {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  };

  // Iniciar con un estrato
  agregarEstrato();
  dibujar();
});

// Función para añadir estrato
function agregarEstrato() {
  const nuevoEstrato = new Estrato(100, 300, '#cccccc', 'solido', 30, 'ninguno', 'recto');
  estratos.push(nuevoEstrato);
  crearPanelEstrato(estratos.length - 1);
}