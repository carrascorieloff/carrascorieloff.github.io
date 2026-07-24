/**
 * Interfaz de usuario para unidades geológicas
 */
export class UnidadUI {
    constructor(estratos, unidadManager, dibujador, onCambio) {
        this.estratos = estratos;
        this.unidadManager = unidadManager;
        this.dibujador = dibujador;
        this.onCambio = onCambio;
        
        this._crearPanelUnidades();
        
        this.unidadManager.addListener(() => {
            this._renderizarUnidades();
            if (this.onCambio) this.onCambio();
        });
    }

    /**
     * Crea el panel de unidades en la interfaz
     * @private
     */
    _crearPanelUnidades() {
        const container = document.createElement('div');
        container.id = 'panel-unidades';
        container.style.cssText = `
            background: #f8f9fa;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 12px;
            margin-top: 12px;
            max-height: 300px;
            overflow-y: auto;
            display: none;
        `;
        
        const titulo = document.createElement('div');
        titulo.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        `;
        titulo.innerHTML = `
            <strong><i class="fas fa-layer-group"></i> Unidades Geológicas</strong>
            <button id="btnAgregarUnidad" class="btn-primary" style="padding: 4px 12px; font-size: 12px;">
                <i class="fas fa-plus"></i> Agregar
            </button>
        `;
        container.appendChild(titulo);
        
        const lista = document.createElement('div');
        lista.id = 'lista-unidades';
        container.appendChild(lista);
        
        const vacio = document.createElement('div');
        vacio.id = 'mensaje-unidades-vacio';
        vacio.style.cssText = 'color: #999; font-size: 13px; text-align: center; padding: 10px;';
        vacio.textContent = 'No hay unidades definidas. Haz clic en "Agregar" para crear una.';
        lista.appendChild(vacio);
        
        const panelesContainer = document.getElementById('panelesEstratos');
        if (panelesContainer) {
            panelesContainer.parentNode.insertBefore(container, panelesContainer.nextSibling);
        }
        
        document.getElementById('btnAgregarUnidad').addEventListener('click', () => {
            this._mostrarDialogoAgregarUnidad();
        });
        
        this.container = container;
        this.listaUnidades = lista;
        this.mensajeVacio = vacio;
        
        this._renderizarUnidades();
    }

    /**
     * Muestra u oculta el panel de unidades
     * @param {boolean} mostrar
     */
    togglePanel(mostrar) {
        this.container.style.display = mostrar ? 'block' : 'none';
    }

    /**
     * Renderiza la lista de unidades
     * @private
     */
    _renderizarUnidades() {
        const unidades = this.unidadManager.getUnidades();
        const lista = this.listaUnidades;
        
        if (unidades.length === 0) {
            lista.innerHTML = `
                <div style="color: #999; font-size: 13px; text-align: center; padding: 10px;">
                    No hay unidades definidas.
                </div>
            `;
            return;
        }
        
        let html = '';
        for (const unidad of unidades) {
            const inicio = unidad.estratoInicio;
            const fin = unidad.estratoFin;
            const nombreEstratoInicio = this.estratos[inicio]?.nombre || `Estrato ${inicio+1}`;
            const nombreEstratoFin = this.estratos[fin]?.nombre || `Estrato ${fin+1}`;
            
            html += `
                <div class="unidad-item" data-id="${unidad.id}" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 10px;
                    margin: 4px 0;
                    border-radius: 6px;
                    border-left: 4px solid ${unidad.color};
                    background: white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
                ">
                    <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: 600; font-size: 13px; color: #333;">
                            ${unidad.nombre}
                            ${!unidad.visible ? ' <span style="color:#999;font-size:11px;">(oculta)</span>' : ''}
                        </div>
                        <div style="font-size: 11px; color: #666;">
                            Estratos ${inicio+1} - ${fin+1}: 
                            "${nombreEstratoInicio}" → "${nombreEstratoFin}"
                            (${fin - inicio + 1} estratos)
                        </div>
                    </div>
                    <div style="display: flex; gap: 4px; flex-shrink: 0;">
                        <button class="btn-editar-unidad" data-id="${unidad.id}" 
                                style="background: none; border: none; color: #2196F3; cursor: pointer; padding: 4px 6px; font-size: 14px;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-toggle-unidad" data-id="${unidad.id}" 
                                style="background: none; border: none; color: ${unidad.visible ? '#FF9800' : '#4CAF50'}; cursor: pointer; padding: 4px 6px; font-size: 14px;">
                            <i class="fas ${unidad.visible ? 'fa-eye' : 'fa-eye-slash'}"></i>
                        </button>
                        <button class="btn-eliminar-unidad" data-id="${unidad.id}" 
                                style="background: none; border: none; color: #f44336; cursor: pointer; padding: 4px 6px; font-size: 14px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }
        
        lista.innerHTML = html;
        
        lista.querySelectorAll('.btn-eliminar-unidad').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                const unidad = this.unidadManager.getUnidad(id);
                if (unidad && confirm(`¿Eliminar la unidad "${unidad.nombre}"?`)) {
                    this.unidadManager.eliminarUnidad(id);
                    if (this.onCambio) this.onCambio();
                }
            });
        });
        
        lista.querySelectorAll('.btn-toggle-unidad').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const unidad = this.unidadManager.getUnidad(id);
                if (unidad) {
                    unidad.visible = !unidad.visible;
                    this.unidadManager.actualizarUnidad(id, { visible: unidad.visible });
                    if (this.onCambio) this.onCambio();
                }
            });
        });
        
        lista.querySelectorAll('.btn-editar-unidad').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                this._mostrarDialogoEditarUnidad(id);
            });
        });
    }

    /**
     * Muestra el diálogo para agregar una nueva unidad
     * @private
     */
    _mostrarDialogoAgregarUnidad() {
        if (this.estratos.length < 2) {
            alert('Se necesitan al menos 2 estratos para crear una unidad geológica.');
            return;
        }
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const dialog = document.createElement('div');
        dialog.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        `;
        
        dialog.innerHTML = `
            <h3 style="margin: 0 0 16px 0; color: #333;">
                <i class="fas fa-layer-group"></i> Nueva Unidad Geológica
            </h3>
            <div style="margin-bottom: 12px;">
                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #555;">
                    Nombre:
                </label>
                <input id="dialog-unidad-nombre" type="text" value="Unidad ${this.unidadManager.unidades.length + 1}" 
                       style="width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
            </div>
            <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                <div style="flex: 1;">
                    <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #555;">
                        Estrato inicial:
                    </label>
                    <select id="dialog-unidad-inicio" style="width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px;">
                        ${this.estratos.map((e, i) => `<option value="${i}">${i+1}. ${e.nombre || `Estrato ${i+1}`}</option>`).join('')}
                    </select>
                </div>
                <div style="flex: 1;">
                    <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #555;">
                        Estrato final:
                    </label>
                    <select id="dialog-unidad-fin" style="width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px;">
                        ${this.estratos.map((e, i) => `<option value="${i}">${i+1}. ${e.nombre || `Estrato ${i+1}`}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #555;">
                    Color:
                </label>
                <input id="dialog-unidad-color" type="color" value="#FF6B6B" style="width: 100%; height: 40px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button id="dialog-unidad-cancelar" style="padding: 8px 16px; background: #f0f0f0; border: none; border-radius: 4px; cursor: pointer;">
                    Cancelar
                </button>
                <button id="dialog-unidad-crear" style="padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Crear Unidad
                </button>
            </div>
        `;
        
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        
        const cerrar = () => overlay.remove();
        
        document.getElementById('dialog-unidad-cancelar').addEventListener('click', cerrar);
        
        document.getElementById('dialog-unidad-crear').addEventListener('click', () => {
            const nombre = document.getElementById('dialog-unidad-nombre').value.trim() || 'Unidad sin nombre';
            const inicio = parseInt(document.getElementById('dialog-unidad-inicio').value);
            const fin = parseInt(document.getElementById('dialog-unidad-fin').value);
            const color = document.getElementById('dialog-unidad-color').value;
            
            if (inicio > fin) {
                alert('El estrato inicial debe ser menor o igual al estrato final.');
                return;
            }
            
            this.unidadManager.agregarUnidad({
                nombre,
                color,
                estratoInicio: inicio,
                estratoFin: fin
            });
            
            cerrar();
            if (this.onCambio) this.onCambio();
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) cerrar();
        });
    }

    /**
     * Muestra el diálogo para editar una unidad
     * @param {number|string} unidadId
     * @private
     */
    _mostrarDialogoEditarUnidad(unidadId) {
        const unidad = this.unidadManager.getUnidad(unidadId);
        if (!unidad) return;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const dialog = document.createElement('div');
        dialog.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        `;
        
        dialog.innerHTML = `
            <h3 style="margin: 0 0 16px 0; color: #333;">
                <i class="fas fa-edit"></i> Editar Unidad
            </h3>
            <div style="margin-bottom: 12px;">
                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #555;">
                    Nombre:
                </label>
                <input id="dialog-unidad-nombre" type="text" value="${unidad.nombre}" 
                       style="width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
            </div>
            <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                <div style="flex: 1;">
                    <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #555;">
                        Estrato inicial:
                    </label>
                    <select id="dialog-unidad-inicio" style="width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px;">
                        ${this.estratos.map((e, i) => `<option value="${i}" ${i === unidad.estratoInicio ? 'selected' : ''}>${i+1}. ${e.nombre || `Estrato ${i+1}`}</option>`).join('')}
                    </select>
                </div>
                <div style="flex: 1;">
                    <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #555;">
                        Estrato final:
                    </label>
                    <select id="dialog-unidad-fin" style="width: 100%; padding: 8px 10px; border: 1px solid #ddd; border-radius: 4px;">
                        ${this.estratos.map((e, i) => `<option value="${i}" ${i === unidad.estratoFin ? 'selected' : ''}>${i+1}. ${e.nombre || `Estrato ${i+1}`}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #555;">
                    Color:
                </label>
                <input id="dialog-unidad-color" type="color" value="${unidad.color}" 
                       style="width: 100%; height: 40px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button id="dialog-unidad-cancelar" style="padding: 8px 16px; background: #f0f0f0; border: none; border-radius: 4px; cursor: pointer;">
                    Cancelar
                </button>
                <button id="dialog-unidad-guardar" style="padding: 8px 16px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Guardar
                </button>
            </div>
        `;
        
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        
        const cerrar = () => overlay.remove();
        
        document.getElementById('dialog-unidad-cancelar').addEventListener('click', cerrar);
        
        document.getElementById('dialog-unidad-guardar').addEventListener('click', () => {
            const nombre = document.getElementById('dialog-unidad-nombre').value.trim() || 'Unidad sin nombre';
            const inicio = parseInt(document.getElementById('dialog-unidad-inicio').value);
            const fin = parseInt(document.getElementById('dialog-unidad-fin').value);
            const color = document.getElementById('dialog-unidad-color').value;
            
            if (inicio > fin) {
                alert('El estrato inicial debe ser menor o igual al estrato final.');
                return;
            }
            
            this.unidadManager.actualizarUnidad(unidadId, {
                nombre,
                color,
                estratoInicio: inicio,
                estratoFin: fin
            });
            
            cerrar();
            if (this.onCambio) this.onCambio();
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) cerrar();
        });
    }

    /**
     * Actualiza la lista de unidades después de cambios en los estratos
     */
    actualizar() {
        this._renderizarUnidades();
    }
}