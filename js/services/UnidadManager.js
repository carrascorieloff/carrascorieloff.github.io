import { UnidadGeologica } from '../models/UnidadGeologica.js';

/**
 * Gestor de unidades geológicas
 */
export class UnidadManager {
    constructor() {
        this.unidades = [];
        this._nextId = 1;
        this._listeners = [];
    }

    /**
     * Agrega una nueva unidad
     * @param {Object} datos - Datos de la unidad
     * @returns {UnidadGeologica}
     */
    agregarUnidad(datos = {}) {
        const unidad = new UnidadGeologica({
            id: this._nextId++,
            ...datos
        });
        this.unidades.push(unidad);
        this._notificar();
        return unidad;
    }

    /**
     * Elimina una unidad
     * @param {number|string} id - ID de la unidad
     * @returns {boolean}
     */
    eliminarUnidad(id) {
        const index = this.unidades.findIndex(u => u.id === id);
        if (index === -1) return false;
        this.unidades.splice(index, 1);
        this._notificar();
        return true;
    }

    /**
     * Actualiza una unidad
     * @param {number|string} id - ID de la unidad
     * @param {Object} datos - Nuevos datos
     * @returns {UnidadGeologica|null}
     */
    actualizarUnidad(id, datos) {
        const unidad = this.unidades.find(u => u.id === id);
        if (!unidad) return null;
        
        Object.assign(unidad, datos);
        this._notificar();
        return unidad;
    }

    /**
     * Obtiene una unidad por ID
     * @param {number|string} id
     * @returns {UnidadGeologica|null}
     */
    getUnidad(id) {
        return this.unidades.find(u => u.id === id) || null;
    }

    /**
     * Obtiene todas las unidades
     * @returns {UnidadGeologica[]}
     */
    getUnidades() {
        return [...this.unidades];
    }

    /**
     * Obtiene la unidad que contiene un estrato
     * @param {number} estratoIndex - Índice del estrato
     * @returns {UnidadGeologica|null}
     */
    getUnidadPorEstrato(estratoIndex) {
        return this.unidades.find(u => u.contieneEstrato(estratoIndex)) || null;
    }

    /**
     * Asigna estratos a una unidad (actualiza el rango)
     * @param {number|string} unidadId
     * @param {number} inicio - Índice del primer estrato
     * @param {number} fin - Índice del último estrato
     * @returns {UnidadGeologica|null}
     */
    asignarEstratos(unidadId, inicio, fin) {
        const unidad = this.getUnidad(unidadId);
        if (!unidad) return null;
        
        if (inicio > fin) [inicio, fin] = [fin, inicio];
        
        unidad.estratoInicio = Math.max(0, inicio);
        unidad.estratoFin = Math.max(0, fin);
        this._notificar();
        return unidad;
    }

    /**
     * Registra un listener para cambios
     * @param {Function} listener
     */
    addListener(listener) {
        this._listeners.push(listener);
    }

    /**
     * Elimina un listener
     * @param {Function} listener
     */
    removeListener(listener) {
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
    }

    /**
     * Notifica a todos los listeners
     * @private
     */
    _notificar() {
        this._listeners.forEach(listener => listener(this.unidades));
    }

    /**
     * Convierte a JSON para persistencia
     * @returns {Object[]}
     */
    toJSON() {
        return this.unidades.map(u => u.toJSON());
    }

    /**
     * Carga unidades desde JSON
     * @param {Object[]} datos
     */
    fromJSON(datos) {
        if (!datos || !Array.isArray(datos)) {
            this.unidades = [];
            return;
        }
        this.unidades = datos.map(d => UnidadGeologica.fromJSON(d));
        this._nextId = Math.max(1, ...this.unidades.map(u => u.id)) + 1;
        this._notificar();
    }

    /**
     * Limpia todas las unidades
     */
    clear() {
        this.unidades = [];
        this._notificar();
    }
}