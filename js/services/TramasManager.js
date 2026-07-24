import { 
    TRADUCCIONES_TRAMA, 
    TRADUCCIONES_SIMBOLOS 
} from '../config.js';

/**
 * MAPEO DE TRAMAS - Usa los nombres exactos de tus archivos
 */
const MAPEO_TRAMAS = {
    "conglomerado_op1": "601 Grava o conglomerado opción1.svg",
    "conglomerado_op2": "602 Conglomerado o grava opción 2.svg",
    "conglomerado_cruzado": "603 Grava o conglomerado con estratificación cruzada.svg",
    "brecha_op1": "605 Brecha 1ra opción.svg",
    "brecha_op2": "606 Brecha 2da opción.svg",
    "arenisca_maciza": "607 Arenisca o arena maciza.svg",
    "arenisca_estratificada": "608 Arenisca o arena estratificada.svg",
    "arenisca_cruzada_op1": "609 Arenisca o arena con estratificación cruzada 1ra opción.svg",
    "arenisca_cruzada_op2": "610 Arenisca o arena con estratificación cruzada 2daa opción.svg",
    "arenisca_ondulada": "611 Arenisca o arena con estratificación ondulada.svg",
    "arenisca_arcillosa": "612 Arenisca arcillosa o argilizada.svg",
    "arenisca_calcare": "613 Arenisca calcárea.svg",
    "arenisca_dolomitica": "614 Arenisca dolomítica.svg",
    "limolita_arcillosa": "616 Limo, limolita o lutita arcillosa.svg",
    "limolita_calcare": "617 Limolita calcárea.svg",
    "limolita_dolomitica": "618 Limolita dolomítica.svg",
    "lutita_arenosa": "619 Lutita arenosa o limosa.svg",
    "lutita": "620 Arcilla o lutita.svg",
    "lutita_chert": "621 Lutita chert o chert pizarroso.svg",
    "lutita_dolomitica": "622 Lutita dolomítica.svg",
    "lutita_calcare": "623 Lutita calcárea o marmol.svg",
    "lutita_carbonosa": "624 Lutita carbonosa.svg",
    "lutita_petrolifera": "625 Lutita petrolífera.svg",
    "creta": "626 Creta.svg",
    "caliza": "627 Caliza.svg",
    "caliza_clastica": "628 Caliza clástica.svg",
    "caliza_fosilifera": "629 Caliza fosilifera clástica.svg",
    "caliza_nodular": "630 Caliza nodular o con estratificación irregular.svg",
    "caliza_madrigueras": "631 Caliza, rellenos irregulares -madrigueras- de dolomita sacaroidal.svg",
    "caliza_cruzada": "632 Caliza con estratificación cruzada.svg",
    "caliza_chert_cruzada": "633 Caliza chert con estratificación cruzada.svg",
    "caliza_arenosa_chert": "634 Caliza arenosa y con chert, clástica con estratificación cruzada.svg",
    "caliza_oolitica": "635 Caliza oolitica.svg",
    "caliza_arenosa": "636 Caliza arenosa.svg",
    "caliza_limosa": "637 Caliza limosa.svg",
    "caliza_lutitica": "638 Caliza lutítica o arcillosa.svg",
    "caliza_chert_op1": "639 Caliza con chert 1ra opción.svg",
    "caliza_chert_op2": "640 Caliza con chert 2da opción.svg",
    "caliza_dolomitica": "641 Caliza dolomítica, dolomita calcárea, dolomía calcárea.svg",
    "dolomita": "642 Dolomita o dolomía.svg",
    "dolomita_cruzada": "643 Dolomita o dolomía con estratificación cruzada.svg",
    "dolomita_oolitica": "644 Dolomita o dolomía oolítica.svg",
    "dolomita_arenosa": "645 Dolomita o dolomía arenosa.svg",
    "dolomita_limosa": "646 Dolomita o dolomía limosa.svg",
    "dolomita_lutitica": "647 Dolomita o dolomía arcillosa o lutítica.svg",
    "dolomita_chert": "648 Dolomita o dolomía con chert.svg",
    "chert_op1": "649 Chert estratificado 1ra opción.svg",
    "chert_op2": "650 Chert estratificado 2da opción.svg",
    "chert_fosilifero": "651 Chert estratificado fosilifero.svg",
    "roca_fosilifera": "652 Roca fosilífera.svg",
    "roca_diatomitica": "653 Roca diatomítica o con diatomeas.svg",
    "subgrauvaca": "654 Subgrauvaca.svg",
    "subgrauvaca_cruzada": "655 Subgrauvaca con estratificación cruzada.svg",
    "subgrauvaca_ondulada": "656 Subgrauvaca con estratificación ondulada.svg",
    "turba": "657 Turba.svg",
    "carbon": "658 Carbón.svg",
    "carbon_impuro": "659 Carbón con huesos o carbón impuro.svg",
    "paleosuelo": "660 Paleosuelo, arcilla basal, underclay.svg",
    "flintclay": "661 Flintclay o pedernal.svg",
    "bentonita": "662 Bentonita.svg",
    "glauconita": "663 Glauconita.svg",
    "limonita": "664 Limonita.svg",
    "siderita": "665 Siderita.svg",
    "fosforita": "666 Roca fosfática nodular, fósforita.svg",
    "yeso": "667 Yeso.svg",
    "sal": "668 Sal.svg",
    "arenisca_limolita": "669 Arenisca y limolta interestratificada.svg",
    "arenisca_lutita": "670 Arenisca y lutita interestratificada.svg",
    "arenisca_lutita_ondulada": "671 Arenisca y lutita interestratificada con estratificación ondulada.svg",
    "lutita_caliza_limosa": "672 Lutita y caliza limosa interestratificada.svg",
    "lutita_caliza_op1": "673 Lutita y caliza interestratificada 1ra opción.svg",
    "lutita_caliza_op2": "674 Lutita y caliza interestratificada 2da opción.svg",
    "lutita_caliza_calcare": "675 Lutita calcarea y caliza interestratificada.svg",
    "caliza_limosa_lutita_op1": "676 Caliza limosa y lutita interestatificada 1ra opción.svg",
    "caliza_lutita_op1": "677 Caliza y lutita interestratificada 1ra opción.svg",
    "caliza_lutita_op2": "678 Caliza y lutita interestratificada 2da opción.svg",
    "caliza_lutita_op3": "679 Caliza y lutita interestratificada 3ra opción.svg",
    "caliza_lutita_calcare": "680 Caliza y lutita calcarea interestratificada.svg",
    "till_op1": "681 Till o diamicto 1ra opción.svg",
    "till_op2": "682 Till o diamicto 2da opción.svg",
    "till_op3": "683 Till o diamicto 3ra opción.svg",
    "loess_op1": "684 Loess 1ra opción.svg",
    "loess_op2": "685 Loess 2da opción.svg",
    "loess_op3": "686 Loess 3ra opción.svg",
    "metamorfismo": "701 Metamorfismo.svg",
    "cuarcita": "702 Cuarcita.svg",
    "pizarra": "703 Pizarra.svg",
    "granito_esquistoso": "704 Granito esquistoso o gneisico.svg",
    "esquisto": "705 Esquisto.svg",
    "esquisto_contorsionado": "706 Esquisto contorsionado.svg",
    "esquisto_gneis": "707 Esquisto y gneis.svg",
    "gneis": "708 Gneis.svg",
    "gneis_contorsionado": "709 Gneis contorsionado.svg",
    "esteatita": "710 Esteatita, talco o serpentinita.svg",
    "roca_tufitica": "711 Roca tufítica.svg",
    "toba_cristalina": "712 Toba cristalina.svg",
    "toba_desvitrificada": "713 Toba desvitrificada.svg",
    "brecha_volcanica_toba": "714 Brecha volcánica y toba.svg",
    "brecha_volcanica": "715 Brecha volcánica o aglomerado.svg",
    "roca_zeolitica": "716 Roca zeolítica.svg",
    "flujos_basalticos": "717 Flujos basálticos.svg",
    "granito_op1": "718 Granito 1ra opción.svg",
    "granito_op2": "719 Granito 2da opción.svg",
    "roca_ignea_bandeada": "720 Roca ígnea bandeada.svg",
    "roca_ignea_op1": "721 Roca ígnea 1ra opción.svg",
    "roca_ignea_op2": "722 Roca ígnea 2da opción.svg",
    "roca_ignea_op3": "723 Roca ígnea 3ra opción.svg",
    "roca_ignea_op4": "724 Roca ígnea 4ta.svg",
    "roca_ignea_op5": "725 Roca ígnea 5ta.svg",
    "roca_ignea_op6": "726 Roca ígnea 6ta.svg",
    "roca_ignea_op7": "727 Roca ígnea 7ma.svg",
    "roca_ignea_op8": "728 Roca ígnea 8va.svg",
    "roca_porfirica_op1": "729 Roca porfírica 1ra opción.svg",
    "roca_porfirica_op2": "730 Roca porfírica 2da opción.svg",
    "vitrofiro": "731 Vitrófiro.svg",
    "cuarzo": "732 Cuarzo.svg",
    "mineralizacion": "733 Mineralización.svg",
    "SNGM 001 Grava o conglomerado imbricado clastosoportado": "SNGM 001 Grava o conglomerado imbricado clastosoportado.svg"
};

const MAPEO_SIMBOLOS = {
    "10.2.1 Macrofosiles": "10.2.1 Macrofosiles.svg",
    "10.2.2 Invertebrados": "10.2.2 Invertebrados.svg",
    "10.2.3 Anélidos": "10.2.3 Anélidos.svg",
    "10.2.4 Artrópodos": "10.2.4 Artrópodos.svg",
    "10.2.5 Aracnidos": "10.2.5 Aracnidos.svg",
    "10.2.6 Crustáceos": "10.2.6 Crustáceos.svg",
    "10.2.7 Insectos": "10.2.7 Insectos.svg",
    "10.2.8 Trilobites": "10.2.8 Trilobites.svg",
    "10.2.9 Braquiopodos": "10.2.9 Braquiopodos.svg",
    "10.2.10 Briozoos": "10.2.10 Briozoos.svg",
    "10.2.11 Cnidarios": "10.2.11 Cnidarios.svg",
    "10.2.12 Corales": "10.2.12 Corales.svg",
    "10.2.13 Estromatoporoideos": "10.2.13 Estromatoporoideos.svg",
    "10.2.14 Equinodermos": "10.2.14 Equinodermos.svg",
    "10.2.15 Crinoideos": "10.2.15 Crinoideos.svg",
    "10.2.16 Equinoideos": "10.2.16 Equinoideos.svg",
    "10.2.17 Graptolitos": "10.2.17 Graptolitos.svg",
    "10.2.18 moluscos": "10.2.18 moluscos.svg",
    "10.2.19 Cefalópodos": "10.2.19 Cefalópodos.svg",
    "10.2.20 Amonoideos": "10.2.20 Amonoideos.svg",
    "10.2.21 Belemnoideos": "10.2.21 Belemnoideos.svg",
    "10.2.22 Nautiloideos": "10.2.22 Nautiloideos.svg",
    "10.2.23 Gastrópodos": "10.2.23 Gastrópodos.svg",
    "10.2.24 Pelecípodos": "10.2.24 Pelecípodos.svg",
    "10.2.25 Esponjas": "10.2.25 Esponjas.svg",
    "10.2.26 Vertebrados": "10.2.26 Vertebrados.svg",
    "10.2.27 Anfibios": "10.2.27 Anfibios.svg",
    "10.2.28 Peces": "10.2.28 Peces.svg",
    "10.2.29 Mamíferos": "10.2.29 Mamíferos.svg",
    "10.2.30 Reptiles": "10.2.30 Reptiles.svg",
    "10.2.31 Plantas": "10.2.31 Plantas.svg",
    "10.2.32 Hojas": "10.2.32 Hojas.svg",
    "10.2.33 Raíces": "10.2.33 Raíces.svg",
    "10.2.34 Madera": "10.2.34 Madera.svg",
    "10.2.35 Algas": "10.2.35 Algas.svg",
    "10.2.36 Coníferas": "10.2.36 Coníferas.svg",
    "10.2.37 Helechos": "10.2.37 Helechos.svg",
    "10.2.38 Plantas o árboles con flores": "10.2.38 Plantas o árboles con flores.svg",
    "10.2.39 Estromatolitos": "10.2.39 Estromatolitos.svg",
    "10.2.40 Fungi": "10.2.40 Fungi.svg",
    "10.2.41 Trazas fósiles": "10.2.41 Trazas fósiles.svg",
    "10.2.42 Madrigueras": "10.2.42 Madrigueras.svg",
    "10.2.43 Coprolitos": "10.2.43 Coprolitos.svg",
    "10.2.44 Huellas": "10.2.44 Huellas.svg",
    "10.2.45 Microfósiles": "10.2.45 Microfósiles.svg",
    "10.2.46 Conodontos": "10.2.46 Conodontos.svg",
    "10.2.47 Diatomeas": "10.2.47 Diatomeas.svg",
    "10.2.48 Foraminíferos": "10.2.48 Foraminíferos.svg",
    "10.2.49 Grandes foraminíferos o fusulínidos": "10.2.49 Grandes foraminíferos o fusulínidos.svg",
    "10.2.50 Foraminíferos bentónicos, pequeños": "10.2.50 Foraminíferos bentónicos, pequeños.svg",
    "10.2.51 Foraminíferos planctónicos, pequeños": "10.2.51 Foraminíferos planctónicos, pequeños.svg",
    "10.2.52 Nanofósiles": "10.2.52 Nanofósiles.svg",
    "10.2.53 Ostrácodos": "10.2.53 Ostrácodos.svg",
    "10.2.54 Palinomorfos": "10.2.54 Palinomorfos.svg",
    "10.2.55 Acritarcos": "10.2.55 Acritarcos.svg",
    "10.2.56 Quitinozoos": "10.2.56 Quitinozoos.svg",
    "10.2.57 Dinoflagelados": "10.2.57 Dinoflagelados.svg",
    "10.2.58 Polen o esporas": "10.2.58 Polen o esporas.svg",
    "10.2.59 Radiolarios": "10.2.59 Radiolarios.svg",
    "10.2.60 Silicoflagelados": "10.2.60 Silicoflagelados.svg",
    "10.2.61 Espículas": "10.2.61 Espículas.svg",
    "concreciones": "concreciones.svg",
    "meteorizacion_esferoidal": "meteorizacion_esferoidal.svg",
    "raices": "raices.svg",
    "SNGM Algas calcáreas": "SNGM Algas calcáreas.svg",
    "SNGM Bioturbación": "SNGM Bioturbación.svg",
    "SNGM Diatomeas": "SNGM Diatomeas.svg",
    "SNGM Fauna fósil indiferenciada": "SNGM Fauna fósil indiferenciada.svg",
    "SNGM Flora fósil": "SNGM Flora fósil.svg",
    "SNGM Foraminíferos": "SNGM Foraminíferos.svg",
    "SNGM Invertebrados marinos": "SNGM Invertebrados marinos.svg",
    "SNGM Mamíferos marinos": "SNGM Mamíferos marinos.svg",
    "SNGM Microfauna sin especificar": "SNGM Microfauna sin especificar.svg",
    "SNGM Peces, esqueletos y escamas": "SNGM Peces, esqueletos y escamas.svg",
    "SNGM Polen y o esporas": "SNGM Polen y o esporas.svg",
    "SNGM Radiolarios": "SNGM Radiolarios.svg",
    "SNGM Raiz en posición de vida": "SNGM Raiz en posición de vida.svg",
    "SNGM Rastros y pisadas 1": "SNGM Rastros y pisadas 1.svg",
    "SNGM Rastros y pisadas 2": "SNGM Rastros y pisadas 2.svg",
    "SNGM Restos de tronco": "SNGM Restos de tronco.svg",
    "SNGM Trazas fósiles 2": "SNGM Trazas fósiles 2.svg",
    "SNGM Trazas fósiles 3": "SNGM Trazas fósiles 3.svg",
    "SNGM Trazas fósiles": "SNGM Trazas fósiles.svg",
    "SNGM Tronco en posición de vida": "SNGM Tronco en posición de vida.svg",
    "SNGM Vertebrados": "SNGM Vertebrados.svg"
};

/**
 * Gestor de tramas y símbolos
 */
export class TramasManager {
    constructor() {
        this.tramas = {};
        this.simbolos = {};
        this.traducciones = {
            tramas: TRADUCCIONES_TRAMA,
            simbolos: TRADUCCIONES_SIMBOLOS
        };
        this._cargando = false;
        this._promesas = [];
        this._cargados = {
            tramas: 0,
            simbolos: 0,
            total: 0
        };
    }

    /**
     * Registra todas las tramas y símbolos
     * @returns {Promise<void>}
     */
    async registrarTodos() {
        if (this._cargando) {
            await Promise.all(this._promesas);
            return;
        }

        this._cargando = true;
        this._promesas = [];

        const totalTramas = Object.keys(MAPEO_TRAMAS).length;
        const totalSimbolos = Object.keys(MAPEO_SIMBOLOS).length;
        this._cargados.total = totalTramas + totalSimbolos;

        console.log(`🔄 Cargando ${totalTramas} tramas y ${totalSimbolos} símbolos...`);

        // Registrar tramas
        for (const [nombre, archivo] of Object.entries(MAPEO_TRAMAS)) {
            this._promesas.push(this._cargarTrama(nombre, archivo));
        }

        // Registrar símbolos
        for (const [nombre, archivo] of Object.entries(MAPEO_SIMBOLOS)) {
            this._promesas.push(this._cargarSimbolo(nombre, archivo));
        }

        await Promise.all(this._promesas);
        this._cargando = false;
        
        console.log(`✅ Cargados: ${this._cargados.tramas} tramas, ${this._cargados.simbolos} símbolos`);
    }

    /**
     * Carga una trama desde archivo
     * @param {string} nombre - Nombre interno de la trama
     * @param {string} archivo - Nombre del archivo
     * @returns {Promise<void>}
     * @private
     */
    _cargarTrama(nombre, archivo) {
        return new Promise((resolve) => {
            if (this.tramas[nombre]) {
                resolve();
                return;
            }

            const img = new Image();
            // Usar ruta relativa desde el archivo HTML
            const ruta = `./tramas/${encodeURIComponent(archivo)}`;
            
            img.onload = () => {
                this._cargados.tramas++;
                console.log(`✅ Trama [${this._cargados.tramas}/${Object.keys(MAPEO_TRAMAS).length}]: ${nombre}`);
                this.tramas[nombre] = img;
                resolve();
            };
            
            img.onerror = (error) => {
                console.warn(`⚠️ Error cargando trama: ${nombre} (${ruta})`);
                // Crear una trama de fallback visible
                const canvas = this._crearTramaFallback(nombre);
                const fallbackImg = new Image();
                fallbackImg.onload = () => {
                    this.tramas[nombre] = fallbackImg;
                    resolve();
                };
                fallbackImg.src = canvas.toDataURL();
            };
            
            img.src = ruta;
            
            // Timeout para no esperar indefinidamente
            setTimeout(() => {
                if (!img.complete) {
                    console.warn(`⏰ Timeout cargando: ${nombre}`);
                    img.onerror(new Event('timeout'));
                }
            }, 8000);
        });
    }

    /**
     * Crea una trama de fallback visible
     * @param {string} nombre - Nombre de la trama
     * @returns {HTMLCanvasElement}
     * @private
     */
    _crearTramaFallback(nombre) {
        const canvas = document.createElement('canvas');
        canvas.width = 30;
        canvas.height = 30;
        const ctx = canvas.getContext('2d');
        
        // Fondo con patrón de cuadrícula
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, 30, 30);
        
        // Cuadrícula
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 30; i += 5) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 30);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(30, i);
            ctx.stroke();
        }
        
        // Texto de error
        ctx.fillStyle = '#ff0000';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('!', 15, 15);
        
        return canvas;
    }

    /**
     * Carga un símbolo desde archivo
     * @param {string} nombre - Nombre interno del símbolo
     * @param {string} archivo - Nombre del archivo
     * @returns {Promise<void>}
     * @private
     */
    _cargarSimbolo(nombre, archivo) {
        return new Promise((resolve) => {
            if (this.simbolos[nombre]) {
                resolve();
                return;
            }

            const img = new Image();
            const ruta = `./simbolos/${encodeURIComponent(archivo)}`;
            
            img.onload = () => {
                this._cargados.simbolos++;
                console.log(`✅ Símbolo [${this._cargados.simbolos}/${Object.keys(MAPEO_SIMBOLOS).length}]: ${nombre}`);
                this.simbolos[nombre] = img;
                resolve();
            };
            
            img.onerror = (error) => {
                console.warn(`⚠️ Error cargando símbolo: ${nombre} (${ruta})`);
                // Crear un placeholder circular
                const canvas = this._crearSimboloFallback(nombre);
                const fallbackImg = new Image();
                fallbackImg.onload = () => {
                    this.simbolos[nombre] = fallbackImg;
                    resolve();
                };
                fallbackImg.src = canvas.toDataURL();
            };
            
            img.src = ruta;
            
            // Timeout para no esperar indefinidamente
            setTimeout(() => {
                if (!img.complete) {
                    console.warn(`⏰ Timeout cargando símbolo: ${nombre}`);
                    img.onerror(new Event('timeout'));
                }
            }, 8000);
        });
    }

    /**
     * Crea un placeholder para símbolos
     * @param {string} nombre - Nombre del símbolo
     * @returns {HTMLCanvasElement}
     * @private
     */
    _crearSimboloFallback(nombre) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Fondo circular
        const grad = ctx.createRadialGradient(32, 32, 5, 32, 32, 30);
        grad.addColorStop(0, '#4CAF50');
        grad.addColorStop(1, '#2E7D32');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.fill();
        
        // Inicial
        const inicial = nombre.charAt(0).toUpperCase();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(inicial, 32, 32);
        
        // Borde
        ctx.strokeStyle = '#1B5E20';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.stroke();
        
        return canvas;
    }

    /**
     * Crea un patrón de trama
     * @param {string} tipo - Tipo de trama
     * @param {string} color - Color de la trama
     * @param {number} tamano - Tamaño de la trama
     * @returns {CanvasPattern|null}
     */
 crearTrama(tipo, color = '#000000', tamano = 30) {
    const canvas = document.createElement('canvas');
    canvas.width = tamano;
    canvas.height = tamano;
    const ctx = canvas.getContext('2d');

    const img = this.tramas[tipo];
    if (img && img.complete && img.naturalWidth > 0) {
        try {
            ctx.drawImage(img, 0, 0, tamano, tamano);
            return ctx.createPattern(canvas, 'repeat');
        } catch (e) {
            console.warn(`⚠️ Error al crear patrón para ${tipo}:`, e);
        }
    }

    // ✅ Fallback: trama con patrón de cuadrícula (visible)
    ctx.fillStyle = color || '#cccccc';
    ctx.fillRect(0, 0, tamano, tamano);
    
    // Agregar líneas para que se vea la textura
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < tamano; i += 4) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, tamano);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(tamano, i);
        ctx.stroke();
    }
    
    return ctx.createPattern(canvas, 'repeat');
}

    /**
     * Obtiene la traducción de una trama
     * @param {string} tipo
     * @returns {string}
     */
    obtenerTraduccionTrama(tipo) {
        return this.traducciones.tramas[tipo] || tipo;
    }

    /**
     * Obtiene la traducción de un símbolo
     * @param {string} tipo
     * @returns {string}
     */
    obtenerTraduccionSimbolo(tipo) {
        return this.traducciones.simbolos[tipo] || tipo;
    }

    /**
     * Verifica si una trama está cargada
     * @param {string} tipo
     * @returns {boolean}
     */
    isTramaCargada(tipo) {
        const img = this.tramas[tipo];
        return img && img.complete && img.naturalWidth > 0;
    }
}