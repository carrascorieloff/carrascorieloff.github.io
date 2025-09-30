import { canvas, ctx, estratos, PIXELES_POR_METRO, IZQUIERDA_X } from './main.js';
import { crearTrama } from './ui.js';
import { simbolosSVG } from './simbolos.js';

// Funciones de dibujo reutilizables (extraídas de main.js)
function dibujarSimbolo(ctx, tipo, x, y, size) {
  const img = simbolosSVG[tipo];
  if (img?.complete && img.naturalWidth > 0) {
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  } else {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
    ctx.fillStyle = '#fff';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('?', x, y + 3);
  }
}

// Exportar con calidad (reutilizable)
export function exportarConCalidad(escala, callback) {
  const anchoOriginal = canvas.width;
  const altoOriginal = canvas.height;
  const estilo = canvas.style.cssText;

  canvas.width = anchoOriginal;
  canvas.height = altoOriginal;
  canvas.style.cssText = estilo;
  ctx.setTransform(escala, 0, 0, escala, 0, 0);

  // Redibujar sin puntos (usa función de ui.js)
  dibujarCompleto(false, escala);

  callback();

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  canvas.width = anchoOriginal;
  canvas.height = altoOriginal;
  canvas.style.cssText = estilo;
  setTimeout(() => dibujarCompleto(true, 1), 100);
}

// Función de dibujo completa (mover desde main.js)
export function dibujarCompleto(mostrarPuntos = true, escala = 1) {
  function dibujar(mostrarPuntos = true, escala = 1) {


      const profundidadTotal = calcularPosicionesEstratos();
      ctx.clearRect(0, 0, canvas.width, canvas.height);


      dibujarEscalaVertical(profundidadTotal, escala); // <-- PASAR ESCALA
      dibujarEscalaHorizontal(escala); // <-- PASAR ESCALA



      // Dibujar en orden normal: del primer estrato al último
      estratos.forEach((estrato, index) => {
        if (!estrato.puntoControl.posicionManual) {
          estrato.puntoControl.y = (estrato.topY + estrato.bottomY) / 2;
          estrato.puntoControl.x = IZQUIERDA_X + (estrato.ancho * estrato.puntoControl.proporcionX);
        }

        // Dibujar estrato
        ctx.beginPath();
        // 1. Empezar en esquina inferior izquierda
        ctx.moveTo(IZQUIERDA_X, estrato.bottomY);
        // 2. Subir por borde izquierdo (recto)
        ctx.lineTo(IZQUIERDA_X, estrato.topY);
        // 3. Dibujar borde superior (siempre recto)
        const endX = IZQUIERDA_X + estrato.ancho; //la escala aumenta el ancho
        ctx.lineTo(endX, estrato.topY);
        // 4. Dibujar borde derecho con curva de Bézier (¡punto de control activo!)
        ctx.quadraticCurveTo(
          estrato.puntoControl.x,
          estrato.puntoControl.y,
          endX,
          estrato.bottomY
        );
        // 5. Dibujar borde INFERIOR según tipo (de derecha a izquierda)
        const startX = IZQUIERDA_X;
        const startY = estrato.bottomY;
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
            // === Paso 1: Cerrar la ruta actual para el relleno ===
            ctx.lineTo(startX, startY); // ← Cerrar la figura (base recta, temporalmente)
            ctx.closePath();            // ← ¡IMPORTANTE! Cerrar para que el fill funcione

            // === Paso 2: Aplicar relleno (color + trama) ===
            ctx.fillStyle = estrato.color;
            ctx.fill();

            if (estrato.trama !== 'solido') {
              const trama = crearTrama(estrato.trama, '#000000', estrato.tamanoTrama * escala);
              ctx.save();
              ctx.globalCompositeOperation = 'source-atop';
              ctx.fillStyle = trama;
              ctx.fill();
              ctx.restore();
            }

            // === Paso 3: Dibujar los 3 lados con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.bottomY);      // Esquina inferior izquierda
            ctx.lineTo(IZQUIERDA_X, estrato.topY);         // Lado izquierdo
            ctx.lineTo(endX, estrato.topY);                // Lado superior
            ctx.quadraticCurveTo(                          // Lado derecho (curvo)
              estrato.puntoControl.x,
              estrato.puntoControl.y,
              endX,
              estrato.bottomY
            );
            ctx.stroke(); // ← Dibuja los 3 lados continuos

            // === Paso 4: Dibujar SOLO la base con línea DISCONTINUA ===
            ctx.setLineDash([15, 15]); // Guiones de 15px, espacios de 10px
            ctx.lineWidth = 3
            ctx.beginPath();
            ctx.moveTo(endX, estrato.bottomY);             // Comienzo de la base (derecha)
            ctx.lineTo(startX, estrato.bottomY);           // Fin de la base (izquierda)
            ctx.stroke();
            ctx.lineWidth = 1
            // === Paso 5: Dibujar el punto de control manualmente si mostrarPuntos es true ===
            if (mostrarPuntos) {
              ctx.beginPath();
              ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2);
              ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
              ctx.fill();
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 1 * escala;
              ctx.stroke();
            }

            // === Paso 6: Resetear y preparar para el próximo estrato ===
            ctx.setLineDash([]);                           // Volver a línea continua
            ctx.beginPath();                               // Nueva ruta limpia
            ctx.moveTo(startX, estrato.bottomY);           // Reposicionar cursor
            break; // ← ¡USAR break, NO return!
          case 'inf_transparente':
            // === Paso 1: Cerrar la ruta actual para el relleno ===
            ctx.lineTo(startX, startY); // ← Cerrar la figura (base recta, temporalmente)
            ctx.closePath();            // ← ¡IMPORTANTE! Cerrar para que el fill funcione

            // === Paso 2: Aplicar relleno (color + trama) ===
            ctx.fillStyle = estrato.color;
            ctx.fill();

            if (estrato.trama !== 'solido') {
              const trama = crearTrama(estrato.trama, '#000000', estrato.tamanoTrama * escala);
              ctx.save();
              ctx.globalCompositeOperation = 'source-atop';
              ctx.fillStyle = trama;
              ctx.fill();
              ctx.restore();
            }

            // === Paso 3: Dibujar los 3 lados con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.bottomY);      // Esquina inferior izquierda
            ctx.lineTo(IZQUIERDA_X, estrato.topY);         // Lado izquierdo
            ctx.lineTo(endX, estrato.topY);                // Lado superior
            ctx.quadraticCurveTo(                          // Lado derecho (curvo)
              estrato.puntoControl.x,
              estrato.puntoControl.y,
              endX,
              estrato.bottomY
            );
            ctx.stroke(); // ← Dibuja los 3 lados continuos

            // === Paso 4: Dibujar SOLO la base con línea DISCONTINUA ===
            ctx.setLineDash([0, 10000]); // Guiones de 15px, espacios de 10px
            ctx.lineWidth = 3
            ctx.beginPath();
            ctx.moveTo(endX, estrato.bottomY);             // Comienzo de la base (derecha)
            ctx.lineTo(startX, estrato.bottomY);           // Fin de la base (izquierda)
            ctx.stroke();
            ctx.lineWidth = 1
            // === Paso 5: Dibujar el punto de control manualmente si mostrarPuntos es true ===
            if (mostrarPuntos) {
              ctx.beginPath();
              ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2);
              ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
              ctx.fill();
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 1 * escala;
              ctx.stroke();
            }

            // === Paso 6: Resetear y preparar para el próximo estrato ===
            ctx.setLineDash([]);                           // Volver a línea continua
            ctx.beginPath();                               // Nueva ruta limpia
            ctx.moveTo(startX, estrato.bottomY);           // Reposicionar cursor
            break; // ← ¡USAR break, NO return!

          case 'sup_transparente':
            // === Paso 1: Cerrar la ruta actual para el relleno ===
            ctx.lineTo(startX, startY); // ← Cerrar la figura (base recta, temporalmente)
            ctx.closePath();            // ← ¡IMPORTANTE! Cerrar para que el fill funcione

            // === Paso 2: Aplicar relleno (color + trama) ===
            ctx.fillStyle = estrato.color;
            ctx.fill();

            if (estrato.trama !== 'solido') {
              const trama = crearTrama(estrato.trama, '#000000', estrato.tamanoTrama * escala);
              ctx.save();
              ctx.globalCompositeOperation = 'source-atop';
              ctx.fillStyle = trama;
              ctx.fill();
              ctx.restore();
            }

            // === Paso 3: Dibujar lado derecho con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.lineTo(endX, estrato.topY);                // Lado superior
            ctx.quadraticCurveTo(                          // Lado derecho (curvo)
              estrato.puntoControl.x,
              estrato.puntoControl.y,
              endX,
              estrato.bottomY
            );
            ctx.stroke(); // ← Dibuja 

            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.bottomY);      // Esquina inferior izquierda
            ctx.lineTo(IZQUIERDA_X, estrato.topY);         // Lado izquierdo
            ctx.stroke(); // ← Dibuja los 3 lados continuos

            // === Paso 5: Dibujar base con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.bottomY);      // Esquina inferior izquierda
            ctx.lineTo(endX, estrato.bottomY);         // Lado izquierdo
            ctx.stroke(); // ← Dibuja los 3 lados continuos


            // === Paso 5: Dibujar el punto de control manualmente si mostrarPuntos es true ===
            if (mostrarPuntos) {
              ctx.beginPath();
              ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2);
              ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
              ctx.fill();
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 1 * escala;
              ctx.stroke();
            }

            // === Paso 6: Resetear y preparar para el próximo estrato ===
            ctx.setLineDash([]);                           // Volver a línea continua
            ctx.beginPath();                               // Nueva ruta limpia
            ctx.moveTo(startX, estrato.bottomY);           // Reposicionar cursor

            break; // ← ¡USAR break, NO return!

          case 'sup_inf_transparente':
            // === Paso 1: Cerrar la ruta actual para el relleno ===
            ctx.lineTo(startX, startY); // ← Cerrar la figura (base recta, temporalmente)
            ctx.closePath();            // ← ¡IMPORTANTE! Cerrar para que el fill funcione

            // === Paso 2: Aplicar relleno (color + trama) ===
            ctx.fillStyle = estrato.color;
            ctx.fill();

            if (estrato.trama !== 'solido') {
              const trama = crearTrama(estrato.trama, '#000000', estrato.tamanoTrama * escala);
              ctx.save();
              ctx.globalCompositeOperation = 'source-atop';
              ctx.fillStyle = trama;
              ctx.fill();
              ctx.restore();
            }

            // === Paso 3: Dibujar lado derecho con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.lineTo(endX, estrato.topY);                // Lado superior
            ctx.quadraticCurveTo(                          // Lado derecho (curvo)
              estrato.puntoControl.x,
              estrato.puntoControl.y,
              endX,
              estrato.bottomY
            );
            ctx.stroke(); // ← Dibuja 

            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.bottomY);      // Esquina inferior izquierda
            ctx.lineTo(IZQUIERDA_X, estrato.topY);         // Lado izquierdo
            ctx.stroke(); // ← Dibuja los 3 lados continuos



            // === Paso 5: Dibujar el punto de control manualmente si mostrarPuntos es true ===
            if (mostrarPuntos) {
              ctx.beginPath();
              ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2);
              ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
              ctx.fill();
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 1 * escala;
              ctx.stroke();
            }

            // === Paso 6: Resetear y preparar para el próximo estrato ===
            ctx.setLineDash([]);                           // Volver a línea continua
            ctx.beginPath();                               // Nueva ruta limpia
            ctx.moveTo(startX, estrato.bottomY);           // Reposicionar cursor
            break;

          case 'sup_inf_der_transparente':
            // === Paso 1: Cerrar la ruta actual para el relleno ===
            ctx.lineTo(startX, startY); // ← Cerrar la figura (base recta, temporalmente)
            ctx.closePath();            // ← ¡IMPORTANTE! Cerrar para que el fill funcione

            // === Paso 2: Aplicar relleno (color + trama) ===
            ctx.fillStyle = estrato.color;
            ctx.fill();

            if (estrato.trama !== 'solido') {
              const trama = crearTrama(estrato.trama, '#000000', estrato.tamanoTrama * escala);
              ctx.save();
              ctx.globalCompositeOperation = 'source-atop';
              ctx.fillStyle = trama;
              ctx.fill();
              ctx.restore();
            }



            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.bottomY);      // Esquina inferior izquierda
            ctx.lineTo(IZQUIERDA_X, estrato.topY);         // Lado izquierdo
            ctx.stroke(); // ← Dibuja los 3 lados continuos



            // === Paso 5: Dibujar el punto de control manualmente si mostrarPuntos es true ===
            if (mostrarPuntos) {
              ctx.beginPath();
              ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2);
              ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
              ctx.fill();
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 1 * escala;
              ctx.stroke();
            }

            // === Paso 6: Resetear y preparar para el próximo estrato ===
            ctx.setLineDash([]);                           // Volver a línea continua
            ctx.beginPath();                               // Nueva ruta limpia
            ctx.moveTo(startX, estrato.bottomY);           // Reposicionar cursor
            break;

          case 'vacio_1':
            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.bottomY);      // Esquina inferior izquierda
            ctx.lineTo(endX, estrato.topY);         // Lado izquierdo
            ctx.stroke(); // ← Dibuja los 3 lados continuos
            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.topY);      // Esquina inferior izquierda
            ctx.lineTo(endX, estrato.bottomY);         // Lado izquierdo            
            ctx.stroke(); // ← Dibuja los 3 lados continuos
            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.topY);      // Esquina inferior izquierda
            ctx.lineTo(IZQUIERDA_X, estrato.bottomY);         // Lado izquierdo
            ctx.stroke(); // ← Dibuja los 3 lados continuos




            // === Paso 6: Resetear y preparar para el próximo estrato ===
            ctx.setLineDash([]);                           // Volver a línea continua
            ctx.beginPath();                               // Nueva ruta limpia
            ctx.moveTo(startX, estrato.bottomY);           // Reposicionar cursor
            break;
          case 'vacio_2':
            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.bottomY);      // Esquina inferior izquierda
            ctx.lineTo(endX, estrato.topY);         // Lado izquierdo
            ctx.stroke(); // ← Dibuja los 3 lados continuos
            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.topY);      // Esquina inferior izquierda
            ctx.lineTo(endX, estrato.bottomY);         // Lado izquierdo            
            ctx.stroke(); // ← Dibuja los 3 lados continuos
            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.topY);      // Esquina inferior izquierda
            ctx.lineTo(IZQUIERDA_X, estrato.bottomY);         // Lado izquierdo
            ctx.stroke(); // ← Dibuja los 3 lados continuos
            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(endX, estrato.topY);      // Esquina inferior izquierda
            ctx.lineTo(endX, estrato.bottomY);         // Lado izquierdo
            ctx.stroke(); // ← Dibuja los 3 lados continuos



            // === Paso 6: Resetear y preparar para el próximo estrato ===
            ctx.setLineDash([]);                           // Volver a línea continua
            ctx.beginPath();                               // Nueva ruta limpia
            ctx.moveTo(startX, estrato.bottomY);           // Reposicionar cursor


            break;
          case 'ondulado_inf_trans':
            // === Paso 1: Construir la forma ondulada para el relleno ===
            const amplitud2 = 5;
            const ciclos2 = (endX - startX) / 25;
            for (let x = endX; x >= startX; x -= 2) {
              const t = (x - startX) / (endX - startX);
              const y = amplitud2 + startY + Math.sin(t * ciclos2 * Math.PI * 2) * amplitud2;
              ctx.lineTo(x, y);
            }
            ctx.closePath(); // Cerrar para rellenar

            // === Paso 2: Aplicar relleno (color + trama) ===
            ctx.fillStyle = estrato.color;
            ctx.fill();
            if (estrato.trama !== 'solido') {
              const trama = crearTrama(estrato.trama, '#000000', estrato.tamanoTrama * escala);
              ctx.save();
              ctx.globalCompositeOperation = 'source-atop';
              ctx.fillStyle = trama;
              ctx.fill();
              ctx.restore();
            }

            // === Paso 3: Dibujar SOLO los bordes izquierdo, superior y derecho (sin la base) ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]);

            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.bottomY);      // Izquierda
            ctx.lineTo(IZQUIERDA_X, estrato.topY);         // Arriba
            ctx.lineTo(endX, estrato.topY);                // Superior
            ctx.quadraticCurveTo(                          // Derecho curvo
              estrato.puntoControl.x,
              estrato.puntoControl.y,
              endX,
              estrato.bottomY
            );
            ctx.stroke();

            // === Paso 4: Dibujar punto de control si corresponde ===
            if (mostrarPuntos) {
              ctx.beginPath();
              ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2);
              ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
              ctx.fill();
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 1 * escala;
              ctx.stroke();
            }

            // === Paso 5: Preparar para el próximo estrato ===
            ctx.beginPath();
            ctx.moveTo(startX, estrato.bottomY);
            break;


          case 'ondulado_sup_trans':
            // === Paso 1: Construir la forma ondulada para el relleno ===
            const amplitud3 = 5;
            const ciclos3 = (endX - startX) / 25;
            for (let x = endX; x >= startX; x -= 2) {
              const t = (x - startX) / (endX - startX);
              const y = amplitud3 + startY + Math.sin(t * ciclos3 * Math.PI * 2) * amplitud3;
              ctx.lineTo(x, y);
            }
            // === Paso 2: Cerrar figura y aplicar relleno ===
            ctx.closePath();
            ctx.fillStyle = estrato.color;
            ctx.fill();
            if (estrato.trama !== 'solido') {
              const trama = crearTrama(estrato.trama, '#000000', estrato.tamanoTrama * escala);
              ctx.save();
              ctx.globalCompositeOperation = 'source-atop';
              ctx.fillStyle = trama;
              ctx.fill();
              ctx.restore();
            }
            // === Paso 3: Dibujar SOLO el borde inferior ONDULADO (con línea continua) ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(endX, startY);
            for (let x = endX; x >= startX; x -= 2) {
              const t = (x - startX) / (endX - startX);
              const y = amplitud3 + startY + Math.sin(t * ciclos3 * Math.PI * 2) * amplitud3;
              ctx.lineTo(x, y);
            }
            ctx.stroke();
            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.topY);      // Esquina inferior izquierda
            ctx.lineTo(IZQUIERDA_X, estrato.bottomY);         // Lado izquierdo            
            ctx.stroke(); // ← Dibuja los 3 lados continuos

            // === Paso 3: Dibujar lado derecho con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.lineTo(endX, estrato.topY);                // Lado superior
            ctx.quadraticCurveTo(                          // Lado derecho (curvo)
              estrato.puntoControl.x,
              estrato.puntoControl.y,
              endX,
              estrato.bottomY
            );
            ctx.stroke(); // ← Dibuja 

            // === Paso 4: Dibujar punto de control si corresponde ===
            if (mostrarPuntos) {
              ctx.beginPath();
              ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2);
              ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
              ctx.fill();
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 1 * escala;
              ctx.stroke();
            }

            // === Paso 5: Preparar para el próximo estrato ===
            ctx.beginPath();
            ctx.moveTo(startX, estrato.bottomY);
            break;

          case 'ondulado_inf_sup_trans':
            // === Paso 1: Construir la forma ondulada para el relleno ===
            const amplitud4 = 5;
            const ciclos4 = (endX - startX) / 25;
            for (let x = endX; x >= startX; x -= 2) {
              const t = (x - startX) / (endX - startX);
              const y = amplitud4 + startY + Math.sin(t * ciclos4 * Math.PI * 2) * amplitud4;
              ctx.lineTo(x, y);
            }
            // === Paso 2: Cerrar figura y aplicar relleno ===
            ctx.closePath();
            ctx.fillStyle = estrato.color;
            ctx.fill();
            if (estrato.trama !== 'solido') {
              const trama = crearTrama(estrato.trama, '#000000', estrato.tamanoTrama * escala);
              ctx.save();
              ctx.globalCompositeOperation = 'source-atop';
              ctx.fillStyle = trama;
              ctx.fill();
              ctx.restore();
            }
            // === Paso 3: NO dibujar ningún borde (ni superior, ni inferior, ni laterales) ===
            // (Intencionalmente omitido)

            // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.moveTo(IZQUIERDA_X, estrato.topY);      // Esquina inferior izquierda
            ctx.lineTo(IZQUIERDA_X, estrato.bottomY);         // Lado izquierdo            
            ctx.stroke(); // ← Dibuja los 3 lados continuos

            // === Paso 3: Dibujar lado derecho con línea CONTINUA ===
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1 * escala;
            ctx.setLineDash([]); // Asegurar línea continua
            ctx.beginPath();
            ctx.lineTo(endX, estrato.topY);                // Lado superior
            ctx.quadraticCurveTo(                          // Lado derecho (curvo)
              estrato.puntoControl.x,
              estrato.puntoControl.y,
              endX,
              estrato.bottomY
            );
            ctx.stroke(); // ← Dibuja 

            // === Paso 4: Dibujar punto de control si corresponde ===

            if (mostrarPuntos) {
              ctx.beginPath();
              ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2);
              ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
              ctx.fill();
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 1 * escala;
              ctx.stroke();
            }

            // === Paso 5: Preparar para el próximo estrato ===
            ctx.beginPath();
            ctx.moveTo(startX, estrato.bottomY);
            break;
          
 //CANAL         
          case 'canal':
            // Definir puntos clave para la curva del fondo del canal
            const startX1 = IZQUIERDA_X;
            const endX1 = IZQUIERDA_X + estrato.ancho;
            const startY1 = estrato.bottomY;

            // Altura del canal: diferencia entre el fondo derecho e izquierdo
            const alturaCanal = (estrato.bottomY - estrato.topY) * 0.5; // 30% del espesor total

            // Punto inicial (izquierda): más arriba → menos espesor
            const izquierdaY = startY1 ;

            // Punto final (derecha): en el fondo normal
            const derechaY = startY1;

            // Punto de control para la curva cuadrática (centro, ligeramente más bajo que el promedio)
            const puntoControlX = (startX1 + endX1) / 1.5;
            const puntoControlY = (izquierdaY + derechaY) / 2 + alturaCanal * 1; // curva suave hacia abajo

            // Dibujar la curva del fondo del canal
            ctx.lineTo(endX1, derechaY); // Ir a la esquina inferior derecha
            ctx.quadraticCurveTo(puntoControlX, puntoControlY, startX1, izquierdaY); // Curva hacia la izquierda elevada
            break;  
//CANAL2         
          
            case 'canal2':
              // Definir puntos clave para la curva del fondo del canal
              const startX2 = IZQUIERDA_X;
              const endX2 = IZQUIERDA_X + estrato.ancho;
              const startY2 = estrato.bottomY;

              // Altura del canal: diferencia entre el fondo derecho e izquierdo
              const alturaCanal2 = (estrato.bottomY - estrato.topY) * 2; // 30% del espesor total

              // Punto inicial (izquierda): más arriba → menos espesor
              const izquierdaY2 = startY2 ;

              // Punto final (derecha): en el fondo normal
              const derechaY2 = startY2;

              // Punto de control para la curva cuadrática (centro, ligeramente más bajo que el promedio)
              const puntoControlX2 = (startX2 + endX2) / 1.5;
              const puntoControlY2 = (izquierdaY2 + derechaY2) / 2 + alturaCanal2 * 1; // curva suave hacia abajo

              // Dibujar la curva del fondo del canal
              ctx.lineTo(endX2, derechaY2); // Ir a la esquina inferior derecha
              ctx.quadraticCurveTo(puntoControlX2, puntoControlY2, startX2, izquierdaY2); // Curva hacia la izquierda elevada
              break;

            


        }
        // 6. Cerrar figura
        ctx.closePath();

        // ✅ RELLENO: primero color de fondo, luego textura encima
        ctx.fillStyle = estrato.color;
        ctx.fill();

        if (estrato.trama !== 'solido') {
          const trama = crearTrama(estrato.trama, '#000000', estrato.tamanoTrama * escala); // <-- ESCALAR TAMANO DE TRAMA
          ctx.save();
          ctx.globalCompositeOperation = 'source-atop';
          ctx.fillStyle = trama;
          ctx.fill();
          ctx.restore();
        }

        // Dibujar borde — ¡ESCALAR GROSOR!
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1 * escala; // <-- ¡ESCALAR LINEWIDTH!
        ctx.stroke();

        // ✅ Dibujar símbolos a la derecha del estrato — ¡ESCALAR TAMAÑO!
        if (estrato.simbolosDerecha && estrato.simbolosDerecha.length > 0) {
          const offsetDerecha = 30 * escala; // <-- ESCALAR OFFSET
          const espacioEntreSimbolos = 25 * escala; // <-- ESCALAR ESPACIO
          const size = 20 * escala; // <-- ¡ESCALAR TAMAÑO DEL SÍMBOLO!
          estrato.simbolosDerecha.forEach((simboloInfo, index) => {
            const xDerecha = IZQUIERDA_X + estrato.ancho + offsetDerecha + (index * espacioEntreSimbolos);
            const yDerecha = estrato.topY + (simboloInfo.proporcionY * estrato.alto);
            dibujarSimbolo(ctx, simboloInfo.tipo, xDerecha, yDerecha, size, '#000000'); // size ya está escalado
          });
        }

        // Dibujar punto de control — ¡SOLO SI MOSTRAR_PUNTOS!
        if (mostrarPuntos) {
          ctx.beginPath();
          ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2); // <-- ESCALAR RADIO
          ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
          ctx.fill();
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1 * escala; // <-- ESCALAR GROSOR DE BORDE
          ctx.stroke();
        }

        // Dibujar etiqueta de estrato — ¡ESCALAR FUENTE!
        ctx.fillStyle = '#000';
        ctx.font = `${12 * escala}px Arial`; // <-- ¡ESCALAR FUENTE!
        ctx.fillText(estrato.nombre, IZQUIERDA_X - 100 * escala, estrato.topY + 50 * escala);
      });
    }
    // ================================
    // EXPORTAR CON CALIDAD (NUEVA FUNCIÓN) — ¡CORREGIDA!
    // ================================
    function exportarConCalidad(escala, tipo, callback) {
      // Guardar dimensiones y estado originales
      const anchoOriginal = canvas.width;
      const altoOriginal = canvas.height;
      const estiloCanvas = canvas.style.cssText;

      // Calcular nuevas dimensiones
      const nuevoAncho = anchoOriginal;
      const nuevoAlto = altoOriginal;

      // Aplicar nueva escala al lienzo
      canvas.width = nuevoAncho; // ACA SE PUEDE MULTIPLICAR POR ESCALA PARA AGRANDAR
      canvas.height = nuevoAlto;
      canvas.style.cssText = estiloCanvas; // Mantener estilos CSS

      // Ajustar el contexto para la nueva escala
      ctx.setTransform(escala, 0, 0, escala, 0, 0);



      // Redibujar todo sin puntos de control — ¡PASAR ESCALA!
      dibujar(false, escala);

      // Ejecutar la función de exportación específica (PNG, JPG, etc.)
      callback();

      // Restaurar el lienzo a su estado original
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Resetear transformación
      canvas.width = anchoOriginal;
      canvas.height = altoOriginal;
      canvas.style.cssText = estiloCanvas;

      // Redibujar con puntos de control para la interfaz
      setTimeout(() => dibujar(true, 1), 100); // <-- Restaurar escala 1
    }
}