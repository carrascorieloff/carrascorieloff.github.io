import { CONFIG, TRADUCCIONES_TRAMA, TRADUCCIONES_SIMBOLOS } from '../config.js';

/**
 * Gestor de la interfaz de usuario
 */
export class UI {
    constructor(estratos, dibujador, tramasManager, onCambio) {
        this.estratos = estratos;
        this.dibujador = dibujador;
        this.tramasManager = tramasManager;
        this.onCambio = onCambio;
        this.panelesContainer = document.getElementById('panelesEstratos');
        this._timeoutBusqueda = null;
        
        // Variables para drag
        this._dragData = null;
        this._dragOverlay = null;
        this._dragGap = null;
        
        this._setupPanelResize();
        this._setupGlobalEventListeners();
        this._setupDragAndDrop();
    }

    /**
     * Configura el drag and drop para los paneles
     * @private
     */
    _setupDragAndDrop() {
        this.panelesContainer.addEventListener('mousedown', (e) => {
            const encabezado = e.target.closest('.panel-encabezado');
            if (!encabezado) return;
            if (e.target.closest('button')) return;
            
            const panel = encabezado.closest('.panel-estrato');
            if (!panel) return;
            
            this._iniciarDrag(panel, e);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (this._dragData) {
                this._moverDrag(e);
            }
        });
        
        document.addEventListener('mouseup', (e) => {
            if (this._dragData) {
                this._finalizarDrag(e);
            }
        });
        
        document.addEventListener('selectstart', (e) => {
            if (this._dragData) {
                e.preventDefault();
            }
        });
    }

    /**
     * Inicia el arrastre de un panel
     * @param {HTMLElement} panel - Panel a arrastrar
     * @param {MouseEvent} e - Evento del mouse
     * @private
     */
    _iniciarDrag(panel, e) {
        const index = parseInt(panel.dataset.index);
        if (isNaN(index)) return;
        
        this._dragData = {
            panel: panel,
            index: index,
            offsetY: e.clientY - panel.getBoundingClientRect().top,
            startY: panel.getBoundingClientRect().top,
            mouseY: e.clientY,
            isDragging: false,
            moved: false,
            targetIndex: index,
            lastTargetIndex: index,
            panelHeight: panel.offsetHeight,
            originalOrder: [...this.estratos],
            originalIndex: index
        };
        
        this._crearEspacioIndicador(panel);
        
        this._dragOverlay = panel.cloneNode(true);
        this._dragOverlay.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.85;
            transform: scale(1.02) rotate(2deg);
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            border: 2px solid #ff0000;
            width: ${panel.offsetWidth}px;
            background: white;
            border-radius: 6px;
            transition: none;
            cursor: grabbing;
        `;
        
        panel.style.opacity = '0';
        panel.style.transition = 'opacity 0.2s';
        
        document.body.appendChild(this._dragOverlay);
        
        const rect = panel.getBoundingClientRect();
        this._dragOverlay.style.left = rect.left + 'px';
        this._dragOverlay.style.top = rect.top + 'px';
    }

    /**
     * Crea un espacio indicador donde se va a soltar el panel
     * @param {HTMLElement} panel - Panel que se está arrastrando
     * @private
     */
    _crearEspacioIndicador(panel) {
        this._eliminarEspacioIndicador();
        
        const gap = document.createElement('div');
        gap.className = 'drag-gap-indicator';
        gap.style.cssText = `
            height: ${panel.offsetHeight}px;
            margin: 4px 0;
            border: 2px dashed #4CAF50;
            border-radius: 6px;
            background: rgba(76, 175, 80, 0.08);
            transition: all 0.2s ease;
            display: none;
        `;
        
        panel.parentNode.insertBefore(gap, panel);
        this._dragGap = gap;
    }

    /**
     * Elimina el espacio indicador
     * @private
     */
    _eliminarEspacioIndicador() {
        if (this._dragGap) {
            this._dragGap.remove();
            this._dragGap = null;
        }
    }

    /**
     * Mueve el panel durante el arrastre
     * @param {MouseEvent} e - Evento del mouse
     * @private
     */
    _moverDrag(e) {
        const dragData = this._dragData;
        if (!dragData) return;
        
        dragData.mouseY = e.clientY;
        dragData.moved = true;
        
        if (Math.abs(e.clientY - dragData.startY) > 5) {
            dragData.isDragging = true;
        }
        
        if (this._dragOverlay) {
            const newTop = e.clientY - dragData.offsetY;
            this._dragOverlay.style.top = newTop + 'px';
        }
        
        const panels = Array.from(this.panelesContainer.querySelectorAll('.panel-estrato'));
        const panelElements = panels.filter(p => p !== dragData.panel);
        let targetIndex = panels.length;
        
        const mouseY = e.clientY;
        
        for (let i = 0; i < panelElements.length; i++) {
            const p = panelElements[i];
            const rect = p.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            
            if (mouseY < centerY) {
                const visualIndex = panels.indexOf(p);
                targetIndex = visualIndex;
                break;
            }
        }
        
        if (this._dragGap) {
            const currentGapIndex = this._obtenerIndiceGap();
            
            if (currentGapIndex !== targetIndex) {
                this._moverGapA(targetIndex);
                dragData.targetIndex = targetIndex;
            }
            
            this._dragGap.style.display = 'block';
            this._dragGap.style.animation = 'pulseGap 0.6s ease infinite alternate';
        }
        
        if (dragData.isDragging && dragData.moved) {
            const currentTarget = dragData.targetIndex;
            if (currentTarget !== dragData.lastTargetIndex) {
                dragData.lastTargetIndex = currentTarget;
                this._actualizarOrdenTemporal(dragData.index, currentTarget);
            }
        }
    }

    /**
     * Obtiene el índice actual del gap
     * @returns {number}
     * @private
     */
    _obtenerIndiceGap() {
        if (!this._dragGap) return -1;
        const children = Array.from(this.panelesContainer.children);
        return children.indexOf(this._dragGap);
    }

    /**
     * Obtiene el índice visual de un panel
     * @param {HTMLElement} panel
     * @returns {number}
     * @private
     */
    _obtenerIndiceVisual(panel) {
        const children = Array.from(this.panelesContainer.children);
        return children.indexOf(panel);
    }

    /**
     * Mueve el gap a la posición indicada
     * @param {number} targetIndex - Índice de destino
     * @private
     */
    _moverGapA(targetIndex) {
        if (!this._dragGap) return;
        
        const children = Array.from(this.panelesContainer.children);
        const currentIndex = children.indexOf(this._dragGap);
        
        if (currentIndex === targetIndex) return;
        
        this._dragGap.remove();
        
        const panels = Array.from(this.panelesContainer.querySelectorAll('.panel-estrato'));
        
        if (targetIndex >= panels.length) {
            this.panelesContainer.appendChild(this._dragGap);
        } else {
            const targetPanel = panels[targetIndex];
            if (targetPanel) {
                this.panelesContainer.insertBefore(this._dragGap, targetPanel);
            } else {
                this.panelesContainer.appendChild(this._dragGap);
            }
        }
    }

    /**
     * Actualiza el orden temporalmente durante el drag
     * @param {number} oldIndex - Índice original
     * @param {number} newIndex - Nuevo índice
     * @private
     */
    _actualizarOrdenTemporal(oldIndex, newIndex) {
        if (oldIndex === newIndex) {
            if (this._dragData && this._dragData.originalOrder) {
                this.estratos.length = 0;
                this._dragData.originalOrder.forEach(e => this.estratos.push(e));
                this.dibujador.setEstratos(this.estratos);
                if (this.onCambio) {
                    this.onCambio();
                }
            }
            return;
        }
        
        let adjustedNewIndex = newIndex;
        if (newIndex > oldIndex) {
            adjustedNewIndex = newIndex - 1;
        }
        
        if (adjustedNewIndex === oldIndex) {
            if (this._dragData && this._dragData.originalOrder) {
                this.estratos.length = 0;
                this._dragData.originalOrder.forEach(e => this.estratos.push(e));
                this.dibujador.setEstratos(this.estratos);
                if (this.onCambio) {
                    this.onCambio();
                }
            }
            return;
        }
        
        if (adjustedNewIndex < 0) adjustedNewIndex = 0;
        if (adjustedNewIndex >= this.estratos.length) adjustedNewIndex = this.estratos.length - 1;
        
        const tempEstratos = [...this._dragData.originalOrder];
        const [moved] = tempEstratos.splice(oldIndex, 1);
        tempEstratos.splice(adjustedNewIndex, 0, moved);
        
        this.dibujador.setEstratos(tempEstratos);
        if (this.onCambio) {
            this.onCambio();
        }
    }

    /**
     * Finaliza el arrastre
     * @param {MouseEvent} e - Evento del mouse
     * @private
     */
    _finalizarDrag(e) {
        const dragData = this._dragData;
        if (!dragData) return;
        
        if (dragData.panel) {
            dragData.panel.style.opacity = '1';
            dragData.panel.style.transition = '';
        }
        
        if (this._dragOverlay) {
            this._dragOverlay.remove();
            this._dragOverlay = null;
        }
        
        this._eliminarEspacioIndicador();
        
        if (!dragData.moved) {
            if (dragData.panel) {
                dragData.panel.style.opacity = '1';
                dragData.panel.style.transition = '';
            }
            this._dragData = null;
            return;
        }
        
        if (dragData.isDragging && dragData.moved) {
            const oldIndex = dragData.index;
            let newIndex = dragData.targetIndex !== undefined ? dragData.targetIndex : oldIndex;
            
            let adjustedNewIndex = newIndex;
            if (newIndex > oldIndex) {
                adjustedNewIndex = newIndex - 1;
            }
            
            if (adjustedNewIndex < 0) adjustedNewIndex = 0;
            if (adjustedNewIndex >= this.estratos.length) adjustedNewIndex = this.estratos.length - 1;
            
            if (adjustedNewIndex === oldIndex) {
                this.estratos.length = 0;
                dragData.originalOrder.forEach(e => this.estratos.push(e));
                this.reconstruirPaneles();
                this._actualizarOrdenCanvas();
                this._dragData = null;
                return;
            }
            
            const [movedEstrato] = this.estratos.splice(oldIndex, 1);
            this.estratos.splice(adjustedNewIndex, 0, movedEstrato);
            
            this.reconstruirPaneles();
            this._actualizarOrdenCanvas();
        } else {
            if (dragData.originalOrder) {
                this.estratos.length = 0;
                dragData.originalOrder.forEach(e => this.estratos.push(e));
                this.reconstruirPaneles();
                this._actualizarOrdenCanvas();
            }
        }
        
        this._dragData = null;
    }

    /**
     * Actualiza el orden de los estratos en el canvas
     * @private
     */
    _actualizarOrdenCanvas() {
        this.dibujador.setEstratos(this.estratos);
        if (this.onCambio) {
            this.onCambio();
        }
    }

    _setupGlobalEventListeners() {
        // Click en encabezado para colapsar/expandir
        this.panelesContainer.addEventListener('click', (e) => {
            const encabezado = e.target.closest('.panel-encabezado');
            if (this._dragData && this._dragData.isDragging) return;
            
            if (encabezado && !e.target.closest('button')) {
                const panel = encabezado.closest('.panel-estrato');
                if (panel) {
                    const contenido = panel.querySelector('.panel-contenido');
                    const icono = panel.querySelector('.toggle-icon');
                    if (contenido) {
                        const isVisible = contenido.style.display === 'block';
                        contenido.style.display = isVisible ? 'none' : 'block';
                        if (icono) {
                            icono.innerHTML = isVisible ? 
                                '<i class="fas fa-chevron-down"></i>' : 
                                '<i class="fas fa-chevron-up"></i>';
                        }
                    }
                }
            }
        });

        // Evento CHANGE
        this.panelesContainer.addEventListener('change', (e) => {
            const target = e.target;
            const panel = target.closest('.panel-estrato');
            if (!panel) return;
            
            const index = parseInt(panel.dataset.index);
            if (isNaN(index) || index < 0 || index >= this.estratos.length) return;
            
            const estrato = this.estratos[index];
            
            if (target.classList.contains('select-borde-superior')) {
                estrato.tipoBordeSuperior = target.value;
                this._actualizarIndicadorBorde(panel, index, target.value);
                if (this.onCambio) this.onCambio();
                return;
            }
            
            if (target.classList.contains('input-alto')) {
                const valor = parseInt(target.value);
                if (!isNaN(valor) && valor > 0) {
                    estrato.alto = valor;
                    this._actualizarMetros(panel, estrato);
                    if (this.onCambio) this.onCambio();
                }
                return;
            }
            
            if (target.classList.contains('input-ancho')) {
                const valor = parseInt(target.value);
                if (!isNaN(valor) && valor >= 50) {
                    estrato.ancho = valor;
                    this._actualizarMetros(panel, estrato);
                    if (this.onCambio) this.onCambio();
                }
                return;
            }
        });

        // Evento INPUT
        this.panelesContainer.addEventListener('input', (e) => {
            const target = e.target;
            const panel = target.closest('.panel-estrato');
            if (!panel) return;
            
            const index = parseInt(panel.dataset.index);
            if (isNaN(index) || index < 0 || index >= this.estratos.length) return;
            
            const estrato = this.estratos[index];
            if (target.classList.contains('input-color')) {
    estrato.color = target.value;
    // ✅ Actualizar el borde derecho del panel
    const panel = target.closest('.panel-estrato');
    if (panel) {
        panel.style.borderRight = `4px solid ${estrato.color}`;
    }
    if (this.onCambio) this.onCambio();
    return;
}
            if (target.classList.contains('input-nombre')) {
                estrato.nombre = target.value.trim() || `Estrato ${index + 1}`;
                this._actualizarEncabezado(panel, estrato);
                if (this.onCambio) this.onCambio();
                return;
            }
            
            if (target.classList.contains('input-alto')) {
                const valor = parseInt(target.value);
                if (!isNaN(valor) && valor > 0) {
                    estrato.alto = valor;
                    this._actualizarMetros(panel, estrato);
                    if (this.onCambio) this.onCambio();
                }
                return;
            }
            
            if (target.classList.contains('input-ancho')) {
                const valor = parseInt(target.value);
                if (!isNaN(valor) && valor >= 50) {
                    estrato.ancho = valor;
                    this._actualizarMetros(panel, estrato);
                    if (this.onCambio) this.onCambio();
                }
                return;
            }
            
            if (target.classList.contains('input-tamano')) {
                const valor = parseInt(target.value);
                if (!isNaN(valor) && valor >= 10) {
                    estrato.tamanoTrama = valor;
                    if (this.onCambio) this.onCambio();
                }
                return;
            }
            
            if (target.classList.contains('input-color')) {
                estrato.color = target.value;
                if (this.onCambio) this.onCambio();
                return;
            }
        });

        // Botones de acción
        this.panelesContainer.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.closest('.btn-eliminar-simbolo')) {
                const btn = target.closest('.btn-eliminar-simbolo');
                const panel = btn.closest('.panel-estrato');
                if (panel) {
                    const index = parseInt(panel.dataset.index);
                    const simboloIndex = parseInt(btn.dataset.index);
                    if (!isNaN(index) && index >= 0 && index < this.estratos.length) {
                        this.estratos[index].eliminarSimbolo(simboloIndex);
                        this._renderizarSimbolos(panel, this.estratos[index]);
                        if (this.onCambio) this.onCambio();
                    }
                }
                return;
            }
            
            if (target.closest('.btn-agregar-simbolo-derecha')) {
                const btn = target.closest('.btn-agregar-simbolo-derecha');
                const panel = btn.closest('.panel-estrato');
                if (panel) {
                    const index = parseInt(panel.dataset.index);
                    const select = panel.querySelector('.select-simbolo-derecha');
                    if (!isNaN(index) && index >= 0 && index < this.estratos.length && select) {
                        const tipo = select.value;
                        if (tipo && tipo !== 'ninguno') {
                            this.estratos[index].agregarSimbolo(tipo, 0.5, 0.5, 'exterior');
                            this._renderizarSimbolos(panel, this.estratos[index]);
                            if (this.onCambio) this.onCambio();
                            select.selectedIndex = 0;
                        }
                    }
                }
                return;
            }
            
            if (target.closest('.btn-eliminar')) {
                const btn = target.closest('.btn-eliminar');
                const panel = btn.closest('.panel-estrato');
                if (panel) {
                    const index = parseInt(panel.dataset.index);
                    if (!isNaN(index) && index >= 0 && index < this.estratos.length) {
                        const nombre = this.estratos[index].nombre || `Estrato ${index + 1}`;
                        if (confirm(`¿Eliminar el estrato "${nombre}"?`)) {
                            this.estratos.splice(index, 1);
                            this.reconstruirPaneles();
                            if (this.onCambio) this.onCambio();
                        }
                    }
                }
                return;
            }
            
            if (target.closest('.btn-mover-arriba')) {
                const btn = target.closest('.btn-mover-arriba');
                const panel = btn.closest('.panel-estrato');
                if (panel) {
                    const index = parseInt(panel.dataset.index);
                    if (!isNaN(index) && index > 0 && index < this.estratos.length) {
                        [this.estratos[index], this.estratos[index - 1]] = 
                        [this.estratos[index - 1], this.estratos[index]];
                        this.reconstruirPaneles();
                        if (this.onCambio) this.onCambio();
                    }
                }
                return;
            }
            
            if (target.closest('.btn-mover-abajo')) {
                const btn = target.closest('.btn-mover-abajo');
                const panel = btn.closest('.panel-estrato');
                if (panel) {
                    const index = parseInt(panel.dataset.index);
                    if (!isNaN(index) && index >= 0 && index < this.estratos.length - 1) {
                        [this.estratos[index], this.estratos[index + 1]] = 
                        [this.estratos[index + 1], this.estratos[index]];
                        this.reconstruirPaneles();
                        if (this.onCambio) this.onCambio();
                    }
                }
                return;
            }
        });
    }

    _setupPanelResize() {
        const panelsContainer = this.panelesContainer;
        if (!panelsContainer) return;
        
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'panel-resize-handle';
        
        const container = panelsContainer.parentElement;
        container.style.position = 'relative';
        container.appendChild(resizeHandle);
        
        let isResizing = false;
        let startX = 0;
        let startWidth = 0;
        
        resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startWidth = panelsContainer.offsetWidth;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            const delta = e.clientX - startX;
            const newWidth = Math.max(200, Math.min(500, startWidth + delta));
            panelsContainer.style.width = newWidth + 'px';
            panelsContainer.style.minWidth = newWidth + 'px';
            if (this.onCambio) this.onCambio();
        });
        
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
            }
        });
    }

    // En UI.js - Método crearPanelEstrato

crearPanelEstrato(index) {
    const estrato = this.estratos[index];
    const panel = document.createElement('div');
    panel.className = 'panel-estrato';
    panel.dataset.index = index;
    
    // ✅ Establecer el borde derecho con el color del estrato
    panel.style.borderRight = `4px solid ${estrato.color}`;
    
    panel.innerHTML = this._generarHTMLPanel(index, estrato);
    this.panelesContainer.appendChild(panel);
    
    this._actualizarEncabezado(panel, estrato);
    this._actualizarMetros(panel, estrato);
    this._actualizarIndicadorBorde(panel, index, estrato.tipoBordeSuperior);
    
    this._asignarEventosPanel(panel, index, estrato);
    
    return panel;
}

    _asignarEventosPanel(panel, index, estrato) {
        const selectSimbolo = panel.querySelector('.select-simbolo-derecha');
        if (selectSimbolo) {
            selectSimbolo.selectedIndex = 0;
        }

        const inputBuscar = panel.querySelector('.input-buscar-trama');
        const hiddenInput = panel.querySelector('.select-trama-hidden');
        
        if (inputBuscar) {
            inputBuscar.addEventListener('input', () => {
                const valor = inputBuscar.value;
                if (!valor.trim()) {
                    this._mostrarTodasLasTramas(panel, estrato);
                } else {
                    this._buscarTramas(valor, panel, estrato);
                }
            });

            inputBuscar.addEventListener('blur', () => {
                setTimeout(() => {
                    const resultados = panel.querySelector('.resultados-busqueda-trama');
                    const mensaje = panel.querySelector('.mensaje-busqueda');
                    if (resultados) resultados.style.display = 'none';
                    if (mensaje) mensaje.style.display = 'none';
                    
                    if (hiddenInput) {
                        const tramaActual = hiddenInput.value;
                        const nombreTrama = TRADUCCIONES_TRAMA[tramaActual] || tramaActual;
                        inputBuscar.value = nombreTrama;
                    }
                }, 200);
            });

            inputBuscar.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    inputBuscar.value = '';
                    const resultados = panel.querySelector('.resultados-busqueda-trama');
                    const mensaje = panel.querySelector('.mensaje-busqueda');
                    if (resultados) resultados.style.display = 'none';
                    if (mensaje) mensaje.style.display = 'none';
                    
                    if (hiddenInput) {
                        const tramaActual = hiddenInput.value;
                        const nombreTrama = TRADUCCIONES_TRAMA[tramaActual] || tramaActual;
                        inputBuscar.value = nombreTrama;
                    }
                }
            });

            inputBuscar.addEventListener('focus', () => {
                this._mostrarTodasLasTramas(panel, estrato);
            });
        }

        const listaSimbolos = panel.querySelector('.lista-simbolos-derecha');
        if (listaSimbolos) {
            listaSimbolos.addEventListener('input', (e) => {
                const target = e.target;
                if (target.classList.contains('simbolo-tamano')) {
                    const simboloIndex = parseInt(target.dataset.index);
                    const nuevoTamano = parseInt(target.value);
                    const valorSpan = target.closest('.simbolo-item').querySelector('.simbolo-tamano-valor');
                    if (valorSpan) {
                        valorSpan.textContent = nuevoTamano;
                    }
                    
                    const estratoActual = this.estratos[index];
                    if (estratoActual && !isNaN(simboloIndex)) {
                        estratoActual.cambiarTamanoSimbolo(simboloIndex, nuevoTamano);
                        if (this.onCambio) this.onCambio();
                    }
                }
            });
        }
    }

    _crearItemTrama(clave, nombre, panel, estrato) {
        const item = document.createElement('div');
        item.className = 'opcion-trama';
        item.style.cssText = `
            padding: 8px 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid #f0f0f0;
            transition: background 0.2s;
        `;
        
        const miniatura = document.createElement('div');
        miniatura.style.cssText = `
            width: 40px;
            height: 40px;
            border: 1px solid #ddd;
            border-radius: 4px;
            flex-shrink: 0;
            overflow: hidden;
            background: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        if (clave !== 'solido') {
            const tramaCanvas = document.createElement('canvas');
            tramaCanvas.width = 40;
            tramaCanvas.height = 40;
            const tramaCtx = tramaCanvas.getContext('2d');
            
            const pattern = this.tramasManager.crearTrama(clave, '#333333', 75);
            if (pattern) {
                tramaCtx.fillStyle = pattern;
                tramaCtx.fillRect(0, 0, 40, 40);
            } else {
                tramaCtx.fillStyle = '#cccccc';
                tramaCtx.fillRect(0, 0, 40, 40);
                tramaCtx.fillStyle = '#999';
                tramaCtx.font = '12px Arial';
                tramaCtx.textAlign = 'center';
                tramaCtx.textBaseline = 'middle';
                tramaCtx.fillText('?', 20, 20);
            }
            
            tramaCtx.strokeStyle = '#ccc';
            tramaCtx.lineWidth = 1;
            tramaCtx.strokeRect(0, 0, 40, 40);
            
            miniatura.appendChild(tramaCanvas);
        } else {
            miniatura.style.background = '#cccccc';
            const label = document.createElement('span');
            label.textContent = '■';
            label.style.cssText = 'color: #999; font-size: 20px;';
            miniatura.appendChild(label);
        }
        
        const texto = document.createElement('span');
        texto.textContent = nombre;
        texto.style.cssText = `
            flex: 1;
            font-size: 13px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        `;
        
        item.appendChild(miniatura);
        item.appendChild(texto);
        
        item.addEventListener('mouseenter', () => {
            item.style.background = '#e3f2fd';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
        });
        
        item.addEventListener('click', () => {
            const inputBuscar = panel.querySelector('.input-buscar-trama');
            const hiddenInput = panel.querySelector('.select-trama-hidden');
            
            if (inputBuscar) {
                inputBuscar.value = nombre;
            }
            if (hiddenInput) {
                hiddenInput.value = clave;
            }
            
            const resultadosDiv = panel.querySelector('.resultados-busqueda-trama');
            if (resultadosDiv) {
                resultadosDiv.style.display = 'none';
            }
            
            estrato.trama = clave;
            if (this.onCambio) this.onCambio();
        });
        
        return item;
    }

    _mostrarTodasLasTramas(panel, estrato) {
        const resultadosDiv = panel.querySelector('.resultados-busqueda-trama');
        const mensajeDiv = panel.querySelector('.mensaje-busqueda');
        
        if (!resultadosDiv) return;
        
        resultadosDiv.innerHTML = '';
        resultadosDiv.style.display = 'block';
        mensajeDiv.style.display = 'none';
        
        for (const [clave, nombre] of Object.entries(TRADUCCIONES_TRAMA)) {
            const item = this._crearItemTrama(clave, nombre, panel, estrato);
            resultadosDiv.appendChild(item);
        }
    }

    _buscarTramas(termino, panel, estrato) {
        if (this._timeoutBusqueda) {
            clearTimeout(this._timeoutBusqueda);
        }

        const resultadosDiv = panel.querySelector('.resultados-busqueda-trama');
        const mensajeDiv = panel.querySelector('.mensaje-busqueda');

        if (!termino.trim()) {
            resultadosDiv.style.display = 'none';
            mensajeDiv.style.display = 'none';
            return;
        }

        this._timeoutBusqueda = setTimeout(() => {
            const terminoNormalizado = termino.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const resultados = [];

            for (const [clave, nombre] of Object.entries(TRADUCCIONES_TRAMA)) {
                const nombreNormalizado = nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                if (nombreNormalizado.includes(terminoNormalizado) || 
                    clave.toLowerCase().includes(terminoNormalizado)) {
                    resultados.push({ clave, nombre });
                }
            }

            resultadosDiv.innerHTML = '';
            if (resultados.length > 0) {
                resultadosDiv.style.display = 'block';
                mensajeDiv.style.display = 'none';

                resultados.forEach(resultado => {
                    const item = this._crearItemTrama(resultado.clave, resultado.nombre, panel, estrato);
                    resultadosDiv.appendChild(item);
                });
            } else {
                resultadosDiv.style.display = 'none';
                mensajeDiv.textContent = `No se encontraron tramas para "${termino}"`;
                mensajeDiv.style.display = 'block';
            }
        }, 300);
    }

    _generarHTMLPanel(index, estrato) {
        const opcionesTramas = this._generarOpcionesTramas(estrato.trama);
        const opcionesBordes = this._generarOpcionesBordes(estrato.tipoBordeSuperior);
        const opcionesSimbolos = this._generarOpcionesSimbolos();
        const simbolosHTML = this._generarHTMLSimbolos(estrato);

        const pxPorM = this.dibujador.config.PIXELES_POR_METRO;
        const altoMetros = (estrato.alto / pxPorM).toFixed(2);
        const anchoMetros = (estrato.ancho / pxPorM).toFixed(2);
        
        const nombreTramaActual = TRADUCCIONES_TRAMA[estrato.trama] || estrato.trama;

        return `
            <div class="panel-encabezado">
                <div>
                    <button class="btn-mover-arriba" data-index="${index}">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button class="btn-mover-abajo" data-index="${index}">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <strong>${estrato.nombre || 'Estrato sin nombre'}</strong>
                </div>
                <span class="toggle-icon"><i class="fas fa-chevron-down"></i></span>
            </div>
            <div class="panel-contenido" style="display: none;">
                <label>Nombre:</label>
                <input type="text" class="input-nombre" value="${estrato.nombre || ''}" placeholder="Nombre del estrato">
                
                <div style="display: flex; gap: 10px; margin-top: 8px;">
                    <div style="flex: 1;">
                        <label>Espesor (px):</label>
                        <input type="number" class="input-alto" value="${estrato.alto}" min="10" step="1">
                        <span class="valor-metros-alto">= ${altoMetros} m</span>
                    </div>
                    <div style="flex: 1;">
                        <label>Ancho (px):</label>
                        <input type="number" class="input-ancho" value="${estrato.ancho}" min="50" step="10">
                        <span class="valor-metros-ancho">= ${anchoMetros} m</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 8px;">
                    <div style="flex: 1;">
                        <label>Color:</label>
                        <input type="color" class="input-color" value="${estrato.color}">
                    </div>
                    <div style="flex: 1;">
                        <label>Tamaño trama:</label>
                        <input type="number" class="input-tamano" value="${estrato.tamanoTrama}" min="10" max="500">
                    </div>
                </div>

                <div class="buscador-trama-container" style="margin-top: 10px;">
                    <label><i class="fas fa-search"></i> Buscar trama:</label>
                    <div style="position: relative;">
                        <input type="text" class="input-buscar-trama" 
                               value="${nombreTramaActual}" 
                               placeholder="Escriba para buscar una trama..."
                               autocomplete="off"
                               style="width: 100%; padding: 8px 10px; border: 1px solid #4CAF50; border-radius: 4px; font-size: 13px;">
                        <div class="mensaje-busqueda" style="display: none; color: #ff0000; margin-top: 3px; padding: 5px;"></div>
                        <div class="resultados-busqueda-trama" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ddd; border-radius: 4px; max-height: 250px; overflow-y: auto; z-index: 1000; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin-top: 2px;"></div>
                    </div>
                    <input type="hidden" class="select-trama-hidden" value="${estrato.trama}">
                </div>

                <div style="margin-top: 8px;">
                    <label>Tipo borde inferior:</label>
                    <select class="select-borde-superior" id="select-borde-${index}">
                        ${opcionesBordes}
                    </select>
                </div>

                <div class="contenedor-simbolos-derecha">
                    <h4><i class="fas fa-fossil"></i> Fósiles</h4>
                    <div class="lista-simbolos-derecha">
                        ${simbolosHTML}
                    </div>
                    <div style="display: flex; gap: 5px;">
                        <select class="select-simbolo-derecha" style="flex: 1;">
                            ${opcionesSimbolos}
                        </select>
                        <button class="btn-agregar-simbolo-derecha btn-primary">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>

                <button class="btn-eliminar" data-index="${index}">
                    <i class="fas fa-trash"></i> Eliminar estrato
                </button>
            </div>
        `;
    }

    _generarOpcionesTramas(seleccionado) {
        let html = '';
        for (const [clave, nombre] of Object.entries(TRADUCCIONES_TRAMA)) {
            const selected = clave === seleccionado ? 'selected' : '';
            html += `<option value="${clave}" ${selected}>${nombre}</option>`;
        }
        return html;
    }

    _generarOpcionesBordes(seleccionado) {
        const bordes = [
            'recto', 'inf_transparente', 'sup_transparente', 
            'sup_inf_transparente', 'sup_inf_der_transparente',
            'segmentado', 'ondulado', 'ondulado_inf_trans',
            'ondulado_sup_trans', 'ondulado_inf_sup_trans',
            'discontinuo', 'canal', 'canal2', 'vacio_1', 'vacio_2'
        ];
        
        const nombres = {
            'recto': 'Recto',
            'inf_transparente': 'Recto con base transparente',
            'sup_transparente': 'Recto con techo transparente',
            'sup_inf_transparente': 'Recto con base y techo transparente',
            'sup_inf_der_transparente': 'Recto con todos los bordes transparentes',
            'segmentado': 'Segmentado',
            'ondulado': 'Ondulado',
            'ondulado_inf_trans': 'Ondulado con base transparente',
            'ondulado_sup_trans': 'Ondulado con techo transparente',
            'ondulado_inf_sup_trans': 'Ondulado con base y techo transparente',
            'discontinuo': 'Discontinuo',
            'canal': 'Canal',
            'canal2': 'Canal 2',
            'vacio_1': 'Vacío, hiato o no visible (1)',
            'vacio_2': 'Vacío, hiato o no visible (2)'
        };

        let html = '';
        for (const borde of bordes) {
            const selected = borde === seleccionado ? 'selected' : '';
            html += `<option value="${borde}" ${selected}>${nombres[borde] || borde}</option>`;
        }
        return html;
    }

    _generarOpcionesSimbolos() {
        let html = '';
        html += `<option value="ninguno">-- Seleccionar fósil --</option>`;
        
        for (const [clave, nombre] of Object.entries(TRADUCCIONES_SIMBOLOS)) {
            html += `<option value="${clave}">${nombre}</option>`;
        }
        return html;
    }

    _generarHTMLSimbolos(estrato) {
        if (!estrato.simbolosDerecha?.length) {
            return `<div style="color: #999; font-size: 12px; padding: 4px 0;">Sin fósiles agregados</div>`;
        }
        
        let html = '';
        estrato.simbolosDerecha.forEach((simbolo, idx) => {
            const nombre = TRADUCCIONES_SIMBOLOS[simbolo.tipo] || simbolo.tipo;
            const posX = Math.max(0, Math.min(100, Math.round((simbolo.proporcionX || 0.5) * 100)));
            const posY = Math.max(0, Math.min(100, Math.round((simbolo.proporcionY || 0.5) * 100)));
            const ubicacion = simbolo.posicion === 'interior' ? 'Interior' : 'Derecha';
            const tamano = simbolo.tamano || 20;
            
            html += `
                <div class="simbolo-item" data-index="${idx}" style="flex-wrap: wrap; gap: 4px;">
                    <span style="flex: 1; min-width: 120px;">${nombre} (${ubicacion}: X${posX}%, Y${posY}%)</span>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <label style="font-size: 11px; color: #666;">Tamaño:</label>
                        <input type="range" class="simbolo-tamano" data-index="${idx}" 
                               min="8" max="50" value="${tamano}" 
                               style="width: 60px; margin: 0; padding: 0;">
                        <span class="simbolo-tamano-valor" style="font-size: 11px; color: #666; min-width: 20px;">${tamano}</span>
                    </div>
                    <button class="btn-eliminar-simbolo" data-index="${idx}" 
                            style="background: none; border: none; color: #e74c3c; cursor: pointer; padding: 0 4px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
        return html;
    }

    _actualizarEncabezado(panel, estrato) {
        const strong = panel.querySelector('.panel-encabezado strong');
        if (strong) {
            strong.textContent = estrato.nombre || 'Estrato sin nombre';
        }
    }

    _actualizarMetros(panel, estrato) {
        const pxPorM = this.dibujador.config.PIXELES_POR_METRO;
        const metrosAlto = panel.querySelector('.valor-metros-alto');
        const metrosAncho = panel.querySelector('.valor-metros-ancho');
        const inputAlto = panel.querySelector('.input-alto');
        const inputAncho = panel.querySelector('.input-ancho');
        
        if (metrosAlto && inputAlto) {
            const altoMetros = (parseInt(inputAlto.value) || 100) / pxPorM;
            metrosAlto.textContent = `= ${altoMetros.toFixed(2)} m`;
        }
        
        if (metrosAncho && inputAncho) {
            const anchoMetros = (parseInt(inputAncho.value) || 300) / pxPorM;
            metrosAncho.textContent = `= ${anchoMetros.toFixed(2)} m`;
        }
    }

    _actualizarIndicadorBorde(panel, index, borde) {
        const bordeActual = panel.querySelector(`#borde-actual-${index}`);
        if (bordeActual) {
            bordeActual.textContent = borde;
        }
        const select = panel.querySelector('.select-borde-superior');
        if (select) {
            select.value = borde;
        }
    }

    _renderizarSimbolos(panel, estrato) {
        const lista = panel.querySelector('.lista-simbolos-derecha');
        lista.innerHTML = this._generarHTMLSimbolos(estrato);
    }

    reconstruirPaneles() {
        this.panelesContainer.innerHTML = '';
        
        // ✅ SIN inversión visual - recorrer en el orden del array
        for (let i = 0; i < this.estratos.length; i++) {
            this.crearPanelEstrato(i);
        }
        
        this._actualizarIndicesPaneles();
        this._actualizarOrdenCanvas();
    }

    _actualizarIndicesPaneles() {
        document.querySelectorAll('.panel-estrato').forEach((panel, index) => {
            panel.dataset.index = index;
            
            const botones = panel.querySelectorAll('[data-index]');
            botones.forEach(btn => {
                btn.dataset.index = index;
            });
            
            const selectBorde = panel.querySelector('.select-borde-superior');
            if (selectBorde) {
                selectBorde.id = `select-borde-${index}`;
            }
            
            const bordeActual = panel.querySelector('[id^="borde-actual-"]');
            if (bordeActual) {
                bordeActual.id = `borde-actual-${index}`;
            }
            
            if (index >= 0 && index < this.estratos.length) {
                const estrato = this.estratos[index];
                
                const inputNombre = panel.querySelector('.input-nombre');
                if (inputNombre) {
                    inputNombre.value = estrato.nombre || `Estrato ${index + 1}`;
                }
                
                this._actualizarEncabezado(panel, estrato);
                this._actualizarMetros(panel, estrato);
                this._actualizarIndicadorBorde(panel, index, estrato.tipoBordeSuperior);
            }
        });
    }

    actualizarControlesEscala(config) {
        const pxPorM = document.getElementById('pixelesPorMetro');
        const separacion = document.getElementById('separacionMinima');
        const desplazamiento = document.getElementById('desplazamientoEscalaHorizontal');
        const invertir = document.getElementById('invertirEscala');
        const guias = document.getElementById('toggleGuias');

        if (pxPorM) pxPorM.value = config.PIXELES_POR_METRO;
        if (separacion) separacion.value = config.SEPARACION_MINIMA_ETIQUETAS;
        if (desplazamiento) desplazamiento.value = config.DESPLAZAMIENTO_ESCALA_HORIZONTAL;
        if (invertir) invertir.checked = config.INVERTIR_ESCALA;
        if (guias) guias.checked = config.MOSTRAR_GUIAS_VERTICALES;
    }
}