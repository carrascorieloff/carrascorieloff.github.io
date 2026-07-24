/**
 * Gestor de historial para Undo/Redo
 * Almacena los estados de la aplicación para poder deshacer/rehacer cambios
 */
export class HistoryManager {
    /**
     * @param {number} maxHistory - Número máximo de estados a guardar
     */
    constructor(maxHistory = 50) {
        this.undoStack = [];
        this.redoStack = [];
        this.maxHistory = maxHistory;
        this._isUndoing = false;
        this._currentState = null;
        this._listeners = [];
    }

    /**
     * Guarda un nuevo estado en el historial
     * @param {Object} state - Estado a guardar
     */
    push(state) {
        if (this._isUndoing) return;
        
        // Serializar el estado
        const serialized = JSON.stringify(state);
        
        // Si el estado es igual al actual, no guardar
        if (this._currentState === serialized) return;
        
        this.undoStack.push(serialized);
        this._currentState = serialized;
        
        // Limitar el historial
        if (this.undoStack.length > this.maxHistory) {
            this.undoStack.shift();
        }
        
        // Limpiar redo stack (nuevo camino)
        this.redoStack = [];
        
        // Notificar a los listeners
        this._notifyListeners();
    }

    /**
     * Deshace el último cambio
     * @returns {Object|null} Estado anterior o null si no hay
     */
    undo() {
        if (this.undoStack.length === 0) return null;
        
        this._isUndoing = true;
        
        // Guardar estado actual para redo
        const currentState = this._currentState;
        
        // Obtener estado anterior
        const previousState = this.undoStack.pop();
        
        // Guardar estado actual en redo stack
        if (currentState) {
            this.redoStack.push(currentState);
        }
        
        this._currentState = previousState;
        this._isUndoing = false;
        
        // Notificar a los listeners
        this._notifyListeners();
        
        return JSON.parse(previousState);
    }

    /**
     * Rehace el último cambio deshecho
     * @returns {Object|null} Estado rehace o null si no hay
     */
    redo() {
        if (this.redoStack.length === 0) return null;
        
        this._isUndoing = true;
        
        // Obtener estado a rehacer
        const stateToRedo = this.redoStack.pop();
        
        // Guardar estado actual en undo stack
        if (this._currentState) {
            this.undoStack.push(this._currentState);
        }
        
        this._currentState = stateToRedo;
        this._isUndoing = false;
        
        // Notificar a los listeners
        this._notifyListeners();
        
        return JSON.parse(stateToRedo);
    }

    /**
     * Verifica si se puede deshacer
     * @returns {boolean}
     */
    canUndo() {
        return this.undoStack.length > 0;
    }

    /**
     * Verifica si se puede rehacer
     * @returns {boolean}
     */
    canRedo() {
        return this.redoStack.length > 0;
    }

    /**
     * Obtiene el número de acciones disponibles para deshacer
     * @returns {number}
     */
    getUndoCount() {
        return this.undoStack.length;
    }

    /**
     * Obtiene el número de acciones disponibles para rehacer
     * @returns {number}
     */
    getRedoCount() {
        return this.redoStack.length;
    }

    /**
     * Limpia todo el historial
     */
    clear() {
        this.undoStack = [];
        this.redoStack = [];
        this._currentState = null;
        this._notifyListeners();
    }

    /**
     * Registra un listener para cambios en el historial
     * @param {Function} listener - Función a llamar cuando cambie el historial
     */
    addListener(listener) {
        this._listeners.push(listener);
    }

    /**
     * Elimina un listener
     * @param {Function} listener - Listener a eliminar
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
    _notifyListeners() {
        const state = {
            canUndo: this.canUndo(),
            canRedo: this.canRedo(),
            undoCount: this.getUndoCount(),
            redoCount: this.getRedoCount()
        };
        this._listeners.forEach(listener => listener(state));
    }
}