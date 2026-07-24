import { CONFIG } from '../config.js';

export class Dibujador {
    constructor(canvas, ctx, tramasManager) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.tramasManager = tramasManager;
        this.estratos = [];
        this.config = { ...CONFIG };
        this._tiempoRedibujo = null;
        this._onCanvasChange = null;
        this.unidadManager = null;
    }

    setEstratos(estratos) {
        this.estratos = estratos;
    }

    setUnidadManager(unidadManager) {
        this.unidadManager = unidadManager;
    }

    setOnCanvasChange(callback) {
        this._onCanvasChange = callback;
    }

    dibujar(mostrarPuntos = true, escala = 1) {
        if (this._tiempoRedibujo) {
            cancelAnimationFrame(this._tiempoRedibujo);
        }

        this._tiempoRedibujo = requestAnimationFrame(() => {
            let alturaTotal = 0;
            for (const estrato of this.estratos) {
                alturaTotal += estrato.alto;
            }
            
            const margenTotal = this.config.MARGEN_SUPERIOR + this.config.MARGEN_INFERIOR;
            const nuevoAlto = alturaTotal + margenTotal;
            
            if (this.canvas.height !== nuevoAlto) {
                this.canvas.height = nuevoAlto;
            }
            
            let yActual = this.config.MARGEN_SUPERIOR + alturaTotal;
            for (let i = this.estratos.length - 1; i >= 0; i--) {
                const estrato = this.estratos[i];
                yActual = estrato.calcularPosiciones(yActual);
            }
            
            // ✅ Calcular el ancho necesario para las unidades geológicas
            let anchoNecesario = this.config.IZQUIERDA_X + 400;
            
            // ✅ Si hay unidades, calcular el ancho extra necesario
            if (this.unidadManager) {
                const unidades = this.unidadManager.getUnidades();
                let maxAnchoEstrato = 0;
                for (const estrato of this.estratos) {
                    if (estrato.ancho > maxAnchoEstrato) maxAnchoEstrato = estrato.ancho;
                }
                
                // Espacio para: columna + offset + corchete + espacio + etiqueta más larga
                let maxTextoAncho = 0;
                const ctx = this.ctx;
                for (const unidad of unidades) {
                    if (!unidad.visible) continue;
                    const texto = unidad.nombre || `Unidad ${unidad.id}`;
                    const fontSize = 14 * escala;
                    ctx.font = `600 ${fontSize}px Arial, sans-serif`;
                    const metrics = ctx.measureText(texto);
                    if (metrics.width > maxTextoAncho) {
                        maxTextoAncho = metrics.width;
                    }
                }
                
                const offsetCorchete = 80 * escala;
                const anchoCorchete = 30 * escala;
                const paddingEtiqueta = 16 * escala;
                const espacioExtra = maxTextoAncho + anchoCorchete + offsetCorchete + paddingEtiqueta + 100 * escala;
                
                anchoNecesario = Math.max(anchoNecesario, this.config.IZQUIERDA_X + maxAnchoEstrato + espacioExtra);
            }
            
            if (this.canvas.width < anchoNecesario) {
                this.canvas.width = anchoNecesario;
            }
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this._dibujarEscalaVertical(alturaTotal, escala);
            
            for (let i = this.estratos.length - 1; i >= 0; i--) {
                const estrato = this.estratos[i];
                this._dibujarEstrato(estrato, i, mostrarPuntos, escala);
            }

            // ✅ Dibujar unidades geológicas (corchetes)
            if (this.unidadManager) {
                this._dibujarUnidadesGeologicas(this.unidadManager.getUnidades(), escala);
            }

            this._dibujarGuiasVerticales(escala);
            this._dibujarEscalaHorizontal(escala);
            
            this._tiempoRedibujo = null;
            
            if (this._onCanvasChange) {
                this._onCanvasChange();
            }
        });
    }

    /**
     * Dibuja las unidades geológicas como corchetes a la derecha
     * @param {UnidadGeologica[]} unidades - Lista de unidades
     * @param {number} escala - Escala de dibujo
     * @private
     */
    _dibujarUnidadesGeologicas(unidades, escala = 1) {
        if (!unidades || unidades.length === 0 || this.estratos.length === 0) return;
        
        const ctx = this.ctx;
        const IZQUIERDA_X = this.config.IZQUIERDA_X;
        const offsetCorchete = 80 * escala;
        
        let maxAncho = 0;
        for (const estrato of this.estratos) {
            if (estrato.ancho > maxAncho) maxAncho = estrato.ancho;
        }
        
        const unidadesOrdenadas = [...unidades].sort((a, b) => a.estratoInicio - b.estratoInicio);
        const margenVertical = 15 * escala;
        const posicionesY = new Map();
        
        for (const unidad of unidadesOrdenadas) {
            if (!unidad.visible) continue;
            
            const inicio = unidad.estratoInicio;
            const fin = unidad.estratoFin;
            
            if (inicio < 0 || fin >= this.estratos.length || inicio > fin) continue;
            
            const estratoInicio = this.estratos[inicio];
            const estratoFin = this.estratos[fin];
            
            const ySuperior = estratoInicio.topY;
            const yInferior = estratoFin.bottomY;
            
            // Calcular desplazamiento para evitar superposición
            let yDesplazamiento = 0;
            for (const [key, value] of posicionesY) {
                const [keyInicio, keyFin] = key.split('-').map(Number);
                if (inicio <= keyFin && fin >= keyInicio) {
                    yDesplazamiento = Math.max(yDesplazamiento, value + margenVertical);
                }
            }
            
            posicionesY.set(`${inicio}-${fin}`, yInferior - ySuperior + yDesplazamiento);
            
            const ySup = ySuperior + yDesplazamiento;
            const yInf = yInferior + yDesplazamiento;
            
            // ✅ Posición del corchete: a la derecha de la columna
            const xCorchete = IZQUIERDA_X + maxAncho + offsetCorchete;
            const anchoCorchete = (unidad.anchoCorchete || 30) * escala;
            
            // --- Dibujar el corchete con geometría "]" ---
            ctx.save();
            ctx.strokeStyle = unidad.color;
            ctx.lineWidth = 2 * escala;
            ctx.fillStyle = unidad.color;
            ctx.shadowColor = 'rgba(0,0,0,0.08)';
            ctx.shadowBlur = 3 * escala;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // ✅ Corchete tipo "]" : líneas verticales con brazos horizontales
            // Línea vertical izquierda (el cuerpo del corchete)
            ctx.beginPath();
            ctx.moveTo(xCorchete, ySup);
            ctx.lineTo(xCorchete, yInf);
            ctx.stroke();
            
            // Brazo superior horizontal (hacia la izquierda)
            ctx.beginPath();
            ctx.moveTo(xCorchete, ySup);
            ctx.lineTo(xCorchete - anchoCorchete, ySup);
            ctx.stroke();
            
            // Brazo inferior horizontal (hacia la izquierda)
            ctx.beginPath();
            ctx.moveTo(xCorchete, yInf);
            ctx.lineTo(xCorchete - anchoCorchete, yInf);
            ctx.stroke();
            
            // Restaurar para la etiqueta
            ctx.shadowBlur = 0;
            
            // --- ✅ Etiqueta a la derecha del corchete ---
            const texto = unidad.nombre || `Unidad ${unidad.id}`;
            const fontSize = Math.max(12, 14 * escala);
            ctx.font = `600 ${fontSize}px Arial, sans-serif`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            
            // Calcular espacio para la etiqueta
            const metrics = ctx.measureText(texto);
            const paddingX = 8 * escala;
            const paddingY = 4 * escala;
            const textoAncho = metrics.width + paddingX * 2;
            const textoAlto = fontSize + paddingY * 2;
            
            // ✅ Posición: a la derecha del corchete, centrado verticalmente
            const xTexto = xCorchete + 6 * escala;
            const yTexto = (ySup + yInf) / 2;
            
            
            
            // Texto
            ctx.fillStyle = '#2c3e50';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.font = `600 ${fontSize}px Arial, sans-serif`;
            ctx.fillText(texto, xTexto, yTexto + 1);
            
            
            
            
            
            ctx.restore();
        }
    }

    /**
     * Helper para roundRect
     * @private
     */
    _roundRect(ctx, x, y, w, h, r) {
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    /**
     * Calcula las posiciones de todos los estratos
     * @returns {number} Altura total
     * @private
     */
    _calcularPosiciones() {
        let alturaTotal = 0;
        for (const estrato of this.estratos) {
            alturaTotal += estrato.alto;
        }
        
        const margenTotal = this.config.MARGEN_SUPERIOR + this.config.MARGEN_INFERIOR;
        this.canvas.height = alturaTotal + margenTotal;
        
        let yActual = alturaTotal + this.config.MARGEN_SUPERIOR;
        for (let i = this.estratos.length - 1; i >= 0; i--) {
            const estrato = this.estratos[i];
            yActual = estrato.calcularPosiciones(yActual);
        }
        
        return alturaTotal;
    }

    /**
     * Dibuja un estrato individual
     * @param {Estrato} estrato
     * @param {number} index
     * @param {boolean} mostrarPuntos
     * @param {number} escala
     * @private
     */
    _dibujarEstrato(estrato, index, mostrarPuntos, escala) {
        const ctx = this.ctx;
        const IZQUIERDA_X = this.config.IZQUIERDA_X;
        const { topY, bottomY, ancho, color, trama, tamanoTrama, tipoBordeSuperior } = estrato;
        const endX = IZQUIERDA_X + ancho;
        const startX = IZQUIERDA_X;
        const startY = bottomY;
        
        // Iniciar el camino para el relleno
        ctx.beginPath();
        ctx.moveTo(startX, bottomY);
        ctx.lineTo(startX, topY);
        ctx.lineTo(estrato.puntoControlSuperior.x, topY);
        ctx.quadraticCurveTo(
            estrato.puntoControl.x,
            estrato.puntoControl.y,
            endX,
            bottomY
        );
        
        // Dibujar el borde inferior según el tipo
        switch (tipoBordeSuperior) {
            case "recto":
                ctx.lineTo(startX, startY);
                break;
                
            case "segmentado":
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
                
            case "ondulado":
                const amplitud = 5;
                const ciclos = (endX - startX) / 25;
                let prevY = startY;
                for (let x = endX; x >= startX; x -= 3) {
                    const y = amplitud + startY + Math.sin(((x - startX) / (endX - startX)) * ciclos * Math.PI * 2) * amplitud;
                    if (Math.abs(y - prevY) > 0.1 || x === endX || x === startX) {
                        ctx.lineTo(x, y);
                        prevY = y;
                    }
                }
                break;
                
            case "discontinuo":
                ctx.lineTo(startX, startY);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
                if (trama !== "solido") {
                    const tramaPattern = this.tramasManager.crearTrama(trama, "#000000", tamanoTrama * escala);
                    if (tramaPattern) {
                        ctx.save();
                        ctx.globalCompositeOperation = "source-atop";
                        ctx.fillStyle = tramaPattern;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                ctx.lineTo(startX, topY);
                ctx.lineTo(estrato.puntoControlSuperior.x, topY);
                ctx.quadraticCurveTo(
                    estrato.puntoControl.x,
                    estrato.puntoControl.y,
                    endX,
                    bottomY
                );
                ctx.stroke();
                ctx.setLineDash([15, 15]);
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(endX, bottomY);
                ctx.lineTo(startX, bottomY);
                ctx.stroke();
                ctx.lineWidth = 1;
                ctx.setLineDash([]);
                if (mostrarPuntos) {
                    this._dibujarPuntosControl(estrato, escala);
                }
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                return;
                
            case "inf_transparente":
                ctx.lineTo(startX, startY);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
                if (trama !== "solido") {
                    const tramaPattern = this.tramasManager.crearTrama(trama, "#000000", tamanoTrama * escala);
                    if (tramaPattern) {
                        ctx.save();
                        ctx.globalCompositeOperation = "source-atop";
                        ctx.fillStyle = tramaPattern;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                ctx.lineTo(startX, topY);
                ctx.lineTo(estrato.puntoControlSuperior.x, topY);
                ctx.quadraticCurveTo(
                    estrato.puntoControl.x,
                    estrato.puntoControl.y,
                    endX,
                    bottomY
                );
                ctx.stroke();
                ctx.setLineDash([0, 10000]);
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(endX, bottomY);
                ctx.lineTo(startX, bottomY);
                ctx.stroke();
                ctx.lineWidth = 1;
                ctx.setLineDash([]);
                if (mostrarPuntos) {
                    this._dibujarPuntosControl(estrato, escala);
                }
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                return;
                
            case "sup_transparente":
                ctx.lineTo(startX, startY);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
                if (trama !== "solido") {
                    const tramaPattern = this.tramasManager.crearTrama(trama, "#000000", tamanoTrama * escala);
                    if (tramaPattern) {
                        ctx.save();
                        ctx.globalCompositeOperation = "source-atop";
                        ctx.fillStyle = tramaPattern;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.lineTo(estrato.puntoControlSuperior.x, topY);
                ctx.quadraticCurveTo(
                    estrato.puntoControl.x,
                    estrato.puntoControl.y,
                    endX,
                    bottomY
                );
                ctx.stroke();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                ctx.lineTo(startX, topY);
                ctx.stroke();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                ctx.lineTo(endX, bottomY);
                ctx.stroke();
                if (mostrarPuntos) {
                    this._dibujarPuntosControl(estrato, escala);
                }
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                return;
                
            case "sup_inf_transparente":
                ctx.lineTo(startX, startY);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
                if (trama !== "solido") {
                    const tramaPattern = this.tramasManager.crearTrama(trama, "#000000", tamanoTrama * escala);
                    if (tramaPattern) {
                        ctx.save();
                        ctx.globalCompositeOperation = "source-atop";
                        ctx.fillStyle = tramaPattern;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.lineTo(estrato.puntoControlSuperior.x, topY);
                ctx.quadraticCurveTo(
                    estrato.puntoControl.x,
                    estrato.puntoControl.y,
                    endX,
                    bottomY
                );
                ctx.stroke();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                ctx.lineTo(startX, topY);
                ctx.stroke();
                if (mostrarPuntos) {
                    this._dibujarPuntosControl(estrato, escala);
                }
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                return;
                
            case "sup_inf_der_transparente":
                ctx.lineTo(startX, startY);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
                if (trama !== "solido") {
                    const tramaPattern = this.tramasManager.crearTrama(trama, "#000000", tamanoTrama * escala);
                    if (tramaPattern) {
                        ctx.save();
                        ctx.globalCompositeOperation = "source-atop";
                        ctx.fillStyle = tramaPattern;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                ctx.lineTo(startX, topY);
                ctx.stroke();
                if (mostrarPuntos) {
                    this._dibujarPuntosControl(estrato, escala);
                }
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                return;
                
            case "ondulado_inf_trans":
                const amplitud2 = 5;
                const ciclos2 = (endX - startX) / 25;
                for (let x = endX; x >= startX; x -= 2) {
                    const t = (x - startX) / (endX - startX);
                    const y = amplitud2 + startY + Math.sin(t * ciclos2 * Math.PI * 2) * amplitud2;
                    ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
                if (trama !== "solido") {
                    const tramaPattern = this.tramasManager.crearTrama(trama, "#000000", tamanoTrama * escala);
                    if (tramaPattern) {
                        ctx.save();
                        ctx.globalCompositeOperation = "source-atop";
                        ctx.fillStyle = tramaPattern;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                ctx.lineTo(startX, topY);
                ctx.lineTo(estrato.puntoControlSuperior.x, topY);
                ctx.quadraticCurveTo(
                    estrato.puntoControl.x,
                    estrato.puntoControl.y,
                    endX,
                    bottomY
                );
                ctx.stroke();
                if (mostrarPuntos) {
                    this._dibujarPuntosControl(estrato, escala);
                }
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                return;
                
            case "ondulado_sup_trans":
                const amplitud3 = 5;
                const ciclos3 = (endX - startX) / 25;
                for (let x = endX; x >= startX; x -= 2) {
                    const t = (x - startX) / (endX - startX);
                    const y = amplitud3 + startY + Math.sin(t * ciclos3 * Math.PI * 2) * amplitud3;
                    ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
                if (trama !== "solido") {
                    const tramaPattern = this.tramasManager.crearTrama(trama, "#000000", tamanoTrama * escala);
                    if (tramaPattern) {
                        ctx.save();
                        ctx.globalCompositeOperation = "source-atop";
                        ctx.fillStyle = tramaPattern;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                ctx.strokeStyle = "#000000";
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
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, topY);
                ctx.lineTo(startX, bottomY);
                ctx.stroke();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.lineTo(estrato.puntoControlSuperior.x, topY);
                ctx.quadraticCurveTo(
                    estrato.puntoControl.x,
                    estrato.puntoControl.y,
                    endX,
                    bottomY
                );
                ctx.stroke();
                if (mostrarPuntos) {
                    this._dibujarPuntosControl(estrato, escala);
                }
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                return;
                
            case "ondulado_inf_sup_trans":
                const amplitud4 = 5;
                const ciclos4 = (endX - startX) / 25;
                for (let x = endX; x >= startX; x -= 2) {
                    const t = (x - startX) / (endX - startX);
                    const y = amplitud4 + startY + Math.sin(t * ciclos4 * Math.PI * 2) * amplitud4;
                    ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
                if (trama !== "solido") {
                    const tramaPattern = this.tramasManager.crearTrama(trama, "#000000", tamanoTrama * escala);
                    if (tramaPattern) {
                        ctx.save();
                        ctx.globalCompositeOperation = "source-atop";
                        ctx.fillStyle = tramaPattern;
                        ctx.fill();
                        ctx.restore();
                    }
                }
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, topY);
                ctx.lineTo(startX, bottomY);
                ctx.stroke();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.lineTo(estrato.puntoControlSuperior.x, topY);
                ctx.quadraticCurveTo(
                    estrato.puntoControl.x,
                    estrato.puntoControl.y,
                    endX,
                    bottomY
                );
                ctx.stroke();
                if (mostrarPuntos) {
                    this._dibujarPuntosControl(estrato, escala);
                }
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                return;
                
            case "canal":
                const startX1 = IZQUIERDA_X;
                const endX1 = IZQUIERDA_X + ancho;
                const startY1 = bottomY;
                const alturaCanal = (bottomY - topY) * 0.5;
                const puntoControlX = (startX1 + endX1) / 1.5;
                const puntoControlY = (startY1 + startY1) / 2 + alturaCanal * 1;
                ctx.lineTo(endX1, startY1);
                ctx.quadraticCurveTo(puntoControlX, puntoControlY, startX1, startY1);
                break;
                
            case "canal2":
                const startX2 = IZQUIERDA_X;
                const endX2 = IZQUIERDA_X + ancho;
                const startY2 = bottomY;
                const alturaCanal2 = (bottomY - topY) * 2;
                const puntoControlX2 = (startX2 + endX2) / 1.5;
                const puntoControlY2 = (startY2 + startY2) / 2 + alturaCanal2 * 1;
                ctx.lineTo(endX2, startY2);
                ctx.quadraticCurveTo(puntoControlX2, puntoControlY2, startX2, startY2);
                break;
                
            case "vacio_1":
                ctx.lineTo(startX, startY);
                ctx.closePath();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                ctx.lineTo(endX, topY);
                ctx.stroke();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, topY);
                ctx.lineTo(endX, bottomY);
                ctx.stroke();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, topY);
                ctx.lineTo(startX, bottomY);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                return;
                
            case "vacio_2":
                ctx.lineTo(startX, startY);
                ctx.closePath();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                ctx.lineTo(endX, topY);
                ctx.stroke();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, topY);
                ctx.lineTo(endX, bottomY);
                ctx.stroke();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, topY);
                ctx.lineTo(startX, bottomY);
                ctx.stroke();
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1 * escala;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(endX, topY);
                ctx.lineTo(endX, bottomY);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(startX, bottomY);
                return;
                
            default:
                ctx.lineTo(startX, startY);
        }
        
        // Cerrar la figura para el relleno
        if (tipoBordeSuperior !== "discontinuo" && 
            tipoBordeSuperior !== "inf_transparente" &&
            tipoBordeSuperior !== "sup_transparente" &&
            tipoBordeSuperior !== "sup_inf_transparente" &&
            tipoBordeSuperior !== "sup_inf_der_transparente" &&
            tipoBordeSuperior !== "ondulado_inf_trans" &&
            tipoBordeSuperior !== "ondulado_sup_trans" &&
            tipoBordeSuperior !== "ondulado_inf_sup_trans" &&
            tipoBordeSuperior !== "vacio_1" &&
            tipoBordeSuperior !== "vacio_2") {
            ctx.closePath();
        }
        
        // Relleno
        if (tipoBordeSuperior !== "discontinuo" && 
            tipoBordeSuperior !== "inf_transparente" &&
            tipoBordeSuperior !== "sup_transparente" &&
            tipoBordeSuperior !== "sup_inf_transparente" &&
            tipoBordeSuperior !== "sup_inf_der_transparente" &&
            tipoBordeSuperior !== "ondulado_inf_trans" &&
            tipoBordeSuperior !== "ondulado_sup_trans" &&
            tipoBordeSuperior !== "ondulado_inf_sup_trans" &&
            tipoBordeSuperior !== "vacio_1" &&
            tipoBordeSuperior !== "vacio_2") {
            ctx.fillStyle = color;
            ctx.fill();
            
            if (trama !== "solido") {
                const tramaPattern = this.tramasManager.crearTrama(trama, "#000000", tamanoTrama * escala);
                if (tramaPattern) {
                    ctx.save();
                    ctx.globalCompositeOperation = "source-atop";
                    ctx.fillStyle = tramaPattern;
                    ctx.fill();
                    ctx.restore();
                }
            }
        }
        
        // Borde
        if (tipoBordeSuperior !== "discontinuo" && 
            tipoBordeSuperior !== "inf_transparente" &&
            tipoBordeSuperior !== "sup_transparente" &&
            tipoBordeSuperior !== "sup_inf_transparente" &&
            tipoBordeSuperior !== "sup_inf_der_transparente" &&
            tipoBordeSuperior !== "ondulado_inf_trans" &&
            tipoBordeSuperior !== "ondulado_sup_trans" &&
            tipoBordeSuperior !== "ondulado_inf_sup_trans" &&
            tipoBordeSuperior !== "vacio_1" &&
            tipoBordeSuperior !== "vacio_2") {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1 * escala;
            ctx.stroke();
        }
        
        // Símbolos
        this._dibujarSimbolos(estrato, escala);
        
        // Puntos de control
        if (mostrarPuntos && 
            tipoBordeSuperior !== "discontinuo" && 
            tipoBordeSuperior !== "inf_transparente" &&
            tipoBordeSuperior !== "sup_transparente" &&
            tipoBordeSuperior !== "sup_inf_transparente" &&
            tipoBordeSuperior !== "sup_inf_der_transparente" &&
            tipoBordeSuperior !== "ondulado_inf_trans" &&
            tipoBordeSuperior !== "ondulado_sup_trans" &&
            tipoBordeSuperior !== "ondulado_inf_sup_trans" &&
            tipoBordeSuperior !== "vacio_1" &&
            tipoBordeSuperior !== "vacio_2") {
            this._dibujarPuntosControl(estrato, escala);
        }
        
        // Etiqueta
        this._dibujarEtiqueta(estrato, index, escala);
    }

    /**
     * Dibuja los símbolos de un estrato
     * @param {Estrato} estrato
     * @param {number} escala
     * @private
     */
    _dibujarSimbolos(estrato, escala) {
        if (!estrato.simbolosDerecha?.length) return;

        const ctx = this.ctx;
        const IZQUIERDA_X = this.config.IZQUIERDA_X;
        const offsetDerecha = 30 * escala;
        const rangoMovimientoX = 80 * escala;

        estrato.simbolosDerecha.forEach((simboloInfo) => {
            let x, y;
            const size = (simboloInfo.tamano || 20) * escala;
            
            if (simboloInfo.posicion === 'interior') {
                const desplazamientoX = Math.max(0, Math.min(1, simboloInfo.proporcionX || 0.5)) * estrato.ancho;
                x = IZQUIERDA_X + desplazamientoX;
                y = estrato.topY + Math.max(0, Math.min(1, simboloInfo.proporcionY || 0.5)) * estrato.alto;
            } else {
                const desplazamientoX = Math.max(0, Math.min(1, simboloInfo.proporcionX || 0.5)) * rangoMovimientoX;
                x = IZQUIERDA_X + estrato.ancho + offsetDerecha + desplazamientoX;
                y = estrato.topY + Math.max(0, Math.min(1, simboloInfo.proporcionY || 0.5)) * estrato.alto;
            }
            
            const img = this.tramasManager.simbolos[simboloInfo.tipo];
            if (img?.complete && img.naturalWidth > 0) {
                const proporcion = img.naturalWidth / img.naturalHeight;
                let drawWidth = size;
                let drawHeight = size / proporcion;
                if (proporcion < 1) {
                    drawHeight = size;
                    drawWidth = size * proporcion;
                }
                ctx.drawImage(img, x - drawWidth/2, y - drawHeight/2, drawWidth, drawHeight);
            }
        });
    }

    /**
     * Dibuja los puntos de control
     * @param {Estrato} estrato
     * @param {number} escala
     * @private
     */
    _dibujarPuntosControl(estrato, escala) {
        const ctx = this.ctx;
        
        ctx.beginPath();
        ctx.arc(estrato.puntoControl.x, estrato.puntoControl.y, 6 * escala, 0, Math.PI * 2);
        ctx.fillStyle = estrato.puntoControl.arrastrando ? '#ff9900' : '#cc0000';
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1 * escala;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(estrato.puntoControlSuperior.x, estrato.puntoControlSuperior.y, 4 * escala, 0, Math.PI * 2);
        ctx.fillStyle = estrato.puntoControlSuperior.arrastrando ? '#ff9900' : '#0066cc';
        ctx.fill();
        ctx.stroke();
    }

    /**
     * Dibuja la etiqueta del estrato
     * @param {Estrato} estrato
     * @param {number} index
     * @param {number} escala
     * @private
     */
    _dibujarEtiqueta(estrato, index, escala) {
        const ctx = this.ctx;
        const IZQUIERDA_X = this.config.IZQUIERDA_X;
        const texto = estrato.nombre || `Estrato ${index + 1}`;
        const puntoMedioY = estrato.topY + (estrato.alto / 2);
        const maxWidth = (IZQUIERDA_X - 100) * escala;
        const posX = (IZQUIERDA_X - 90) * escala;
        const lineHeight = 14 * escala;

        ctx.fillStyle = '#000000';
        ctx.font = `${12 * escala}px Arial`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';

        const lineas = this._dividirTexto(ctx, texto, maxWidth);
        const alturaTotal = lineas.length * lineHeight;
        const yInicio = puntoMedioY - (alturaTotal / 2);

        lineas.forEach((linea, i) => {
            const yLinea = yInicio + (i * lineHeight);
            if (yLinea >= estrato.topY && yLinea <= estrato.bottomY) {
                ctx.fillText(linea, posX, yLinea);
            }
        });
    }

    /**
     * Divide el texto en líneas
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} texto
     * @param {number} maxWidth
     * @returns {string[]}
     * @private
     */
    _dividirTexto(ctx, texto, maxWidth) {
        const palabras = texto.split(' ');
        const lineas = [];
        let lineaActual = palabras[0] || '';

        for (let i = 1; i < palabras.length; i++) {
            const prueba = lineaActual + ' ' + palabras[i];
            if (ctx.measureText(prueba).width < maxWidth) {
                lineaActual = prueba;
            } else {
                lineas.push(lineaActual);
                lineaActual = palabras[i];
            }
        }
        lineas.push(lineaActual);
        return lineas;
    }

    /**
     * Dibuja la escala vertical
     * @param {number} profundidadTotal
     * @param {number} escala
     * @private
     */
    _dibujarEscalaVertical(profundidadTotal, escala = 1) {
        const ctx = this.ctx;
        const IZQUIERDA_X = this.config.IZQUIERDA_X;
        
        if (this.estratos.length === 0) return;
        
        let techoY = Infinity;
        let baseY = -Infinity;
        
        for (const estrato of this.estratos) {
            if (estrato.topY < techoY) techoY = estrato.topY;
            if (estrato.bottomY > baseY) baseY = estrato.bottomY;
        }
        
        const inicioY = techoY;
        const finY = baseY;
        const pixelesPorMetro = this.config.PIXELES_POR_METRO;
        const alturaTotalPixeles = finY - inicioY;
        const metrosTotales = alturaTotalPixeles / pixelesPorMetro;

        ctx.strokeStyle = '#000';
        ctx.fillStyle = '#000';
        ctx.font = `${12 * escala}px Arial`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.lineWidth = 1 * escala;

        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X - 20, inicioY);
        ctx.lineTo(IZQUIERDA_X - 20, finY);
        ctx.stroke();
        
        const separacionMinima = this.config.SEPARACION_MINIMA_ETIQUETAS;
        let intervalo = separacionMinima / pixelesPorMetro;
        
        const esRedondo = (num) => {
            const precision = 0.001;
            return Math.abs(num - Math.round(num)) < precision;
        };
        
        if (!esRedondo(intervalo) || intervalo < 1) {
            const factores = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100];
            let mejorFactor = factores[0];
            for (const f of factores) {
                if (Math.abs(intervalo - f) < Math.abs(intervalo - mejorFactor)) {
                    mejorFactor = f;
                }
                if (f >= intervalo) break;
            }
            intervalo = mejorFactor;
        }
        
        const maxIntervalo = metrosTotales / 3;
        if (intervalo > maxIntervalo && maxIntervalo > 0) {
            intervalo = maxIntervalo;
        }
        if (intervalo < 0.01) intervalo = 0.01;

        for (let m = 0; m <= metrosTotales; m += intervalo) {
            const y = finY - (m * pixelesPorMetro);
            
            if (y >= inicioY && y <= finY) {
                ctx.beginPath();
                ctx.moveTo(IZQUIERDA_X - 25, y);
                ctx.lineTo(IZQUIERDA_X - 15, y);
                ctx.stroke();

                if (intervalo > 1) {
                    const subIntervalo = intervalo / 2;
                    for (let s = 0; s < intervalo; s += subIntervalo) {
                        if (s > 0 && s < intervalo) {
                            const ySub = finY - ((m + s) * pixelesPorMetro);
                            if (ySub >= inicioY && ySub <= finY) {
                                ctx.beginPath();
                                ctx.moveTo(IZQUIERDA_X - 20, ySub);
                                ctx.lineTo(IZQUIERDA_X - 15, ySub);
                                ctx.stroke();
                            }
                        }
                    }
                }

                let etiqueta;
                if (this.config.INVERTIR_ESCALA) {
                    const profundidad = metrosTotales - m;
                    if (intervalo < 1) {
                        etiqueta = `${this._formatearNumero(Math.round(profundidad * 100))} cm`;
                    } else if (profundidad === 0 || Number.isInteger(profundidad)) {
                        etiqueta = `${this._formatearNumero(profundidad)} m`;
                    } else {
                        etiqueta = `${this._formatearNumero(profundidad.toFixed(1), true)} m`;
                    }
                } else {
                    const profundidad = m;
                    if (intervalo < 1) {
                        etiqueta = `${this._formatearNumero(Math.round(profundidad * 100))} cm`;
                    } else if (profundidad === 0 || Number.isInteger(profundidad)) {
                        etiqueta = `${this._formatearNumero(profundidad)} m`;
                    } else {
                        etiqueta = `${this._formatearNumero(profundidad.toFixed(1), true)} m`;
                    }
                }
                
                ctx.fillText(etiqueta, IZQUIERDA_X - 30 * escala, y);
            }
        }
    }

    /**
     * Formatea un número con separador de miles
     * @private
     */
    _formatearNumero(numero, esDecimal = false) {
        if (esDecimal) {
            return numero.toString().replace('.', ',');
        }
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    /**
     * Dibuja la escala horizontal completa
     * @param {number} escala - Escala de dibujo
     * @private
     */
    _dibujarEscalaHorizontal(escala = 1) {
        const ctx = this.ctx;
        const IZQUIERDA_X = this.config.IZQUIERDA_X;
        
        const margenInferior = this.config.MARGEN_INFERIOR || 200;
        const yEscala = this.canvas.height - margenInferior + 10;
        
        const inicioX = IZQUIERDA_X + this.config.DESPLAZAMIENTO_ESCALA_HORIZONTAL + 100;
        const finX = inicioX + this.config.ANCHO_ESCALA_HORIZONTAL;

        ctx.strokeStyle = "#3c3c3c";
        ctx.fillStyle = "#000";
        ctx.font = `${12 * escala}px Roboto`;
        ctx.textAlign = "center";
        ctx.lineWidth = 1 * escala;

        // Líneas base
        ctx.beginPath();
        ctx.moveTo(inicioX, yEscala);
        ctx.lineTo(finX, yEscala);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(inicioX - 50, yEscala + 50);
        ctx.lineTo(finX, yEscala + 50);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(inicioX - 50, yEscala + 100);
        ctx.lineTo(finX, yEscala + 100);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(inicioX - 50, yEscala + 150);
        ctx.lineTo(finX, yEscala + 150);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(inicioX - 50, yEscala + 190);
        ctx.lineTo(finX, yEscala + 190);
        ctx.stroke();

        // Líneas verticales
        ctx.beginPath();
        ctx.moveTo(inicioX - (16.6 * 3), yEscala + 50);
        ctx.lineTo(inicioX - (16.6 * 3), yEscala + 190);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(finX, yEscala + 50);
        ctx.lineTo(finX, yEscala + 190);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(inicioX - 18, yEscala + 50);
        ctx.lineTo(inicioX - 18, yEscala + 190);
        ctx.stroke();

        // Etiquetas
        const etiquetas = ["", "1/256", "1/16", "1/8", "0,5", "2", "4", "64", "256", "500", "1.000"];
        const numDivisiones = etiquetas.length - 1;
        const posicionesX = [];

        const etiquetas2 = ["Clástico", "lutita", "limo", "Af", "Am", "Ag", "Cf", "Cm", "Cg", "Blo"];
        const etiquetas3 = ["Volcan.", "  ", "  ", "ceniza", "  ", "", "lapilli ", "  ", "bomba/", "bloque"];
        const etiquetas4 = ["", "Mst", "", "Wst", "Pst", "Gst", "Rst", "Fst", "", "", ""];
        const etiquetas5 = ["Caliza", "", "", "", "", "", "", "", "", ""];
        const etiquetas6 = ["[mm]", "", "", "", "", "", "", "", "", ""];

        for (let i = 0; i < etiquetas.length; i++) {
            const x = inicioX + (i * this.config.ANCHO_ESCALA_HORIZONTAL) / numDivisiones;
            posicionesX.push(x);

            ctx.beginPath();
            ctx.moveTo(x, yEscala - 5 * escala);
            ctx.lineTo(x, yEscala + 5 * escala);
            ctx.stroke();
            
            if (i <= 7) {
                ctx.beginPath();
                ctx.moveTo(x, yEscala + 45 * escala);
                ctx.lineTo(x, yEscala + 100 * escala);
                ctx.stroke();
            }
            
            if (i != 1 && i != 7 && i != 8 && i != 9 && i != 10) {
                ctx.beginPath();
                ctx.moveTo(x, yEscala + 150 * escala);
                ctx.lineTo(x, yEscala + 155 * escala);
                ctx.stroke();
            }
            
            if (i === 4 || i === 6) {
                ctx.beginPath();
                ctx.moveTo(x, yEscala + 100 * escala);
                ctx.lineTo(x, yEscala + 150 * escala);
                ctx.stroke();
            }
            
            ctx.save();
            ctx.translate(x - 16, yEscala + 25 * escala);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(etiquetas[i], 0, -10);
            ctx.fillText(etiquetas4[i], -145, -10);
            ctx.restore();
        }

        for (let i = 0; i < etiquetas2.length; i++) {
            const x = inicioX + (i * this.config.ANCHO_ESCALA_HORIZONTAL) / numDivisiones + 7;

            ctx.save();
            ctx.translate(x - 36, (yEscala + 75) * escala);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(etiquetas2[i], 0, -6);
            ctx.fillText(etiquetas3[i], -50, -6);
            ctx.fillText(etiquetas5[i], -95, -6);
            ctx.fillText(etiquetas6[i], +50, -6);
            ctx.restore();
        }

        ctx.textAlign = "start";
        return posicionesX;
    }

    /**
     * Dibuja las guías verticales
     * @param {number} escala - Escala de dibujo
     * @private
     */
    _dibujarGuiasVerticales(escala) {
        if (!this.config.MOSTRAR_GUIAS_VERTICALES) return;

        const ctx = this.ctx;
        const IZQUIERDA_X = this.config.IZQUIERDA_X;
        const inicioX = IZQUIERDA_X + this.config.DESPLAZAMIENTO_ESCALA_HORIZONTAL + 100;
        
        const etiquetas = ["", "1/256", "1/16", "1/8", "0,5", "2", "4", "64", "256", "500", "1.000"];
        const numDivisiones = etiquetas.length - 1;
        const posiciones = [];

        for (let i = 0; i < etiquetas.length; i++) {
            const x = inicioX + (i * this.config.ANCHO_ESCALA_HORIZONTAL) / numDivisiones;
            posiciones.push(x);
        }

        ctx.strokeStyle = "rgba(0, 100, 200, 0.6)";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([4, 4]);

        const margenInferior = this.config.MARGEN_INFERIOR || 200;
        const yLimite = this.canvas.height - margenInferior + 10;

        posiciones.forEach((x) => {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, yLimite - 20);
            ctx.stroke();
        });

        ctx.setLineDash([]);
    }
}