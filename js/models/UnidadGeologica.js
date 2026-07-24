/**
 * Representa una unidad geológica que agrupa uno o más estratos
 */
export class UnidadGeologica {
    /**
     * @param {Object} data - Datos de la unidad
     */
    constructor(data = {}) {
        this.id = data.id || Date.now() + Math.random();
        this.nombre = data.nombre || 'Unidad Geológica';
        this.color = data.color || '#FF6B6B';
        this.estratoInicio = data.estratoInicio || 0;
        this.estratoFin = data.estratoFin || 0;
        this.anchoCorchete = data.anchoCorchete || 30;
        this.visible = data.visible !== undefined ? data.visible : true;
        this.descripcion = data.descripcion || '';
    }

    /**
     * Verifica si un estrato pertenece a esta unidad
     * @param {number} index - Índice del estrato
     * @returns {boolean}
     */
    contieneEstrato(index) {
        return index >= this.estratoInicio && index <= this.estratoFin;
    }

    /**
     * Obtiene el rango de estratos
     * @returns {{inicio: number, fin: number}}
     */
    getRango() {
        return { inicio: this.estratoInicio, fin: this.estratoFin };
    }

    /**
     * Convierte a JSON para persistencia
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            color: this.color,
            estratoInicio: this.estratoInicio,
            estratoFin: this.estratoFin,
            anchoCorchete: this.anchoCorchete,
            visible: this.visible,
            descripcion: this.descripcion
        };
    }

    /**
     * Crea una unidad desde JSON
     * @param {Object} data
     * @returns {UnidadGeologica}
     */
    static fromJSON(data) {
        return new UnidadGeologica(data);
    }
}