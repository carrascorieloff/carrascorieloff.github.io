import { CONFIG } from './config.js';
import { Estrato } from './models/Estrato.js';
import { TramasManager } from './services/TramasManager.js';
import { Dibujador } from './services/Dibujador.js';
import { Controlador } from './services/Controlador.js';
import { Persistencia } from './services/Persistencia.js';
import { UnidadManager } from './services/UnidadManager.js';
import { UI } from './ui/UI.js';
import { UnidadUI } from './ui/UnidadUI.js';

/**
 * Aplicación principal
 */
class App {
    constructor() {
        this.config = CONFIG;
        this.estratos = [];
        
        this._resizeTimeout = null;
        this._resizeObserver = null;
        
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.tramasManager = new TramasManager();
        this.dibujador = new Dibujador(this.canvas, this.ctx, this.tramasManager);
        this.dibujador.config = this.config;
        
        // ✅ Inicializar UnidadManager
        this.unidadManager = new UnidadManager();
        this.dibujador.setUnidadManager(this.unidadManager);
        
        this.persistencia = new Persistencia(this.estratos, this.config);
        
        this.ui = new UI(
            this.estratos, 
            this.dibujador, 
            this.tramasManager,
            () => {
                this.dibujador.dibujar();
                setTimeout(() => this._ajustarCanvas(), 50);
            }
        );
        
        // ✅ Inicializar UnidadUI
        this.unidadUI = new UnidadUI(
            this.estratos,
            this.unidadManager,
            this.dibujador,
            () => {
                this.dibujador.dibujar();
                setTimeout(() => this._ajustarCanvas(), 50);
            }
        );
        
        this.controlador = new Controlador(this.dibujador, this.estratos);
        
        this._handleResize = this._handleResize.bind(this);
        this._ajustarCanvas = this._ajustarCanvas.bind(this);
        
        this.init();
    }

    async init() {
        try {
            await this.tramasManager.registrarTodos();
            this._agregarEstratoInicial();
            this._setupEventListeners();
            this.dibujador.dibujar();
            
            setTimeout(() => {
                this._ajustarCanvas();
            }, 100);
            
            window.addEventListener('resize', this._handleResize);
            
            if (window.ResizeObserver) {
                const container = document.getElementById('canvasContainer');
                this._resizeObserver = new ResizeObserver(() => this._handleResize());
                this._resizeObserver.observe(container);
            }
            
            console.log('✅ Aplicación inicializada correctamente');
        } catch (error) {
            console.error('❌ Error al inicializar:', error);
        }
    }

    _agregarEstratoInicial() {
        const estrato = new Estrato({
            nombre: 'Estrato 1',
            alto: 150,
            ancho: 300,
            color: '#cccccc'
        });
        this.estratos.push(estrato);
        this.ui.crearPanelEstrato(0);
        this.dibujador.setEstratos(this.estratos);
    }

    _ajustarCanvas() {
        const container = document.getElementById('canvasContainer');
        const canvas = this.canvas;
        
        if (!container || !canvas) return;
        
        const containerWidth = container.clientWidth - 40;
        const containerHeight = container.clientHeight - 40;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        canvas.style.width = canvasWidth + 'px';
        canvas.style.height = canvasHeight + 'px';
        canvas.style.transform = 'none';
        canvas.style.transformOrigin = 'center center';
        
        const needsScroll = canvasWidth > containerWidth || canvasHeight > containerHeight;
        container.classList.toggle('scrollable', needsScroll);
        container.classList.toggle('centered', !needsScroll);
        
        if (!needsScroll) {
            canvas.style.margin = 'auto';
            canvas.style.display = 'block';
        } else {
            canvas.style.margin = '0';
            canvas.style.display = 'block';
            container.scrollLeft = 0;
            container.scrollTop = 0;
        }
    }

    _handleResize() {
        if (this._resizeTimeout) {
            cancelAnimationFrame(this._resizeTimeout);
        }
        this._resizeTimeout = requestAnimationFrame(() => {
            this._ajustarCanvas();
            this._resizeTimeout = null;
        });
    }

    _mostrarLeyenda() {
        const popup = document.getElementById('leyendaTramasPopup');
        const overlay = document.getElementById('leyendaTramasOverlay');
        const canvasLeyenda = document.getElementById('canvasLeyenda');
        
        if (!canvasLeyenda) return;
        
        popup.classList.add('active');
        overlay.classList.add('active');
        popup.offsetHeight;
        
        const ancho = 600;
        let alto = 600;
        
        const tramasUsadas = new Set();
        this.estratos.forEach(e => {
            if (e.trama && e.trama !== 'solido') {
                tramasUsadas.add(e.trama);
            }
        });
        
        const simbolosUsados = new Set();
        this.estratos.forEach(e => {
            if (e.simbolosDerecha && e.simbolosDerecha.length > 0) {
                e.simbolosDerecha.forEach(s => {
                    if (s.tipo) simbolosUsados.add(s.tipo);
                });
            }
        });
        
        const margin = 20;
        const itemHeight = 55;
        const tituloHeight = 40;
        const headerHeight = 25;
        const separacionHeight = 25;
        
        let alturaNecesaria = tituloHeight + 20;
        
        if (tramasUsadas.size > 0) {
            alturaNecesaria += headerHeight + (tramasUsadas.size * itemHeight) + separacionHeight;
        }
        
        if (simbolosUsados.size > 0) {
            alturaNecesaria += headerHeight + (simbolosUsados.size * itemHeight);
        }
        
        alturaNecesaria += margin * 2;
        alto = Math.max(alturaNecesaria, 200);
        
        canvasLeyenda.width = ancho;
        canvasLeyenda.height = alto;
        canvasLeyenda.style.width = '100%';
        canvasLeyenda.style.height = 'auto';
        
        const ctx = canvasLeyenda.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ancho, alto);
        
        let y = 20;
        const tamanoRectangulo = 40;
        const tamanoTrama = 80;
        const tamanoFosil = 30;
        
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('Leyenda de Tramas y Fósiles', ancho / 2, y);
        y += 40;
        
        if (tramasUsadas.size === 0 && simbolosUsados.size === 0) {
            ctx.fillStyle = '#666';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('No se han usado tramas ni fósiles', ancho / 2, alto / 2);
            return;
        }
        
        if (tramasUsadas.size > 0) {
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(`Tramas (${tramasUsadas.size})`, margin, y);
            y += 25;
            
            const tramasArray = Array.from(tramasUsadas).sort();
            
            for (const trama of tramasArray) {
                if (y + itemHeight > alto - margin) break;
                
                ctx.save();
                ctx.beginPath();
                ctx.rect(margin, y, tamanoRectangulo, tamanoRectangulo);
                ctx.clip();
                
                const pattern = this.tramasManager.crearTrama(trama, '#333333', tamanoTrama);
                if (pattern) {
                    const offsetX = (tamanoRectangulo - tamanoTrama) / 2;
                    const offsetY = (tamanoRectangulo - tamanoTrama) / 2;
                    ctx.translate(margin + offsetX, y + offsetY);
                    ctx.fillStyle = pattern;
                    ctx.fillRect(0, 0, tamanoTrama, tamanoTrama);
                } else {
                    ctx.fillStyle = '#e0e0e0';
                    ctx.fillRect(margin, y, tamanoRectangulo, tamanoRectangulo);
                    ctx.fillStyle = '#999';
                    ctx.font = '12px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('?', margin + tamanoRectangulo/2, y + tamanoRectangulo/2);
                }
                
                ctx.restore();
                
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(margin, y, tamanoRectangulo, tamanoRectangulo);
                
                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                const nombre = this.tramasManager.obtenerTraduccionTrama(trama) || trama;
                ctx.fillText(nombre, margin + tamanoRectangulo + 12, y + tamanoRectangulo/2);
                
                y += itemHeight;
            }
            y += 10;
            
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(margin, y);
            ctx.lineTo(ancho - margin, y);
            ctx.stroke();
            y += 15;
        }
        
        if (simbolosUsados.size > 0) {
            if (y + 30 > alto - margin) {
                alto += 100;
                canvasLeyenda.height = alto;
            }
            
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(`Fósiles (${simbolosUsados.size})`, margin, y);
            y += 25;
            
            const simbolosArray = Array.from(simbolosUsados).sort();
            
            for (const simbolo of simbolosArray) {
                if (y + itemHeight > alto - margin) {
                    alto += itemHeight + 10;
                    canvasLeyenda.height = alto;
                }
                
                const img = this.tramasManager.simbolos[simbolo];
                if (img && img.complete && img.naturalWidth > 0) {
                    const proporcion = img.naturalWidth / img.naturalHeight;
                    const maxSize = tamanoFosil;
                    
                    let drawWidth, drawHeight;
                    if (proporcion > 1) {
                        drawWidth = maxSize;
                        drawHeight = maxSize / proporcion;
                    } else {
                        drawHeight = maxSize;
                        drawWidth = maxSize * proporcion;
                    }
                    
                    const offsetX = (tamanoRectangulo - drawWidth) / 2;
                    const offsetY = (tamanoRectangulo - drawHeight) / 2;
                    
                    ctx.drawImage(img, margin + offsetX, y + offsetY, drawWidth, drawHeight);
                } else {
                    const centroX = margin + tamanoRectangulo/2;
                    const centroY = y + tamanoRectangulo/2;
                    const radio = (tamanoFosil / 2) - 2;
                    const grad = ctx.createRadialGradient(centroX, centroY, 2, centroX, centroY, radio);
                    grad.addColorStop(0, '#66BB6A');
                    grad.addColorStop(1, '#2E7D32');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.fillStyle = 'white';
                    ctx.font = `bold ${tamanoFosil * 0.5}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const inicial = simbolo.charAt(0).toUpperCase();
                    ctx.fillText(inicial, centroX, centroY + 1);
                }
                
                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                const nombre = this.tramasManager.obtenerTraduccionSimbolo(simbolo) || simbolo;
                ctx.fillText(nombre, margin + tamanoRectangulo + 12, y + tamanoRectangulo/2);
                
                y += itemHeight;
            }
        }
        
        const alturaFinal = Math.max(y + margin, alto);
        if (alturaFinal > canvasLeyenda.height) {
            canvasLeyenda.height = alturaFinal;
        }
    }

    _cerrarLeyenda() {
        const popup = document.getElementById('leyendaTramasPopup');
        const overlay = document.getElementById('leyendaTramasOverlay');
        popup.classList.remove('active');
        overlay.classList.remove('active');
    }

    _mostrarModalProyectos() {
        const proyectosInfo = this.persistencia.listarProyectos();

        const ordenarTabla = (criterio) => {
            const tbody = document.querySelector('#tablaProyectos tbody');
            if (!tbody) return;

            const filas = Array.from(tbody.querySelectorAll('tr'));

            filas.sort((a, b) => {
                const nombreA = a.getAttribute('data-nombre').toLowerCase();
                const nombreB = b.getAttribute('data-nombre').toLowerCase();
                const fechaA = new Date(a.getAttribute('data-fecha'));
                const fechaB = new Date(b.getAttribute('data-fecha'));
                const estratosA = parseInt(a.getAttribute('data-estratos'));
                const estratosB = parseInt(b.getAttribute('data-estratos'));

                switch (criterio) {
                    case 'nombre':
                        return nombreA.localeCompare(nombreB);
                    case 'nombre-desc':
                        return nombreB.localeCompare(nombreA);
                    case 'fecha':
                        return fechaB - fechaA;
                    case 'fecha-asc':
                        return fechaA - fechaB;
                    case 'estratos':
                        return estratosB - estratosA;
                    case 'estratos-asc':
                        return estratosA - estratosB;
                    default:
                        return 0;
                }
            });

            filas.forEach(fila => tbody.appendChild(fila));
            
            document.querySelectorAll('.orden-indicador').forEach(el => el.textContent = '');
            const indicador = document.querySelector(`.orden-indicador[data-criterio="${criterio}"]`);
            if (indicador) {
                const esAsc = criterio.includes('-asc') || criterio === 'nombre' || criterio === 'fecha-asc' || criterio === 'estratos-asc';
                indicador.textContent = esAsc ? ' ↑' : ' ↓';
            }
        };

        let modal = document.getElementById('modalProyectos');
        let overlay = document.getElementById('modalOverlay');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modalProyectos';
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 5px 25px rgba(0,0,0,0.3);
                z-index: 1000;
                min-width: 600px;
                max-width: 800px;
                max-height: 80vh;
                overflow-y: auto;
                display: none;
            `;
            document.body.appendChild(modal);
        }
        
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'modalOverlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 999;
                display: none;
            `;
            overlay.addEventListener('click', () => this._cerrarModalProyectos());
            document.body.appendChild(overlay);
        }

        if (proyectosInfo.length === 0) {
            modal.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <h3 style="margin-top: 0; color: #666;">No hay proyectos guardados</h3>
                    <p>Guarda primero un proyecto usando el botón "💾 Guardar Proyecto"</p>
                    <button id="btnCerrarModal" style="padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Cerrar</button>
                </div>
            `;
        } else {
            let proyectosHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                    <h3 style="margin: 0; color: #333;">Proyectos Guardados</h3>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label style="font-size: 13px; color: #666;">
                            <i class="fas fa-sort"></i> Ordenar por:
                        </label>
                        <select id="ordenProyectos" style="padding: 5px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px;">
                            <option value="fecha">📅 Fecha (más reciente)</option>
                            <option value="fecha-asc">📅 Fecha (más antiguo)</option>
                            <option value="nombre">🔤 Nombre (A-Z)</option>
                            <option value="nombre-desc">🔤 Nombre (Z-A)</option>
                            <option value="estratos">📊 Más estratos</option>
                            <option value="estratos-asc">📊 Menos estratos</option>
                        </select>
                        <button id="btnCerrarModal" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #666; padding: 0 8px;">×</button>
                    </div>
                </div>
                <div style="margin-bottom: 15px; font-size: 14px; color: #666;">
                    ${proyectosInfo.length} proyecto(s) encontrado(s)
                </div>
                <div style="overflow-x: auto;">
                    <table id="tablaProyectos" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <thead>
                            <tr style="background: #f5f5f5;">
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd; cursor: pointer;" data-orden="nombre">
                                    Nombre <span class="orden-indicador" data-criterio="nombre"></span>
                                </th>
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd; cursor: pointer;" data-orden="fecha">
                                    Fecha <span class="orden-indicador" data-criterio="fecha"></span>
                                </th>
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd; cursor: pointer;" data-orden="estratos">
                                    Estratos <span class="orden-indicador" data-criterio="estratos"></span>
                                </th>
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Escala</th>
                                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            proyectosInfo.forEach((proyecto) => {
                proyectosHTML += `
                    <tr data-nombre="${proyecto.nombre}" data-fecha="${proyecto.info.fecha}" data-estratos="${proyecto.info.estratos}" style="border-bottom: 1px solid #eee;">
                        <td style="padding: 10px;"><strong>${proyecto.nombre}</strong></td>
                        <td style="padding: 10px;">${proyecto.info.fechaLegible}</td>
                        <td style="padding: 10px; text-align: center;">${proyecto.info.estratos}</td>
                        <td style="padding: 10px; text-align: center;">${proyecto.info.pixelesPorMetro} px/m</td>
                        <td style="padding: 10px;">
                            <button class="btn-cargar-proyecto" data-nombre="${proyecto.nombre}" 
                                    style="padding: 6px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 5px; font-size: 12px;">
                                <i class="fas fa-folder-open"></i> Cargar
                            </button>
                            <button class="btn-eliminar-proyecto" data-nombre="${proyecto.nombre}" 
                                    style="padding: 6px 12px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });

            proyectosHTML += `
                        </tbody>
                    </table>
                </div>
                <div style="margin-top: 20px; text-align: right;">
                    <button id="btnCerrarModal2" style="padding: 8px 16px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Cerrar</button>
                </div>
            `;

            modal.innerHTML = proyectosHTML;
        }

        modal.style.display = 'block';
        overlay.style.display = 'block';

        setTimeout(() => {
            document.querySelectorAll('#btnCerrarModal, #btnCerrarModal2').forEach(btn => {
                btn.addEventListener('click', () => this._cerrarModalProyectos());
            });

            const selectOrden = document.getElementById('ordenProyectos');
            if (selectOrden) {
                selectOrden.addEventListener('change', function() {
                    ordenarTabla(this.value);
                });
            }

            document.querySelectorAll('#tablaProyectos thead th[data-orden]').forEach(th => {
                th.addEventListener('click', function() {
                    const criterio = this.dataset.orden;
                    if (selectOrden) {
                        const option = selectOrden.querySelector(`option[value="${criterio}"]`);
                        if (option) {
                            selectOrden.value = criterio;
                            ordenarTabla(criterio);
                        }
                    }
                });
                th.style.cursor = 'pointer';
                th.title = 'Click para ordenar';
            });

            setTimeout(() => {
                ordenarTabla('fecha');
                if (selectOrden) {
                    selectOrden.value = 'fecha';
                }
            }, 50);

            document.querySelectorAll('.btn-cargar-proyecto').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const nombre = e.target.closest('button').dataset.nombre;
                    this._cargarProyecto(nombre);
                });
            });

            document.querySelectorAll('.btn-eliminar-proyecto').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const nombre = e.target.closest('button').dataset.nombre;
                    if (confirm(`¿Eliminar el proyecto "${nombre}"?`)) {
                        localStorage.removeItem(`columna_${nombre}`);
                        this._mostrarModalProyectos();
                        this._mostrarNotificacion(`🗑️ Proyecto "${nombre}" eliminado`, 'info');
                    }
                });
            });
        }, 100);
    }

    _cargarProyecto(nombre) {
        try {
            // ✅ Usar el método cargar de persistencia con el unidadManager
            this.persistencia.cargar(nombre, this.unidadManager);
            
            // Reconstruir paneles
            this.ui.reconstruirPaneles();
            this.unidadUI.actualizar();
            this.dibujador.setEstratos(this.estratos);
            this.dibujador.dibujar();
            
            this._actualizarMetrosEnPaneles();
            
            setTimeout(() => {
                this._ajustarCanvas();
                this._cerrarModalProyectos();
            }, 100);
            
            this._mostrarNotificacion(`✅ Proyecto "${nombre}" cargado correctamente`, 'success');
            
        } catch (error) {
            console.error('Error al cargar proyecto:', error);
            this._mostrarNotificacion(`❌ ${error.message}`, 'error');
        }
    }

    _cerrarModalProyectos() {
        const modal = document.getElementById('modalProyectos');
        const overlay = document.getElementById('modalOverlay');
        if (modal) modal.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
    }

    _actualizarMetrosEnPaneles() {
        document.querySelectorAll('.panel-estrato').forEach((panel, index) => {
            const estrato = this.estratos[index];
            if (estrato) {
                const metrosAlto = panel.querySelector('.valor-metros-alto');
                if (metrosAlto) {
                    const altoMetros = (estrato.alto / this.config.PIXELES_POR_METRO).toFixed(2);
                    metrosAlto.textContent = `= ${altoMetros} m`;
                }
                
                const inputAncho = panel.querySelector('.input-ancho');
                const metrosAncho = panel.querySelector('.valor-metros-ancho');
                if (metrosAncho && inputAncho) {
                    const anchoMetros = (parseInt(inputAncho.value) || 300) / this.config.PIXELES_POR_METRO;
                    metrosAncho.textContent = `= ${anchoMetros.toFixed(2)} m`;
                }
            }
        });
    }

    _mostrarNotificacion(mensaje, tipo = 'info') {
        const notif = document.createElement('div');
        notif.className = 'notificacion-flotante';
        notif.textContent = mensaje;
        
        const colores = {
            success: '#4CAF50',
            error: '#f44336',
            info: '#2196F3'
        };
        
        notif.style.background = colores[tipo] || colores.info;
        notif.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideUp 0.3s ease-out;
            background: ${colores[tipo] || colores.info};
        `;
        
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideDown 0.3s ease-in';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    _setupEventListeners() {
        // Agregar estrato
        document.getElementById('btnAgregarEstrato').addEventListener('click', () => {
            const nombre = `Estrato ${this.estratos.length + 1}`;
            const estrato = new Estrato({ 
                nombre,
                alto: 150,
                ancho: 300,
                color: '#cccccc'
            });
            this.estratos.push(estrato);
            this.ui.reconstruirPaneles();
            this.unidadUI.actualizar();
            this.dibujador.setEstratos(this.estratos);
            this.dibujador.dibujar();
            setTimeout(() => this._ajustarCanvas(), 50);
        });

        // Control global de tamaño de tramas
        const inputTramaGlobal = document.getElementById('tamanoTramaGlobal');
        const labelTramaGlobal = document.getElementById('tamanoTramaLabel');
        let timeoutTrama = null;

        inputTramaGlobal.addEventListener('input', () => {
            const valor = inputTramaGlobal.value;
            labelTramaGlobal.textContent = valor;
        });

        inputTramaGlobal.addEventListener('change', () => {
            const nuevoTamano = parseInt(inputTramaGlobal.value);
            this._aplicarTamanoTramaGlobal(nuevoTamano);
        });

        inputTramaGlobal.addEventListener('input', () => {
            if (timeoutTrama) {
                cancelAnimationFrame(timeoutTrama);
            }
            timeoutTrama = requestAnimationFrame(() => {
                const nuevoTamano = parseInt(inputTramaGlobal.value);
                this._aplicarTamanoTramaGlobal(nuevoTamano);
                timeoutTrama = null;
            });
        });

        // Botón para invertir el orden de los estratos
        document.getElementById('btnInvertirOrden').addEventListener('click', () => {
            this.estratos.reverse();
            this.ui.reconstruirPaneles();
            this.unidadUI.actualizar();
            this.dibujador.setEstratos(this.estratos);
            this.dibujador.dibujar();
            this._mostrarNotificacion('🔄 Orden de estratos invertido', 'info');
        });

        // Botón para cargar proyectos
        document.getElementById('btnCargar').addEventListener('click', () => {
            this._mostrarModalProyectos();
        });

        // Controles de escala
        document.getElementById('pixelesPorMetro').addEventListener('input', (e) => {
            const nuevaEscala = parseInt(e.target.value) || 100;
            this.config.PIXELES_POR_METRO = nuevaEscala;
            this.dibujador.dibujar();
            this._actualizarMetrosEnPaneles();
        });

        document.getElementById('separacionMinima').addEventListener('input', (e) => {
            const nuevaSeparacion = parseInt(e.target.value) || 100;
            this.config.SEPARACION_MINIMA_ETIQUETAS = nuevaSeparacion;
            this.dibujador.dibujar();
        });

        document.getElementById('desplazamientoEscalaHorizontal').addEventListener('input', (e) => {
            this.config.DESPLAZAMIENTO_ESCALA_HORIZONTAL = parseInt(e.target.value) || 0;
            this.dibujador.dibujar();
        });

        document.getElementById('toggleGuias').addEventListener('change', (e) => {
            this.config.MOSTRAR_GUIAS_VERTICALES = e.target.checked;
            this.dibujador.dibujar();
        });

        document.getElementById('invertirEscala').addEventListener('change', (e) => {
            this.config.INVERTIR_ESCALA = e.target.checked;
            this.dibujador.dibujar();
        });

        // Guardar proyecto
        document.getElementById('btnGuardar').addEventListener('click', () => {
            const nombre = prompt('Nombre del proyecto:', 'Proyecto 1');
            if (nombre) {
                try {
                    this.persistencia.guardar(nombre, this.unidadManager);
                    this._mostrarNotificacion(`✅ Proyecto "${nombre}" guardado`, 'success');
                } catch (error) {
                    this._mostrarNotificacion(`❌ ${error.message}`, 'error');
                }
            }
        });

        // Exportar proyecto
        document.getElementById('btnExportarProyecto').addEventListener('click', () => {
            const nombre = prompt('Nombre del proyecto:', 'MiColumna');
            if (nombre) {
                try {
                    this.persistencia.exportar(nombre);
                    this._mostrarNotificacion(`✅ Proyecto "${nombre}" exportado`, 'success');
                } catch (error) {
                    this._mostrarNotificacion(`❌ ${error.message}`, 'error');
                }
            }
        });

        // Importar proyecto
        document.getElementById('btnImportarProyecto').addEventListener('click', () => {
            document.getElementById('inputImportarProyecto').click();
        });

        document.getElementById('inputImportarProyecto').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                await this.persistencia.importar(file);
                this.ui.reconstruirPaneles();
                this.unidadUI.actualizar();
                this.dibujador.setEstratos(this.estratos);
                this.dibujador.dibujar();
                this.ui.actualizarControlesEscala(this.config);
                setTimeout(() => this._ajustarCanvas(), 100);
                this._mostrarNotificacion(`✅ Proyecto "${file.name}" cargado`, 'success');
            } catch (error) {
                this._mostrarNotificacion(`❌ ${error.message}`, 'error');
            }
            e.target.value = '';
        });

        // Exportar imágenes
        document.getElementById('btnExportarPNG').addEventListener('click', () => {
            this._exportarImagen('png');
        });

        document.getElementById('btnExportarJPG').addEventListener('click', () => {
            this._exportarImagen('jpg');
        });

        document.getElementById('btnExportarSVG').addEventListener('click', () => {
            this._exportarSVG();
        });

        document.getElementById('btnExportarPDF').addEventListener('click', () => {
            this._exportarPDF();
        });

        // Leyenda
        document.getElementById('btnMostrarLeyendaTramas').addEventListener('click', () => {
            this._mostrarLeyenda();
        });

        document.getElementById('cerrarLeyendaTramas').addEventListener('click', () => {
            this._cerrarLeyenda();
        });

        document.getElementById('btnCerrarLeyendaTramas').addEventListener('click', () => {
            this._cerrarLeyenda();
        });

        document.getElementById('leyendaTramasOverlay').addEventListener('click', () => {
            this._cerrarLeyenda();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this._cerrarLeyenda();
                this._cerrarModalProyectos();
            }
        });

        // Paletas
        document.getElementById('btnAbrirPaleta').addEventListener('click', () => {
            window.open('Paleta.html', 'PaletaColores', 'width=600,height=700,scrollbars=yes,resizable=yes');
        });

        document.getElementById('btnAbrirPaletaCrono').addEventListener('click', () => {
            window.open('https://stratigraphy.org/chart/?language=es', '_blank');
        });

        // Botón para mostrar/ocultar panel de unidades
        const btnUnidades = document.createElement('button');
        btnUnidades.className = 'btn-secondary';
        btnUnidades.innerHTML = '<i class="fas fa-layer-group"></i> Unidades';
        btnUnidades.style.cssText = 'padding: 4px 12px; font-size: 12px;';
        btnUnidades.addEventListener('click', () => {
            const panel = this.unidadUI.container;
            const isVisible = panel.style.display !== 'none';
            panel.style.display = isVisible ? 'none' : 'block';
            btnUnidades.style.background = isVisible ? '' : '#4CAF50';
            btnUnidades.style.color = isVisible ? '' : 'white';
        });
        
        const toolbarGroup = document.querySelector('.toolbar-group:last-child');
        if (toolbarGroup) {
            toolbarGroup.appendChild(btnUnidades);
        }
    }

    _aplicarTamanoTramaGlobal(nuevoTamano) {
        const tamano = Math.max(10, Math.min(200, nuevoTamano));
        let count = 0;
        this.estratos.forEach(estrato => {
            if (estrato.tamanoTrama !== tamano) {
                estrato.tamanoTrama = tamano;
                count++;
            }
        });
        if (count === 0) return;
        this.config.TAMANO_TRAMA_GLOBAL = tamano;
        document.querySelectorAll('.panel-estrato').forEach((panel) => {
            const inputTamano = panel.querySelector('.input-tamano');
            if (inputTamano) {
                inputTamano.value = tamano;
            }
        });
        this.dibujador.dibujar();
    }

    _exportarImagen(tipo) {
        this.dibujador.dibujar(false);
        
        setTimeout(() => {
            const link = document.createElement('a');
            const extension = tipo === 'png' ? 'png' : 'jpg';
            const mimeType = tipo === 'png' ? 'image/png' : 'image/jpeg';
            
            if (tipo === 'jpg') {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = this.canvas.width;
                tempCanvas.height = this.canvas.height;
                const tempCtx = tempCanvas.getContext('2d');
                tempCtx.fillStyle = '#FFFFFF';
                tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.drawImage(this.canvas, 0, 0);
                link.href = tempCanvas.toDataURL(mimeType, 0.95);
            } else {
                link.href = this.canvas.toDataURL(mimeType);
            }
            
            link.download = `columna_estratigrafica.${extension}`;
            link.click();
            
            setTimeout(() => {
                this.dibujador.dibujar();
                this._ajustarCanvas();
            }, 100);
        }, 50);
    }

    _exportarSVG() {
        this.dibujador.dibujar(false);
        
        setTimeout(() => {
            const svgNS = 'http://www.w3.org/2000/svg';
            const svg = document.createElementNS(svgNS, 'svg');
            svg.setAttribute('width', this.canvas.width);
            svg.setAttribute('height', this.canvas.height);
            svg.setAttribute('xmlns', svgNS);
            svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

            const bg = document.createElementNS(svgNS, 'rect');
            bg.setAttribute('width', '100%');
            bg.setAttribute('height', '100%');
            bg.setAttribute('fill', 'white');
            svg.appendChild(bg);

            const img = document.createElementNS(svgNS, 'image');
            img.setAttribute('x', 0);
            img.setAttribute('y', 0);
            img.setAttribute('width', this.canvas.width);
            img.setAttribute('height', this.canvas.height);
            img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.canvas.toDataURL('image/png'));
            svg.appendChild(img);

            const serializer = new XMLSerializer();
            let svgStr = serializer.serializeToString(svg);
            svgStr = '<?xml version="1.0" standalone="no"?>\r' + svgStr;

            const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'columna_estratigrafica.svg';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);

            setTimeout(() => {
                this.dibujador.dibujar();
                this._ajustarCanvas();
            }, 100);
        }, 50);
    }

    _exportarPDF() {
        this._mostrarNotificacion('📄 Generando PDF de alta resolución...', 'info');
        
        const anchoOriginal = this.canvas.width;
        const altoOriginal = this.canvas.height;
        
        const factorCalidad = 4;
        const nuevoAncho = anchoOriginal * factorCalidad;
        const nuevoAlto = altoOriginal * factorCalidad;
        
        const canvasTemp = document.createElement('canvas');
        canvasTemp.width = nuevoAncho;
        canvasTemp.height = nuevoAlto;
        const ctxTemp = canvasTemp.getContext('2d');
        ctxTemp.scale(factorCalidad, factorCalidad);
        
        this.dibujador.dibujar(false, 1);
        
        setTimeout(() => {
            try {
                ctxTemp.drawImage(this.canvas, 0, 0);
                
                if (typeof window.jspdf === 'undefined') {
                    throw new Error('jsPDF no está cargado.');
                }
                
                const { jsPDF } = window.jspdf;
                
                const anchoMM = nuevoAncho * 0.264583;
                const altoMM = nuevoAlto * 0.264583;
                
                const pdf = new jsPDF({
                    orientation: nuevoAncho > nuevoAlto ? 'landscape' : 'portrait',
                    unit: 'mm',
                    format: [anchoMM, altoMM]
                });
                
                const imgData = canvasTemp.toDataURL('image/png', 1.0);
                
                pdf.addImage(
                    imgData,
                    'PNG',
                    0,
                    0,
                    anchoMM,
                    altoMM
                );
                
                pdf.save('columna_estratigrafica.pdf');
                
                this._mostrarNotificacion('✅ PDF exportado correctamente', 'success');
                
            } catch (error) {
                console.error('Error al exportar PDF:', error);
                this._mostrarNotificacion(`❌ Error al exportar PDF: ${error.message}`, 'error');
            } finally {
                this.canvas.width = anchoOriginal;
                this.canvas.height = altoOriginal;
                
                setTimeout(() => {
                    this.dibujador.dibujar();
                    this._ajustarCanvas();
                }, 100);
            }
        }, 200);
    }

    destroy() {
        window.removeEventListener('resize', this._handleResize);
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
        if (this._resizeTimeout) {
            cancelAnimationFrame(this._resizeTimeout);
        }
    }
}

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});