import { Estrato } from '../models/Estrato.js';
import { UnidadGeologica } from '../models/UnidadGeologica.js';

/**
 * Servicio de persistencia - Guardar y cargar proyectos
 */
export class Persistencia {
    /**
     * @param {Estrato[]} estratos - Referencia a la lista de estratos
     * @param {Object} config - Configuración actual
     */
    constructor(estratos, config) {
        this.estratos = estratos;
        this.config = config;
        this.CLAVE_PREFIJO = 'columna_';
    }

    /**
     * Guarda un proyecto en localStorage
     * @param {string} nombre - Nombre del proyecto
     * @param {UnidadManager} unidadManager - Gestor de unidades
     * @returns {Object} Proyecto guardado
     */
    guardar(nombre, unidadManager = null) {
        if (!nombre) throw new Error('El nombre del proyecto es requerido');

        const proyecto = {
            version: '1.1',
            fechaGuardado: new Date().toISOString(),
            fechaLegible: new Date().toLocaleString(),
            pixelesPorMetro: this.config.PIXELES_POR_METRO,
            configuracionEscala: {
                invertirEscala: this.config.INVERTIR_ESCALA || false,
                separacionMinimaEtiquetas: this.config.SEPARACION_MINIMA_ETIQUETAS || 100,
                mostrarGuiasVerticales: this.config.MOSTRAR_GUIAS_VERTICALES || false,
                desplazamientoEscalaHorizontal: this.config.DESPLAZAMIENTO_ESCALA_HORIZONTAL || 0
            },
            estratos: this.estratos.map(e => e.toJSON()),
            unidades: unidadManager ? unidadManager.toJSON() : []
        };

        try {
            localStorage.setItem(this.CLAVE_PREFIJO + nombre, JSON.stringify(proyecto));
            return proyecto;
        } catch (error) {
            console.error('Error al guardar proyecto:', error);
            throw new Error('No se pudo guardar el proyecto. ¿Hay espacio en localStorage?');
        }
    }

    /**
     * Carga un proyecto desde localStorage
     * @param {string} nombre - Nombre del proyecto
     * @param {UnidadManager} unidadManager - Gestor de unidades
     * @returns {Object|null} Proyecto cargado o null si no existe
     */
    cargar(nombre, unidadManager = null) {
        const data = localStorage.getItem(this.CLAVE_PREFIJO + nombre);
        if (!data) return null;

        try {
            const proyecto = JSON.parse(data);
            
            this.config.PIXELES_POR_METRO = proyecto.pixelesPorMetro || 100;
            if (proyecto.configuracionEscala) {
                this.config.INVERTIR_ESCALA = proyecto.configuracionEscala.invertirEscala || false;
                this.config.SEPARACION_MINIMA_ETIQUETAS = proyecto.configuracionEscala.separacionMinimaEtiquetas || 100;
                this.config.MOSTRAR_GUIAS_VERTICALES = proyecto.configuracionEscala.mostrarGuiasVerticales || false;
                this.config.DESPLAZAMIENTO_ESCALA_HORIZONTAL = proyecto.configuracionEscala.desplazamientoEscalaHorizontal || 0;
            }

            // Restaurar estratos
            this.estratos.length = 0;
            let estratosCargados = [];
            proyecto.estratos.forEach(data => {
                estratosCargados.push(Estrato.fromJSON(data));
            });

            // Detectar orden invertido en archivos antiguos
            let ordenInvertido = false;
            if (estratosCargados.length > 1) {
                const primerId = estratosCargados[0]?.id || 0;
                const ultimoId = estratosCargados[estratosCargados.length - 1]?.id || 0;
                const primerNombre = estratosCargados[0]?.nombre || '';
                const ultimoNombre = estratosCargados[estratosCargados.length - 1]?.nombre || '';
                const numPrimer = parseInt(primerNombre.match(/\d+/)?.[0] || '0');
                const numUltimo = parseInt(ultimoNombre.match(/\d+/)?.[0] || '0');
                if (primerId > ultimoId || (numPrimer > numUltimo && numUltimo === 1)) {
                    ordenInvertido = true;
                    console.log('🔄 Detectado orden invertido en archivo antiguo. Corrigiendo...');
                }
            }

            if (ordenInvertido) {
                estratosCargados.reverse();
            }

            estratosCargados.forEach(estrato => {
                this.estratos.push(estrato);
            });

            // Restaurar unidades
            if (unidadManager && proyecto.unidades) {
                unidadManager.fromJSON(proyecto.unidades);
            }

            return proyecto;
        } catch (error) {
            console.error('Error al cargar proyecto:', error);
            throw new Error('El archivo está corrupto o tiene un formato inválido');
        }
    }

    /**
     * Elimina un proyecto de localStorage
     * @param {string} nombre - Nombre del proyecto
     * @returns {boolean} True si se eliminó correctamente
     */
    eliminar(nombre) {
        const clave = this.CLAVE_PREFIJO + nombre;
        if (localStorage.getItem(clave)) {
            localStorage.removeItem(clave);
            return true;
        }
        return false;
    }

    /**
     * Obtiene la lista de todos los proyectos guardados
     * @returns {Array<{nombre: string, info: Object}>}
     */
    listarProyectos() {
        const proyectos = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith(this.CLAVE_PREFIJO)) {
                const nombre = key.replace(this.CLAVE_PREFIJO, '');
                try {
                    const data = localStorage.getItem(key);
                    const proyecto = JSON.parse(data);
                    proyectos.push({
                        nombre,
                        info: {
                            fecha: proyecto.fechaGuardado || new Date(0).toISOString(),
                            fechaLegible: proyecto.fechaLegible || 'Fecha desconocida',
                            estratos: proyecto.estratos?.length || 0,
                            pixelesPorMetro: proyecto.pixelesPorMetro || 100
                        }
                    });
                } catch (e) {
                    proyectos.push({
                        nombre,
                        info: {
                            fecha: new Date(0).toISOString(),
                            fechaLegible: 'Error al leer',
                            estratos: 0,
                            pixelesPorMetro: 100
                        }
                    });
                }
            }
        }
        return proyectos;
    }

    /**
     * Exporta un proyecto como archivo JSON
     * @param {string} nombre - Nombre del proyecto
     * @param {boolean} descargar - Si debe descargarse automáticamente
     * @returns {Blob} Blob con el contenido JSON
     */
    exportar(nombre, descargar = true) {
        const proyecto = this.guardar(nombre);
        const json = JSON.stringify(proyecto, null, 2);
        const blob = new Blob([json], { type: 'application/json' });

        if (descargar) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${nombre}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

        return blob;
    }

    /**
     * Importa un proyecto desde un archivo JSON
     * @param {File} file - Archivo JSON
     * @returns {Promise<Object>} Proyecto importado
     */
    importar(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const proyecto = JSON.parse(event.target.result);
                    
                    // Validar estructura
                    if (!proyecto.estratos || !Array.isArray(proyecto.estratos)) {
                        throw new Error('Archivo inválido: no contiene estratos');
                    }

                    // Cargar el proyecto
                    const nombre = file.name.replace('.json', '');
                    this.estratos.length = 0;
                    
                    let estratosCargados = [];
                    proyecto.estratos.forEach(data => {
                        estratosCargados.push(Estrato.fromJSON(data));
                    });

                    // ✅ DETECTAR SI EL ORDEN ESTÁ INVERTIDO (archivos antiguos)
                    let ordenInvertido = false;
                    
                    if (estratosCargados.length > 1) {
                        const primerId = estratosCargados[0]?.id || 0;
                        const ultimoId = estratosCargados[estratosCargados.length - 1]?.id || 0;
                        const primerNombre = estratosCargados[0]?.nombre || '';
                        const ultimoNombre = estratosCargados[estratosCargados.length - 1]?.nombre || '';
                        
                        const numPrimer = parseInt(primerNombre.match(/\d+/)?.[0] || '0');
                        const numUltimo = parseInt(ultimoNombre.match(/\d+/)?.[0] || '0');
                        
                        if (primerId > ultimoId || (numPrimer > numUltimo && numUltimo === 1)) {
                            ordenInvertido = true;
                            console.log('🔄 Detectado orden invertido en archivo antiguo. Corrigiendo...');
                        }
                    }

                    if (ordenInvertido) {
                        estratosCargados.reverse();
                    }

                    estratosCargados.forEach(estrato => {
                        this.estratos.push(estrato);
                    });

                    // Actualizar configuración
                    this.config.PIXELES_POR_METRO = proyecto.pixelesPorMetro || 100;
                    if (proyecto.configuracionEscala) {
                        this.config.INVERTIR_ESCALA = proyecto.configuracionEscala.invertirEscala || false;
                        this.config.SEPARACION_MINIMA_ETIQUETAS = proyecto.configuracionEscala.separacionMinimaEtiquetas || 100;
                        this.config.MOSTRAR_GUIAS_VERTICALES = proyecto.configuracionEscala.mostrarGuiasVerticales || false;
                        this.config.DESPLAZAMIENTO_ESCALA_HORIZONTAL = proyecto.configuracionEscala.desplazamientoEscalaHorizontal || 0;
                    }

                    resolve(proyecto);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Error al leer el archivo'));
            reader.readAsText(file);
        });
    }

    /**
     * Verifica si un proyecto existe
     * @param {string} nombre
     * @returns {boolean}
     */
    existe(nombre) {
        return !!localStorage.getItem(this.CLAVE_PREFIJO + nombre);
    }
}