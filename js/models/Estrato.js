import { CONFIG } from '../config.js';

/**
 * Clase Estrato - Representa una capa estratigráfica
 */
export class Estrato {
    /**
     * @param {Object} data - Datos del estrato
     */
    constructor(data = {}) {
        this.id = data.id || Date.now() + Math.random();
        this.alto = data.alto || CONFIG.ESTRATO_ALTO_DEFAULT;
        this.ancho = data.ancho || CONFIG.ESTRATO_ANCHO_DEFAULT;
        this.color = data.color || CONFIG.ESTRATO_COLOR_DEFAULT;
        this.trama = data.trama || CONFIG.ESTRATO_TRAMA_DEFAULT;
        this.tamanoTrama = data.tamanoTrama || CONFIG.ESTRATO_TAMANO_TRAMA_DEFAULT;
        this.simbolosDerecha = data.simbolosDerecha || [];
        this.tipoBordeSuperior = data.tipoBordeSuperior || CONFIG.ESTRATO_TIPO_BORDE_DEFAULT;
        this.nombre = data.nombre || 'Estrato';
        this.topY = 0;
        this.bottomY = 0;
        
        // ✅ Referencia a unidad geológica
        this.unidadId = data.unidadId || null;
        
        // Punto de control derecho
        this.puntoControl = {
            x: CONFIG.IZQUIERDA_X + this.ancho,
            y: 0,
            arrastrando: false,
            posicionManual: false,
            proporcionX: 1.0,
            proporcionY: 0.5,
            ...data.puntoControl
        };

        // Punto de control superior
        this.puntoControlSuperior = {
            x: CONFIG.IZQUIERDA_X + this.ancho,
            y: 0,
            arrastrando: false,
            posicionManual: false,
            proporcionX: 1.0,
            ...data.puntoControlSuperior
        };
    }

    /**
     * Calcula las posiciones Y del estrato
     * @param {number} yActual - Posición Y actual
     * @returns {number} Nueva posición Y
     */
    calcularPosiciones(yActual) {
        this.bottomY = yActual;
        this.topY = yActual - this.alto;
        
        this._actualizarPuntoControl(yActual);
        this._actualizarPuntoControlSuperior(yActual);
        
        return this.topY;
    }

    /**
     * Actualiza la posición del punto de control derecho
     * @param {number} yActual - Posición Y actual
     * @private
     */
    _actualizarPuntoControl(yActual) {
        if (!this.puntoControl.posicionManual) {
            this.puntoControl.y = (this.topY + this.bottomY) / 2;
            this.puntoControl.x = CONFIG.IZQUIERDA_X + this.ancho;
        } else {
            this.puntoControl.y = this.topY + this.puntoControl.proporcionY * this.alto;
            this.puntoControl.x = CONFIG.IZQUIERDA_X + this.ancho * this.puntoControl.proporcionX;
        }
    }

    /**
     * Actualiza la posición del punto de control superior
     * @param {number} yActual - Posición Y actual
     * @private
     */
    _actualizarPuntoControlSuperior(yActual) {
        this.puntoControlSuperior.y = this.topY;
        
        if (!this.puntoControlSuperior.posicionManual) {
            this.puntoControlSuperior.x = CONFIG.IZQUIERDA_X + this.ancho;
            this.puntoControlSuperior.proporcionX = 1.0;
        } else {
            this.puntoControlSuperior.x = CONFIG.IZQUIERDA_X + this.ancho * this.puntoControlSuperior.proporcionX;
        }
    }

    /**
     * Convierte el estrato a JSON para persistencia
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            alto: this.alto,
            ancho: this.ancho,
            color: this.color,
            trama: this.trama,
            tamanoTrama: this.tamanoTrama,
            simbolosDerecha: this.simbolosDerecha,
            tipoBordeSuperior: this.tipoBordeSuperior,
            nombre: this.nombre,
            unidadId: this.unidadId,
            puntoControl: { ...this.puntoControl },
            puntoControlSuperior: { ...this.puntoControlSuperior }
        };
    }

    /**
     * Crea un estrato desde un objeto JSON
     * @param {Object} data
     * @returns {Estrato}
     */
    static fromJSON(data) {
        return new Estrato(data);
    }

    /**
     * Obtiene la altura en metros
     * @param {number} pixelesPorMetro
     * @returns {number}
     */
    getAlturaMetros(pixelesPorMetro) {
        return this.alto / pixelesPorMetro;
    }

    /**
     * Obtiene el ancho en metros
     * @param {number} pixelesPorMetro
     * @returns {number}
     */
    getAnchoMetros(pixelesPorMetro) {
        return this.ancho / pixelesPorMetro;
    }

    /**
     * Verifica si el estrato pertenece a una unidad
     * @param {number|string} unidadId
     * @returns {boolean}
     */
    perteneceAUnidad(unidadId) {
        return this.unidadId === unidadId;
    }

    /**
     * Asigna el estrato a una unidad
     * @param {number|string} unidadId
     */
    asignarUnidad(unidadId) {
        this.unidadId = unidadId;
    }

    /**
     * Desasigna el estrato de su unidad
     */
    desasignarUnidad() {
        this.unidadId = null;
    }

    /**
     * Agrega un símbolo al estrato
     */
    agregarSimbolo(tipo, proporcionY = 0.5, proporcionX = 0.5, posicion = 'exterior', tamano = 20) {
        if (!tipo || tipo === 'ninguno') return;
        const yValido = Math.max(0, Math.min(1, proporcionY));
        const xValido = Math.max(0, Math.min(1, proporcionX));
        this.simbolosDerecha.push({ 
            tipo, 
            proporcionY: yValido, 
            proporcionX: xValido,
            posicion: posicion,
            tamano: tamano || 20
        });
    }

    /**
     * Cambia el tamaño de un símbolo
     */
    cambiarTamanoSimbolo(index, nuevoTamano) {
        if (index >= 0 && index < this.simbolosDerecha.length) {
            this.simbolosDerecha[index].tamano = Math.max(5, Math.min(60, nuevoTamano));
        }
    }

    /**
     * Mueve un símbolo
     */
    moverSimbolo(index, nuevaY, nuevaX) {
        if (index >= 0 && index < this.simbolosDerecha.length) {
            const simbolo = this.simbolosDerecha[index];
            if (nuevaY !== undefined) {
                simbolo.proporcionY = Math.max(0, Math.min(1, nuevaY));
            }
            if (nuevaX !== undefined) {
                simbolo.proporcionX = Math.max(0, Math.min(1, nuevaX));
            }
        }
    }

    /**
     * Elimina un símbolo del estrato
     */
    eliminarSimbolo(index) {
        if (index >= 0 && index < this.simbolosDerecha.length) {
            this.simbolosDerecha.splice(index, 1);
        }
    }
}