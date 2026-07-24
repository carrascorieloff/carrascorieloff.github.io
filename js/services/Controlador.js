import { CONFIG } from '../config.js';

/**
 * Controlador de eventos del canvas
 */
export class Controlador {
    /**
     * @param {Dibujador} dibujador
     * @param {Estrato[]} estratos
     */
    constructor(dibujador, estratos) {
        this.dibujador = dibujador;
        this.estratos = estratos;
        this.estratoArrastrando = null;
        this.simboloArrastrando = null;
        this._mouseDown = false;
        
        this.initEventListeners();
    }

    /**
     * Inicializa los event listeners
     */
    initEventListeners() {
        const canvas = this.dibujador.canvas;
        
        canvas.addEventListener('mousedown', (e) => this._onMouseDown(e));
        canvas.addEventListener('mousemove', (e) => this._onMouseMove(e));
        canvas.addEventListener('mouseup', (e) => this._onMouseUp(e));
        canvas.addEventListener('mouseleave', (e) => this._onMouseUp(e));
        
        // Touch events para dispositivos móviles
        canvas.addEventListener('touchstart', (e) => this._onTouchStart(e), { passive: false });
        canvas.addEventListener('touchmove', (e) => this._onTouchMove(e), { passive: false });
        canvas.addEventListener('touchend', (e) => this._onTouchEnd(e), { passive: false });
    }

    /**
     * Obtiene las coordenadas del mouse
     * @param {MouseEvent} e
     * @returns {{x: number, y: number}}
     * @private
     */
    _getMouseCoords(e) {
        const rect = this.dibujador.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    /**
     * Obtiene las coordenadas del touch
     * @param {TouchEvent} e
     * @returns {{x: number, y: number}}
     * @private
     */
    _getTouchCoords(e) {
        const rect = this.dibujador.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
    }

    /**
     * Evento mousedown
     * @param {MouseEvent} e
     * @private
     */
    _onMouseDown(e) {
        this._mouseDown = true;
        const coords = this._getMouseCoords(e);
        this._handlePointerDown(coords.x, coords.y);
    }

    /**
     * Evento touchstart
     * @param {TouchEvent} e
     * @private
     */
    _onTouchStart(e) {
        e.preventDefault();
        const coords = this._getTouchCoords(e);
        this._handlePointerDown(coords.x, coords.y);
    }

    /**
     * Maneja el inicio de interacción
     * @param {number} mouseX
     * @param {number} mouseY
     * @private
     */
    _handlePointerDown(mouseX, mouseY) {
        // Buscar punto de control clickeado
        for (let i = 0; i < this.estratos.length; i++) {
            const estrato = this.estratos[i];
            
            // Punto de control derecho
            const dx = mouseX - estrato.puntoControl.x;
            const dy = mouseY - estrato.puntoControl.y;
            if (Math.hypot(dx, dy) < 12) {
                estrato.puntoControl.arrastrando = true;
                this.estratoArrastrando = { estratoIndex: i, tipo: 'derecho' };
                this.dibujador.dibujar();
                return;
            }

            // Punto de control superior
            const dxSup = mouseX - estrato.puntoControlSuperior.x;
            const dySup = mouseY - estrato.puntoControlSuperior.y;
            if (Math.hypot(dxSup, dySup) < 10) {
                estrato.puntoControlSuperior.arrastrando = true;
                this.estratoArrastrando = { estratoIndex: i, tipo: 'superior' };
                this.dibujador.dibujar();
                return;
            }

            // Símbolos
            const simbolo = this._encontrarSimbolo(mouseX, mouseY, estrato, i);
            if (simbolo) {
                this.simboloArrastrando = simbolo;
                return;
            }
        }
    }

 /**
 * Busca si se hizo clic en un símbolo
 * @param {number} mouseX
 * @param {number} mouseY
 * @param {Estrato} estrato
 * @param {number} estratoIndex
 * @returns {Object|null}
 * @private
 */
_encontrarSimbolo(mouseX, mouseY, estrato, estratoIndex) {
    const IZQUIERDA_X = this.dibujador.config.IZQUIERDA_X;
    const offsetDerecha = 30;
    const rangoMovimientoX = 80;

    for (let s = 0; s < estrato.simbolosDerecha.length; s++) {
        const sim = estrato.simbolosDerecha[s];
        let x, y;
        
        // ✅ Usar el tamaño individual para la detección
        const size = (sim.tamano || 20) * 1.5; // Área de detección más grande que el dibujo
        
        if (sim.posicion === 'interior') {
            const desplazamientoX = Math.max(0, Math.min(1, sim.proporcionX || 0.5)) * estrato.ancho;
            x = IZQUIERDA_X + desplazamientoX;
            y = estrato.topY + Math.max(0, Math.min(1, sim.proporcionY || 0.5)) * estrato.alto;
        } else {
            const desplazamientoX = Math.max(0, Math.min(1, sim.proporcionX || 0.5)) * rangoMovimientoX;
            x = IZQUIERDA_X + estrato.ancho + offsetDerecha + desplazamientoX;
            y = estrato.topY + Math.max(0, Math.min(1, sim.proporcionY || 0.5)) * estrato.alto;
        }
        
        if (Math.hypot(mouseX - x, mouseY - y) < size) {
            return { estratoIndex, simboloIndex: s };
        }
    }
    return null;
}

    /**
     * Evento mousemove
     * @param {MouseEvent} e
     * @private
     */
    _onMouseMove(e) {
        if (!this._mouseDown) return;
        const coords = this._getMouseCoords(e);
        this._handlePointerMove(coords.x, coords.y);
    }

    /**
     * Evento touchmove
     * @param {TouchEvent} e
     * @private
     */
    _onTouchMove(e) {
        e.preventDefault();
        const coords = this._getTouchCoords(e);
        this._handlePointerMove(coords.x, coords.y);
    }

    /**
     * Maneja el movimiento del puntero
     * @param {number} mouseX
     * @param {number} mouseY
     * @private
     */
    _handlePointerMove(mouseX, mouseY) {
        let necesitaRedibujo = false;

        // Arrastre de puntos de control
        if (this.estratoArrastrando) {
            const estrato = this.estratos[this.estratoArrastrando.estratoIndex];
            const IZQUIERDA_X = this.dibujador.config.IZQUIERDA_X;

            if (this.estratoArrastrando.tipo === 'derecho') {
                const proporcionY = (mouseY - estrato.topY) / estrato.alto;
                estrato.puntoControl.proporcionY = Math.max(0, Math.min(1, proporcionY));
                estrato.puntoControl.y = estrato.topY + estrato.puntoControl.proporcionY * estrato.alto;
                estrato.puntoControl.x = Math.min(IZQUIERDA_X + estrato.ancho * 2, Math.max(IZQUIERDA_X + 10, mouseX));
                estrato.puntoControl.proporcionX = (estrato.puntoControl.x - IZQUIERDA_X) / estrato.ancho;
                estrato.puntoControl.posicionManual = true;
                necesitaRedibujo = true;
            } else {
                const newX = Math.min(IZQUIERDA_X + estrato.ancho * 2, Math.max(IZQUIERDA_X + 10, mouseX));
                estrato.puntoControlSuperior.x = newX;
                estrato.puntoControlSuperior.proporcionX = (newX - IZQUIERDA_X) / estrato.ancho;
                estrato.puntoControlSuperior.posicionManual = true;
                necesitaRedibujo = true;
            }
        }

    // En _handlePointerMove, reemplaza la parte del arrastre de símbolos:

// Arrastre de símbolos
if (this.simboloArrastrando) {
    const estrato = this.estratos[this.simboloArrastrando.estratoIndex];
    const simbolo = estrato.simbolosDerecha[this.simboloArrastrando.simboloIndex];
    if (simbolo) {
        const IZQUIERDA_X = this.dibujador.config.IZQUIERDA_X;
        const offsetDerecha = 30;
        const rangoMovimientoX = 80;
        const anchoEstrato = estrato.ancho;
        
        // ✅ Determinar si el mouse está dentro del estrato o en la zona derecha
        const limiteDerechoEstrato = IZQUIERDA_X + anchoEstrato;
        const zonaDerechaInicio = limiteDerechoEstrato + offsetDerecha;
        const zonaDerechaFin = zonaDerechaInicio + rangoMovimientoX;
        
        let nuevaX, nuevaY;
        
        // ✅ Calcular posición Y (siempre dentro del estrato verticalmente)
        nuevaY = (mouseY - estrato.topY) / estrato.alto;
        nuevaY = Math.max(0, Math.min(1, nuevaY));
        
        // ✅ Determinar si está dentro del estrato o en la zona derecha
        if (mouseX >= IZQUIERDA_X && mouseX <= limiteDerechoEstrato) {
            // ✅ Dentro del estrato
            simbolo.posicion = 'interior';
            nuevaX = (mouseX - IZQUIERDA_X) / anchoEstrato;
            nuevaX = Math.max(0, Math.min(1, nuevaX));
        } else if (mouseX >= zonaDerechaInicio && mouseX <= zonaDerechaFin) {
            // ✅ En la zona derecha
            simbolo.posicion = 'exterior';
            nuevaX = (mouseX - zonaDerechaInicio) / rangoMovimientoX;
            nuevaX = Math.max(0, Math.min(1, nuevaX));
        } else {
            // ✅ Si está fuera de ambas zonas, mantener la posición actual
            // pero permitir mover verticalmente
            if (simbolo.posicion === 'interior') {
                nuevaX = simbolo.proporcionX || 0.5;
            } else {
                nuevaX = simbolo.proporcionX || 0.5;
            }
        }
        
        // ✅ Actualizar las posiciones del símbolo
        simbolo.proporcionY = nuevaY;
        simbolo.proporcionX = nuevaX;
        
        necesitaRedibujo = true;
    }
}

        if (necesitaRedibujo) {
            this.dibujador.dibujar();
        }
    }

    /**
     * Evento mouseup / mouseleave
     * @param {MouseEvent} e
     * @private
     */
    _onMouseUp(e) {
        this._mouseDown = false;
        this._handlePointerUp();
    }

    /**
     * Evento touchend
     * @param {TouchEvent} e
     * @private
     */
    _onTouchEnd(e) {
        this._handlePointerUp();
    }

    /**
     * Maneja el fin de la interacción
     * @private
     */
    _handlePointerUp() {
        if (this.estratoArrastrando) {
            const estrato = this.estratos[this.estratoArrastrando.estratoIndex];
            if (this.estratoArrastrando.tipo === 'derecho') {
                estrato.puntoControl.arrastrando = false;
            } else {
                estrato.puntoControlSuperior.arrastrando = false;
            }
            this.estratoArrastrando = null;
            this.dibujador.dibujar();
        }

        if (this.simboloArrastrando) {
            this.simboloArrastrando = null;
            this.dibujador.dibujar();
        }
    }

    /**
     * Actualiza la lista de estratos
     * @param {Estrato[]} estratos
     */
    actualizarEstratos(estratos) {
        this.estratos = estratos;
    }
}