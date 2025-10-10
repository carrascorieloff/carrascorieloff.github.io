// Función para mostrar el pop-up y copiar el contenido del canvas
function mostrarPopup() {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const popupCanvas = document.getElementById("popupCanvas");
  const popupCtx = popupCanvas.getContext("2d");

  // Mostrar el pop-up y el overlay
  popup.style.display = "block";
  overlay.style.display = "block";

  // Establecer dimensiones del canvas del pop-up
  popupCanvas.width = canvas.width;
  popupCanvas.height = canvas.height;

  // ✅ Redibujar SIN puntos de control en el canvas principal primero
  dibujar(false); // <-- ¡Aquí es donde se ocultan los puntos!

  // Copiar el contenido del canvas principal al canvas del pop-up
  popupCtx.drawImage(canvas, 0, 0);

  // ✅ Volver a dibujar CON puntos de control en el canvas principal
  setTimeout(() => dibujar(true), 100);
}

// Función para cerrar el pop-up
function cerrarPopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Cerrar pop-up si se hace clic en el overlay
document.getElementById("overlay").addEventListener("click", cerrarPopup);

// Asociar el evento click al botón
document
  .getElementById("btnMostrarPopup")
  .addEventListener("click", mostrarPopup);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasContainer = document.getElementById("canvasContainer");
const panelesContainer = document.getElementById("panelesEstratos");
// ================================
// CARGA DE IMÁGENES SVG PARA TRAMAS
// ================================
const tramasSVG = {};
// ✅ NUEVO: Cargar imágenes SVG para los símbolos a la derecha
const simbolosSVG = {};

// ✅ Función para registrar tramas SVG fácilmente
function registrarTramaSVG(nombre, ruta) {
  if (!tramasSVG[nombre]) {
    tramasSVG[nombre] = new Image();
    tramasSVG[nombre].src = ruta;
    tramasSVG[nombre].onerror = () =>
      console.error(`❌ Error cargando trama SVG: ${nombre} desde ${ruta}`);
    tramasSVG[nombre].onload = () =>
      console.log(`✅ Trama SVG cargada: ${nombre}`);
  }
}
// ✅ Función para registrar símbolos SVG
function registrarSimboloSVG(nombre, ruta) {
  if (!simbolosSVG[nombre]) {
    simbolosSVG[nombre] = new Image();
    simbolosSVG[nombre].src = ruta;
    simbolosSVG[nombre].onerror = () =>
      console.error(`❌ Error cargando símbolo SVG: ${nombre} desde ${ruta}`);
    simbolosSVG[nombre].onload = () =>
      console.log(`✅ Símbolo SVG cargado: ${nombre}`);
  }
}
// ✅ Registrar tramas SVG con nombres técnicos (sin espacios)
registrarTramaSVG("conglomerado_op1", "601 Grava o conglomerado opción1.svg");
registrarTramaSVG("conglomerado_op2", "602 Conglomerado o grava opción 2.svg");
registrarTramaSVG(
  "conglomerado_cruzado",
  "603 Grava o conglomerado con estratificación cruzada.svg"
);
registrarTramaSVG("brecha_op1", "605 Brecha 1ra opción.svg");
registrarTramaSVG("brecha_op2", "606 Brecha 2da opción.svg");
registrarTramaSVG("arenisca_maciza", "607 Arenisca o arena maciza.svg");
registrarTramaSVG(
  "arenisca_estratificada",
  "608 Arenisca o arena estratificada.svg"
);
registrarTramaSVG(
  "arenisca_cruzada_op1",
  "609 Arenisca o arena con estratificación cruzada 1ra opción.svg"
);
registrarTramaSVG(
  "arenisca_cruzada_op2",
  "610 Arenisca o arena con estratificación cruzada 2daa opción.svg"
);
registrarTramaSVG(
  "arenisca_ondulada",
  "611 Arenisca o arena con estratificación ondulada.svg"
);
registrarTramaSVG(
  "arenisca_arcillosa",
  "612 Arenisca arcillosa o argilizada.svg"
);
registrarTramaSVG("arenisca_calcare", "613 Arenisca calcárea.svg");
registrarTramaSVG("arenisca_dolomitica", "614 Arenisca dolomítica.svg");
registrarTramaSVG(
  "limolita_arcillosa",
  "616 Limo, limolita o lutita arcillosa.svg"
);
registrarTramaSVG("limolita_calcare", "617 Limolita calcárea.svg");
registrarTramaSVG("limolita_dolomitica", "618 Limolita dolomítica.svg");
registrarTramaSVG("lutita_arenosa", "619 Lutita arenosa o limosa.svg");
registrarTramaSVG("lutita", "620 Arcilla o lutita.svg");
registrarTramaSVG("lutita_chert", "621 Lutita chert o chert pizarroso.svg");
registrarTramaSVG("lutita_dolomitica", "622 Lutita dolomítica.svg");
registrarTramaSVG("lutita_calcare", "623 Lutita calcárea o marmol.svg");
registrarTramaSVG("lutita_carbonosa", "624 Lutita carbonosa.svg");
registrarTramaSVG("lutita_petrolifera", "625 Lutita petrolífera.svg");
registrarTramaSVG("creta", "626 Creta.svg");
registrarTramaSVG("caliza", "627 Caliza.svg");
registrarTramaSVG("caliza_clastica", "628 Caliza clástica.svg");
registrarTramaSVG("caliza_fosilifera", "629 Caliza fosilifera clástica.svg");
registrarTramaSVG(
  "caliza_nodular",
  "630 Caliza nodular o con estratificación irregular.svg"
);
registrarTramaSVG(
  "caliza_madrigueras",
  "631 Caliza, rellenos irregulares -madrigueras- de dolomita sacaroidal.svg"
);
registrarTramaSVG(
  "caliza_cruzada",
  "632 Caliza con estratificación cruzada.svg"
);
registrarTramaSVG(
  "caliza_chert_cruzada",
  "633 Caliza chert con estratificación cruzada.svg"
);
registrarTramaSVG(
  "caliza_arenosa_chert",
  "634 Caliza arenosa y con chert, clástica con estratificación cruzada.svg"
);
registrarTramaSVG("caliza_oolitica", "635 Caliza oolitica.svg");
registrarTramaSVG("caliza_arenosa", "636 Caliza arenosa.svg");
registrarTramaSVG("caliza_limosa", "637 Caliza limosa.svg");
registrarTramaSVG("caliza_lutitica", "638 Caliza lutítica o arcillosa.svg");
registrarTramaSVG("caliza_chert_op1", "639 Caliza con chert 1ra opción.svg");
registrarTramaSVG("caliza_chert_op2", "640 Caliza con chert 2da opción.svg");
registrarTramaSVG(
  "caliza_dolomitica",
  "641 Caliza dolomítica, dolomita calcárea, dolomía calcárea.svg"
);
registrarTramaSVG("dolomita", "642 Dolomita o dolomía.svg");
registrarTramaSVG(
  "dolomita_cruzada",
  "643 Dolomita o dolomía con estratificación cruzada.svg"
);
registrarTramaSVG("dolomita_oolitica", "644 Dolomita o dolomía oolítica.svg");
registrarTramaSVG("dolomita_arenosa", "645 Dolomita o dolomía arenosa.svg");
registrarTramaSVG("dolomita_limosa", "646 Dolomita o dolomía limosa.svg");
registrarTramaSVG(
  "dolomita_lutitica",
  "647 Dolomita o dolomía arcillosa o lutítica.svg"
);
registrarTramaSVG("dolomita_chert", "648 Dolomita o dolomía con chert.svg");
registrarTramaSVG("chert_op1", "649 Chert estratificado 1ra opción.svg");
registrarTramaSVG("chert_op2", "650 Chert estratificado 2da opción.svg");
registrarTramaSVG("chert_fosilifero", "651 Chert estratificado fosilifero.svg");
registrarTramaSVG("roca_fosilifera", "652 Roca fosilífera.svg");
registrarTramaSVG(
  "roca_diatomitica",
  "653 Roca diatomítica o con diatomeas.svg"
);
registrarTramaSVG("subgrauvaca", "654 Subgrauvaca.svg");
registrarTramaSVG(
  "subgrauvaca_cruzada",
  "655 Subgrauvaca con estratificación cruzada.svg"
);
registrarTramaSVG(
  "subgrauvaca_ondulada",
  "656 Subgrauvaca con estratificación ondulada.svg"
);
registrarTramaSVG("turba", "657 Turba.svg");
registrarTramaSVG("carbon", "658 Carbón.svg");
registrarTramaSVG("carbon_impuro", "659 Carbón con huesos o carbón impuro.svg");
registrarTramaSVG("paleosuelo", "660 Paleosuelo, arcilla basal, underclay.svg");
registrarTramaSVG("flintclay", "661 Flintclay o pedernal.svg");
registrarTramaSVG("bentonita", "662 Bentonita.svg");
registrarTramaSVG("glauconita", "663 Glauconita.svg");
registrarTramaSVG("limonita", "664 Limonita.svg");
registrarTramaSVG("siderita", "665 Siderita.svg");
registrarTramaSVG("fosforita", "666 Roca fosfática nodular, fósforita.svg");
registrarTramaSVG("yeso", "667 Yeso.svg");
registrarTramaSVG("sal", "668 Sal.svg");
registrarTramaSVG(
  "arenisca_limolita",
  "669 Arenisca y limolta interestratificada.svg"
);
registrarTramaSVG(
  "arenisca_lutita",
  "670 Arenisca y lutita interestratificada.svg"
);
registrarTramaSVG(
  "arenisca_lutita_ondulada",
  "671 Arenisca y lutita interestratificada con estratificación ondulada.svg"
);
registrarTramaSVG(
  "lutita_caliza_limosa",
  "672 Lutita y caliza limosa interestratificada.svg"
);
registrarTramaSVG(
  "lutita_caliza_op1",
  "673 Lutita y caliza interestratificada 1ra opción.svg"
);
registrarTramaSVG(
  "lutita_caliza_op2",
  "674 Lutita y caliza interestratificada 2da opción.svg"
);
registrarTramaSVG(
  "lutita_caliza_calcare",
  "675 Lutita calcarea y caliza interestratificada.svg"
);
registrarTramaSVG(
  "caliza_limosa_lutita_op1",
  "676 Caliza limosa y lutita interestatificada 1ra opción.svg"
);
registrarTramaSVG(
  "caliza_lutita_op1",
  "677 Caliza y lutita interestratificada 1ra opción.svg"
);
registrarTramaSVG(
  "caliza_lutita_op2",
  "678 Caliza y lutita interestratificada 2da opción.svg"
);
registrarTramaSVG(
  "caliza_lutita_op3",
  "679 Caliza y lutita interestratificada 3ra opción.svg"
);
registrarTramaSVG(
  "caliza_lutita_calcare",
  "680 Caliza y lutita calcarea interestratificada.svg"
);
registrarTramaSVG("till_op1", "681 Till o diamicto 1ra opción.svg");
registrarTramaSVG("till_op2", "682 Till o diamicto 2da opción.svg");
registrarTramaSVG("till_op3", "683 Till o diamicto 3ra opción.svg");
registrarTramaSVG("loess_op1", "684 Loess 1ra opción.svg");
registrarTramaSVG("loess_op2", "685 Loess 2da opción.svg");
registrarTramaSVG("loess_op3", "686 Loess 3ra opción.svg");
registrarTramaSVG("metamorfismo", "701 Metamorfismo.svg");
registrarTramaSVG("cuarcita", "702 Cuarcita.svg");
registrarTramaSVG("pizarra", "703 Pizarra.svg");
registrarTramaSVG(
  "granito_esquistoso",
  "704 Granito esquistoso o gneisico.svg"
);
registrarTramaSVG("esquisto", "705 Esquisto.svg");
registrarTramaSVG("esquisto_contorsionado", "706 Esquisto contorsionado.svg");
registrarTramaSVG("esquisto_gneis", "707 Esquisto y gneis.svg");
registrarTramaSVG("gneis", "708 Gneis.svg");
registrarTramaSVG("gneis_contorsionado", "709 Gneis contorsionado.svg");
registrarTramaSVG("esteatita", "710 Esteatita, talco o serpentinita.svg");
registrarTramaSVG("roca_tufitica", "711 Roca tufítica.svg");
registrarTramaSVG("toba_cristalina", "712 Toba cristalina.svg");
registrarTramaSVG("toba_desvitrificada", "713 Toba desvitrificada.svg");
registrarTramaSVG("brecha_volcanica_toba", "714 Brecha volcánica y toba.svg");
registrarTramaSVG("brecha_volcanica", "715 Brecha volcánica o aglomerado.svg");
registrarTramaSVG("roca_zeolitica", "716 Roca zeolítica.svg");
registrarTramaSVG("flujos_basalticos", "717 Flujos basálticos.svg");
registrarTramaSVG("granito_op1", "718 Granito 1ra opción.svg");
registrarTramaSVG("granito_op2", "719 Granito 2da opción.svg");
registrarTramaSVG("roca_ignea_bandeada", "720 Roca ígnea bandeada.svg");
registrarTramaSVG("roca_ignea_op1", "721 Roca ígnea 1ra opción.svg");
registrarTramaSVG("roca_ignea_op2", "722 Roca ígnea 2da opción.svg");
registrarTramaSVG("roca_ignea_op3", "723 Roca ígnea 3ra opción.svg");
registrarTramaSVG("roca_ignea_op4", "724 Roca ígnea 4ta.svg");
registrarTramaSVG("roca_ignea_op5", "725 Roca ígnea 5ta.svg");
registrarTramaSVG("roca_ignea_op6", "726 Roca ígnea 6ta.svg");
registrarTramaSVG("roca_ignea_op7", "727 Roca ígnea 7ma.svg");
registrarTramaSVG("roca_ignea_op8", "728 Roca ígnea 8va.svg");
registrarTramaSVG("roca_porfirica_op1", "729 Roca porfírica 1ra opción.svg");
registrarTramaSVG("roca_porfirica_op2", "730 Roca porfírica 2da opción.svg");
registrarTramaSVG("vitrofiro", "731 Vitrófiro.svg");
registrarTramaSVG("cuarzo", "732 Cuarzo.svg");
registrarTramaSVG("mineralizacion", "733 Mineralización.svg");
registrarTramaSVG(
  "SNGM 001 Grava o conglomerado imbricado clastosoportado",
  "SNGM 001 Grava o conglomerado imbricado clastosoportado.svg"
);
// ✅ Registrar símbolos SVG para la derecha
registrarSimboloSVG("10.2.1 Macrofosiles", "simbolos/10.2.1 Macrofosiles.svg");
registrarSimboloSVG(
  "10.2.2 Invertebrados",
  "simbolos/10.2.2 Invertebrados.svg"
);
registrarSimboloSVG("10.2.3 Anélidos", "simbolos/10.2.3 Anélidos.svg");
registrarSimboloSVG("10.2.4 Artrópodos", "simbolos/10.2.4 Artrópodos.svg");
registrarSimboloSVG("10.2.5 Aracnidos", "simbolos/10.2.5 Aracnidos.svg");
registrarSimboloSVG("10.2.6 Crustáceos", "simbolos/10.2.6 Crustáceos.svg");
registrarSimboloSVG("10.2.7 Insectos", "simbolos/10.2.7 Insectos.svg");
registrarSimboloSVG("10.2.8 Trilobites", "simbolos/10.2.8 Trilobites.svg");
registrarSimboloSVG("10.2.9 Braquiopodos", "simbolos/10.2.9 Braquiopodos.svg");
registrarSimboloSVG("10.2.10 Briozoos", "simbolos/10.2.10 Briozoos.svg");
registrarSimboloSVG("10.2.11 Cnidarios", "simbolos/10.2.11 Cnidarios.svg");
registrarSimboloSVG("10.2.12 Corales", "simbolos/10.2.12 Corales.svg");
registrarSimboloSVG(
  "10.2.13 Estromatoporoideos",
  "simbolos/10.2.13 Estromatoporoideos.svg"
);
registrarSimboloSVG(
  "10.2.14 Equinodermos",
  "simbolos/10.2.14 Equinodermos.svg"
);
registrarSimboloSVG("10.2.15 Crinoideos", "simbolos/10.2.15 Crinoideos.svg");
registrarSimboloSVG("10.2.16 Equinoideos", "simbolos/10.2.16 Equinoideos.svg");
registrarSimboloSVG("10.2.17 Graptolitos", "simbolos/10.2.17 Graptolitos.svg");
registrarSimboloSVG("10.2.18 moluscos", "simbolos/10.2.18 moluscos.svg");
registrarSimboloSVG("10.2.19 Cefalópodos", "simbolos/10.2.19 Cefalópodos.svg");
registrarSimboloSVG("10.2.20 Amonoideos", "simbolos/10.2.20 Amonoideos.svg");
registrarSimboloSVG(
  "10.2.21 Belemnoideos",
  "simbolos/10.2.21 Belemnoideos.svg"
);
registrarSimboloSVG(
  "10.2.22 Nautiloideos",
  "simbolos/10.2.22 Nautiloideos.svg"
);
registrarSimboloSVG("10.2.23 Gastrópodos", "simbolos/10.2.23 Gastrópodos.svg");
registrarSimboloSVG("10.2.24 Pelecípodos", "simbolos/10.2.24 Pelecípodos.svg");
registrarSimboloSVG("10.2.25 Esponjas", "simbolos/10.2.25 Esponjas.svg");
registrarSimboloSVG("10.2.26 Vertebrados", "simbolos/10.2.26 Vertebrados.svg");
registrarSimboloSVG("10.2.27 Anfibios", "simbolos/10.2.27 Anfibios.svg");
registrarSimboloSVG("10.2.28 Peces", "simbolos/10.2.28 Peces.svg");
registrarSimboloSVG("10.2.29 Mamíferos", "simbolos/10.2.29 Mamíferos.svg");
registrarSimboloSVG("10.2.30 Reptiles", "simbolos/10.2.30 Reptiles.svg");
registrarSimboloSVG("10.2.31 Plantas", "simbolos/10.2.31 Plantas.svg");
registrarSimboloSVG("10.2.32 Hojas", "simbolos/10.2.32 Hojas.svg");
registrarSimboloSVG("10.2.33 Raíces", "simbolos/10.2.33 Raíces.svg");
registrarSimboloSVG("10.2.34 Madera", "simbolos/10.2.34 Madera.svg");
registrarSimboloSVG("10.2.35 Algas", "simbolos/10.2.35 Algas.svg");
registrarSimboloSVG("10.2.36 Coníferas", "simbolos/10.2.36 Coníferas.svg");
registrarSimboloSVG("10.2.37 Helechos", "simbolos/10.2.37 Helechos.svg");
registrarSimboloSVG(
  "10.2.38 Plantas o árboles con flores",
  "simbolos/10.2.38 Plantas o árboles con flores.svg"
);
registrarSimboloSVG(
  "10.2.39 Estromatolitos",
  "simbolos/10.2.39 Estromatolitos.svg"
);
registrarSimboloSVG("10.2.40 Fungi", "simbolos/10.2.40 Fungi.svg");
registrarSimboloSVG(
  "10.2.41 Trazas fósiles",
  "simbolos/10.2.41 Trazas fósiles.svg"
);
registrarSimboloSVG("10.2.42 Madrigueras", "simbolos/10.2.42 Madrigueras.svg");
registrarSimboloSVG("10.2.43 Coprolitos", "simbolos/10.2.43 Coprolitos.svg");
registrarSimboloSVG("10.2.44 Huellas", "simbolos/10.2.44 Huellas.svg");
registrarSimboloSVG(
  "10.2.45 Microfósiles",
  "simbolos/10.2.45 Microfósiles.svg"
);
registrarSimboloSVG("10.2.46 Conodontos", "simbolos/10.2.46 Conodontos.svg");
registrarSimboloSVG("10.2.47 Diatomeas", "simbolos/10.2.47 Diatomeas.svg");
registrarSimboloSVG(
  "10.2.48 Foraminíferos",
  "simbolos/10.2.48 Foraminíferos.svg"
);
registrarSimboloSVG(
  "10.2.49 Grandes foraminíferos o fusulínidos",
  "simbolos/10.2.49 Grandes foraminíferos o fusulínidos.svg"
);
registrarSimboloSVG(
  "10.2.50 Foraminíferos bentónicos, pequeños",
  "simbolos/10.2.50 Foraminíferos bentónicos, pequeños.svg"
);
registrarSimboloSVG(
  "10.2.51 Foraminíferos planctónicos, pequeños",
  "simbolos/10.2.51 Foraminíferos planctónicos, pequeños.svg"
);
registrarSimboloSVG("10.2.52 Nanofósiles", "simbolos/10.2.52 Nanofósiles.svg");
registrarSimboloSVG("10.2.53 Ostrácodos", "simbolos/10.2.53 Ostrácodos.svg");
registrarSimboloSVG(
  "10.2.54 Palinomorfos",
  "simbolos/10.2.54 Palinomorfos.svg"
);
registrarSimboloSVG("10.2.55 Acritarcos", "simbolos/10.2.55 Acritarcos.svg");
registrarSimboloSVG("10.2.56 Quitinozoos", "simbolos/10.2.56 Quitinozoos.svg");
registrarSimboloSVG(
  "10.2.57 Dinoflagelados",
  "simbolos/10.2.57 Dinoflagelados.svg"
);
registrarSimboloSVG(
  "10.2.58 Polen o esporas",
  "simbolos/10.2.58 Polen o esporas.svg"
);
registrarSimboloSVG("10.2.59 Radiolarios", "simbolos/10.2.59 Radiolarios.svg");
registrarSimboloSVG(
  "10.2.60 Silicoflagelados",
  "simbolos/10.2.60 Silicoflagelados.svg"
);
registrarSimboloSVG("10.2.61 Espículas", "simbolos/10.2.61 Espículas.svg");
registrarSimboloSVG("concreciones", "simbolos/concreciones.svg");
registrarSimboloSVG(
  "meteorizacion_esferoidal",
  "simbolos/meteorizacion_esferoidal.svg"
);
registrarSimboloSVG("raices", "simbolos/raices.svg");
registrarSimboloSVG(
  "SNGM Algas calcáreas",
  "simbolos/SNGM Algas calcáreas.svg"
);
registrarSimboloSVG("SNGM Bioturbación", "simbolos/SNGM Bioturbación.svg");
registrarSimboloSVG("SNGM Diatomeas", "simbolos/SNGM Diatomeas.svg");
registrarSimboloSVG(
  "SNGM Fauna fósil indiferenciada",
  "simbolos/SNGM Fauna fósil indiferenciada.svg"
);
registrarSimboloSVG("SNGM Flora fósil", "simbolos/SNGM Flora fósil.svg");
registrarSimboloSVG("SNGM Foraminíferos", "simbolos/SNGM Foraminíferos.svg");
registrarSimboloSVG(
  "SNGM Invertebrados marinos",
  "simbolos/SNGM Invertebrados marinos.svg"
);
registrarSimboloSVG(
  "SNGM Mamíferos marinos",
  "simbolos/SNGM Mamíferos marinos.svg"
);
registrarSimboloSVG(
  "SNGM Microfauna sin especificar",
  "simbolos/SNGM Microfauna sin especificar.svg"
);
registrarSimboloSVG(
  "SNGM Peces, esqueletos y escamas",
  "simbolos/SNGM Peces, esqueletos y escamas.svg"
);
registrarSimboloSVG(
  "SNGM Polen y o esporas",
  "simbolos/SNGM Polen y o esporas.svg"
);
registrarSimboloSVG("SNGM Radiolarios", "simbolos/SNGM Radiolarios.svg");
registrarSimboloSVG(
  "SNGM Raiz en posición de vida",
  "simbolos/SNGM Raiz en posición de vida.svg"
);
registrarSimboloSVG(
  "SNGM Rastros y pisadas 1",
  "simbolos/SNGM Rastros y pisadas 1.svg"
);
registrarSimboloSVG(
  "SNGM Rastros y pisadas 2",
  "simbolos/SNGM Rastros y pisadas 2.svg"
);
registrarSimboloSVG(
  "SNGM Restos de tronco",
  "simbolos/SNGM Restos de tronco.svg"
);
registrarSimboloSVG(
  "SNGM Trazas fósiles 2",
  "simbolos/SNGM Trazas fósiles 2.svg"
);
registrarSimboloSVG(
  "SNGM Trazas fósiles 3",
  "simbolos/SNGM Trazas fósiles 3.svg"
);
registrarSimboloSVG("SNGM Trazas fósiles", "simbolos/SNGM Trazas fósiles.svg");
registrarSimboloSVG(
  "SNGM Tronco en posición de vida",
  "simbolos/SNGM Tronco en posición de vida.svg"
);
registrarSimboloSVG("SNGM Vertebrados", "simbolos/SNGM Vertebrados.svg");
// ================================
// CONFIGURACIÓN INICIAL
// ================================
const IZQUIERDA_X = 200;
let estratos = [];
let estratoArrastrando = null;
let PIXELES_POR_METRO = 100;
let ANCHO_ESCALA_HORIZONTAL = 150; // Ancho total de la escala horizontal en píxeles (ajustable)
let DESPLAZAMIENTO_ESCALA_HORIZONTAL = 0; // Nueva variable: desplazamiento en píxeles
let mostrarGuiasVerticales = false;
// ================================
// CLASE ESTRATO (MODIFICADA)
// ================================
class Estrato {
  constructor(
    alto = 150,
    ancho = 300,
    color = "#cccccc",
    trama = "solido",
    tamanoTrama = 30,
    simbolo = "ninguno",
    tipoBordeSuperior = "recto"
  ) {
    this.alto = alto;
    this.ancho = ancho;
    this.color = color;
    this.trama = trama;
    this.tamanoTrama = tamanoTrama;
    this.simbolo = simbolo;
    this.tipoBordeSuperior = tipoBordeSuperior;
    this.nombre = `Estrato ${estratos.length + 1}`; // <-- ¡NUEVA PROPIEDAD!
    this.topY = 0;
    this.bottomY = 0;
    this.puntoControl = {
      x: IZQUIERDA_X + ancho,
      y: 0,
      arrastrando: false,
      posicionManual: false,
      proporcionX: 1.0,
      proporcionY: 0.5,
    };
    this.simbolosDerecha = [];
  }
}
// ================================
// GENERADOR DE TRAMAS (solo texturas, sin fondo)
// ================================
function crearTrama(tipo, color = "#cccccc", tamano = 30) {
  const canvasTrama = document.createElement("canvas");
  canvasTrama.width = tamano;
  canvasTrama.height = tamano;
  const ctxTrama = canvasTrama.getContext("2d");
  ctxTrama.fillStyle = color;
  ctxTrama.strokeStyle = color;
  ctxTrama.lineWidth = Math.max(0.5, tamano / 60);
  // ✅ Soporte generalizado para tramas SVG — ¡con verificación robusta!
  if (tramasSVG[tipo]) {
    const img = tramasSVG[tipo];
    // ✅ Verificación robusta: loaded + valid dimensions
    if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
      try {
        const escala = (5 * tamano) / Math.max(img.width, img.height);
        const canvasTemp = document.createElement("canvas");
        const ctxTemp = canvasTemp.getContext("2d");
        canvasTemp.width = img.width * escala;
        canvasTemp.height = img.height * escala;
        ctxTemp.drawImage(img, 0, 0, canvasTemp.width, canvasTemp.height);
        return ctx.createPattern(canvasTemp, "repeat");
      } catch (e) {
        console.warn(`⚠️ Error al crear patrón para ${tipo}:`, e);
        ctxTrama.fillRect(0, 0, tamano, tamano); // fallback seguro
      }
    } else {
      // ✅ Fallback seguro: relleno sólido si la imagen no está lista
      console.warn(`Imagen no lista para trama: ${tipo}`);
      ctxTrama.fillRect(0, 0, tamano, tamano);
    }
  } else {
    // Tramas generadas por código
    switch (tipo) {
      case "solido":
        ctxTrama.fillRect(0, 0, tamano, tamano);
        break;
      default:
        ctxTrama.fillRect(0, 0, tamano, tamano);
    }
  }
  return ctx.createPattern(canvasTrama, "repeat");
}
// ================================
// DIBUJAR SÍMBOLOS COMO IMÁGENES SVG
// ================================
function dibujarSimbolo(ctx, tipo, x, y, size, color) {
  const img = simbolosSVG[tipo];
  if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
    // Dibujar la imagen SVG centrada en (x, y)
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  } else {
    // Fallback: dibujar un cuadrado rojo si la imagen no está lista
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
    ctx.fillStyle = "#ffffff";
    ctx.font = "8px Arial";
    ctx.textAlign = "center";
    ctx.fillText("?", x, y + 3);
    console.warn(`Símbolo no cargado: ${tipo}`);
  }
}
// ================================
// CALCULAR POSICIONES + ALTURA TOTAL
// ================================
function calcularPosicionesEstratos() {
  let alturaTotal = 0;
  for (const estrato of estratos) {
    alturaTotal += estrato.alto;
  }
  const margenInferior = 200;
  const margenSuperior = 100;
  canvas.height = alturaTotal + margenInferior + margenSuperior;
  let yActual = alturaTotal + margenSuperior;
  for (let i = 0; i < estratos.length; i++) {
    const estrato = estratos[i];
    estrato.bottomY = yActual;
    estrato.topY = yActual - estrato.alto;
    yActual = estrato.topY;
    // ✅ ¡NUEVO! Actualizar posición Y del punto de control según proporción
    if (estrato.puntoControl.posicionManual) {
      estrato.puntoControl.y =
        estrato.topY + estrato.puntoControl.proporcionY * estrato.alto;
    } else {
      estrato.puntoControl.y = (estrato.topY + estrato.bottomY) / 2; // centrado
    }
  }
  return alturaTotal;
}
// ================================
// DIBUJAR ESCALA VERTICAL — ¡CORREGIDO!
// ================================
function dibujarEscalaVertical(profundidadTotal, escala = 1) {
  const inicioY = estratos.length > 0 ? estratos[0].bottomY : 100;
  const finY = estratos.length > 0 ? estratos[estratos.length - 1].topY : 800;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  ctx.font = `${12 * escala}px Arial`; // <-- ESCALAR FUENTE
  ctx.textAlign = "right";
  ctx.beginPath();
  ctx.moveTo(IZQUIERDA_X - 20, finY);
  ctx.lineTo(IZQUIERDA_X - 20, inicioY);
  ctx.stroke();
  ctx.lineWidth = 1 * escala; // <-- ESCALAR GROSOR DE LÍNEA

  const metrosTotales = profundidadTotal / PIXELES_POR_METRO;
  const intervaloMetros =
    metrosTotales > 100 ? 10 : metrosTotales > 20 ? 10 : 1;

  for (let metros = 0; metros <= metrosTotales; metros += intervaloMetros) {
    const y = inicioY - metros * PIXELES_POR_METRO;
    ctx.beginPath();
    ctx.moveTo(IZQUIERDA_X - 25, y);
    ctx.lineTo(IZQUIERDA_X - 15, y);
    ctx.stroke();
    ctx.fillText(`${metros} m`, IZQUIERDA_X - 30 * escala, y + 4 * escala); // <-- ESCALAR POSICIÓN DE TEXTO
  }
  ctx.textAlign = "start";
}

// ================================
// DIBUJAR ESCALA HORIZONTAL — ¡CORREGIDO!
// ================================
function dibujarEscalaHorizontal(escala = 1) {
  const yEscala = canvas.height - 190;
  const inicioX = IZQUIERDA_X + DESPLAZAMIENTO_ESCALA_HORIZONTAL + 100;
  const finX = inicioX + ANCHO_ESCALA_HORIZONTAL;

  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  ctx.font = `${12 * escala}px Arial`;
  ctx.textAlign = "center";
  ctx.lineWidth = 1 * escala;

  // Línea base
  ctx.beginPath();
  ctx.moveTo(inicioX, yEscala);
  ctx.lineTo(finX, yEscala);
  ctx.stroke();

  // Etiquetas fijas
  const etiquetas = ["a", "l", "Af", "Am", "Ag", "Gf", "Gm", "Gg"];
  const numDivisiones = etiquetas.length - 1;
  const posicionesX = [];

  for (let i = 0; i < etiquetas.length; i++) {
    const x = inicioX + (i * ANCHO_ESCALA_HORIZONTAL) / numDivisiones;
    posicionesX.push(x);

    // Marca
    ctx.beginPath();
    ctx.moveTo(x, yEscala - 5 * escala);
    ctx.lineTo(x, yEscala + 5 * escala);
    ctx.stroke();

    // Etiqueta
    ctx.fillText(etiquetas[i], x, yEscala + 20 * escala);
  }

  ctx.textAlign = "start";
  return posicionesX; // ← Devolver posiciones para usar en guías
}
// ================================
// DIBUJAR TODO — ¡CORREGIDO PARA ALTA RESOLUCIÓN!
// ================================
function dibujar(mostrarPuntos = true, escala = 1) {
  const profundidadTotal = calcularPosicionesEstratos();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dibujarEscalaVertical(profundidadTotal, escala);
  const posicionesXGuías = dibujarEscalaHorizontal(escala);

  // ✅ DIBUJAR GUÍAS VERTICALES (si están activadas)
  if (mostrarGuiasVerticales) {
    ctx.strokeStyle = "rgba(0, 100, 200, 0.3)";
    ctx.lineWidth = 1 * escala;
    ctx.setLineDash([5, 5]); // Línea punteada

    posicionesXGuías.forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    });

    ctx.setLineDash([]); // Restaurar línea continua
  }

  // Dibujar en orden normal: del primer estrato al último
  estratos.forEach((estrato, index) => {
    if (!estrato.puntoControl.posicionManual) {
      estrato.puntoControl.y = (estrato.topY + estrato.bottomY) / 2;
      estrato.puntoControl.x =
        IZQUIERDA_X + estrato.ancho * estrato.puntoControl.proporcionX;
    }

    // Dibujar estrato
    ctx.beginPath();
    // 1. Empezar en esquina inferior izquierda
    ctx.moveTo(IZQUIERDA_X, estrato.bottomY);
    // 2. Subir por borde izquierdo (recto)
    ctx.lineTo(IZQUIERDA_X, estrato.topY);
    // 3. Dibujar borde superior (siempre recto)
    const endX = IZQUIERDA_X + estrato.ancho; //la escala aumenta el ancho
    ctx.lineTo(endX, estrato.topY);
    // 4. Dibujar borde derecho con curva de Bézier (¡punto de control activo!)
    ctx.quadraticCurveTo(
      estrato.puntoControl.x,
      estrato.puntoControl.y,
      endX,
      estrato.bottomY
    );
    // 5. Dibujar borde INFERIOR según tipo (de derecha a izquierda)
    const startX = IZQUIERDA_X;
    const startY = estrato.bottomY;
    switch (estrato.tipoBordeSuperior) {
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
          const y =
            amplitud +
            startY +
            Math.sin(((x - startX) / (endX - startX)) * ciclos * Math.PI * 2) *
              amplitud;
          if (Math.abs(y - prevY) > 0.1 || x === endX || x === startX) {
            ctx.setLineDash([]);
            ctx.lineTo(x, y);
            prevY = y;
          }
        }

        break;
      case "discontinuo":
        // === Paso 1: Cerrar la ruta actual para el relleno ===
        ctx.lineTo(startX, startY); // ← Cerrar la figura (base recta, temporalmente)
        ctx.closePath(); // ← ¡IMPORTANTE! Cerrar para que el fill funcione

        // === Paso 2: Aplicar relleno (color + trama) ===
        ctx.fillStyle = estrato.color;
        ctx.fill();

        if (estrato.trama !== "solido") {
          const trama = crearTrama(
            estrato.trama,
            "#000000",
            estrato.tamanoTrama * escala
          );
          ctx.save();
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = trama;
          ctx.fill();
          ctx.restore();
        }

        // === Paso 3: Dibujar los 3 lados con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.bottomY); // Esquina inferior izquierda
        ctx.lineTo(IZQUIERDA_X, estrato.topY); // Lado izquierdo
        ctx.lineTo(endX, estrato.topY); // Lado superior
        ctx.quadraticCurveTo(
          // Lado derecho (curvo)
          estrato.puntoControl.x,
          estrato.puntoControl.y,
          endX,
          estrato.bottomY
        );
        ctx.stroke(); // ← Dibuja los 3 lados continuos

        // === Paso 4: Dibujar SOLO la base con línea DISCONTINUA ===
        ctx.setLineDash([15, 15]); // Guiones de 15px, espacios de 10px
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(endX, estrato.bottomY); // Comienzo de la base (derecha)
        ctx.lineTo(startX, estrato.bottomY); // Fin de la base (izquierda)
        ctx.stroke();
        ctx.lineWidth = 1;
        // === Paso 5: Dibujar el punto de control manualmente si mostrarPuntos es true ===
        if (mostrarPuntos) {
          ctx.beginPath();
          ctx.arc(
            estrato.puntoControl.x,
            estrato.puntoControl.y,
            6 * escala,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = estrato.puntoControl.arrastrando
            ? "#ff9900"
            : "#cc0000";
          ctx.fill();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1 * escala;
          ctx.stroke();
        }

        // === Paso 6: Resetear y preparar para el próximo estrato ===
        ctx.setLineDash([]); // Volver a línea continua
        ctx.beginPath(); // Nueva ruta limpia
        ctx.moveTo(startX, estrato.bottomY); // Reposicionar cursor
        break; // ← ¡USAR break, NO return!
      case "inf_transparente":
        // === Paso 1: Cerrar la ruta actual para el relleno ===
        ctx.lineTo(startX, startY); // ← Cerrar la figura (base recta, temporalmente)
        ctx.closePath(); // ← ¡IMPORTANTE! Cerrar para que el fill funcione

        // === Paso 2: Aplicar relleno (color + trama) ===
        ctx.fillStyle = estrato.color;
        ctx.fill();

        if (estrato.trama !== "solido") {
          const trama = crearTrama(
            estrato.trama,
            "#000000",
            estrato.tamanoTrama * escala
          );
          ctx.save();
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = trama;
          ctx.fill();
          ctx.restore();
        }

        // === Paso 3: Dibujar los 3 lados con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.bottomY); // Esquina inferior izquierda
        ctx.lineTo(IZQUIERDA_X, estrato.topY); // Lado izquierdo
        ctx.lineTo(endX, estrato.topY); // Lado superior
        ctx.quadraticCurveTo(
          // Lado derecho (curvo)
          estrato.puntoControl.x,
          estrato.puntoControl.y,
          endX,
          estrato.bottomY
        );
        ctx.stroke(); // ← Dibuja los 3 lados continuos

        // === Paso 4: Dibujar SOLO la base con línea DISCONTINUA ===
        ctx.setLineDash([0, 10000]); // Guiones de 15px, espacios de 10px
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(endX, estrato.bottomY); // Comienzo de la base (derecha)
        ctx.lineTo(startX, estrato.bottomY); // Fin de la base (izquierda)
        ctx.stroke();
        ctx.lineWidth = 1;
        // === Paso 5: Dibujar el punto de control manualmente si mostrarPuntos es true ===
        if (mostrarPuntos) {
          ctx.beginPath();
          ctx.arc(
            estrato.puntoControl.x,
            estrato.puntoControl.y,
            6 * escala,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = estrato.puntoControl.arrastrando
            ? "#ff9900"
            : "#cc0000";
          ctx.fill();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1 * escala;
          ctx.stroke();
        }

        // === Paso 6: Resetear y preparar para el próximo estrato ===
        ctx.setLineDash([]); // Volver a línea continua
        ctx.beginPath(); // Nueva ruta limpia
        ctx.moveTo(startX, estrato.bottomY); // Reposicionar cursor
        break; // ← ¡USAR break, NO return!

      case "sup_transparente":
        // === Paso 1: Cerrar la ruta actual para el relleno ===
        ctx.lineTo(startX, startY); // ← Cerrar la figura (base recta, temporalmente)
        ctx.closePath(); // ← ¡IMPORTANTE! Cerrar para que el fill funcione

        // === Paso 2: Aplicar relleno (color + trama) ===
        ctx.fillStyle = estrato.color;
        ctx.fill();

        if (estrato.trama !== "solido") {
          const trama = crearTrama(
            estrato.trama,
            "#000000",
            estrato.tamanoTrama * escala
          );
          ctx.save();
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = trama;
          ctx.fill();
          ctx.restore();
        }

        // === Paso 3: Dibujar lado derecho con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.lineTo(endX, estrato.topY); // Lado superior
        ctx.quadraticCurveTo(
          // Lado derecho (curvo)
          estrato.puntoControl.x,
          estrato.puntoControl.y,
          endX,
          estrato.bottomY
        );
        ctx.stroke(); // ← Dibuja

        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.bottomY); // Esquina inferior izquierda
        ctx.lineTo(IZQUIERDA_X, estrato.topY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos

        // === Paso 5: Dibujar base con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.bottomY); // Esquina inferior izquierda
        ctx.lineTo(endX, estrato.bottomY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos

        // === Paso 5: Dibujar el punto de control manualmente si mostrarPuntos es true ===
        if (mostrarPuntos) {
          ctx.beginPath();
          ctx.arc(
            estrato.puntoControl.x,
            estrato.puntoControl.y,
            6 * escala,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = estrato.puntoControl.arrastrando
            ? "#ff9900"
            : "#cc0000";
          ctx.fill();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1 * escala;
          ctx.stroke();
        }

        // === Paso 6: Resetear y preparar para el próximo estrato ===
        ctx.setLineDash([]); // Volver a línea continua
        ctx.beginPath(); // Nueva ruta limpia
        ctx.moveTo(startX, estrato.bottomY); // Reposicionar cursor

        break; // ← ¡USAR break, NO return!

      case "sup_inf_transparente":
        // === Paso 1: Cerrar la ruta actual para el relleno ===
        ctx.lineTo(startX, startY); // ← Cerrar la figura (base recta, temporalmente)
        ctx.closePath(); // ← ¡IMPORTANTE! Cerrar para que el fill funcione

        // === Paso 2: Aplicar relleno (color + trama) ===
        ctx.fillStyle = estrato.color;
        ctx.fill();

        if (estrato.trama !== "solido") {
          const trama = crearTrama(
            estrato.trama,
            "#000000",
            estrato.tamanoTrama * escala
          );
          ctx.save();
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = trama;
          ctx.fill();
          ctx.restore();
        }

        // === Paso 3: Dibujar lado derecho con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.lineTo(endX, estrato.topY); // Lado superior
        ctx.quadraticCurveTo(
          // Lado derecho (curvo)
          estrato.puntoControl.x,
          estrato.puntoControl.y,
          endX,
          estrato.bottomY
        );
        ctx.stroke(); // ← Dibuja

        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.bottomY); // Esquina inferior izquierda
        ctx.lineTo(IZQUIERDA_X, estrato.topY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos

        // === Paso 5: Dibujar el punto de control manualmente si mostrarPuntos es true ===
        if (mostrarPuntos) {
          ctx.beginPath();
          ctx.arc(
            estrato.puntoControl.x,
            estrato.puntoControl.y,
            6 * escala,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = estrato.puntoControl.arrastrando
            ? "#ff9900"
            : "#cc0000";
          ctx.fill();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1 * escala;
          ctx.stroke();
        }

        // === Paso 6: Resetear y preparar para el próximo estrato ===
        ctx.setLineDash([]); // Volver a línea continua
        ctx.beginPath(); // Nueva ruta limpia
        ctx.moveTo(startX, estrato.bottomY); // Reposicionar cursor
        break;

      case "sup_inf_der_transparente":
        // === Paso 1: Cerrar la ruta actual para el relleno ===
        ctx.lineTo(startX, startY); // ← Cerrar la figura (base recta, temporalmente)
        ctx.closePath(); // ← ¡IMPORTANTE! Cerrar para que el fill funcione

        // === Paso 2: Aplicar relleno (color + trama) ===
        ctx.fillStyle = estrato.color;
        ctx.fill();

        if (estrato.trama !== "solido") {
          const trama = crearTrama(
            estrato.trama,
            "#000000",
            estrato.tamanoTrama * escala
          );
          ctx.save();
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = trama;
          ctx.fill();
          ctx.restore();
        }

        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.bottomY); // Esquina inferior izquierda
        ctx.lineTo(IZQUIERDA_X, estrato.topY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos

        // === Paso 5: Dibujar el punto de control manualmente si mostrarPuntos es true ===
        if (mostrarPuntos) {
          ctx.beginPath();
          ctx.arc(
            estrato.puntoControl.x,
            estrato.puntoControl.y,
            6 * escala,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = estrato.puntoControl.arrastrando
            ? "#ff9900"
            : "#cc0000";
          ctx.fill();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1 * escala;
          ctx.stroke();
        }

        // === Paso 6: Resetear y preparar para el próximo estrato ===
        ctx.setLineDash([]); // Volver a línea continua
        ctx.beginPath(); // Nueva ruta limpia
        ctx.moveTo(startX, estrato.bottomY); // Reposicionar cursor
        break;

      case "vacio_1":
        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.bottomY); // Esquina inferior izquierda
        ctx.lineTo(endX, estrato.topY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos
        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.topY); // Esquina inferior izquierda
        ctx.lineTo(endX, estrato.bottomY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos
        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.topY); // Esquina inferior izquierda
        ctx.lineTo(IZQUIERDA_X, estrato.bottomY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos

        // === Paso 6: Resetear y preparar para el próximo estrato ===
        ctx.setLineDash([]); // Volver a línea continua
        ctx.beginPath(); // Nueva ruta limpia
        ctx.moveTo(startX, estrato.bottomY); // Reposicionar cursor
        break;
      case "vacio_2":
        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.bottomY); // Esquina inferior izquierda
        ctx.lineTo(endX, estrato.topY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos
        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.topY); // Esquina inferior izquierda
        ctx.lineTo(endX, estrato.bottomY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos
        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.topY); // Esquina inferior izquierda
        ctx.lineTo(IZQUIERDA_X, estrato.bottomY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos
        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(endX, estrato.topY); // Esquina inferior izquierda
        ctx.lineTo(endX, estrato.bottomY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos

        // === Paso 6: Resetear y preparar para el próximo estrato ===
        ctx.setLineDash([]); // Volver a línea continua
        ctx.beginPath(); // Nueva ruta limpia
        ctx.moveTo(startX, estrato.bottomY); // Reposicionar cursor

        break;
      case "ondulado_inf_trans":
        // === Paso 1: Construir la forma ondulada para el relleno ===
        const amplitud2 = 5;
        const ciclos2 = (endX - startX) / 25;
        for (let x = endX; x >= startX; x -= 2) {
          const t = (x - startX) / (endX - startX);
          const y =
            amplitud2 +
            startY +
            Math.sin(t * ciclos2 * Math.PI * 2) * amplitud2;
          ctx.lineTo(x, y);
        }
        ctx.closePath(); // Cerrar para rellenar

        // === Paso 2: Aplicar relleno (color + trama) ===
        ctx.fillStyle = estrato.color;
        ctx.fill();
        if (estrato.trama !== "solido") {
          const trama = crearTrama(
            estrato.trama,
            "#000000",
            estrato.tamanoTrama * escala
          );
          ctx.save();
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = trama;
          ctx.fill();
          ctx.restore();
        }

        // === Paso 3: Dibujar SOLO los bordes izquierdo, superior y derecho (sin la base) ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.bottomY); // Izquierda
        ctx.lineTo(IZQUIERDA_X, estrato.topY); // Arriba
        ctx.lineTo(endX, estrato.topY); // Superior
        ctx.quadraticCurveTo(
          // Derecho curvo
          estrato.puntoControl.x,
          estrato.puntoControl.y,
          endX,
          estrato.bottomY
        );
        ctx.stroke();

        // === Paso 4: Dibujar punto de control si corresponde ===
        if (mostrarPuntos) {
          ctx.beginPath();
          ctx.arc(
            estrato.puntoControl.x,
            estrato.puntoControl.y,
            6 * escala,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = estrato.puntoControl.arrastrando
            ? "#ff9900"
            : "#cc0000";
          ctx.fill();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1 * escala;
          ctx.stroke();
        }

        // === Paso 5: Preparar para el próximo estrato ===
        ctx.beginPath();
        ctx.moveTo(startX, estrato.bottomY);
        break;

      case "ondulado_sup_trans":
        // === Paso 1: Construir la forma ondulada para el relleno ===
        const amplitud3 = 5;
        const ciclos3 = (endX - startX) / 25;
        for (let x = endX; x >= startX; x -= 2) {
          const t = (x - startX) / (endX - startX);
          const y =
            amplitud3 +
            startY +
            Math.sin(t * ciclos3 * Math.PI * 2) * amplitud3;
          ctx.lineTo(x, y);
        }
        // === Paso 2: Cerrar figura y aplicar relleno ===
        ctx.closePath();
        ctx.fillStyle = estrato.color;
        ctx.fill();
        if (estrato.trama !== "solido") {
          const trama = crearTrama(
            estrato.trama,
            "#000000",
            estrato.tamanoTrama * escala
          );
          ctx.save();
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = trama;
          ctx.fill();
          ctx.restore();
        }
        // === Paso 3: Dibujar SOLO el borde inferior ONDULADO (con línea continua) ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(endX, startY);
        for (let x = endX; x >= startX; x -= 2) {
          const t = (x - startX) / (endX - startX);
          const y =
            amplitud3 +
            startY +
            Math.sin(t * ciclos3 * Math.PI * 2) * amplitud3;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.topY); // Esquina inferior izquierda
        ctx.lineTo(IZQUIERDA_X, estrato.bottomY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos

        // === Paso 3: Dibujar lado derecho con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.lineTo(endX, estrato.topY); // Lado superior
        ctx.quadraticCurveTo(
          // Lado derecho (curvo)
          estrato.puntoControl.x,
          estrato.puntoControl.y,
          endX,
          estrato.bottomY
        );
        ctx.stroke(); // ← Dibuja

        // === Paso 4: Dibujar punto de control si corresponde ===
        if (mostrarPuntos) {
          ctx.beginPath();
          ctx.arc(
            estrato.puntoControl.x,
            estrato.puntoControl.y,
            6 * escala,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = estrato.puntoControl.arrastrando
            ? "#ff9900"
            : "#cc0000";
          ctx.fill();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1 * escala;
          ctx.stroke();
        }

        // === Paso 5: Preparar para el próximo estrato ===
        ctx.beginPath();
        ctx.moveTo(startX, estrato.bottomY);
        break;

      case "ondulado_inf_sup_trans":
        // === Paso 1: Construir la forma ondulada para el relleno ===
        const amplitud4 = 5;
        const ciclos4 = (endX - startX) / 25;
        for (let x = endX; x >= startX; x -= 2) {
          const t = (x - startX) / (endX - startX);
          const y =
            amplitud4 +
            startY +
            Math.sin(t * ciclos4 * Math.PI * 2) * amplitud4;
          ctx.lineTo(x, y);
        }
        // === Paso 2: Cerrar figura y aplicar relleno ===
        ctx.closePath();
        ctx.fillStyle = estrato.color;
        ctx.fill();
        if (estrato.trama !== "solido") {
          const trama = crearTrama(
            estrato.trama,
            "#000000",
            estrato.tamanoTrama * escala
          );
          ctx.save();
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = trama;
          ctx.fill();
          ctx.restore();
        }
        // === Paso 3: NO dibujar ningún borde (ni superior, ni inferior, ni laterales) ===
        // (Intencionalmente omitido)

        // === Paso 4: Dibujar lado izquierdo con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.moveTo(IZQUIERDA_X, estrato.topY); // Esquina inferior izquierda
        ctx.lineTo(IZQUIERDA_X, estrato.bottomY); // Lado izquierdo
        ctx.stroke(); // ← Dibuja los 3 lados continuos

        // === Paso 3: Dibujar lado derecho con línea CONTINUA ===
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1 * escala;
        ctx.setLineDash([]); // Asegurar línea continua
        ctx.beginPath();
        ctx.lineTo(endX, estrato.topY); // Lado superior
        ctx.quadraticCurveTo(
          // Lado derecho (curvo)
          estrato.puntoControl.x,
          estrato.puntoControl.y,
          endX,
          estrato.bottomY
        );
        ctx.stroke(); // ← Dibuja

        // === Paso 4: Dibujar punto de control si corresponde ===

        if (mostrarPuntos) {
          ctx.beginPath();
          ctx.arc(
            estrato.puntoControl.x,
            estrato.puntoControl.y,
            6 * escala,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = estrato.puntoControl.arrastrando
            ? "#ff9900"
            : "#cc0000";
          ctx.fill();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1 * escala;
          ctx.stroke();
        }

        // === Paso 5: Preparar para el próximo estrato ===
        ctx.beginPath();
        ctx.moveTo(startX, estrato.bottomY);
        break;

      case "canal":
        // Definir puntos clave para la curva del fondo del canal
        const startX1 = IZQUIERDA_X;
        const endX1 = IZQUIERDA_X + estrato.ancho;
        const startY1 = estrato.bottomY;

        // Altura del canal: diferencia entre el fondo derecho e izquierdo
        const alturaCanal = (estrato.bottomY - estrato.topY) * 0.5; // 30% del espesor total

        // Punto inicial (izquierda): más arriba → menos espesor
        const izquierdaY = startY1;

        // Punto final (derecha): en el fondo normal
        const derechaY = startY1;

        // Punto de control para la curva cuadrática (centro, ligeramente más bajo que el promedio)
        const puntoControlX = (startX1 + endX1) / 1.5;
        const puntoControlY = (izquierdaY + derechaY) / 2 + alturaCanal * 1; // curva suave hacia abajo

        // Dibujar la curva del fondo del canal
        ctx.lineTo(endX1, derechaY); // Ir a la esquina inferior derecha
        ctx.quadraticCurveTo(puntoControlX, puntoControlY, startX1, izquierdaY); // Curva hacia la izquierda elevada
        break;

      case "canal2":
        // Definir puntos clave para la curva del fondo del canal
        const startX2 = IZQUIERDA_X;
        const endX2 = IZQUIERDA_X + estrato.ancho;
        const startY2 = estrato.bottomY;

        // Altura del canal: diferencia entre el fondo derecho e izquierdo
        const alturaCanal2 = (estrato.bottomY - estrato.topY) * 2; // 30% del espesor total

        // Punto inicial (izquierda): más arriba → menos espesor
        const izquierdaY2 = startY2;

        // Punto final (derecha): en el fondo normal
        const derechaY2 = startY2;

        // Punto de control para la curva cuadrática (centro, ligeramente más bajo que el promedio)
        const puntoControlX2 = (startX2 + endX2) / 1.5;
        const puntoControlY2 = (izquierdaY2 + derechaY2) / 2 + alturaCanal2 * 1; // curva suave hacia abajo

        // Dibujar la curva del fondo del canal
        ctx.lineTo(endX2, derechaY2); // Ir a la esquina inferior derecha
        ctx.quadraticCurveTo(
          puntoControlX2,
          puntoControlY2,
          startX2,
          izquierdaY2
        ); // Curva hacia la izquierda elevada
        break;
    }
    // 6. Cerrar figura
    ctx.closePath();

    // ✅ RELLENO: primero color de fondo, luego textura encima
    ctx.fillStyle = estrato.color;
    ctx.fill();

    if (estrato.trama !== "solido") {
      const trama = crearTrama(
        estrato.trama,
        "#000000",
        estrato.tamanoTrama * escala
      ); // <-- ESCALAR TAMANO DE TRAMA
      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = trama;
      ctx.fill();
      ctx.restore();
    }

    // Dibujar borde — ¡ESCALAR GROSOR!
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1 * escala; // <-- ¡ESCALAR LINEWIDTH!
    ctx.stroke();

    // ✅ Dibujar símbolos a la derecha del estrato — ¡ESCALAR TAMAÑO!
    if (estrato.simbolosDerecha && estrato.simbolosDerecha.length > 0) {
      const offsetDerecha = 30 * escala; // <-- ESCALAR OFFSET
      const espacioEntreSimbolos = 25 * escala; // <-- ESCALAR ESPACIO
      const size = 20 * escala; // <-- ¡ESCALAR TAMAÑO DEL SÍMBOLO!
      estrato.simbolosDerecha.forEach((simboloInfo, index) => {
        const xDerecha =
          IZQUIERDA_X +
          estrato.ancho +
          offsetDerecha +
          index * espacioEntreSimbolos;
        const yDerecha = estrato.topY + simboloInfo.proporcionY * estrato.alto;
        dibujarSimbolo(
          ctx,
          simboloInfo.tipo,
          xDerecha,
          yDerecha,
          size,
          "#000000"
        ); // size ya está escalado
      });
    }

    // Dibujar punto de control — ¡SOLO SI MOSTRAR_PUNTOS!
    if (mostrarPuntos) {
      ctx.beginPath();
      ctx.arc(
        estrato.puntoControl.x,
        estrato.puntoControl.y,
        6 * escala,
        0,
        Math.PI * 2
      ); // <-- ESCALAR RADIO
      ctx.fillStyle = estrato.puntoControl.arrastrando ? "#ff9900" : "#cc0000";
      ctx.fill();
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1 * escala; // <-- ESCALAR GROSOR DE BORDE
      ctx.stroke();
    }

    // Dibujar etiqueta de estrato — ¡ESCALAR FUENTE!
    ctx.fillStyle = "#000";
    ctx.font = `${12 * escala}px Arial`; // <-- ¡ESCALAR FUENTE!
    ctx.fillText(
      estrato.nombre,
      IZQUIERDA_X - 100 * escala,
      estrato.topY + 50 * escala
    );
  });

  // ✅ DIBUJAR GUÍAS VERTICALES AL FINAL → ¡POR ENCIMA DE TODO!
  if (mostrarGuiasVerticales) {
    ctx.strokeStyle = "rgba(0, 100, 200, 0.6)";
    ctx.lineWidth = 1 * escala;
    ctx.setLineDash([4, 4]); // Línea punteada fina

    posicionesXGuías.forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    });

    ctx.setLineDash([]); // Restaurar línea continua
  }
}
// ================================
// EXPORTAR CON CALIDAD (NUEVA FUNCIÓN) — ¡CORREGIDA!
// ================================
function exportarConCalidad(escala, tipo, callback) {
  // Guardar dimensiones y estado originales
  const anchoOriginal = canvas.width;
  const altoOriginal = canvas.height;
  const estiloCanvas = canvas.style.cssText;

  // Calcular nuevas dimensiones
  const nuevoAncho = anchoOriginal;
  const nuevoAlto = altoOriginal;

  // Aplicar nueva escala al lienzo
  canvas.width = nuevoAncho; // ACA SE PUEDE MULTIPLICAR POR ESCALA PARA AGRANDAR
  canvas.height = nuevoAlto;
  canvas.style.cssText = estiloCanvas; // Mantener estilos CSS

  // Ajustar el contexto para la nueva escala
  ctx.setTransform(escala, 0, 0, escala, 0, 0);

  // Redibujar todo sin puntos de control — ¡PASAR ESCALA!
  dibujar(false, escala);

  // Ejecutar la función de exportación específica (PNG, JPG, etc.)
  callback();

  // Restaurar el lienzo a su estado original
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Resetear transformación
  canvas.width = anchoOriginal;
  canvas.height = altoOriginal;
  canvas.style.cssText = estiloCanvas;

  // Redibujar con puntos de control para la interfaz
  setTimeout(() => dibujar(true, 1), 100); // <-- Restaurar escala 1
}

// ================================
// EXPORTAR COMO PNG — ¡AHORA CON OPCIÓN DE CALIDAD!
// ================================
document
  .getElementById("btnExportarPNG")
  .addEventListener("click", function () {
    const escala =
      parseInt(document.getElementById("selectCalidadExportacion").value) || 2;

    exportarConCalidad(escala, "png", function () {
      const pendientes = Object.keys(tramasSVG).filter((key) => {
        const img = tramasSVG[key];
        return !(img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
      });
      if (pendientes.length > 0) {
        console.warn(
          "⚠️ Algunas tramas SVG no están cargadas. Se usará fallback sólido."
        );
        alert(
          `⚠️ Advertencia: ${pendientes.length} tramas no están cargadas. La exportación puede mostrar colores sólidos.`
        );
      }

      try {
        const link = document.createElement("a");
        link.download = `columna_estratigrafica_${escala}x.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (e) {
        console.error("❌ Error al exportar PNG:", e);
        alert("❌ No se pudo exportar como PNG. Intenta con JPG o SVG.");
      }
    });
  });
// EXPORTAR PROYECTO COMO ARCHIVO JSON
document
  .getElementById("btnExportarProyecto")
  .addEventListener("click", function () {
    const nombre = prompt("Nombre del proyecto (sin extensión):", "MiColumna");
    if (!nombre) return;

    const proyecto = {
      version: "1.0",
      pixelesPorMetro: PIXELES_POR_METRO,
      estratos: estratos.map((e) => ({
        nombre: e.nombre,
        alto: e.alto,
        ancho: e.ancho,
        color: e.color,
        trama: e.trama,
        tamanoTrama: e.tamanoTrama,
        tipoBordeSuperior: e.tipoBordeSuperior,
        puntoControl: {
          proporcionX: e.puntoControl.proporcionX,
          posicionManual: e.puntoControl.posicionManual,
        },
        simbolosDerecha: e.simbolosDerecha,
      })),
    };

    const blob = new Blob([JSON.stringify(proyecto, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nombre}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });
// IMPORTAR PROYECTO DESDE ARCHIVO JSON
document
  .getElementById("btnImportarProyecto")
  .addEventListener("click", function () {
    document.getElementById("inputImportarProyecto").click();
  });

document
  .getElementById("inputImportarProyecto")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const proyecto = JSON.parse(event.target.result);

        // Validar estructura mínima
        if (!proyecto.estratos || !Array.isArray(proyecto.estratos)) {
          throw new Error("Archivo inválido: no contiene estratos.");
        }

        // Restaurar datos
        PIXELES_POR_METRO = proyecto.pixelesPorMetro || 100;
        document.getElementById("pixelesPorMetro").value = PIXELES_POR_METRO;

        estratos = proyecto.estratos.map((e) => {
          const estrato = new Estrato(
            e.alto,
            e.ancho,
            e.color,
            e.trama,
            e.tamanoTrama,
            "ninguno",
            e.tipoBordeSuperior
          );
          estrato.nombre = e.nombre || "Estrato";
          estrato.puntoControl.proporcionX = e.puntoControl?.proporcionX ?? 1.0;
          estrato.puntoControl.posicionManual =
            e.puntoControl?.posicionManual ?? false;
          estrato.simbolosDerecha = e.simbolosDerecha || [];
          return estrato;
        });

        // Reconstruir interfaz
        panelesContainer.innerHTML = "";
        estratos.forEach((_, i) => crearPanelEstrato(i));
        dibujar();

        alert(`✅ Proyecto "${file.name}" cargado correctamente.`);
      } catch (error) {
        console.error("Error al importar:", error);
        alert(
          "❌ Error al cargar el archivo. Asegúrate de que sea un JSON válido de columna estratigráfica."
        );
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // Reset para permitir recargar el mismo archivo
  });
// ================================
// EXPORTAR COMO JPEG — ¡AHORA CON OPCIÓN DE CALIDAD!
// ================================
document
  .getElementById("btnExportarJPG")
  .addEventListener("click", function () {
    const escala =
      parseInt(document.getElementById("selectCalidadExportacion").value) || 2;

    exportarConCalidad(escala, "jpg", function () {
      const link = document.createElement("a");
      link.download = `columna_estratigrafica_${escala}x.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    });
  });

// ================================
// EXPORTAR COMO SVG — SIN CAMBIOS (no se beneficia de la escala de esta manera)
// ================================
document
  .getElementById("btnExportarSVG")
  .addEventListener("click", function () {
    dibujar(false);
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", canvas.width);
    svg.setAttribute("height", canvas.height);
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    // Fondo blanco
    const bg = document.createElementNS(svgNS, "rect");
    bg.setAttribute("width", "100%");
    bg.setAttribute("height", "100%");
    bg.setAttribute("fill", "white");
    svg.appendChild(bg);
    // Embeber el canvas como imagen (solución rápida)
    const img = document.createElementNS(svgNS, "image");
    img.setAttribute("x", 0);
    img.setAttribute("y", 0);
    img.setAttribute("width", canvas.width);
    img.setAttribute("height", canvas.height);
    img.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "href",
      canvas.toDataURL("image/png")
    );
    svg.appendChild(img);
    // Descargar
    const serializer = new XMLSerializer();
    let svgStr = serializer.serializeToString(svg);
    svgStr = '<?xml version="1.0" standalone="no"?>\r' + svgStr;
    const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "columna_estratigrafica.svg";
    link.href = url;
    link.click();
    setTimeout(() => dibujar(true), 100);
  });

// ================================
// EXPORTAR COMO PDF — SIN CAMBIOS (jsPDF maneja su propia resolución)
// ================================
document
  .getElementById("btnExportarPDF")
  .addEventListener("click", function () {
    const escala =
      parseInt(document.getElementById("selectCalidadExportacion").value) || 2;
    exportarConCalidad(escala, "pdf", function () {
      const { jsPDF } = window.jspdf;
      // Crear PDF con orientación 'portrait' y tamaño personalizado basado en el canvas escalado
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width * escala, canvas.height * escala],
      });
      // Añadir la imagen del canvas al PDF
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        canvas.width,
        canvas.height
      );
      // Guardar el archivo
      pdf.save(`columna_estratigrafica_${escala}x.pdf`);
    });
  });
// ================================
// GUARDAR PROYECTO
// ================================
document.getElementById("btnGuardar").addEventListener("click", function () {
  const nombre = prompt("Nombre del proyecto:", "Proyecto 1");
  if (!nombre) return;
  const proyecto = {
    pixelesPorMetro: PIXELES_POR_METRO,
    estratos: estratos.map((e) => ({
      nombre: e.nombre,
      alto: e.alto,
      ancho: e.ancho,
      color: e.color,
      trama: e.trama,
      tamanoTrama: e.tamanoTrama,
      simbolo: e.simbolo,
      tipoBordeSuperior: e.tipoBordeSuperior,
      puntoControl: {
        proporcionX: e.puntoControl.proporcionX,
        posicionManual: e.puntoControl.posicionManual,
      },
      simbolosDerecha: e.simbolosDerecha, // ✅ Guardar símbolos de la derecha
    })),
  };
  localStorage.setItem(`columna_${nombre}`, JSON.stringify(proyecto));
  alert(`Proyecto "${nombre}" guardado!`);
});
// ================================
// CARGAR PROYECTO
// ================================
document.getElementById("btnCargar").addEventListener("click", function () {
  const proyectos = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("columna_")) {
      proyectos.push(key.replace("columna_", ""));
    }
  }
  if (proyectos.length === 0) {
    alert("No hay proyectos guardados.");
    return;
  }
  const nombre = prompt(
    "Proyectos guardados:" +
      proyectos.join("") +
      "Escribe el nombre del proyecto a cargar:"
  );
  if (!nombre) return;
  const data = localStorage.getItem(`columna_${nombre}`);
  if (!data) {
    alert("Proyecto no encontrado.");
    return;
  }
  const proyecto = JSON.parse(data);
  PIXELES_POR_METRO = proyecto.pixelesPorMetro;
  document.getElementById("pixelesPorMetro").value = PIXELES_POR_METRO;
  estratos = proyecto.estratos.map((e) => {
    const estrato = new Estrato(
      e.alto,
      e.ancho,
      e.color,
      e.trama,
      e.tamanoTrama,
      e.simbolo,
      e.tipoBordeSuperior
    );
    estrato.nombre = e.nombre || `Estrato ${i + 1}`;
    estrato.puntoControl.proporcionX = e.puntoControl.proporcionX;
    estrato.puntoControl.posicionManual = e.puntoControl.posicionManual;
    estrato.puntoControl.y = (estrato.topY + estrato.bottomY) / 2;
    estrato.simbolosDerecha = e.simbolosDerecha || []; // ✅ Cargar símbolos de la derecha
    return estrato;
  });
  panelesContainer.innerHTML = "";
  estratos.forEach((e, i) => crearPanelEstrato(i));
  dibujar();
  alert(`Proyecto "${nombre}" cargado!`);
});
// ================================
// INTERACCIÓN
// ================================
canvas.addEventListener("mousedown", function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  calcularPosicionesEstratos();
  for (let i = 0; i < estratos.length; i++) {
    const estrato = estratos[i];
    const dx = mouseX - estrato.puntoControl.x;
    const dy = mouseY - estrato.puntoControl.y;
    if (Math.sqrt(dx * dx + dy * dy) < 12) {
      estrato.puntoControl.arrastrando = true;
      estratoArrastrando = { estratoIndex: i };
      e.preventDefault();
      return;
    }
  }
});
canvas.addEventListener("mousemove", function (e) {
  if (!estratoArrastrando) return;
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  calcularPosicionesEstratos();
  const estrato = estratos[estratoArrastrando.estratoIndex];
  // Calcular proporción vertical relativa dentro del estrato
  const proporcionY = (mouseY - estrato.topY) / estrato.alto;
  estrato.puntoControl.proporcionY = Math.max(0, Math.min(1, proporcionY)); // entre 0 y 1
  estrato.puntoControl.y =
    estrato.topY + estrato.puntoControl.proporcionY * estrato.alto;
  estrato.puntoControl.x = mouseX;
  estrato.puntoControl.proporcionX = (mouseX - IZQUIERDA_X) / estrato.ancho;
  estrato.puntoControl.posicionManual = true;
  dibujar();
});
canvas.addEventListener("mouseup", function () {
  if (estratoArrastrando) {
    const estrato = estratos[estratoArrastrando.estratoIndex];
    estrato.puntoControl.arrastrando = false;
    estratoArrastrando = null;
  }
});
// ================================
// ACTUALIZAR ESCALA
// ================================
document
  .getElementById("btnActualizarEscala")
  .addEventListener("click", function () {
    PIXELES_POR_METRO =
      parseFloat(document.getElementById("pixelesPorMetro").value) || 50;
    dibujar();
  });
document
  .getElementById("btnActualizarEscalaHorizontal")
  .addEventListener("click", function () {
    DESPLAZAMIENTO_ESCALA_HORIZONTAL =
      parseInt(
        document.getElementById("desplazamientoEscalaHorizontal").value
      ) || 0;
    dibujar();
  });
document
  .getElementById("btnToggleGuías")
  .addEventListener("click", function () {
    mostrarGuiasVerticales = !mostrarGuiasVerticales;
    this.textContent = mostrarGuiasVerticales
      ? "📏 Ocultar guías verticales"
      : "📏 Mostrar guías verticales";
    dibujar();
  });
// ================================
// AÑADIR NUEVO ESTRATO
// ================================
function agregarEstrato() {
  const nuevoEstrato = new Estrato(
    100,
    300,
    "#cccccc",
    "solido",
    30,
    "ninguno",
    "recto"
  );
  estratos.push(nuevoEstrato);
  crearPanelEstrato(estratos.length - 1);
  dibujar();
}
document
  .getElementById("btnAgregarEstrato")
  .addEventListener("click", agregarEstrato);
// ================================
// PANEL DE CONTROL POR ESTRATO (MODIFICADO)
// ================================
function crearPanelEstrato(index) {
  const estrato = estratos[index];
  const panel = document.createElement("div");
  panel.className = "panel-estrato";
  panel.innerHTML = `
          <div class="panel-encabezado" style="cursor: pointer; padding: 8px; background: #f0f7fc; border-radius: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
            <strong>${estrato.nombre || "Estrato sin nombre"}</strong>
            <span class="toggle-icon">▼</span>
          </div>
          <div class="panel-contenido" style="display: block;">
          <label>Nombre:</label>
            <input type="text" class="input-nombre" value="${
              estrato.nombre
            }" placeholder="Nombre del estrato" style="width: 100px; padding: 8px; margin-bottom: 15px; font-size: 16px; border: 2px solid #ddd; border-radius: 4px;">
            <div class="controles">
        <label>Espesor:</label>
          <input type="range" class="slider-alto" min="0" max="1000" value="${
            estrato.alto
          }" step="1">
          <span class="valor-metros-alto">${(
            estrato.alto / PIXELES_POR_METRO
          ).toFixed(1)} m</span>
          <span class="valor-alto">(${estrato.alto} px)</span>
          
          <label>Ancho:</label>
          <input type="range" class="slider-ancho" min="100" max="500" value="${
            estrato.ancho
          }" step="1">
          <span class="valor-metros-ancho">${(
            estrato.ancho / PIXELES_POR_METRO
          ).toFixed(1)}  m</span>
          <span class="valor-ancho">(${estrato.ancho} px)</span>
          <div class="parametros-estrato" style="margin-top: 5px; border-top: 1px solid #ffffff; padding-top: 0px;">
          <label>Trama:</label>
          <select class="select-trama">
            <option value="solido" ${
              estrato.trama === "solido" ? "selected" : ""
            }>Color sólido</option>
            <option value="conglomerado_op1" ${
              estrato.trama === "conglomerado_op1" ? "selected" : ""
            }>601 Grava o conglomerado opción 1</option>
            <option value="conglomerado_op2" ${
              estrato.trama === "conglomerado_op2" ? "selected" : ""
            }>602 Conglomerado o grava opción 2</option>
            <option value="conglomerado_cruzado" ${
              estrato.trama === "conglomerado_cruzado" ? "selected" : ""
            }>603 Grava o conglomerado con estratificación cruzada</option>
            <option value="brecha_op1" ${
              estrato.trama === "brecha_op1" ? "selected" : ""
            }>605 Brecha 1ra opción</option>
            <option value="brecha_op2" ${
              estrato.trama === "brecha_op2" ? "selected" : ""
            }>606 Brecha 2da opción</option>
            <option value="arenisca_maciza" ${
              estrato.trama === "arenisca_maciza" ? "selected" : ""
            }>607 Arenisca o arena maciza</option>
            <option value="arenisca_estratificada" ${
              estrato.trama === "arenisca_estratificada" ? "selected" : ""
            }>608 Arenisca o arena estratificada</option>
            <option value="arenisca_cruzada_op1" ${
              estrato.trama === "arenisca_cruzada_op1" ? "selected" : ""
            }>609 Arenisca o arena con estratificación cruzada 1ra opción</option>
            <option value="arenisca_cruzada_op2" ${
              estrato.trama === "arenisca_cruzada_op2" ? "selected" : ""
            }>610 Arenisca o arena con estratificación cruzada 2da opción</option>
            <option value="arenisca_ondulada" ${
              estrato.trama === "arenisca_ondulada" ? "selected" : ""
            }>611 Arenisca o arena con estratificación ondulada</option>
            <option value="arenisca_arcillosa" ${
              estrato.trama === "arenisca_arcillosa" ? "selected" : ""
            }>612 Arenisca arcillosa o argilizada</option>
            <option value="arenisca_calcare" ${
              estrato.trama === "arenisca_calcare" ? "selected" : ""
            }>613 Arenisca calcárea</option>
            <option value="arenisca_dolomitica" ${
              estrato.trama === "arenisca_dolomitica" ? "selected" : ""
            }>614 Arenisca dolomítica</option>
            <option value="limolita_arcillosa" ${
              estrato.trama === "limolita_arcillosa" ? "selected" : ""
            }>616 Limo, limolita o lutita arcillosa</option>
            <option value="limolita_calcare" ${
              estrato.trama === "limolita_calcare" ? "selected" : ""
            }>617 Limolita calcárea</option>
            <option value="limolita_dolomitica" ${
              estrato.trama === "limolita_dolomitica" ? "selected" : ""
            }>618 Limolita dolomítica</option>
            <option value="lutita_arenosa" ${
              estrato.trama === "lutita_arenosa" ? "selected" : ""
            }>619 Lutita arenosa o limosa</option>
            <option value="lutita" ${
              estrato.trama === "lutita" ? "selected" : ""
            }>620 Arcilla o lutita</option>
            <option value="lutita_chert" ${
              estrato.trama === "lutita_chert" ? "selected" : ""
            }>621 Lutita chert o chert pizarroso</option>
            <option value="lutita_dolomitica" ${
              estrato.trama === "lutita_dolomitica" ? "selected" : ""
            }>622 Lutita dolomítica</option>
            <option value="lutita_calcare" ${
              estrato.trama === "lutita_calcare" ? "selected" : ""
            }>623 Lutita calcárea o mármol</option>
            <option value="lutita_carbonosa" ${
              estrato.trama === "lutita_carbonosa" ? "selected" : ""
            }>624 Lutita carbonosa</option>
            <option value="lutita_petrolifera" ${
              estrato.trama === "lutita_petrolifera" ? "selected" : ""
            }>625 Lutita petrolífera</option>
            <option value="creta" ${
              estrato.trama === "creta" ? "selected" : ""
            }>626 Creta</option>
            <option value="caliza" ${
              estrato.trama === "caliza" ? "selected" : ""
            }>627 Caliza</option>
            <option value="caliza_clastica" ${
              estrato.trama === "caliza_clastica" ? "selected" : ""
            }>628 Caliza clástica</option>
            <option value="caliza_fosilifera" ${
              estrato.trama === "caliza_fosilifera" ? "selected" : ""
            }>629 Caliza fosilífera clástica</option>
            <option value="caliza_nodular" ${
              estrato.trama === "caliza_nodular" ? "selected" : ""
            }>630 Caliza nodular o con estratificación irregular</option>
            <option value="caliza_madrigueras" ${
              estrato.trama === "caliza_madrigueras" ? "selected" : ""
            }>631 Caliza, rellenos irregulares (madrigueras) de dolomita sacaroidal</option>
            <option value="caliza_cruzada" ${
              estrato.trama === "caliza_cruzada" ? "selected" : ""
            }>632 Caliza con estratificación cruzada</option>
            <option value="caliza_chert_cruzada" ${
              estrato.trama === "caliza_chert_cruzada" ? "selected" : ""
            }>633 Caliza chert con estratificación cruzada</option>
            <option value="caliza_arenosa_chert" ${
              estrato.trama === "caliza_arenosa_chert" ? "selected" : ""
            }>634 Caliza arenosa y con chert, clástica con estratificación cruzada</option>
            <option value="caliza_oolitica" ${
              estrato.trama === "caliza_oolitica" ? "selected" : ""
            }>635 Caliza oolítica</option>
            <option value="caliza_arenosa" ${
              estrato.trama === "caliza_arenosa" ? "selected" : ""
            }>636 Caliza arenosa</option>
            <option value="caliza_limosa" ${
              estrato.trama === "caliza_limosa" ? "selected" : ""
            }>637 Caliza limosa</option>
            <option value="caliza_lutitica" ${
              estrato.trama === "caliza_lutitica" ? "selected" : ""
            }>638 Caliza lutítica o arcillosa</option>
            <option value="caliza_chert_op1" ${
              estrato.trama === "caliza_chert_op1" ? "selected" : ""
            }>639 Caliza con chert 1ra opción</option>
            <option value="caliza_chert_op2" ${
              estrato.trama === "caliza_chert_op2" ? "selected" : ""
            }>640 Caliza con chert 2da opción</option>
            <option value="caliza_dolomitica" ${
              estrato.trama === "caliza_dolomitica" ? "selected" : ""
            }>641 Caliza dolomítica, dolomita calcárea</option>
            <option value="dolomita" ${
              estrato.trama === "dolomita" ? "selected" : ""
            }>642 Dolomita o dolomía</option>
            <option value="dolomita_cruzada" ${
              estrato.trama === "dolomita_cruzada" ? "selected" : ""
            }>643 Dolomita o dolomía con estratificación cruzada</option>
            <option value="dolomita_oolitica" ${
              estrato.trama === "dolomita_oolitica" ? "selected" : ""
            }>644 Dolomita o dolomía oolítica</option>
            <option value="dolomita_arenosa" ${
              estrato.trama === "dolomita_arenosa" ? "selected" : ""
            }>645 Dolomita o dolomía arenosa</option>
            <option value="dolomita_limosa" ${
              estrato.trama === "dolomita_limosa" ? "selected" : ""
            }>646 Dolomita o dolomía limosa</option>
            <option value="dolomita_lutitica" ${
              estrato.trama === "dolomita_lutitica" ? "selected" : ""
            }>647 Dolomita o dolomía arcillosa o lutítica</option>
            <option value="dolomita_chert" ${
              estrato.trama === "dolomita_chert" ? "selected" : ""
            }>648 Dolomita o dolomía con chert</option>
            <option value="chert_op1" ${
              estrato.trama === "chert_op1" ? "selected" : ""
            }>649 Chert estratificado 1ra opción</option>
            <option value="chert_op2" ${
              estrato.trama === "chert_op2" ? "selected" : ""
            }>650 Chert estratificado 2da opción</option>
            <option value="chert_fosilifero" ${
              estrato.trama === "chert_fosilifero" ? "selected" : ""
            }>651 Chert estratificado fosilífero</option>
            <option value="roca_fosilifera" ${
              estrato.trama === "roca_fosilifera" ? "selected" : ""
            }>652 Roca fosilífera</option>
            <option value="roca_diatomitica" ${
              estrato.trama === "roca_diatomitica" ? "selected" : ""
            }>653 Roca diatomítica o con diatomeas</option>
            <option value="subgrauvaca" ${
              estrato.trama === "subgrauvaca" ? "selected" : ""
            }>654 Subgrauvaca</option>
            <option value="subgrauvaca_cruzada" ${
              estrato.trama === "subgrauvaca_cruzada" ? "selected" : ""
            }>655 Subgrauvaca con estratificación cruzada</option>
            <option value="subgrauvaca_ondulada" ${
              estrato.trama === "subgrauvaca_ondulada" ? "selected" : ""
            }>656 Subgrauvaca con estratificación ondulada</option>
            <option value="turba" ${
              estrato.trama === "turba" ? "selected" : ""
            }>657 Turba</option>
            <option value="carbon" ${
              estrato.trama === "carbon" ? "selected" : ""
            }>658 Carbón</option>
            <option value="carbon_impuro" ${
              estrato.trama === "carbon_impuro" ? "selected" : ""
            }>659 Carbón con huesos o impuro</option>
            <option value="paleosuelo" ${
              estrato.trama === "paleosuelo" ? "selected" : ""
            }>660 Paleosuelo, arcilla basal, underclay</option>
            <option value="flintclay" ${
              estrato.trama === "flintclay" ? "selected" : ""
            }>661 Flintclay o pedernal</option>
            <option value="bentonita" ${
              estrato.trama === "bentonita" ? "selected" : ""
            }>662 Bentonita</option>
            <option value="glauconita" ${
              estrato.trama === "glauconita" ? "selected" : ""
            }>663 Glauconita</option>
            <option value="limonita" ${
              estrato.trama === "limonita" ? "selected" : ""
            }>664 Limonita</option>
            <option value="siderita" ${
              estrato.trama === "siderita" ? "selected" : ""
            }>665 Siderita</option>
            <option value="fosforita" ${
              estrato.trama === "fosforita" ? "selected" : ""
            }>666 Roca fosfática nodular, fósforita</option>
            <option value="yeso" ${
              estrato.trama === "yeso" ? "selected" : ""
            }>667 Yeso</option>
            <option value="sal" ${
              estrato.trama === "sal" ? "selected" : ""
            }>668 Sal</option>
            <option value="arenisca_limolita" ${
              estrato.trama === "arenisca_limolita" ? "selected" : ""
            }>669 Arenisca y limolita interestratificada</option>
            <option value="arenisca_lutita" ${
              estrato.trama === "arenisca_lutita" ? "selected" : ""
            }>670 Arenisca y lutita interestratificada</option>
            <option value="arenisca_lutita_ondulada" ${
              estrato.trama === "arenisca_lutita_ondulada" ? "selected" : ""
            }>671 Arenisca y lutita interestratificada con estratificación ondulada</option>
            <option value="lutita_caliza_limosa" ${
              estrato.trama === "lutita_caliza_limosa" ? "selected" : ""
            }>672 Lutita y caliza limosa interestratificada</option>
            <option value="lutita_caliza_op1" ${
              estrato.trama === "lutita_caliza_op1" ? "selected" : ""
            }>673 Lutita y caliza interestratificada 1ra opción</option>
            <option value="lutita_caliza_op2" ${
              estrato.trama === "lutita_caliza_op2" ? "selected" : ""
            }>674 Lutita y caliza interestratificada 2da opción</option>
            <option value="lutita_caliza_calcare" ${
              estrato.trama === "lutita_caliza_calcare" ? "selected" : ""
            }>675 Lutita calcárea y caliza interestratificada</option>
            <option value="caliza_limosa_lutita_op1" ${
              estrato.trama === "caliza_limosa_lutita_op1" ? "selected" : ""
            }>676 Caliza limosa y lutita interestratificada 1ra opción</option>
            <option value="caliza_lutita_op1" ${
              estrato.trama === "caliza_lutita_op1" ? "selected" : ""
            }>677 Caliza y lutita interestratificada 1ra opción</option>
            <option value="caliza_lutita_op2" ${
              estrato.trama === "caliza_lutita_op2" ? "selected" : ""
            }>678 Caliza y lutita interestratificada 2da opción</option>
            <option value="caliza_lutita_op3" ${
              estrato.trama === "caliza_lutita_op3" ? "selected" : ""
            }>679 Caliza y lutita interestratificada 3ra opción</option>
            <option value="caliza_lutita_calcare" ${
              estrato.trama === "caliza_lutita_calcare" ? "selected" : ""
            }>680 Caliza y lutita calcárea interestratificada</option>
            <option value="till_op1" ${
              estrato.trama === "till_op1" ? "selected" : ""
            }>681 Till o diamicto 1ra opción</option>
            <option value="till_op2" ${
              estrato.trama === "till_op2" ? "selected" : ""
            }>682 Till o diamicto 2da opción</option>
            <option value="till_op3" ${
              estrato.trama === "till_op3" ? "selected" : ""
            }>683 Till o diamicto 3ra opción</option>
            <option value="loess_op1" ${
              estrato.trama === "loess_op1" ? "selected" : ""
            }>684 Loess 1ra opción</option>
            <option value="loess_op2" ${
              estrato.trama === "loess_op2" ? "selected" : ""
            }>685 Loess 2da opción</option>
            <option value="loess_op3" ${
              estrato.trama === "loess_op3" ? "selected" : ""
            }>686 Loess 3ra opción</option>
            <option value="metamorfismo" ${
              estrato.trama === "metamorfismo" ? "selected" : ""
            }>701 Metamorfismo</option>
            <option value="cuarcita" ${
              estrato.trama === "cuarcita" ? "selected" : ""
            }>702 Cuarcita</option>
            <option value="pizarra" ${
              estrato.trama === "pizarra" ? "selected" : ""
            }>703 Pizarra</option>
            <option value="granito_esquistoso" ${
              estrato.trama === "granito_esquistoso" ? "selected" : ""
            }>704 Granito esquistoso o gneísico</option>
            <option value="esquisto" ${
              estrato.trama === "esquisto" ? "selected" : ""
            }>705 Esquisto</option>
            <option value="esquisto_contorsionado" ${
              estrato.trama === "esquisto_contorsionado" ? "selected" : ""
            }>706 Esquisto contorsionado</option>
            <option value="esquisto_gneis" ${
              estrato.trama === "esquisto_gneis" ? "selected" : ""
            }>707 Esquisto y gneis</option>
            <option value="gneis" ${
              estrato.trama === "gneis" ? "selected" : ""
            }>708 Gneis</option>
            <option value="gneis_contorsionado" ${
              estrato.trama === "gneis_contorsionado" ? "selected" : ""
            }>709 Gneis contorsionado</option>
            <option value="esteatita" ${
              estrato.trama === "esteatita" ? "selected" : ""
            }>710 Esteatita, talco o serpentinita</option>
            <option value="roca_tufitica" ${
              estrato.trama === "roca_tufitica" ? "selected" : ""
            }>711 Roca tufítica</option>
            <option value="toba_cristalina" ${
              estrato.trama === "toba_cristalina" ? "selected" : ""
            }>712 Toba cristalina</option>
            <option value="toba_desvitrificada" ${
              estrato.trama === "toba_desvitrificada" ? "selected" : ""
            }>713 Toba desvitrificada</option>
            <option value="brecha_volcanica_toba" ${
              estrato.trama === "brecha_volcanica_toba" ? "selected" : ""
            }>714 Brecha volcánica y toba</option>
            <option value="brecha_volcanica" ${
              estrato.trama === "brecha_volcanica" ? "selected" : ""
            }>715 Brecha volcánica o aglomerado</option>
            <option value="roca_zeolitica" ${
              estrato.trama === "roca_zeolitica" ? "selected" : ""
            }>716 Roca zeolítica</option>
            <option value="flujos_basalticos" ${
              estrato.trama === "flujos_basalticos" ? "selected" : ""
            }>717 Flujos basálticos</option>
            <option value="granito_op1" ${
              estrato.trama === "granito_op1" ? "selected" : ""
            }>718 Granito 1ra opción</option>
            <option value="granito_op2" ${
              estrato.trama === "granito_op2" ? "selected" : ""
            }>719 Granito 2da opción</option>
            <option value="roca_ignea_bandeada" ${
              estrato.trama === "roca_ignea_bandeada" ? "selected" : ""
            }>720 Roca ígnea bandeada</option>
            <option value="roca_ignea_op1" ${
              estrato.trama === "roca_ignea_op1" ? "selected" : ""
            }>721 Roca ígnea 1ra opción</option>
            <option value="roca_ignea_op2" ${
              estrato.trama === "roca_ignea_op2" ? "selected" : ""
            }>722 Roca ígnea 2da opción</option>
            <option value="roca_ignea_op3" ${
              estrato.trama === "roca_ignea_op3" ? "selected" : ""
            }>723 Roca ígnea 3ra opción</option>
            <option value="roca_ignea_op4" ${
              estrato.trama === "roca_ignea_op4" ? "selected" : ""
            }>724 Roca ígnea 4ta</option>
            <option value="roca_ignea_op5" ${
              estrato.trama === "roca_ignea_op5" ? "selected" : ""
            }>725 Roca ígnea 5ta</option>
            <option value="roca_ignea_op6" ${
              estrato.trama === "roca_ignea_op6" ? "selected" : ""
            }>726 Roca ígnea 6ta</option>
            <option value="roca_ignea_op7" ${
              estrato.trama === "roca_ignea_op7" ? "selected" : ""
            }>727 Roca ígnea 7ma</option>
            <option value="roca_ignea_op8" ${
              estrato.trama === "roca_ignea_op8" ? "selected" : ""
            }>728 Roca ígnea 8va</option>
            <option value="roca_porfirica_op1" ${
              estrato.trama === "roca_porfirica_op1" ? "selected" : ""
            }>729 Roca porfírica 1ra opción</option>
            <option value="roca_porfirica_op2" ${
              estrato.trama === "roca_porfirica_op2" ? "selected" : ""
            }>730 Roca porfírica 2da opción</option>
            <option value="vitrofiro" ${
              estrato.trama === "vitrofiro" ? "selected" : ""
            }>731 Vitrófiro</option>
            <option value="cuarzo" ${
              estrato.trama === "cuarzo" ? "selected" : ""
            }>732 Cuarzo</option>
            <option value="SNGM 001 Grava o conglomerado imbricado clastosoportado" ${
              estrato.trama ===
              "SNGM 001 Grava o conglomerado imbricado clastosoportado"
                ? "selected"
                : ""
            }>SNGM 001 Grava o conglomerado imbricado clastosoportado</option>
           

            <option value="mineralizacion" ${
              estrato.trama === "mineralizacion" ? "selected" : ""
            }>733 Mineralización</option>
          </select>
          <div class="parametros-estrato" style="margin-top: 5px; border-top: 1px solid #ffffff; padding-top: 10px;">
          <label>Color:</label>
          <input type="color" class="input-color" value="${estrato.color}">
          <label>Tamaño de trama:</label>
          <input type="range" class="slider-tamano" min="4" max="80" value="${
            estrato.tamanoTrama
          }" step="1">
          <span class="valor-tamano">${estrato.tamanoTrama} px</span>
          <div class="parametros-estrato" style="margin-top: 5px; border-top: 1px solid #ffffff; padding-top: 10px;">
          
          <label>Tipo borde inferior:</label>
          <select class="select-borde-superior">
            <option value="recto" ${
              estrato.tipoBordeSuperior === "recto" ? "selected" : ""
            }>Recto</option>
            <option value="inf_transparente" ${
              estrato.tipoBordeSuperior === "inf_transparente" ? "selected" : ""
            }>Recto con base transparente</option>
            <option value="sup_transparente" ${
              estrato.tipoBordeSuperior === "sup_transparente" ? "selected" : ""
            }>Recto con techo transparente</option>
            <option value="sup_inf_transparente" ${
              estrato.tipoBordeSuperior === "sup_inf_transparente"
                ? "selected"
                : ""
            }>Recto con base y techo transparente</option>
            <option value="sup_inf_der_transparente" ${
              estrato.tipoBordeSuperior === "sup_inf_der_transparente"
                ? "selected"
                : ""
            }>Recto con todos los bordes transparentes</option>
            <option value="segmentado" ${
              estrato.tipoBordeSuperior === "segmentado" ? "selected" : ""
            }>Segmentado</option>
            <option value="ondulado" ${
              estrato.tipoBordeSuperior === "ondulado" ? "selected" : ""
            }>Ondulado</option>
            <option value="ondulado_inf_trans" ${
              estrato.tipoBordeSuperior === "ondulado_inf_trans"
                ? "selected"
                : ""
            }>Ondulado con base transparente</option>
            <option value="ondulado_sup_trans" ${
              estrato.tipoBordeSuperior === "ondulado_sup_trans"
                ? "selected"
                : ""
            }>Ondulado con techo transparente</option>
            <option value="ondulado_inf_sup_trans" ${
              estrato.tipoBordeSuperior === "ondulado_inf_trans"
                ? "selected"
                : ""
            }>Ondulado con base y techo transparente</option>
            <option value="discontinuo" ${
              estrato.tipoBordeSuperior === "discontinuo" ? "selected" : ""
            }>Discontinuo</option>
            <option value="canal" ${
              estrato.tipoBordeSuperior === "canal" ? "selected" : ""
            }>Canal</option>
            <option value="canal2" ${
              estrato.tipoBordeSuperior === "canal2" ? "selected" : ""
            }>Canal 2</option>
            <option value="vacio_1" ${
              estrato.tipoBordeSuperior === "vacio" ? "selected" : ""
            }>Vacío, hiato o no visible (1)</option>
            <option value="vacio_2" ${
              estrato.tipoBordeSuperior === "vacio" ? "selected" : ""
            }>Vacío, hiato o no visible (2)</option>
          </select>
          <!-- ✅ NUEVO: Panel para Símbolos a la Derecha -->
          <div class="contenedor-simbolos-derecha" style="margin-top: 15px; border-top: 1px solid #ccc; padding-top: 15px;">
            <h4 style="margin: 1px 0 5px 0; font-size: 14px;">Símbolos a la Derecha</h4>
            <div class="lista-simbolos-derecha">
              <!-- Los símbolos agregados aparecerán aquí dinámicamente -->
            </div>
            <div style="display: flex; gap: 5px; align-items: center; margin-bottom: 10px;">
              <select class="select-simbolo-derecha" style="flex: 1;">
                <option value="10.2.1 Macrofosiles">10.2.1 Macrofosiles</option>
                <option value="10.2.2 Invertebrados">10.2.2 Invertebrados</option>
                <option value="10.2.3 Anélidos">10.2.3 Anélidos</option>
                <option value="10.2.4 Artrópodos">10.2.4 Artrópodos</option>
                <option value="10.2.5 Aracnidos">10.2.5 Aracnidos</option>
                <option value="10.2.6 Crustáceos">10.2.6 Crustáceos</option>
                <option value="10.2.7 Insectos">10.2.7 Insectos</option>
                <option value="10.2.8 Trilobites">10.2.8 Trilobites</option>
                <option value="10.2.9 Braquiopodos">10.2.9 Braquiopodos</option>
                <option value="10.2.10 Briozoos">10.2.10 Briozoos</option>
                <option value="10.2.11 Cnidarios">10.2.11 Cnidarios</option>
                <option value="10.2.12 Corales">10.2.12 Corales</option>
                <option value="10.2.13 Estromatoporoideos">10.2.13 Estromatoporoideos</option>
                <option value="10.2.14 Equinodermos">10.2.14 Equinodermos</option>
                <option value="10.2.15 Crinoideos">10.2.15 Crinoideos</option>
                <option value="10.2.16 Equinoideos">10.2.16 Equinoideos</option>
                <option value="10.2.17 Graptolitos">10.2.17 Graptolitos</option>
                <option value="10.2.18 moluscos">10.2.18 moluscos</option>
                <option value="10.2.19 Cefalópodos">10.2.19 Cefalópodos</option>
                <option value="10.2.20 Amonoideos">10.2.20 Amonoideos</option>
                <option value="10.2.21 Belemnoideos">10.2.21 Belemnoideos</option>
                <option value="10.2.22 Nautiloideos">10.2.22 Nautiloideos</option>
                <option value="10.2.23 Gastrópodos">10.2.23 Gastrópodos</option>
                <option value="10.2.24 Pelecípodos">10.2.24 Pelecípodos</option>
                <option value="10.2.25 Esponjas">10.2.25 Esponjas</option>
                <option value="10.2.26 Vertebrados">10.2.26 Vertebrados</option>
                <option value="10.2.27 Anfibios">10.2.27 Anfibios</option>
                <option value="10.2.28 Peces">10.2.28 Peces</option>
                <option value="10.2.29 Mamíferos">10.2.29 Mamíferos</option>
                <option value="10.2.30 Reptiles">10.2.30 Reptiles</option>
                <option value="10.2.31 Plantas">10.2.31 Plantas</option>
                <option value="10.2.32 Hojas">10.2.32 Hojas</option>
                <option value="10.2.33 Raíces">10.2.33 Raíces</option>
                <option value="10.2.34 Madera">10.2.34 Madera</option>
                <option value="10.2.35 Algas">10.2.35 Algas</option>
                <option value="10.2.36 Coníferas">10.2.36 Coníferas</option>
                <option value="10.2.37 Helechos">10.2.37 Helechos</option>
                <option value="10.2.38 Plantas o árboles con flores">10.2.38 Plantas o árboles con flores</option>
                <option value="10.2.39 Estromatolitos">10.2.39 Estromatolitos</option>
                <option value="10.2.40 Fungi">10.2.40 Fungi</option>
                <option value="10.2.41 Trazas fósiles">10.2.41 Trazas fósiles</option>
                <option value="10.2.42 Madrigueras">10.2.42 Madrigueras</option>
                <option value="10.2.43 Coprolitos">10.2.43 Coprolitos</option>
                <option value="10.2.44 Huellas">10.2.44 Huellas</option>
                <option value="10.2.45 Microfósiles">10.2.45 Microfósiles</option>
                <option value="10.2.46 Conodontos">10.2.46 Conodontos</option>
                <option value="10.2.47 Diatomeas">10.2.47 Diatomeas</option>
                <option value="10.2.48 Foraminíferos">10.2.48 Foraminíferos</option>
                <option value="10.2.49 Grandes foraminíferos o fusulínidos">10.2.49 Grandes foraminíferos o fusulínidos</option>
                <option value="10.2.50 Foraminíferos bentónicos, pequeños">10.2.50 Foraminíferos bentónicos, pequeños</option>
                <option value="10.2.51 Foraminíferos planctónicos, pequeños">10.2.51 Foraminíferos planctónicos, pequeños</option>
                <option value="10.2.52 Nanofósiles">10.2.52 Nanofósiles</option>
                <option value="10.2.53 Ostrácodos">10.2.53 Ostrácodos</option>
                <option value="10.2.54 Palinomorfos">10.2.54 Palinomorfos</option>
                <option value="10.2.55 Acritarcos">10.2.55 Acritarcos</option>
                <option value="10.2.56 Quitinozoos">10.2.56 Quitinozoos</option>
                <option value="10.2.57 Dinoflagelados">10.2.57 Dinoflagelados</option>
                <option value="10.2.58 Polen o esporas">10.2.58 Polen o esporas</option>
                <option value="10.2.59 Radiolarios">10.2.59 Radiolarios</option>
                <option value="10.2.60 Silicoflagelados">10.2.60 Silicoflagelados</option>
                <option value="10.2.61 Espículas">10.2.61 Espículas</option>
                <option value="concreciones">concreciones</option>
                <option value="meteorizacion_esferoidal">meteorizacion_esferoidal</option>
                <option value="raices">raices</option>
                <option value="SNGM Algas calcáreas">SNGM Algas calcáreas</option>
                <option value="SNGM Bioturbación">SNGM Bioturbación</option>
                <option value="SNGM Diatomeas">SNGM Diatomeas</option>
                <option value="SNGM Fauna fósil indiferenciada">SNGM Fauna fósil indiferenciada</option>
                <option value="SNGM Flora fósil">SNGM Flora fósil</option>
                <option value="SNGM Foraminíferos">SNGM Foraminíferos</option>
                <option value="SNGM Invertebrados marinos">SNGM Invertebrados marinos</option>
                <option value="SNGM Mamíferos marinos">SNGM Mamíferos marinos</option>
                <option value="SNGM Microfauna sin especificar">SNGM Microfauna sin especificar</option>
                <option value="SNGM Peces, esqueletos y escamas">SNGM Peces, esqueletos y escamas</option>
                <option value="SNGM Polen y o esporas">SNGM Polen y o esporas</option>
                <option value="SNGM Radiolarios">SNGM Radiolarios</option>
                <option value="SNGM Raiz en posición de vida">SNGM Raiz en posición de vida</option>
                <option value="SNGM Rastros y pisadas 1">SNGM Rastros y pisadas 1</option>
                <option value="SNGM Rastros y pisadas 2">SNGM Rastros y pisadas 2</option>
                <option value="SNGM Restos de tronco">SNGM Restos de tronco</option>
                <option value="SNGM Trazas fósiles 2">SNGM Trazas fósiles 2</option>
                <option value="SNGM Trazas fósiles 3">SNGM Trazas fósiles 3</option>
                <option value="SNGM Trazas fósiles">SNGM Trazas fósiles</option>
                <option value="SNGM Tronco en posición de vida">SNGM Tronco en posición de vida</option>
                <option value="SNGM Vertebrados">SNGM Vertebrados</option>
              </select>
              <button class="btn-agregar-simbolo-derecha" style="padding: 4px 8px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">➕ Añadir</button>
            </div>
          </div>
          <button class="btn-eliminar" data-index="${index}">🗑️ Eliminar estrato</button>
        </div>
      `;
  panelesContainer.prepend(panel);
  const encabezadoTexto = panel.querySelector(".panel-encabezado strong");
  const selectTrama = panel.querySelector(".select-trama");
  const inputColor = panel.querySelector(".input-color");
  const inputNombre = panel.querySelector(".input-nombre");
  const sliderTamano = panel.querySelector(".slider-tamano");
  const valorTamano = panel.querySelector(".valor-tamano");
  const sliderAlto = panel.querySelector(".slider-alto");
  const valorAlto = panel.querySelector(".valor-alto");
  const valorMetrosAlto = panel.querySelector(".valor-metros-alto");
  const sliderAncho = panel.querySelector(".slider-ancho");
  const valorAncho = panel.querySelector(".valor-ancho");
  const valorMetrosAncho = panel.querySelector(".valor-metros-ancho");
  const selectBordeSuperior = panel.querySelector(".select-borde-superior");
  const btnEliminar = panel.querySelector(".btn-eliminar");
  // ✅ NUEVO: Manejo de símbolos a la derecha
  const listaSimbolosDerecha = panel.querySelector(".lista-simbolos-derecha");
  const selectSimboloDerecha = panel.querySelector(".select-simbolo-derecha");
  const btnAgregarSimboloDerecha = panel.querySelector(
    ".btn-agregar-simbolo-derecha"
  );
  // Función para renderizar la lista de símbolos en el panel
  const renderizarSimbolosDerecha = () => {
    listaSimbolosDerecha.innerHTML = "";
    estrato.simbolosDerecha.forEach((simboloInfo, idx) => {
      const item = document.createElement("div");
      item.style.display = "flex";
      item.style.justifyContent = "space-between";
      item.style.alignItems = "center";
      item.style.padding = "5px";
      item.style.margin = "2px 0";
      item.style.background = "#f9f9f9";
      item.style.borderRadius = "4px";
      item.style.fontSize = "12px";
      const nombreSimbolo =
        selectSimboloDerecha.querySelector(
          `option[value="${simboloInfo.tipo}"]`
        )?.textContent || simboloInfo.tipo;
      item.innerHTML = `
            <span>${nombreSimbolo} (${(simboloInfo.proporcionY * 100).toFixed(
        0
      )}%)</span>
            <button class="btn-eliminar-simbolo" data-index="${idx}" style="padding: 2px 6px; background: #ffffffff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">🗑️</button>
          `;
      listaSimbolosDerecha.appendChild(item);
    });
  };
  // Inicializar la lista
  renderizarSimbolosDerecha();
  // Agregar un nuevo símbolo
  btnAgregarSimboloDerecha.addEventListener("click", function () {
    const tipo = selectSimboloDerecha.value;
    if (tipo === "ninguno") return;
    // Agregar el símbolo al centro del estrato por defecto
    estrato.simbolosDerecha.push({
      tipo: tipo,
      proporcionY: 0.5, // 50% desde la parte superior del estrato
    });
    renderizarSimbolosDerecha();
    dibujar(); // Redibujar el canvas para mostrar el nuevo símbolo
  });
  // Eliminar un símbolo (delegación de eventos)
  listaSimbolosDerecha.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-eliminar-simbolo")) {
      const index = parseInt(e.target.dataset.index);
      estrato.simbolosDerecha.splice(index, 1);
      renderizarSimbolosDerecha();
      dibujar();
    }
  });
  const actualizar = () => {
    estrato.nombre = inputNombre.value; // <-- ¡Guardar el nombre!
    encabezadoTexto.textContent = estrato.nombre || "Estrato sin nombre"; // ← ¡NUEVA LÍNEA!
    estrato.trama = selectTrama.value;
    estrato.color = inputColor.value;
    estrato.tamanoTrama = parseInt(sliderTamano.value);
    estrato.alto = parseInt(sliderAlto.value);
    if (estrato.puntoControl.posicionManual) {
      estrato.puntoControl.y =
        estrato.topY + estrato.puntoControl.proporcionY * estrato.alto;
    }
    estrato.ancho = parseInt(sliderAncho.value);
    estrato.tipoBordeSuperior = selectBordeSuperior.value;
    valorTamano.textContent = estrato.tamanoTrama + "px";
    valorAlto.textContent = estrato.alto + "px";
    valorMetrosAlto.textContent = `(${(
      estrato.alto / PIXELES_POR_METRO
    ).toFixed(1)}m)`;
    valorAncho.textContent = estrato.ancho + "px";
    valorMetrosAncho.textContent = `(${(
      estrato.ancho / PIXELES_POR_METRO
    ).toFixed(1)}m)`;
    if (estrato.puntoControl.posicionManual) {
      estrato.puntoControl.x =
        IZQUIERDA_X + estrato.ancho * estrato.puntoControl.proporcionX;
    } else {
      estrato.puntoControl.x = IZQUIERDA_X + estrato.ancho;
    }
    dibujar();
  };

  // ✅ Añadir funcionalidad colapsable
  const encabezado = panel.querySelector(".panel-encabezado");
  const contenido = panel.querySelector(".panel-contenido");
  const icono = panel.querySelector(".toggle-icon");

  encabezado.addEventListener("click", () => {
    const isVisible = contenido.style.display === "block";
    contenido.style.display = isVisible ? "none" : "block";
    icono.textContent = isVisible ? "▶" : "▼";
  });

  selectTrama.addEventListener("change", actualizar);
  inputColor.addEventListener("input", actualizar);
  sliderTamano.addEventListener("input", actualizar);
  sliderAlto.addEventListener("input", actualizar);
  sliderAncho.addEventListener("input", actualizar);
  selectBordeSuperior.addEventListener("change", actualizar);
  btnEliminar.addEventListener("click", function () {
    const index = parseInt(this.dataset.index);
    estratos.splice(index, 1);
    panelesContainer.innerHTML = "";
    estratos.forEach((e, i) => crearPanelEstrato(i));
    dibujar();
  });
}
document
  .getElementById("btnAbrirPaleta")
  .addEventListener("click", function () {
    window.open(
      "Paleta.html",
      "PaletaColores",
      "width=600,height=700,scrollbars=yes,resizable=yes"
    );
  });
// ================================
// INICIAR
// ================================
agregarEstrato();
dibujar();
// ================================
// ALTERNAR DISEÑO: CENTRADO vs LATERAL
// ================================
let modoLateral = false;
document
  .getElementById("btnToggleLayout")
  .addEventListener("click", function () {
    modoLateral = !modoLateral;
    if (modoLateral) {
      document.body.classList.add("layout-lateral");
      this.textContent = "↔️ Volver a diseño centrado";
    } else {
      document.body.classList.remove("layout-lateral");
      this.textContent = "↔️ Cambiar a diseño lateral";
    }
    // Redibujar para ajustar canvas
    setTimeout(dibujar, 100);
  });
