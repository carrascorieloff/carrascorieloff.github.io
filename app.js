//02-01-26

// Función para mostrar el pop-up y copiar el contenido del canvas
// Función para mostrar el pop-up y copiar el contenido del canvas
function mostrarPopup() {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const popupCanvas = document.getElementById("popupCanvas");
  const popupCtx = popupCanvas.getContext("2d");

  popup.classList.add('active');
  overlay.classList.add('active');
  // Mostrar el pop-up y el overlay
  popup.style.display = "block";
  overlay.style.display = "block";

  // Establecer dimensiones del canvas del pop-up
  popupCanvas.width = canvas.width;
  popupCanvas.height = canvas.height;

  // ✅ Redibujar SIN puntos de control en el canvas principal primero
  dibujar(false);

  // Copiar el contenido del canvas principal al canvas del pop-up
  popupCtx.drawImage(canvas, 0, 0);

  // ✅ Inmediatamente volver a dibujar CON puntos (usando requestAnimationFrame)
  requestAnimationFrame(() => {
    dibujar(true);
  });
}

document.getElementById("toggleGuias").addEventListener("change", function (e) {
  mostrarGuiasVerticales = e.target.checked;
  dibujar();
});
document.getElementById("invertirEscala").addEventListener("change", function (e) {
  invertirEscala = e.target.checked;
  dibujar();
});
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
const IZQUIERDA_X = 300;
let estratos = [];
let estratoArrastrando = null;
let PIXELES_POR_METRO = 100;
let ANCHO_ESCALA_HORIZONTAL = 150;
let DESPLAZAMIENTO_ESCALA_HORIZONTAL = 0;
let mostrarGuiasVerticales = false;
let invertirEscala = false; // ← AÑADIR ESTA LÍNEA
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
// DIBUJAR ESCALA VERTICAL — ¡CORREGIDO! CON OPCIÓN DE INVERTIR
// ================================
function dibujarEscalaVertical(profundidadTotal, escala = 1) {
  const inicioY = estratos.length > 0 ? estratos[0].bottomY : 100;
  const finY = estratos.length > 0 ? estratos[estratos.length - 1].topY : 800;

  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#000';
  ctx.font = `${12 * escala}px Arial`;
  ctx.textAlign = 'right';
  ctx.lineWidth = 1 * escala;

  // Línea principal
  ctx.beginPath();
  ctx.moveTo(IZQUIERDA_X - 20, finY);
  ctx.lineTo(IZQUIERDA_X - 20, inicioY);
  ctx.stroke();

  const metrosTotales = profundidadTotal / PIXELES_POR_METRO;

  // 👉 Detección automática de escala de detalle
  const escalaDetalle = PIXELES_POR_METRO >= 500;

  if (escalaDetalle) {
    // ===== ESCALA EN CENTÍMETROS =====
    const intervaloCm = 10;
    const pixelesPorCm = PIXELES_POR_METRO / 100;
    const totalCm = metrosTotales * 100;

    for (let cm = 0; cm <= totalCm; cm += intervaloCm) {
      const y = inicioY - (cm * pixelesPorCm);

      ctx.beginPath();
      ctx.moveTo(IZQUIERDA_X - 24, y);
      ctx.lineTo(IZQUIERDA_X - 16, y);
      ctx.stroke();

      if (cm % 10 === 0) {
        let etiqueta;
        if (invertirEscala) {
          // Invertir: mostrar profundidad desde la superficie
          const profundidadCm = totalCm - cm;
          etiqueta = `${profundidadCm} cm`;
        } else {
          // Normal: mostrar altura desde la base
          etiqueta = `${cm} cm`;
        }
        ctx.fillText(etiqueta, IZQUIERDA_X - 30 * escala, y + 4 * escala);
      }
    }

  } else {
    // ===== ESCALA EN METROS =====
    const SEPARACION_MINIMA_ETIQUETAS = 40;
    const metrosPorSeparacion = SEPARACION_MINIMA_ETIQUETAS / PIXELES_POR_METRO;

    let intervaloMetros;

    if (metrosPorSeparacion < 0.1) {
      intervaloMetros = 0.1;
    } else if (metrosPorSeparacion < 0.25) {
      intervaloMetros = 0.25;
    } else if (metrosPorSeparacion < 0.5) {
      intervaloMetros = 0.5;
    } else if (metrosPorSeparacion < 1) {
      intervaloMetros = 1;
    } else if (metrosPorSeparacion < 2) {
      intervaloMetros = 2;
    } else if (metrosPorSeparacion < 5) {
      intervaloMetros = 5;
    } else {
      intervaloMetros = 10;
    }

    const numMarcas = metrosTotales / intervaloMetros;
    if (numMarcas > 30) {
      intervaloMetros = Math.ceil(metrosTotales / 20);
    }

    for (let m = 0; m <= metrosTotales; m += intervaloMetros) {
      const y = inicioY - (m * PIXELES_POR_METRO);

      ctx.beginPath();
      ctx.moveTo(IZQUIERDA_X - 25, y);
      ctx.lineTo(IZQUIERDA_X - 15, y);
      ctx.stroke();

      // CORRECCIÓN: Usar Number.isInteger correctamente
      let etiqueta;

      if (invertirEscala) {
        const profundidad = metrosTotales - m;

        if (intervaloMetros < 1) {
          const cm = Math.round(profundidad * 100);
          etiqueta = `${cm} cm`;
        } else if (profundidad === 0 || Number.isInteger(profundidad)) {
          etiqueta = `${profundidad} m`;
        } else {
          etiqueta = `${profundidad.toFixed(1)} m`;
        }
      } else {
        if (intervaloMetros < 1) {
          const cm = Math.round(m * 100);
          etiqueta = `${cm} cm`;
        } else if (m === 0 || Number.isInteger(m)) {
          etiqueta = `${m} m`;
        } else {
          etiqueta = `${m.toFixed(1)} m`;
        }
      }

      ctx.fillText(etiqueta, IZQUIERDA_X - 30 * escala, y + 4 * escala);
    }
  }

  ctx.textAlign = 'start';
}



document.getElementById("desplazamientoEscalaHorizontal").addEventListener("input", function () {
  DESPLAZAMIENTO_ESCALA_HORIZONTAL = parseInt(this.value) || 0;
  dibujar();
});

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
// FUNCIÓN AUXILIAR: DIBUJAR TEXTO CON SALTO DE LÍNEA
// ================================
function dibujarTextoConSaltoLinea(ctx, texto, x, y, maxWidth, lineHeight) {
  const palabras = texto.split(' ');
  const lineas = [];
  let lineaActual = palabras[0];

  for (let i = 1; i < palabras.length; i++) {
    const palabra = palabras[i];
    const ancho = ctx.measureText(lineaActual + ' ' + palabra).width;
    if (ancho < maxWidth) {
      lineaActual += ' ' + palabra;
    } else {
      lineas.push(lineaActual);
      lineaActual = palabra;
    }
  }
  lineas.push(lineaActual);

  // Dibujar cada línea
  for (let i = 0; i < lineas.length; i++) {
    ctx.fillText(lineas[i], x, y + (i * lineHeight));
  }

  return lineas.length; // Devolver número de líneas para ajuste vertical
}

// ================================
// DIBUJAR TODO — CON SALTO DE LÍNEA PARA NOMBRES LARGOS
// ================================




function dibujar(mostrarPuntos = true, escala = 1) {
  const profundidadTotal = calcularPosicionesEstratos();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dibujarEscalaVertical(profundidadTotal, escala);
  const posicionesXGuías = dibujarEscalaHorizontal(escala);

  // ✅ DIBUJAR GUÍAS VERTICALES (si están activadas)
  if (mostrarGuiasVerticales) {
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 1 * escala;
    //ctx.setLineDash([10, 5]); // Línea punteada

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

    // ✅✅✅ NUEVA IMPLEMENTACIÓN: Dibujar etiqueta con salto de línea automático
    const puntoMedioY = estrato.topY + (estrato.alto / 2);
    const texto = estrato.nombre || `Estrato ${index + 1}`;

    // Configuración de texto
    ctx.fillStyle = "#000";
    ctx.font = `${12 * escala}px Arial`;
    ctx.textAlign = "right";
    ctx.textBaseline = "top"; // Cambiamos a 'top' para control mejor las líneas

    // Ancho máximo disponible para el texto
    // Dejamos 10px de margen desde el borde izquierdo del canvas
    // y 20px de espacio desde la línea vertical (IZQUIERDA_X - 20)
    const maxWidth = (IZQUIERDA_X - 100) * escala; // Ancho máximo permitido

    // Altura de línea
    const lineHeight = 14 * escala;

    // Posición X (fija, alineada a la derecha)
    const posX = (IZQUIERDA_X - 90) * escala;

    // Dividir texto en líneas
    const palabras = texto.split(' ');
    const lineas = [];
    let lineaActual = palabras[0];

    for (let i = 1; i < palabras.length; i++) {
      const palabra = palabras[i];
      const prueba = lineaActual + ' ' + palabra;
      const ancho = ctx.measureText(prueba).width;

      if (ancho < maxWidth) {
        lineaActual = prueba;
      } else {
        lineas.push(lineaActual);
        lineaActual = palabra;
      }
    }
    lineas.push(lineaActual);

    // Calcular altura total del texto
    const alturaTotal = lineas.length * lineHeight;

    // Ajustar posición Y para centrar verticalmente el bloque de texto
    const yInicio = puntoMedioY - (alturaTotal / 2);

    // Dibujar cada línea
    for (let i = 0; i < lineas.length; i++) {
      const yLinea = yInicio + (i * lineHeight);

      // Verificar que la línea no se salga del estrato
      if (yLinea >= estrato.topY && yLinea <= estrato.bottomY) {
        ctx.fillText(lineas[i], posX, yLinea);
      }
    }
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
// EXPORTAR COMO PNG
// ================================
document.getElementById("btnExportarPNG").addEventListener("click", function () {
  // Redibujar sin puntos temporalmente
  dibujar(false);

  // Crear enlace de descarga
  const link = document.createElement("a");
  link.download = "columna_estratigrafica.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  // Restaurar puntos
  setTimeout(() => dibujar(true), 100);
});


// Función auxiliar para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = "info") {
  // Eliminar notificación anterior si existe
  const notifAnterior = document.querySelector(".notificacion-flotante");
  if (notifAnterior) notifAnterior.remove();

  const notificacion = document.createElement("div");
  notificacion.className = "notificacion-flotante";
  notificacion.textContent = mensaje;
  notificacion.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${tipo === "success" ? "#4CAF50" : tipo === "error" ? "#f44336" : "#2196F3"};
    color: white;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
    font-family: Arial, sans-serif;
    max-width: 300px;
  `;

  document.body.appendChild(notificacion);

  // Auto-eliminar después de 3 segundos
  setTimeout(() => {
    if (notificacion.parentNode) {
      notificacion.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => {
        if (notificacion.parentNode) {
          notificacion.parentNode.removeChild(notificacion);
        }
      }, 300);
    }
  }, 3000);
}

// IMPORTAR PROYECTO DESDE ARCHIVO JSON - VERSIÓN CORREGIDA
document.getElementById("inputImportarProyecto").addEventListener("change", function (e) {
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

      // ✅ RECONSTRUIR ESTRATOS CON TODOS LOS DATOS DEL PUNTO DE CONTROL
      estratos = proyecto.estratos.map((e) => {
        const estrato = new Estrato(
          e.alto,
          e.ancho,
          e.color,
          e.trama,
          e.tamanoTrama,
          "ninguno",
          e.tipoBordeSuperior || "recto"
        );

        estrato.nombre = e.nombre || "Estrato";

        // ✅ RESTAURAR TODAS LAS PROPIEDADES DEL PUNTO DE CONTROL
        if (e.puntoControl) {
          estrato.puntoControl.proporcionX = e.puntoControl.proporcionX ?? 1.0;
          estrato.puntoControl.proporcionY = e.puntoControl.proporcionY ?? 0.5;
          estrato.puntoControl.posicionManual = e.puntoControl.posicionManual ?? false;
          estrato.puntoControl.x = e.puntoControl.x ?? (IZQUIERDA_X + estrato.ancho);
          estrato.puntoControl.y = e.puntoControl.y ?? ((estrato.topY + estrato.bottomY) / 2);
        }

        estrato.simbolosDerecha = e.simbolosDerecha || [];
        return estrato;
      });

      // Reconstruir interfaz
      panelesContainer.innerHTML = "";
      estratos.forEach((_, i) => crearPanelEstrato(i));
      dibujar();

      mostrarNotificacion(`✅ Proyecto "${file.name}" cargado correctamente`, "success");
    } catch (error) {
      console.error("Error al importar:", error);
      mostrarNotificacion(
        "❌ Error al cargar el archivo. Asegúrate de que sea un JSON válido de columna estratigráfica.",
        "error"
      );
    }
  };
  reader.readAsText(file);
  e.target.value = ""; // Reset para permitir recargar el mismo archivo
});
// IMPORTAR PROYECTO DESDE ARCHIVO JSON
document
  .getElementById("btnImportarProyecto")
  .addEventListener("click", function () {
    document.getElementById("inputImportarProyecto").click();
  });


// ================================
// EXPORTAR JPG CON FONDO BLANCO - VERSIÓN SEGURA
// ================================
document.getElementById("btnExportarJPG").addEventListener("click", function () {
  const escala = 1;

  // 1. Redibujar sin puntos temporalmente
  dibujar(false);

  // 2. Crear canvas temporal con las dimensiones correctas
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width * escala;
  tempCanvas.height = canvas.height * escala;
  const tempCtx = tempCanvas.getContext('2d');

  // 3. Rellenar con fondo blanco
  tempCtx.fillStyle = "#FFFFFF";
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // 4. Copiar el contenido del canvas principal, escalado
  tempCtx.drawImage(
    canvas,
    0, 0, canvas.width, canvas.height,  // fuente
    0, 0, tempCanvas.width, tempCanvas.height // destino (escalado)
  );

  // 5. Exportar el canvas temporal
  const link = document.createElement("a");
  link.download = `columna_estratigrafica_${escala}x.jpg`;
  link.href = tempCanvas.toDataURL("image/jpeg", 0.95);
  link.click();

  // 6. Restaurar puntos en el canvas principal
  setTimeout(() => dibujar(true), 100);
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
    const escala = 1;
    exportarConCalidad(escala, "pdf", function () {
      const { jsPDF } = window.jspdf;
      // Crear PDF con orientación 'portrait' y tamaño personalizado basado en el canvas escalado
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height * 2],
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
// GUARDAR PROYECTO EN LOCALSTORAGE - VERSIÓN CORREGIDA
// REEMPLAZAR la función existente del botón Guardar:
document.getElementById("btnGuardar").addEventListener("click", function () {
  const nombre = prompt("Nombre del proyecto:", "Proyecto 1");
  if (!nombre) return;

  const proyecto = {
    pixelesPorMetro: PIXELES_POR_METRO,
    fechaGuardado: new Date().toISOString(), // Fecha en formato ISO
    fechaLegible: new Date().toLocaleString(), // Fecha legible para mostrar
    version: "1.0",
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
        proporcionY: e.puntoControl.proporcionY,
        posicionManual: e.puntoControl.posicionManual,
        x: e.puntoControl.x,
        y: e.puntoControl.y
      },
      simbolosDerecha: e.simbolosDerecha,
    })),
  };

  localStorage.setItem(`columna_${nombre}`, JSON.stringify(proyecto));
  mostrarNotificacion(`✅ Proyecto "${nombre}" guardado correctamente`, "success");
});
// ================================
// CARGAR PROYECTO
// ================================
document.getElementById("btnCargar").addEventListener("click", function () {
  mostrarModalProyectos();
});

// Función para mostrar el modal con lista de proyectos
function mostrarModalProyectos() {
  // Obtener proyectos del localStorage
  const proyectos = [];
  const proyectosInfo = []; // Almacenar info adicional

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("columna_")) {
      const nombre = key.replace("columna_", "");
      const data = localStorage.getItem(key);
      try {
        const proyecto = JSON.parse(data);
        proyectos.push(nombre);
        proyectosInfo.push({
          nombre: nombre,
          fecha: proyecto.fechaGuardado || new Date(0).toISOString(), // Fecha por defecto si no existe
          fechaLegible: proyecto.fechaLegible || "Fecha desconocida",
          estratos: proyecto.estratos?.length || 0,
          pixelesPorMetro: proyecto.pixelesPorMetro || 100
        });
      } catch (e) {
        proyectos.push(nombre);
        proyectosInfo.push({
          nombre: nombre,
          fecha: new Date(0).toISOString(), // Fecha mínima para proyectos con error
          fechaLegible: "Error al leer",
          estratos: 0,
          pixelesPorMetro: 100
        });
      }
    }
  }



  // Función para ordenar la tabla de proyectos
  function ordenarTablaProyectos(criterio) {
    const tbody = document.getElementById("tablaProyectos");
    if (!tbody) return;

    const filas = Array.from(tbody.querySelectorAll("tr"));

    filas.sort((a, b) => {
      const nombreA = a.getAttribute("data-nombre").toLowerCase();
      const nombreB = b.getAttribute("data-nombre").toLowerCase();
      const fechaA = new Date(a.getAttribute("data-fecha"));
      const fechaB = new Date(b.getAttribute("data-fecha"));
      const estratosA = parseInt(a.getAttribute("data-estratos"));
      const estratosB = parseInt(b.getAttribute("data-estratos"));

      switch (criterio) {
        case "nombre":
          return nombreA.localeCompare(nombreB);

        case "fecha":
          return fechaB - fechaA; // Más reciente primero

        case "estratos":
          return estratosB - estratosA; // Más estratos primero

        default:
          return 0;
      }
    });

    // Reordenar filas en la tabla
    filas.forEach(fila => tbody.appendChild(fila));
  }
  // Crear o actualizar el modal
  let modal = document.getElementById("modalProyectos");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modalProyectos";
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 5px 25px rgba(0,0,0,0.3);
      z-index: 1000;
      min-width: 500px;
      max-width: 700px;
      max-height: 80vh;
      overflow-y: auto;
      display: none;
    `;

    // Overlay para cerrar al hacer clic fuera
    const overlay = document.createElement("div");
    overlay.id = "modalOverlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 999;
      display: none;
    `;
    overlay.addEventListener("click", cerrarModalProyectos);

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  }

  if (proyectosInfo.length === 0) {
    modal.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h3 style="margin-top: 0; color: #666;">No hay proyectos guardados</h3>
        <p>Guarda primero un proyecto usando el botón "💾 Guardar Proyecto"</p>
        <button id="btnCerrarModal" style="padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Cerrar</button>
      </div>
    `;
  } else {
    // Crear tabla con proyectos ordenados
    let proyectosHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #333;">Proyectos Guardados</h3>
        <div style="display: flex; gap: 10px; align-items: center;">
          <select id="ordenProyectos" style="padding: 5px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px;">
            <option value="fecha">📆 Ordenar por fecha (más reciente)</option>
            <option value="nombre">🔤 Ordenar por nombre</option>
            <option value="estratos">📊 Ordenar por número de estratos</option>
          </select>
          <button id="btnCerrarModal" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #666;">×</button>
        </div>
      </div>
      <div style="margin-bottom: 15px; font-size: 14px; color: #666;">
        ${proyectosInfo.length} proyecto(s) encontrado(s)
      </div>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Nombre</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Fecha</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Estratos</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Escala</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Acciones</th>
            </tr>
          </thead>
          <tbody id="tablaProyectos">
    `;

    // Renderizar proyectos en el orden actual
    proyectosInfo.forEach((proyecto, index) => {
      proyectosHTML += `
        <tr style="border-bottom: 1px solid #eee; ${index % 2 === 0 ? 'background: #f9f9f9;' : ''}" data-nombre="${proyecto.nombre}" data-fecha="${proyecto.fecha}" data-estratos="${proyecto.estratos}">
          <td style="padding: 10px;">
            <strong>${proyecto.nombre}</strong>
          </td>
          <td style="padding: 10px;">
            ${proyecto.fechaLegible}
          </td>
          <td style="padding: 10px; text-align: center;">${proyecto.estratos}</td>
          <td style="padding: 10px; text-align: center;">${proyecto.pixelesPorMetro} px/m</td>
          <td style="padding: 10px;">
            <button class="btnCargarProyecto" data-nombre="${proyecto.nombre}" 
                    style="padding: 6px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 5px; font-size: 12px;">
              <i class="fas fa-folder-open"></i> Cargar
            </button>
            <button class="btnEliminarProyecto" data-nombre="${proyecto.nombre}" 
                    style="padding: 6px 12px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });

    proyectosHTML += `
          </tbody>
        </table>
      </div>
      <div style="margin-top: 20px; text-align: right;">
        <button id="btnCerrarModal2" style="padding: 8px 16px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Cancelar</button>
      </div>
    `;

    modal.innerHTML = proyectosHTML;
  }

  // Mostrar modal
  modal.style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";

  // Configurar eventos
  setTimeout(() => {
    // Eventos para cargar proyectos
    document.querySelectorAll(".btnCargarProyecto").forEach(btn => {
      btn.addEventListener("click", function () {
        const nombre = this.getAttribute("data-nombre");
        cargarProyectoDesdeModal(nombre);
      });
    });

    // Eventos para eliminar proyectos
    document.querySelectorAll(".btnEliminarProyecto").forEach(btn => {
      btn.addEventListener("click", function () {
        const nombre = this.getAttribute("data-nombre");
        eliminarProyecto(nombre);
      });
    });

    // Evento para ordenar proyectos
    const selectOrden = document.getElementById("ordenProyectos");
    if (selectOrden) {
      selectOrden.addEventListener("change", function () {
        ordenarTablaProyectos(this.value);
      });
    }

    // Eventos para cerrar
    document.querySelectorAll("#btnCerrarModal, #btnCerrarModal2").forEach(btn => {
      btn.addEventListener("click", cerrarModalProyectos);
    });
  }, 100);
}

// Función para cerrar el modal
function cerrarModalProyectos() {
  const modal = document.getElementById("modalProyectos");
  const overlay = document.getElementById("modalOverlay");
  if (modal) modal.style.display = "none";
  if (overlay) overlay.style.display = "none";
}
document.getElementById("btnExportarProyecto").addEventListener("click", function () {
  const nombre = prompt("Nombre del proyecto (sin extensión):", "MiColumna");
  if (!nombre) return;

  const proyecto = {
    version: "1.0",
    pixelesPorMetro: PIXELES_POR_METRO,
    fechaExportacion: new Date().toISOString(),
    estratos: estratos.map((e) => ({
      nombre: e.nombre,
      alto: e.alto,
      ancho: e.ancho,
      color: e.color,
      trama: e.trama,
      tamanoTrama: e.tamanoTrama,
      tipoBordeSuperior: e.tipoBordeSuperior,
      puntoControl: {
        // ✅ GUARDAR TODAS LAS PROPIEDADES DEL PUNTO DE CONTROL
        proporcionX: e.puntoControl.proporcionX,
        proporcionY: e.puntoControl.proporcionY,
        posicionManual: e.puntoControl.posicionManual,
        x: e.puntoControl.x,
        y: e.puntoControl.y
      },
      simbolosDerecha: e.simbolosDerecha || [],
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

  mostrarNotificacion(`✅ Proyecto "${nombre}" exportado correctamente`, "success");
});
// Función para cargar proyecto desde el modal
// Función para cargar proyecto desde el modal - VERSIÓN CORREGIDA
// Función para cargar proyecto desde el modal - VERSIÓN MEJORADA
function cargarProyectoDesdeModal(nombre) {
  const data = localStorage.getItem(`columna_${nombre}`);
  if (!data) {
    mostrarNotificacion("❌ Proyecto no encontrado", "error");
    return;
  }

  try {
    const proyecto = JSON.parse(data);
    PIXELES_POR_METRO = proyecto.pixelesPorMetro || 100;
    document.getElementById("pixelesPorMetro").value = PIXELES_POR_METRO;

    estratos = proyecto.estratos.map((e, i) => {
      const estrato = new Estrato(
        e.alto,
        e.ancho,
        e.color,
        e.trama,
        e.tamanoTrama,
        "ninguno",
        e.tipoBordeSuperior || "recto"
      );
      estrato.nombre = e.nombre || `Estrato ${i + 1}`;

      // RESTAURAR TODAS LAS PROPIEDADES DEL PUNTO DE CONTROL
      if (e.puntoControl) {
        estrato.puntoControl.proporcionX = e.puntoControl.proporcionX ?? 1.0;
        estrato.puntoControl.proporcionY = e.puntoControl.proporcionY ?? 0.5;
        estrato.puntoControl.posicionManual = e.puntoControl.posicionManual ?? false;
        estrato.puntoControl.x = e.puntoControl.x ?? (IZQUIERDA_X + estrato.ancho);
        estrato.puntoControl.y = e.puntoControl.y ?? ((estrato.topY + estrato.bottomY) / 2);
      }

      estrato.simbolosDerecha = e.simbolosDerecha || [];
      return estrato;
    });

    panelesContainer.innerHTML = "";
    estratos.forEach((e, i) => crearPanelEstrato(i));
    dibujar();

    // Cerrar modal
    cerrarModalProyectos();

    // Mostrar mensaje de éxito
    mostrarNotificacion(`✅ Proyecto "${nombre}" cargado correctamente`, "success");

  } catch (error) {
    console.error("Error al cargar proyecto:", error);
    mostrarNotificacion("❌ Error al cargar el proyecto", "error");
  }
}

// Función para actualizar fecha de modificación
function actualizarFechaProyecto(nombre) {
  const data = localStorage.getItem(`columna_${nombre}`);
  if (data) {
    try {
      const proyecto = JSON.parse(data);
      proyecto.fechaGuardado = new Date().toISOString();
      proyecto.fechaLegible = new Date().toLocaleString();
      localStorage.setItem(`columna_${nombre}`, JSON.stringify(proyecto));
    } catch (e) {
      console.error("Error al actualizar fecha:", e);
    }
  }
}

// Modificar el evento de guardar para actualizar fecha
document.getElementById("btnGuardar").addEventListener("click", function () {
  const nombre = prompt("Nombre del proyecto:", "Proyecto 1");
  if (!nombre) return;

  const proyecto = {
    pixelesPorMetro: PIXELES_POR_METRO,
    fechaGuardado: new Date().toISOString(),
    fechaLegible: new Date().toLocaleString(),
    version: "1.0",
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
        proporcionY: e.puntoControl.proporcionY,
        posicionManual: e.puntoControl.posicionManual,
        x: e.puntoControl.x,
        y: e.puntoControl.y
      },
      simbolosDerecha: e.simbolosDerecha,
    })),
  };

  localStorage.setItem(`columna_${nombre}`, JSON.stringify(proyecto));
  mostrarNotificacion(`✅ Proyecto "${nombre}" guardado correctamente`, "success");
});

// Función para eliminar proyecto
function eliminarProyecto(nombre) {
  if (confirm(`¿Estás seguro de eliminar el proyecto "${nombre}"?`)) {
    localStorage.removeItem(`columna_${nombre}`);
    mostrarNotificacion(`🗑️ Proyecto "${nombre}" eliminado`, "info");
    // Actualizar la lista
    mostrarModalProyectos();
  }
}



// Añadir estilos CSS para las animaciones
if (!document.querySelector('#estilos-notificacion')) {
  const estilo = document.createElement('style');
  estilo.id = 'estilos-notificacion';
  estilo.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(estilo);
}
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
// ESCALA VERTICAL - ACTUALIZACIÓN AUTOMÁTICA
// ================================

// Reemplaza este código existente:
// document.getElementById("btnActualizarEscala").addEventListener("click", function () {
//   PIXELES_POR_METRO = parseFloat(document.getElementById("pixelesPorMetro").value) || 50;
//   dibujar();
// });

// Con este código nuevo:
document.getElementById("pixelesPorMetro").addEventListener("input", function () {
  PIXELES_POR_METRO = parseFloat(this.value) || 50;
  dibujar();

  // Opcional: Actualizar también las etiquetas de metros en los controles de estratos
  actualizarEtiquetasEscalaVertical();
});

// Función auxiliar para actualizar todas las etiquetas de metros
function actualizarEtiquetasEscalaVertical() {
  document.querySelectorAll('.panel-estrato').forEach((panel, index) => {
    if (estratos[index]) {
      const valorMetrosAlto = panel.querySelector('.valor-metros-alto');
      const valorMetrosAncho = panel.querySelector('.valor-metros-ancho');

      if (valorMetrosAlto) {
        valorMetrosAlto.textContent = `(${(estratos[index].alto / PIXELES_POR_METRO).toFixed(1)} m)`;
      }
      if (valorMetrosAncho) {
        valorMetrosAncho.textContent = `(${(estratos[index].ancho / PIXELES_POR_METRO).toFixed(1)} m)`;
      }
    }
  });
}
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
// DICCIONARIO DE TRADUCCIÓN DE TRAMAS
// ================================
const traduccionesTrama = {
  "conglomerado_op1": "601 Grava o conglomerado opción 1",
  "conglomerado_op2": "602 Conglomerado o grava opción 2",
  "conglomerado_cruzado": "603 Grava o conglomerado con estratificación cruzada",
  "brecha_op1": "605 Brecha 1ra opción",
  "brecha_op2": "606 Brecha 2da opción",
  "arenisca_maciza": "607 Arenisca o arena maciza",
  "arenisca_estratificada": "608 Arenisca o arena estratificada",
  "arenisca_cruzada_op1": "609 Arenisca o arena con estratificación cruzada 1ra opción",
  "arenisca_cruzada_op2": "610 Arenisca o arena con estratificación cruzada 2da opción",
  "arenisca_ondulada": "611 Arenisca o arena con estratificación ondulada",
  "arenisca_arcillosa": "612 Arenisca arcillosa o argilizada",
  "arenisca_calcare": "613 Arenisca calcárea",
  "arenisca_dolomitica": "614 Arenisca dolomítica",
  "limolita_arcillosa": "616 Limo, limolita o lutita arcillosa",
  "limolita_calcare": "617 Limolita calcárea",
  "limolita_dolomitica": "618 Limolita dolomítica",
  "lutita_arenosa": "619 Lutita arenosa o limosa",
  "lutita": "620 Arcilla o lutita",
  "lutita_chert": "621 Lutita chert o chert pizarroso",
  "lutita_dolomitica": "622 Lutita dolomítica",
  "lutita_calcare": "623 Lutita calcárea o mármol",
  "lutita_carbonosa": "624 Lutita carbonosa",
  "lutita_petrolifera": "625 Lutita petrolífera",
  "creta": "626 Creta",
  "caliza": "627 Caliza",
  "caliza_clastica": "628 Caliza clástica",
  "caliza_fosilifera": "629 Caliza fosilífera clástica",
  "caliza_nodular": "630 Caliza nodular o con estratificación irregular",
  "caliza_madrigueras": "631 Caliza, rellenos irregulares (madrigueras) de dolomita sacaroidal",
  "caliza_cruzada": "632 Caliza con estratificación cruzada",
  "caliza_chert_cruzada": "633 Caliza chert con estratificación cruzada",
  "caliza_arenosa_chert": "634 Caliza arenosa y con chert, clástica con estratificación cruzada",
  "caliza_oolitica": "635 Caliza oolítica",
  "caliza_arenosa": "636 Caliza arenosa",
  "caliza_limosa": "637 Caliza limosa",
  "caliza_lutitica": "638 Caliza lutítica o arcillosa",
  "caliza_chert_op1": "639 Caliza con chert 1ra opción",
  "caliza_chert_op2": "640 Caliza con chert 2da opción",
  "caliza_dolomitica": "641 Caliza dolomítica, dolomita calcárea",
  "dolomita": "642 Dolomita o dolomía",
  "dolomita_cruzada": "643 Dolomita o dolomía con estratificación cruzada",
  "dolomita_oolitica": "644 Dolomita o dolomía oolítica",
  "dolomita_arenosa": "645 Dolomita o dolomía arenosa",
  "dolomita_limosa": "646 Dolomita o dolomía limosa",
  "dolomita_lutitica": "647 Dolomita o dolomía arcillosa o lutítica",
  "dolomita_chert": "648 Dolomita o dolomía con chert",
  "chert_op1": "649 Chert estratificado 1ra opción",
  "chert_op2": "650 Chert estratificado 2da opción",
  "chert_fosilifero": "651 Chert estratificado fosilífero",
  "roca_fosilifera": "652 Roca fosilífera",
  "roca_diatomitica": "653 Roca diatomítica o con diatomeas",
  "subgrauvaca": "654 Subgrauvaca",
  "subgrauvaca_cruzada": "655 Subgrauvaca con estratificación cruzada",
  "subgrauvaca_ondulada": "656 Subgrauvaca con estratificación ondulada",
  "turba": "657 Turba",
  "carbon": "658 Carbón",
  "carbon_impuro": "659 Carbón con huesos o impuro",
  "paleosuelo": "660 Paleosuelo, arcilla basal, underclay",
  "flintclay": "661 Flintclay o pedernal",
  "bentonita": "662 Bentonita",
  "glauconita": "663 Glauconita",
  "limonita": "664 Limonita",
  "siderita": "665 Siderita",
  "fosforita": "666 Roca fosfática nodular, fósforita",
  "yeso": "667 Yeso",
  "sal": "668 Sal",
  "arenisca_limolita": "669 Arenisca y limolita interestratificada",
  "arenisca_lutita": "670 Arenisca y lutita interestratificada",
  "arenisca_lutita_ondulada": "671 Arenisca y lutita interestratificada con estratificación ondulada",
  "lutita_caliza_limosa": "672 Lutita y caliza limosa interestratificada",
  "lutita_caliza_op1": "673 Lutita y caliza interestratificada 1ra opción",
  "lutita_caliza_op2": "674 Lutita y caliza interestratificada 2da opción",
  "lutita_caliza_calcare": "675 Lutita calcárea y caliza interestratificada",
  "caliza_limosa_lutita_op1": "676 Caliza limosa y lutita interestratificada 1ra opción",
  "caliza_lutita_op1": "677 Caliza y lutita interestratificada 1ra opción",
  "caliza_lutita_op2": "678 Caliza y lutita interestratificada 2da opción",
  "caliza_lutita_op3": "679 Caliza y lutita interestratificada 3ra opción",
  "caliza_lutita_calcare": "680 Caliza y lutita calcárea interestratificada",
  "till_op1": "681 Till o diamicto 1ra opción",
  "till_op2": "682 Till o diamicto 2da opción",
  "till_op3": "683 Till o diamicto 3ra opción",
  "loess_op1": "684 Loess 1ra opción",
  "loess_op2": "685 Loess 2da opción",
  "loess_op3": "686 Loess 3ra opción",
  "metamorfismo": "701 Metamorfismo",
  "cuarcita": "702 Cuarcita",
  "pizarra": "703 Pizarra",
  "granito_esquistoso": "704 Granito esquistoso o gneísico",
  "esquisto": "705 Esquisto",
  "esquisto_contorsionado": "706 Esquisto contorsionado",
  "esquisto_gneis": "707 Esquisto y gneis",
  "gneis": "708 Gneis",
  "gneis_contorsionado": "709 Gneis contorsionado",
  "esteatita": "710 Esteatita, talco o serpentinita",
  "roca_tufitica": "711 Roca tufítica",
  "toba_cristalina": "712 Toba cristalina",
  "toba_desvitrificada": "713 Toba desvitrificada",
  "brecha_volcanica_toba": "714 Brecha volcánica y toba",
  "brecha_volcanica": "715 Brecha volcánica o aglomerado",
  "roca_zeolitica": "716 Roca zeolítica",
  "flujos_basalticos": "717 Flujos basálticos",
  "granito_op1": "718 Granito 1ra opción",
  "granito_op2": "719 Granito 2da opción",
  "roca_ignea_bandeada": "720 Roca ígnea bandeada",
  "roca_ignea_op1": "721 Roca ígnea 1ra opción",
  "roca_ignea_op2": "722 Roca ígnea 2da opción",
  "roca_ignea_op3": "723 Roca ígnea 3ra opción",
  "roca_ignea_op4": "724 Roca ígnea 4ta",
  "roca_ignea_op5": "725 Roca ígnea 5ta",
  "roca_ignea_op6": "726 Roca ígnea 6ta",
  "roca_ignea_op7": "727 Roca ígnea 7ma",
  "roca_ignea_op8": "728 Roca ígnea 8va",
  "roca_porfirica_op1": "729 Roca porfírica 1ra opción",
  "roca_porfirica_op2": "730 Roca porfírica 2da opción",
  "vitrofiro": "731 Vitrófiro",
  "cuarzo": "732 Cuarzo",
  "SNGM 001 Grava o conglomerado imbricado clastosoportado": "SNGM 001 Grava o conglomerado imbricado clastosoportado",
  "mineralizacion": "733 Mineralización",
  "solido": "Color sólido"
};

// ================================
// FUNCIÓN DE BÚSQUEDA DE TRAMAS EN TIEMPO REAL
// ================================
let timeoutBusqueda = null;

function buscarTramasEnTiempoReal(termino, estratoIndex, inputElement) {
  // Cancelar búsqueda anterior si aún está pendiente
  if (timeoutBusqueda) {
    clearTimeout(timeoutBusqueda);
  }

  // ✅ Cerrar todos los demás paneles de búsqueda
  const panelActual = inputElement.closest('.panel-estrato');
  cerrarTodosLosResultadosBusqueda(panelActual);

  // Esperar 300ms después de la última pulsación para buscar
  timeoutBusqueda = setTimeout(() => {
    const terminoBusqueda = termino.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Encontrar los elementos específicos de ESTE estrato
    const panel = inputElement.closest('.panel-estrato');
    const resultadosDiv = panel.querySelector('.resultados-busqueda-trama');
    const mensajeDiv = panel.querySelector('.mensaje-busqueda');

    // Limpiar resultados anteriores
    resultadosDiv.innerHTML = '';

    if (!terminoBusqueda.trim()) {
      resultadosDiv.style.display = 'none';
      mensajeDiv.style.display = 'none';
      return;
    }

    // Buscar en todas las tramas
    const resultados = [];

    for (const [clave, valor] of Object.entries(traduccionesTrama)) {
      const nombreNormalizado = valor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const claveNormalizada = clave.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      if (nombreNormalizado.includes(terminoBusqueda) || claveNormalizada.includes(terminoBusqueda)) {
        resultados.push({ clave, nombre: valor });
      }
    }

    // Mostrar resultados
    if (resultados.length > 0) {
      resultadosDiv.style.display = 'block';
      mensajeDiv.style.display = 'none';

      resultados.forEach(resultado => {
        const opcion = document.createElement('div');
        opcion.className = 'opcion-trama';
        opcion.style.padding = '8px';
        opcion.style.borderBottom = '1px solid #eee';
        opcion.style.cursor = 'pointer';
        opcion.style.fontSize = '12px';
        opcion.style.display = 'flex';
        opcion.style.alignItems = 'center';
        opcion.style.gap = '8px';
        opcion.style.transition = 'background 0.2s';

        // Crear una miniatura de la trama
        const miniatura = document.createElement('div');
        miniatura.style.width = '30px';
        miniatura.style.height = '30px';
        miniatura.style.border = '1px solid #ccc';
        miniatura.style.borderRadius = '3px';
        miniatura.style.background = '#f0f0f0';
        miniatura.style.flexShrink = '0';
        miniatura.style.overflow = 'hidden';
        miniatura.style.display = 'flex';
        miniatura.style.alignItems = 'center';
        miniatura.style.justifyContent = 'center';

        if (resultado.clave !== 'solido') {
          // Intentar mostrar miniatura de la trama SVG
          const img = tramasSVG[resultado.clave];
          if (img && img.complete && img.naturalWidth > 0) {
            const canvasMini = document.createElement('canvas');
            canvasMini.width = 30;
            canvasMini.height = 30;
            const ctxMini = canvasMini.getContext('2d');

            // Crear patrón de la trama
            const trama = crearTrama(resultado.clave, '#000000', 15);
            ctxMini.fillStyle = trama;
            ctxMini.fillRect(0, 0, 30, 30);

            miniatura.style.backgroundImage = `url(${canvasMini.toDataURL()})`;
            miniatura.style.backgroundSize = 'cover';
          } else {
            // Si la imagen no está cargada, mostrar placeholder
            miniatura.innerHTML = '<span style="font-size:10px;color:#666">...</span>';
          }
        } else {
          miniatura.style.background = '#cccccc';
        }

        const texto = document.createElement('span');
        texto.textContent = resultado.nombre;
        texto.style.flex = '1';
        texto.style.overflow = 'hidden';
        texto.style.textOverflow = 'ellipsis';
        texto.style.whiteSpace = 'nowrap';

        opcion.appendChild(miniatura);
        opcion.appendChild(texto);

        // Evento click para seleccionar la trama
        opcion.addEventListener('click', () => {
          const select = panel.querySelector('.select-trama');
          select.value = resultado.clave;
          select.dispatchEvent(new Event('change'));

          // Cerrar resultados
          resultadosDiv.style.display = 'none';
          mensajeDiv.style.display = 'none';

          // Limpiar campo de búsqueda
          inputElement.value = '';

          // Actualizar la interfaz
          const estrato = estratos[estratoIndex];
          estrato.trama = resultado.clave;
          dibujar();
        });

        opcion.addEventListener('mouseenter', () => {
          opcion.style.background = '#e3f2fd';
        });

        opcion.addEventListener('mouseleave', () => {
          opcion.style.background = 'white';
        });

        resultadosDiv.appendChild(opcion);
      });
    } else {
      resultadosDiv.style.display = 'none';
      mensajeDiv.textContent = `No se encontraron tramas para "${termino}"`;
      mensajeDiv.style.display = 'block';
    }
  }, 300);
}

// ================================
// PANEL DE CONTROL POR ESTRATO (MODIFICADO)
// ================================
function crearPanelEstrato(index) {
  const estrato = estratos[index];
  const panel = document.createElement("div");
  panel.className = "panel-estrato";
  panel.innerHTML = `
  <div class="panel-encabezado" style="padding: 8px; background: #f0f7fc; border-radius: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <button class="btn-mover-arriba" data-index="${index}" 
              style="padding: 4px 8px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
        <i class="fas fa-chevron-down"></i>
      </button>
      <button class="btn-mover-abajo" data-index="${index}"
              style="padding: 4px 8px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
        <i class="fas fa-chevron-up"></i>
      </button>
      <strong>${estrato.nombre || "Estrato sin nombre"}</strong>
    </div>
    <span class="toggle-icon"><i class="fas fa-toggle-on"></i></span>  <!-- ← Ahora con Font Awesome -->
  </div>
          <div class="panel-contenido" style="display: block;">
          <label>Nombre:</label>
            <input type="text" style="border: 1px solid #4CAF50; width: 100%" class="input-nombre" value="${estrato.nombre
    }" placeholder="Nombre del estrato" style="width: 100px; padding: 8px; margin-bottom: 15px; font-size: 16px; border: 2px solid #ddd; border-radius: 4px;">
            <div class="controles">
        <label>Espesor:</label>
          <input type="number" style="border: 1px solid #4CAF50;" class="input-alto" min="0" max="1000" value="${estrato.alto
    }" step="1">
          <span class="valor-metros-alto"> = ${(
      estrato.alto / PIXELES_POR_METRO
    ).toFixed(2)}  m</span> 
          
          <div>
          
          <label>Ancho:</label>
          <input type="number" style="border: 1px solid #4CAF50;" class="input-ancho" min="100" max="500" value="${estrato.ancho
    }" step="1">
          <span class="valor-metros-ancho"  > = ${(
      estrato.ancho / PIXELES_POR_METRO
    ).toFixed(2)}  m</span>
          
          </div>
          <div class="parametros-estrato" >
          <label>Color:</label>
          <input type="color" style="border: 1px solid #4CAF50;"class="input-color" value="${estrato.color}">
          </div>
          <div>
          <label>Tamaño de trama:</label>
          <input type="number" style="border: 1px solid #4CAF50;" class="input-tamano" min="10" max="500" value="${estrato.tamanoTrama
    }" step="1">
</div>





          <!-- BUSCADOR DE TRAMA EN TIEMPO REAL -->
          <div class="buscador-trama-container" style="margin-top: 10px; position: relative;">
            <label>	<i class="fas fa-search"></i> Buscar trama:</label>
            <input type="text" class="input-buscar-trama" placeholder="Escriba para buscar tramas..." 
                  style="width: 100%; padding: 8px 10px;  border: 1px solid #4CAF50;  ">
            <div class="mensaje-busqueda" style="display: none; color: #ff0000ff;  margin-top: 3px; padding: 5px;"></div>
            <div class="resultados-busqueda-trama" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ddd; border-radius: 4px; max-height: 250px; overflow-y: auto; z-index: 1000; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin-top: 2px;"></div>
          </div>
          
          <div class="parametros-estrato" style="margin-top: 5px; border-top: 1px solid #ffffff; padding-top: 0px;">
          <label>Trama:</label>
          <select class="select-trama" style="width: 100%; max-height: 150px; overflow-y: auto;border: 1px solid #4CAF50;">
            <option value="solido" ${estrato.trama === "solido" ? "selected" : ""
    }>Color sólido</option>
            <option value="conglomerado_op1" ${estrato.trama === "conglomerado_op1" ? "selected" : ""
    }>601 Grava o conglomerado opción 1</option>
            <option value="conglomerado_op2" ${estrato.trama === "conglomerado_op2" ? "selected" : ""
    }>602 Conglomerado o grava opción 2</option>
            <option value="conglomerado_cruzado" ${estrato.trama === "conglomerado_cruzado" ? "selected" : ""
    }>603 Grava o conglomerado con estratificación cruzada</option>
            <option value="brecha_op1" ${estrato.trama === "brecha_op1" ? "selected" : ""
    }>605 Brecha 1ra opción</option>
            <option value="brecha_op2" ${estrato.trama === "brecha_op2" ? "selected" : ""
    }>606 Brecha 2da opción</option>
            <option value="arenisca_maciza" ${estrato.trama === "arenisca_maciza" ? "selected" : ""
    }>607 Arenisca o arena maciza</option>
            <option value="arenisca_estratificada" ${estrato.trama === "arenisca_estratificada" ? "selected" : ""
    }>608 Arenisca o arena estratificada</option>
            <option value="arenisca_cruzada_op1" ${estrato.trama === "arenisca_cruzada_op1" ? "selected" : ""
    }>609 Arenisca o arena con estratificación cruzada 1ra opción</option>
            <option value="arenisca_cruzada_op2" ${estrato.trama === "arenisca_cruzada_op2" ? "selected" : ""
    }>610 Arenisca o arena con estratificación cruzada 2da opción</option>
            <option value="arenisca_ondulada" ${estrato.trama === "arenisca_ondulada" ? "selected" : ""
    }>611 Arenisca o arena con estratificación ondulada</option>
            <option value="arenisca_arcillosa" ${estrato.trama === "arenisca_arcillosa" ? "selected" : ""
    }>612 Arenisca arcillosa o argilizada</option>
            <option value="arenisca_calcare" ${estrato.trama === "arenisca_calcare" ? "selected" : ""
    }>613 Arenisca calcárea</option>
            <option value="arenisca_dolomitica" ${estrato.trama === "arenisca_dolomitica" ? "selected" : ""
    }>614 Arenisca dolomítica</option>
            <option value="limolita_arcillosa" ${estrato.trama === "limolita_arcillosa" ? "selected" : ""
    }>616 Limo, limolita o lutita arcillosa</option>
            <option value="limolita_calcare" ${estrato.trama === "limolita_calcare" ? "selected" : ""
    }>617 Limolita calcárea</option>
            <option value="limolita_dolomitica" ${estrato.trama === "limolita_dolomitica" ? "selected" : ""
    }>618 Limolita dolomítica</option>
            <option value="lutita_arenosa" ${estrato.trama === "lutita_arenosa" ? "selected" : ""
    }>619 Lutita arenosa o limosa</option>
            <option value="lutita" ${estrato.trama === "lutita" ? "selected" : ""
    }>620 Arcilla o lutita</option>
            <option value="lutita_chert" ${estrato.trama === "lutita_chert" ? "selected" : ""
    }>621 Lutita chert o chert pizarroso</option>
            <option value="lutita_dolomitica" ${estrato.trama === "lutita_dolomitica" ? "selected" : ""
    }>622 Lutita dolomítica</option>
            <option value="lutita_calcare" ${estrato.trama === "lutita_calcare" ? "selected" : ""
    }>623 Lutita calcárea o mármol</option>
            <option value="lutita_carbonosa" ${estrato.trama === "lutita_carbonosa" ? "selected" : ""
    }>624 Lutita carbonosa</option>
            <option value="lutita_petrolifera" ${estrato.trama === "lutita_petrolifera" ? "selected" : ""
    }>625 Lutita petrolífera</option>
            <option value="creta" ${estrato.trama === "creta" ? "selected" : ""
    }>626 Creta</option>
            <option value="caliza" ${estrato.trama === "caliza" ? "selected" : ""
    }>627 Caliza</option>
            <option value="caliza_clastica" ${estrato.trama === "caliza_clastica" ? "selected" : ""
    }>628 Caliza clástica</option>
            <option value="caliza_fosilifera" ${estrato.trama === "caliza_fosilifera" ? "selected" : ""
    }>629 Caliza fosilífera clástica</option>
            <option value="caliza_nodular" ${estrato.trama === "caliza_nodular" ? "selected" : ""
    }>630 Caliza nodular o con estratificación irregular</option>
            <option value="caliza_madrigueras" ${estrato.trama === "caliza_madrigueras" ? "selected" : ""
    }>631 Caliza, rellenos irregulares (madrigueras) de dolomita sacaroidal</option>
            <option value="caliza_cruzada" ${estrato.trama === "caliza_cruzada" ? "selected" : ""
    }>632 Caliza con estratificación cruzada</option>
            <option value="caliza_chert_cruzada" ${estrato.trama === "caliza_chert_cruzada" ? "selected" : ""
    }>633 Caliza chert con estratificación cruzada</option>
            <option value="caliza_arenosa_chert" ${estrato.trama === "caliza_arenosa_chert" ? "selected" : ""
    }>634 Caliza arenosa y con chert, clástica con estratificación cruzada</option>
            <option value="caliza_oolitica" ${estrato.trama === "caliza_oolitica" ? "selected" : ""
    }>635 Caliza oolítica</option>
            <option value="caliza_arenosa" ${estrato.trama === "caliza_arenosa" ? "selected" : ""
    }>636 Caliza arenosa</option>
            <option value="caliza_limosa" ${estrato.trama === "caliza_limosa" ? "selected" : ""
    }>637 Caliza limosa</option>
            <option value="caliza_lutitica" ${estrato.trama === "caliza_lutitica" ? "selected" : ""
    }>638 Caliza lutítica o arcillosa</option>
            <option value="caliza_chert_op1" ${estrato.trama === "caliza_chert_op1" ? "selected" : ""
    }>639 Caliza con chert 1ra opción</option>
            <option value="caliza_chert_op2" ${estrato.trama === "caliza_chert_op2" ? "selected" : ""
    }>640 Caliza con chert 2da opción</option>
            <option value="caliza_dolomitica" ${estrato.trama === "caliza_dolomitica" ? "selected" : ""
    }>641 Caliza dolomítica, dolomita calcárea</option>
            <option value="dolomita" ${estrato.trama === "dolomita" ? "selected" : ""
    }>642 Dolomita o dolomía</option>
            <option value="dolomita_cruzada" ${estrato.trama === "dolomita_cruzada" ? "selected" : ""
    }>643 Dolomita o dolomía con estratificación cruzada</option>
            <option value="dolomita_oolitica" ${estrato.trama === "dolomita_oolitica" ? "selected" : ""
    }>644 Dolomita o dolomía oolítica</option>
            <option value="dolomita_arenosa" ${estrato.trama === "dolomita_arenosa" ? "selected" : ""
    }>645 Dolomita o dolomía arenosa</option>
            <option value="dolomita_limosa" ${estrato.trama === "dolomita_limosa" ? "selected" : ""
    }>646 Dolomita o dolomía limosa</option>
            <option value="dolomita_lutitica" ${estrato.trama === "dolomita_lutitica" ? "selected" : ""
    }>647 Dolomita o dolomía arcillosa o lutítica</option>
            <option value="dolomita_chert" ${estrato.trama === "dolomita_chert" ? "selected" : ""
    }>648 Dolomita o dolomía con chert</option>
            <option value="chert_op1" ${estrato.trama === "chert_op1" ? "selected" : ""
    }>649 Chert estratificado 1ra opción</option>
            <option value="chert_op2" ${estrato.trama === "chert_op2" ? "selected" : ""
    }>650 Chert estratificado 2da opción</option>
            <option value="chert_fosilifero" ${estrato.trama === "chert_fosilifero" ? "selected" : ""
    }>651 Chert estratificado fosilífero</option>
            <option value="roca_fosilifera" ${estrato.trama === "roca_fosilifera" ? "selected" : ""
    }>652 Roca fosilífera</option>
            <option value="roca_diatomitica" ${estrato.trama === "roca_diatomitica" ? "selected" : ""
    }>653 Roca diatomítica o con diatomeas</option>
            <option value="subgrauvaca" ${estrato.trama === "subgrauvaca" ? "selected" : ""
    }>654 Subgrauvaca</option>
            <option value="subgrauvaca_cruzada" ${estrato.trama === "subgrauvaca_cruzada" ? "selected" : ""
    }>655 Subgrauvaca con estratificación cruzada</option>
            <option value="subgrauvaca_ondulada" ${estrato.trama === "subgrauvaca_ondulada" ? "selected" : ""
    }>656 Subgrauvaca con estratificación ondulada</option>
            <option value="turba" ${estrato.trama === "turba" ? "selected" : ""
    }>657 Turba</option>
            <option value="carbon" ${estrato.trama === "carbon" ? "selected" : ""
    }>658 Carbón</option>
            <option value="carbon_impuro" ${estrato.trama === "carbon_impuro" ? "selected" : ""
    }>659 Carbón con huesos o impuro</option>
            <option value="paleosuelo" ${estrato.trama === "paleosuelo" ? "selected" : ""
    }>660 Paleosuelo, arcilla basal, underclay</option>
            <option value="flintclay" ${estrato.trama === "flintclay" ? "selected" : ""
    }>661 Flintclay o pedernal</option>
            <option value="bentonita" ${estrato.trama === "bentonita" ? "selected" : ""
    }>662 Bentonita</option>
            <option value="glauconita" ${estrato.trama === "glauconita" ? "selected" : ""
    }>663 Glauconita</option>
            <option value="limonita" ${estrato.trama === "limonita" ? "selected" : ""
    }>664 Limonita</option>
            <option value="siderita" ${estrato.trama === "siderita" ? "selected" : ""
    }>665 Siderita</option>
            <option value="fosforita" ${estrato.trama === "fosforita" ? "selected" : ""
    }>666 Roca fosfática nodular, fósforita</option>
            <option value="yeso" ${estrato.trama === "yeso" ? "selected" : ""
    }>667 Yeso</option>
            <option value="sal" ${estrato.trama === "sal" ? "selected" : ""
    }>668 Sal</option>
            <option value="arenisca_limolita" ${estrato.trama === "arenisca_limolita" ? "selected" : ""
    }>669 Arenisca y limolita interestratificada</option>
            <option value="arenisca_lutita" ${estrato.trama === "arenisca_lutita" ? "selected" : ""
    }>670 Arenisca y lutita interestratificada</option>
            <option value="arenisca_lutita_ondulada" ${estrato.trama === "arenisca_lutita_ondulada" ? "selected" : ""
    }>671 Arenisca y lutita interestratificada con estratificación ondulada</option>
            <option value="lutita_caliza_limosa" ${estrato.trama === "lutita_caliza_limosa" ? "selected" : ""
    }>672 Lutita y caliza limosa interestratificada</option>
            <option value="lutita_caliza_op1" ${estrato.trama === "lutita_caliza_op1" ? "selected" : ""
    }>673 Lutita y caliza interestratificada 1ra opción</option>
            <option value="lutita_caliza_op2" ${estrato.trama === "lutita_caliza_op2" ? "selected" : ""
    }>674 Lutita y caliza interestratificada 2da opción</option>
            <option value="lutita_caliza_calcare" ${estrato.trama === "lutita_caliza_calcare" ? "selected" : ""
    }>675 Lutita calcárea y caliza interestratificada</option>
            <option value="caliza_limosa_lutita_op1" ${estrato.trama === "caliza_limosa_lutita_op1" ? "selected" : ""
    }>676 Caliza limosa y lutita interestratificada 1ra opción</option>
            <option value="caliza_lutita_op1" ${estrato.trama === "caliza_lutita_op1" ? "selected" : ""
    }>677 Caliza y lutita interestratificada 1ra opción</option>
            <option value="caliza_lutita_op2" ${estrato.trama === "caliza_lutita_op2" ? "selected" : ""
    }>678 Caliza y lutita interestratificada 2da opción</option>
            <option value="caliza_lutita_op3" ${estrato.trama === "caliza_lutita_op3" ? "selected" : ""
    }>679 Caliza y lutita interestratificada 3ra opción</option>
            <option value="caliza_lutita_calcare" ${estrato.trama === "caliza_lutita_calcare" ? "selected" : ""
    }>680 Caliza y lutita calcárea interestratificada</option>
            <option value="till_op1" ${estrato.trama === "till_op1" ? "selected" : ""
    }>681 Till o diamicto 1ra opción</option>
            <option value="till_op2" ${estrato.trama === "till_op2" ? "selected" : ""
    }>682 Till o diamicto 2da opción</option>
            <option value="till_op3" ${estrato.trama === "till_op3" ? "selected" : ""
    }>683 Till o diamicto 3ra opción</option>
            <option value="loess_op1" ${estrato.trama === "loess_op1" ? "selected" : ""
    }>684 Loess 1ra opción</option>
            <option value="loess_op2" ${estrato.trama === "loess_op2" ? "selected" : ""
    }>685 Loess 2da opción</option>
            <option value="loess_op3" ${estrato.trama === "loess_op3" ? "selected" : ""
    }>686 Loess 3ra opción</option>
            <option value="metamorfismo" ${estrato.trama === "metamorfismo" ? "selected" : ""
    }>701 Metamorfismo</option>
            <option value="cuarcita" ${estrato.trama === "cuarcita" ? "selected" : ""
    }>702 Cuarcita</option>
            <option value="pizarra" ${estrato.trama === "pizarra" ? "selected" : ""
    }>703 Pizarra</option>
            <option value="granito_esquistoso" ${estrato.trama === "granito_esquistoso" ? "selected" : ""
    }>704 Granito esquistoso o gneísico</option>
            <option value="esquisto" ${estrato.trama === "esquisto" ? "selected" : ""
    }>705 Esquisto</option>
            <option value="esquisto_contorsionado" ${estrato.trama === "esquisto_contorsionado" ? "selected" : ""
    }>706 Esquisto contorsionado</option>
            <option value="esquisto_gneis" ${estrato.trama === "esquisto_gneis" ? "selected" : ""
    }>707 Esquisto y gneis</option>
            <option value="gneis" ${estrato.trama === "gneis" ? "selected" : ""
    }>708 Gneis</option>
            <option value="gneis_contorsionado" ${estrato.trama === "gneis_contorsionado" ? "selected" : ""
    }>709 Gneis contorsionado</option>
            <option value="esteatita" ${estrato.trama === "esteatita" ? "selected" : ""
    }>710 Esteatita, talco o serpentinita</option>
            <option value="roca_tufitica" ${estrato.trama === "roca_tufitica" ? "selected" : ""
    }>711 Roca tufítica</option>
            <option value="toba_cristalina" ${estrato.trama === "toba_cristalina" ? "selected" : ""
    }>712 Toba cristalina</option>
            <option value="toba_desvitrificada" ${estrato.trama === "toba_desvitrificada" ? "selected" : ""
    }>713 Toba desvitrificada</option>
            <option value="brecha_volcanica_toba" ${estrato.trama === "brecha_volcanica_toba" ? "selected" : ""
    }>714 Brecha volcánica y toba</option>
            <option value="brecha_volcanica" ${estrato.trama === "brecha_volcanica" ? "selected" : ""
    }>715 Brecha volcánica o aglomerado</option>
            <option value="roca_zeolitica" ${estrato.trama === "roca_zeolitica" ? "selected" : ""
    }>716 Roca zeolítica</option>
            <option value="flujos_basalticos" ${estrato.trama === "flujos_basalticos" ? "selected" : ""
    }>717 Flujos basálticos</option>
            <option value="granito_op1" ${estrato.trama === "granito_op1" ? "selected" : ""
    }>718 Granito 1ra opción</option>
            <option value="granito_op2" ${estrato.trama === "granito_op2" ? "selected" : ""
    }>719 Granito 2da opción</option>
            <option value="roca_ignea_bandeada" ${estrato.trama === "roca_ignea_bandeada" ? "selected" : ""
    }>720 Roca ígnea bandeada</option>
            <option value="roca_ignea_op1" ${estrato.trama === "roca_ignea_op1" ? "selected" : ""
    }>721 Roca ígnea 1ra opción</option>
            <option value="roca_ignea_op2" ${estrato.trama === "roca_ignea_op2" ? "selected" : ""
    }>722 Roca ígnea 2da opción</option>
            <option value="roca_ignea_op3" ${estrato.trama === "roca_ignea_op3" ? "selected" : ""
    }>723 Roca ígnea 3ra opción</option>
            <option value="roca_ignea_op4" ${estrato.trama === "roca_ignea_op4" ? "selected" : ""
    }>724 Roca ígnea 4ta</option>
            <option value="roca_ignea_op5" ${estrato.trama === "roca_ignea_op5" ? "selected" : ""
    }>725 Roca ígnea 5ta</option>
            <option value="roca_ignea_op6" ${estrato.trama === "roca_ignea_op6" ? "selected" : ""
    }>726 Roca ígnea 6ta</option>
            <option value="roca_ignea_op7" ${estrato.trama === "roca_ignea_op7" ? "selected" : ""
    }>727 Roca ígnea 7ma</option>
            <option value="roca_ignea_op8" ${estrato.trama === "roca_ignea_op8" ? "selected" : ""
    }>728 Roca ígnea 8va</option>
            <option value="roca_porfirica_op1" ${estrato.trama === "roca_porfirica_op1" ? "selected" : ""
    }>729 Roca porfírica 1ra opción</option>
            <option value="roca_porfirica_op2" ${estrato.trama === "roca_porfirica_op2" ? "selected" : ""
    }>730 Roca porfírica 2da opción</option>
            <option value="vitrofiro" ${estrato.trama === "vitrofiro" ? "selected" : ""
    }>731 Vitrófiro</option>
            <option value="cuarzo" ${estrato.trama === "cuarzo" ? "selected" : ""
    }>732 Cuarzo</option>
            <option value="SNGM 001 Grava o conglomerado imbricado clastosoportado" ${estrato.trama ===
      "SNGM 001 Grava o conglomerado imbricado clastosoportado"
      ? "selected"
      : ""
    }>SNGM 001 Grava o conglomerado imbricado clastosoportado</option>
           

            <option value="mineralizacion" ${estrato.trama === "mineralizacion" ? "selected" : ""
    }>733 Mineralización</option>
          </select>
          
          
          <div class="parametros-estrato" style="margin-top: 5px; border-top: 1px solid #ffffff; padding-top: 10px;">
          
          <label>Tipo borde inferior:</label>
          <select class="select-borde-superior" style="border: 1px solid #4CAF50; width: 100%;">
            <option value="recto" ${estrato.tipoBordeSuperior === "recto" ? "selected" : ""
    }>Recto</option>
            <option value="inf_transparente" ${estrato.tipoBordeSuperior === "inf_transparente" ? "selected" : ""
    }>Recto con base transparente</option>
            <option value="sup_transparente" ${estrato.tipoBordeSuperior === "sup_transparente" ? "selected" : ""
    }>Recto con techo transparente</option>
            <option value="sup_inf_transparente" ${estrato.tipoBordeSuperior === "sup_inf_transparente"
      ? "selected"
      : ""
    }>Recto con base y techo transparente</option>
            <option value="sup_inf_der_transparente" ${estrato.tipoBordeSuperior === "sup_inf_der_transparente"
      ? "selected"
      : ""
    }>Recto con todos los bordes transparentes</option>
            <option value="segmentado" ${estrato.tipoBordeSuperior === "segmentado" ? "selected" : ""
    }>Segmentado</option>
            <option value="ondulado" ${estrato.tipoBordeSuperior === "ondulado" ? "selected" : ""
    }>Ondulado</option>
            <option value="ondulado_inf_trans" ${estrato.tipoBordeSuperior === "ondulado_inf_trans"
      ? "selected"
      : ""
    }>Ondulado con base transparente</option>
            <option value="ondulado_sup_trans" ${estrato.tipoBordeSuperior === "ondulado_sup_trans"
      ? "selected"
      : ""
    }>Ondulado con techo transparente</option>
            <option value="ondulado_inf_sup_trans" ${estrato.tipoBordeSuperior === "ondulado_inf_trans"
      ? "selected"
      : ""
    }>Ondulado con base y techo transparente</option>
            <option value="discontinuo" ${estrato.tipoBordeSuperior === "discontinuo" ? "selected" : ""
    }>Discontinuo</option>
            <option value="canal" ${estrato.tipoBordeSuperior === "canal" ? "selected" : ""
    }>Canal</option>
            <option value="canal2" ${estrato.tipoBordeSuperior === "canal2" ? "selected" : ""
    }>Canal 2</option>
            <option value="vacio_1" ${estrato.tipoBordeSuperior === "vacio" ? "selected" : ""
    }>Vacío, hiato o no visible (1)</option>
            <option value="vacio_2" ${estrato.tipoBordeSuperior === "vacio" ? "selected" : ""
    }>Vacío, hiato o no visible (2)</option>
          </select>
          <!-- ✅ NUEVO: Panel para Símbolos a la Derecha -->
          <div class="contenedor-simbolos-derecha" style="margin-top: 15px; border-top: 1px solid #ccc; padding-top: 15px;">
            <h4 style="margin: 1px 0 5px 0; font-size: 14px;">Fósiles</h4>
            <div class="lista-simbolos-derecha">
              <!-- Los símbolos agregados aparecerán aquí dinámicamente -->
            </div>
            <div style="display: flex; gap: 5px; align-items: center; margin-bottom: 10px;">
              <select class="select-simbolo-derecha" style="border: 1px solid #4CAF50;" style="flex: 1;">
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
              <button class="btn-agregar-simbolo-derecha" style="padding: 4px 8px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;"><i class="fas fa-plus"></iclass></i> </button>
            </div>
          </div>
          <button class="btn-eliminar" data-index="${index}"><i class="far fa-trash-alt" ></i> Eliminar estrato</button>
        </div>
      `;
  panelesContainer.prepend(panel);
  const encabezadoTexto = panel.querySelector(".panel-encabezado strong");
  const selectTrama = panel.querySelector(".select-trama");
  const inputColor = panel.querySelector(".input-color");
  const inputNombre = panel.querySelector(".input-nombre");
  const sliderTamano = panel.querySelector(".input-tamano");
  const valorTamano = panel.querySelector(".valor-tamano");
  const sliderAlto = panel.querySelector(".input-alto");
  const valorAlto = panel.querySelector(".valor-alto");
  const valorMetrosAlto = panel.querySelector(".valor-metros-alto");
  const sliderAncho = panel.querySelector(".input-ancho");
  const valorAncho = panel.querySelector(".valor-ancho");
  const valorMetrosAncho = panel.querySelector(".valor-metros-ancho");
  const selectBordeSuperior = panel.querySelector(".select-borde-superior");
  const btnEliminar = panel.querySelector(".btn-eliminar");
  const inputBuscarTrama = panel.querySelector(".input-buscar-trama");

  // ✅ NUEVO: Manejo de símbolos a la derecha
  const listaSimbolosDerecha = panel.querySelector(".lista-simbolos-derecha");
  const selectSimboloDerecha = panel.querySelector(".select-simbolo-derecha");
  const btnAgregarSimboloDerecha = panel.querySelector(
    ".btn-agregar-simbolo-derecha"
  );

  // Función para actualizar el nombre
  function actualizarNombre() {
    const nuevoNombre = inputNombre.value.trim();
    estrato.nombre = nuevoNombre;
    encabezadoTexto.textContent = nuevoNombre || `Estrato ${index + 1}`;
    dibujar();
  }

  // Eventos para actualizar el nombre
  inputNombre.addEventListener("input", function () {
    // Actualizar encabezado inmediatamente
    encabezadoTexto.textContent = this.value || `Estrato ${index + 1}`;
  });

  // Actualizar objeto y canvas cuando se termina de editar
  inputNombre.addEventListener("blur", function () {
    actualizarNombre();
  });

  // También actualizar con Enter
  inputNombre.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      actualizarNombre();
      this.blur(); // Quitar foco
    }
  });

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

  // Función para actualizar el estrato
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
    //valorTamano.textContent = estrato.tamanoTrama + " px)";
    // valorAlto.textContent = estrato.alto + " px)";
    valorMetrosAlto.textContent = ` = ${(
      estrato.alto / PIXELES_POR_METRO
    ).toFixed(2)} m`;
    // valorAncho.textContent = estrato.ancho + " px)";
    valorMetrosAncho.textContent = ` = ${(
      estrato.ancho / PIXELES_POR_METRO
    ).toFixed(2)} m`;
    if (estrato.puntoControl.posicionManual) {
      estrato.puntoControl.x =
        IZQUIERDA_X + estrato.ancho * estrato.puntoControl.proporcionX;
    } else {
      estrato.puntoControl.x = IZQUIERDA_X + estrato.ancho;
    }
    dibujar();
  };

  // ✅ Añadir funcionalidad colapsable
  // Dentro de crearPanelEstrato:
  // ✅ Añadir funcionalidad colapsable - COLAPSADO POR DEFECTO
  const encabezado = panel.querySelector(".panel-encabezado");
  const contenido = panel.querySelector(".panel-contenido");
  const icono = panel.querySelector(".toggle-icon");

  // Inicializar colapsado con ícono de toggle-off (cerrado)
  contenido.style.display = "none";
  icono.innerHTML = '<i class="fas fa-toggle-off"></i>'; // Ícono de apagado cuando está colapsado

  encabezado.addEventListener("click", () => {
    const isVisible = contenido.style.display === "block";
    contenido.style.display = isVisible ? "none" : "block";

    // Cambiar ícono: toggle-off (colapsado) vs toggle-on (expandido)
    if (isVisible) {
      icono.innerHTML = '<i class="fas fa-toggle-off"></i>';
    } else {
      icono.innerHTML = '<i class="fas fa-toggle-on"></i>';
    }
  });

  // ✅ Evento para el buscador de tramas EN TIEMPO REAL
  inputBuscarTrama.addEventListener("input", function () {
    // Pasar el índice del estrato Y el elemento input actual
    buscarTramasEnTiempoReal(this.value, index, this);
  });

  // Cerrar resultados al hacer clic fuera
  inputBuscarTrama.addEventListener('blur', function () {
    // Pequeño delay para permitir hacer clic en los resultados
    setTimeout(() => {
      const resultadosDiv = this.closest('.panel-estrato').querySelector('.resultados-busqueda-trama');
      const mensajeDiv = this.closest('.panel-estrato').querySelector('.mensaje-busqueda');
      resultadosDiv.style.display = 'none';
      mensajeDiv.style.display = 'none';
    }, 200);
  });

  // Manejar tecla Escape
  inputBuscarTrama.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      const resultadosDiv = this.closest('.panel-estrato').querySelector('.resultados-busqueda-trama');
      const mensajeDiv = this.closest('.panel-estrato').querySelector('.mensaje-busqueda');
      resultadosDiv.style.display = 'none';
      mensajeDiv.style.display = 'none';
      this.value = "";
    }
  });

  // ✅ Evento para limpiar búsqueda al cambiar el select
  selectTrama.addEventListener("change", function () {
    inputBuscarTrama.value = "";
    // Mostrar todas las opciones
    const opciones = selectTrama.options;
    for (let i = 0; i < opciones.length; i++) {
      opciones[i].style.display = '';
    }
    actualizar();
  });

  // ✅ Evento para limpiar búsqueda con botón (opcional)
  inputBuscarTrama.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      this.value = "";
      const opciones = selectTrama.options;
      for (let i = 0; i < opciones.length; i++) {
        opciones[i].style.display = '';
      }
    }
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

  // Botones para mover estratos
  panel.querySelector('.btn-mover-arriba').addEventListener('click', function () {
    const idx = parseInt(this.dataset.index);
    if (idx > 0) {
      // Intercambiar con el estrato superior
      [estratos[idx], estratos[idx - 1]] = [estratos[idx - 1], estratos[idx]];
      reconstruirPanelesEstratos();
      dibujar();
    }
  });

  panel.querySelector('.btn-mover-abajo').addEventListener('click', function () {
    const idx = parseInt(this.dataset.index);
    if (idx < estratos.length - 1) {
      // Intercambiar con el estrato inferior
      [estratos[idx], estratos[idx + 1]] = [estratos[idx + 1], estratos[idx]];
      reconstruirPanelesEstratos();
      dibujar();
    }
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
document
  .getElementById("btnAbrirPaletaCrono")
  .addEventListener("click", function () {
    window.open(
      "https://stratigraphy.org/chart/?language=es",
      "PaletaColores",
      "width=600,height=700,scrollbars=yes,resizable=yes"
    );
  });

 // ================================
// FUNCIONES PARA LA LEYENDA DE TRAMAS Y FÓSILES (CANVAS SIMPLIFICADO)
// ================================

let canvasLeyenda = null;
let ctxLeyenda = null;

// Diccionario de traducciones para símbolos (fósiles)
const traduccionesSimbolos = {
  "10.2.1 Macrofosiles": "Macrofósiles",
  "10.2.2 Invertebrados": "Invertebrados",
  "10.2.3 Anélidos": "Anélidos",
  "10.2.4 Artrópodos": "Artrópodos",
  "10.2.5 Aracnidos": "Arácnidos",
  "10.2.6 Crustáceos": "Crustáceos",
  "10.2.7 Insectos": "Insectos",
  "10.2.8 Trilobites": "Trilobites",
  "10.2.9 Braquiopodos": "Braquiópodos",
  "10.2.10 Briozoos": "Briozoos",
  "10.2.11 Cnidarios": "Cnidarios",
  "10.2.12 Corales": "Corales",
  "10.2.13 Estromatoporoideos": "Estromatoporoideos",
  "10.2.14 Equinodermos": "Equinodermos",
  "10.2.15 Crinoideos": "Crinoideos",
  "10.2.16 Equinoideos": "Equinoideos",
  "10.2.17 Graptolitos": "Graptolitos",
  "10.2.18 moluscos": "Moluscos",
  "10.2.19 Cefalópodos": "Cefalópodos",
  "10.2.20 Amonoideos": "Amonoideos",
  "10.2.21 Belemnoideos": "Belemnoideos",
  "10.2.22 Nautiloideos": "Nautiloideos",
  "10.2.23 Gastrópodos": "Gastrópodos",
  "10.2.24 Pelecípodos": "Pelecípodos",
  "10.2.25 Esponjas": "Esponjas",
  "10.2.26 Vertebrados": "Vertebrados",
  "10.2.27 Anfibios": "Anfibios",
  "10.2.28 Peces": "Peces",
  "10.2.29 Mamíferos": "Mamíferos",
  "10.2.30 Reptiles": "Reptiles",
  "10.2.31 Plantas": "Plantas",
  "10.2.32 Hojas": "Hojas",
  "10.2.33 Raíces": "Raíces",
  "10.2.34 Madera": "Madera",
  "10.2.35 Algas": "Algas",
  "10.2.36 Coníferas": "Coníferas",
  "10.2.37 Helechos": "Helechos",
  "10.2.38 Plantas o árboles con flores": "Plantas o árboles con flores",
  "10.2.39 Estromatolitos": "Estromatolitos",
  "10.2.40 Fungi": "Fungi",
  "10.2.41 Trazas fósiles": "Trazas fósiles",
  "10.2.42 Madrigueras": "Madrigueras",
  "10.2.43 Coprolitos": "Coprolitos",
  "10.2.44 Huellas": "Huellas",
  "10.2.45 Microfósiles": "Microfósiles",
  "10.2.46 Conodontos": "Conodontos",
  "10.2.47 Diatomeas": "Diatomeas",
  "10.2.48 Foraminíferos": "Foraminíferos",
  "10.2.49 Grandes foraminíferos o fusulínidos": "Grandes foraminíferos o fusulínidos",
  "10.2.50 Foraminíferos bentónicos, pequeños": "Foraminíferos bentónicos, pequeños",
  "10.2.51 Foraminíferos planctónicos, pequeños": "Foraminíferos planctónicos, pequeños",
  "10.2.52 Nanofósiles": "Nanofósiles",
  "10.2.53 Ostrácodos": "Ostrácodos",
  "10.2.54 Palinomorfos": "Palinomorfos",
  "10.2.55 Acritarcos": "Acritarcos",
  "10.2.56 Quitinozoos": "Quitinozoos",
  "10.2.57 Dinoflagelados": "Dinoflagelados",
  "10.2.58 Polen o esporas": "Polen o esporas",
  "10.2.59 Radiolarios": "Radiolarios",
  "10.2.60 Silicoflagelados": "Silicoflagelados",
  "10.2.61 Espículas": "Espículas",
  "concreciones": "Concreciones",
  "meteorizacion_esferoidal": "Meteorización esferoidal",
  "raices": "Raíces",
  "SNGM Algas calcáreas": "Algas calcáreas",
  "SNGM Bioturbación": "Bioturbación",
  "SNGM Diatomeas": "Diatomeas",
  "SNGM Fauna fósil indiferenciada": "Fauna fósil indiferenciada",
  "SNGM Flora fósil": "Flora fósil",
  "SNGM Foraminíferos": "Foraminíferos",
  "SNGM Invertebrados marinos": "Invertebrados marinos",
  "SNGM Mamíferos marinos": "Mamíferos marinos",
  "SNGM Microfauna sin especificar": "Microfauna sin especificar",
  "SNGM Peces, esqueletos y escamas": "Peces, esqueletos y escamas",
  "SNGM Polen y o esporas": "Polen o esporas",
  "SNGM Radiolarios": "Radiolarios",
  "SNGM Raiz en posición de vida": "Raíz en posición de vida",
  "SNGM Rastros y pisadas 1": "Rastros y pisadas (1)",
  "SNGM Rastros y pisadas 2": "Rastros y pisadas (2)",
  "SNGM Restos de tronco": "Restos de tronco",
  "SNGM Trazas fósiles 2": "Trazas fósiles (2)",
  "SNGM Trazas fósiles 3": "Trazas fósiles (3)",
  "SNGM Trazas fósiles": "Trazas fósiles",
  "SNGM Tronco en posición de vida": "Tronco en posición de vida",
  "SNGM Vertebrados": "Vertebrados"
};

// Inicializar canvas de leyenda
function inicializarCanvasLeyenda() {
  canvasLeyenda = document.getElementById('canvasLeyenda');
  if (!canvasLeyenda) return;
  
  ctxLeyenda = canvasLeyenda.getContext('2d');
}

// Función para dibujar una trama en el canvas de leyenda
function dibujarTramaLeyenda(tramaClave, nombreTrama, x, y, anchoRect, altoRect) {
  if (!ctxLeyenda) return;
  
  const tamanoTrama = altoRect; // Tamaño del cuadrado de trama
  
  // Dibujar rectángulo de la trama (izquierda)
  if (tramaClave !== 'solido') {
    const trama = crearTrama(tramaClave, '#333333', 15);
    ctxLeyenda.save();
    ctxLeyenda.translate(x + 10, y + 10);
    ctxLeyenda.fillStyle = trama;
    ctxLeyenda.fillRect(0, 0, tamanoTrama * 1.3, tamanoTrama);
    ctxLeyenda.restore();
  } else {
    // Para trama sólida, mostrar un cuadrado gris
    ctxLeyenda.fillStyle = '#cccccc';
    ctxLeyenda.fillRect(x + 10, y + 10, tamanoTrama * 1.3, tamanoTrama);
  }
  
  // Borde del cuadrado de trama
  ctxLeyenda.strokeStyle = '#333';
  ctxLeyenda.lineWidth = 1;
  ctxLeyenda.strokeRect(x + 10, y + 10, tamanoTrama * 1.3, tamanoTrama);
  
  // Dibujar nombre de la trama (derecha)
  ctxLeyenda.fillStyle = '#333';
  ctxLeyenda.font = '14px Arial';
  ctxLeyenda.textAlign = 'left';
  ctxLeyenda.textBaseline = 'middle';
  
  // Posición para el texto (al lado derecho del cuadrado)
  const textoX = x + tamanoTrama + 35;
  const textoY = y + (altoRect / 2);
  
  // Dibujar nombre de la trama
  ctxLeyenda.fillText(nombreTrama, textoX, textoY);
}

// Función para dibujar un símbolo (fósil) en el canvas de leyenda
function dibujarSimboloLeyenda(simboloClave, nombreSimbolo, x, y, anchoRect, altoRect) {
  if (!ctxLeyenda) return;
  
  const tamanoSimbolo = altoRect - 10; // Tamaño para el símbolo
  
  // Intentar dibujar el símbolo SVG
  const img = simbolosSVG[simboloClave];
  if (img && img.complete && img.naturalWidth > 0) {
    try {
      // Dibujar el símbolo SVG
      ctxLeyenda.drawImage(
        img,
        x + 10,
        y + 5,
        tamanoSimbolo,
        tamanoSimbolo
      );
    } catch (error) {
      // Fallback: dibujar un círculo con la inicial
      ctxLeyenda.fillStyle = '#4CAF50';
      ctxLeyenda.beginPath();
      ctxLeyenda.arc(x + 10 + tamanoSimbolo/2, y + 5 + tamanoSimbolo/2, tamanoSimbolo/2, 0, Math.PI * 2);
      ctxLeyenda.fill();
      ctxLeyenda.fillStyle = 'white';
      ctxLeyenda.font = 'bold 12px Arial';
      ctxLeyenda.textAlign = 'center';
      ctxLeyenda.textBaseline = 'middle';
      ctxLeyenda.fillText(nombreSimbolo.charAt(0), x + 10 + tamanoSimbolo/2, y + 5 + tamanoSimbolo/2);
    }
  } else {
    // Fallback: dibujar un círculo con la inicial
    ctxLeyenda.fillStyle = '#4CAF50';
    ctxLeyenda.beginPath();
    ctxLeyenda.arc(x + 10 + tamanoSimbolo/2, y + 5 + tamanoSimbolo/2, tamanoSimbolo/2, 0, Math.PI * 2);
    ctxLeyenda.fill();
    ctxLeyenda.fillStyle = 'white';
    ctxLeyenda.font = 'bold 12px Arial';
    ctxLeyenda.textAlign = 'center';
    ctxLeyenda.textBaseline = 'middle';
    ctxLeyenda.fillText(nombreSimbolo.charAt(0), x + 10 + tamanoSimbolo/2, y + 5 + tamanoSimbolo/2);
  }
  
  // Borde del símbolo

  
  // Dibujar nombre del símbolo (derecha)
  ctxLeyenda.fillStyle = '#333';
  ctxLeyenda.font = '14px Arial';
  ctxLeyenda.textAlign = 'left';
  ctxLeyenda.textBaseline = 'middle';
  
  // Posición para el texto
  const textoX = x + tamanoSimbolo + 25;
  const textoY = y + (altoRect / 2);
  
  // Dibujar nombre del símbolo
  ctxLeyenda.fillText(nombreSimbolo, textoX, textoY);
}

// Función para dibujar todas las tramas y fósiles en el canvas de leyenda
function dibujarTodasLasTramasYFosiles() {
  if (!ctxLeyenda || !canvasLeyenda) return;
  
  // Limpiar canvas
  ctxLeyenda.clearRect(0, 0, canvasLeyenda.width, canvasLeyenda.height);
  
  // Configuración de diseño
  const margen = 20;
  const anchoRect = canvasLeyenda.width - (margen * 2);
  const altoRect = 50;
  const espacioEntre = 10;
  const espacioSeccion = 30; // Espacio entre secciones
  
  let y = margen;
  
  // Obtener todas las tramas únicas usadas
  const tramasUnicas = new Set();
  const nombresTramas = {};
  
  estratos.forEach(estrato => {
    const trama = estrato.trama;
    if (trama) {
      tramasUnicas.add(trama);
      nombresTramas[trama] = traduccionesTrama[trama] || trama;
    }
  });
  
  // Obtener todos los símbolos (fósiles) únicos usados
  const simbolosUnicos = new Set();
  
  estratos.forEach(estrato => {
    if (estrato.simbolosDerecha && estrato.simbolosDerecha.length > 0) {
      estrato.simbolosDerecha.forEach(simbolo => {
        if (simbolo.tipo && simbolo.tipo !== "ninguno") {
          simbolosUnicos.add(simbolo.tipo);
        }
      });
    }
  });
  
  // Dibujar título de TRAMAS si hay tramas
  if (tramasUnicas.size > 0) {
    ctxLeyenda.fillStyle = '#333';
    ctxLeyenda.font = 'bold 16px Arial';
    ctxLeyenda.textAlign = 'left';
    ctxLeyenda.fillText('Tramas', margen, y);
    y += 25;
    
    // Convertir Set a Array y ordenar alfabéticamente
    const tramasArray = Array.from(tramasUnicas).sort((a, b) => {
      const nombreA = nombresTramas[a] || a;
      const nombreB = nombresTramas[b] || b;
      return nombreA.localeCompare(nombreB);
    });
    
    // Dibujar cada trama
    tramasArray.forEach((tramaClave, index) => {
      // Verificar si hay espacio en el canvas
      if (y + altoRect > canvasLeyenda.height - margen) {
        // Ajustar altura del canvas
        canvasLeyenda.height = y + margen + 100;
      }
      
      dibujarTramaLeyenda(
        tramaClave,
        nombresTramas[tramaClave] || tramaClave,
        margen,
        y,
        anchoRect,
        altoRect
      );
      
      y += altoRect + espacioEntre;
    });
    
    y += espacioSeccion; // Espacio entre secciones
  }
  
  // Dibujar título de FÓSILES Y SÍMBOLOS si hay símbolos
  if (simbolosUnicos.size > 0) {
    ctxLeyenda.fillStyle = '#333';
    ctxLeyenda.font = 'bold 16px Arial';
    ctxLeyenda.textAlign = 'left';
    ctxLeyenda.fillText('Fósiles', margen, y);
    y += 25;
    
    // Convertir Set a Array y ordenar alfabéticamente
    const simbolosArray = Array.from(simbolosUnicos).sort((a, b) => {
      const nombreA = traduccionesSimbolos[a] || a;
      const nombreB = traduccionesSimbolos[b] || b;
      return nombreA.localeCompare(nombreB);
    });
    
    // Dibujar cada símbolo
    simbolosArray.forEach((simboloClave, index) => {
      // Verificar si hay espacio en el canvas
      if (y + altoRect > canvasLeyenda.height - margen) {
        // Ajustar altura del canvas
        canvasLeyenda.height = y + margen + 100;
      }
      
      dibujarSimboloLeyenda(
        simboloClave,
        traduccionesSimbolos[simboloClave] || simboloClave,
        margen,
        y,
        anchoRect,
        altoRect
      );
      
      y += altoRect + espacioEntre;
    });
  }
  
  // Si no hay ni tramas ni símbolos, mostrar mensaje
  if (tramasUnicas.size === 0 && simbolosUnicos.size === 0) {
    ctxLeyenda.fillStyle = '#666';
    ctxLeyenda.font = '16px Arial';
    ctxLeyenda.textAlign = 'center';
    ctxLeyenda.textBaseline = 'middle';
    ctxLeyenda.fillText('No se han usado tramas ni símbolos en los estratos', 
                         canvasLeyenda.width / 2, 
                         canvasLeyenda.height / 2);
  }
  
  // Ajustar la altura del canvas según el contenido
  const alturaNecesaria = y + margen;
  if (alturaNecesaria > canvasLeyenda.height) {
    canvasLeyenda.height = alturaNecesaria;
    // Redibujar con la nueva altura
    dibujarTodasLasTramasYFosiles();
  }
}

// Función para mostrar la leyenda de tramas y fósiles
function mostrarLeyendaTramasYFosiles() {
  const popup = document.getElementById("leyendaTramasPopup");
  const overlay = document.getElementById("leyendaTramasOverlay");
  
  // Inicializar canvas si no está inicializado
  inicializarCanvasLeyenda();
  
  // Dibujar las tramas y fósiles
  dibujarTodasLasTramasYFosiles();
  
  // Mostrar popup
  popup.classList.add('active');
  overlay.classList.add('active');
}

// Función para cerrar la leyenda de tramas
function cerrarLeyendaTramas() {
  const popup = document.getElementById("leyendaTramasPopup");
  const overlay = document.getElementById("leyendaTramasOverlay");
  
  popup.classList.remove('active');
  overlay.classList.remove('active');
}

// Inicializar eventos de la leyenda
function inicializarEventosLeyenda() {
  // Botón para mostrar leyenda
  const btnMostrarLeyenda = document.getElementById('btnMostrarLeyendaTramas');
  if (btnMostrarLeyenda) {
    btnMostrarLeyenda.addEventListener('click', mostrarLeyendaTramasYFosiles);
  } else {
    // Crear botón si no existe
    const controles = document.querySelector('.control-card');
    if (controles) {
      const nuevoBoton = document.createElement('button');
      nuevoBoton.id = 'btnMostrarLeyendaTramas';
      nuevoBoton.className = 'btn-info';
      nuevoBoton.style.cssText = 'margin-bottom: 10px; width: 100%;';
      nuevoBoton.innerHTML = '<i class="fas fa-book"></i> Mostrar Leyenda de Tramas y Fósiles';
      controles.insertBefore(nuevoBoton, controles.firstChild);
      nuevoBoton.addEventListener('click', mostrarLeyendaTramasYFosiles);
    }
  }
  
  // Eventos de cierre
  const cerrarBtn = document.getElementById('cerrarLeyendaTramas');
  if (cerrarBtn) {
    cerrarBtn.addEventListener('click', cerrarLeyendaTramas);
  }
  
  const cerrarBtn2 = document.getElementById('btnCerrarLeyendaTramas');
  if (cerrarBtn2) {
    cerrarBtn2.addEventListener('click', cerrarLeyendaTramas);
  }
  
  const overlay = document.getElementById('leyendaTramasOverlay');
  if (overlay) {
    overlay.addEventListener('click', cerrarLeyendaTramas);
  }
  
  // Cerrar con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const popup = document.getElementById("leyendaTramasPopup");
      if (popup && popup.classList.contains('active')) {
        cerrarLeyendaTramas();
      }
    }
  });
  
  // Redibujar cuando cambie el tamaño de la ventana
  window.addEventListener('resize', function() {
    if (canvasLeyenda && document.getElementById("leyendaTramasPopup").classList.contains('active')) {
      inicializarCanvasLeyenda();
      dibujarTodasLasTramasYFosiles();
    }
  });
}

// ================================
// INICIAR
// ================================
agregarEstrato();
dibujar();

// Inicializar eventos de leyenda cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarEventosLeyenda);
// ================================
// ALTERNAR DISEÑO: CENTRADO vs LATERAL
// ================================
//let modoLateral = false;
//document
//.getElementById("btnToggleLayout")
//.addEventListener("click", function () {
//modoLateral = !modoLateral;
//if (modoLateral) {
// document.body.classList.add("layout-lateral");
//this.textContent = "↔️ Volver a diseño centrado";
//} else {
// document.body.classList.remove("layout-lateral");
//this.textContent = "↔️ Cambiar a diseño lateral";
//}
// Redibujar para ajustar canvas
//setTimeout(dibujar, 100);
//});

function cerrarTodosLosResultadosBusqueda(excluirPanel = null) {
  // Cerrar todos los paneles de resultados excepto el que se está usando
  document.querySelectorAll('.panel-estrato').forEach(panel => {
    if (excluirPanel && panel === excluirPanel) return;

    const resultadosDiv = panel.querySelector('.resultados-busqueda-trama');
    const mensajeDiv = panel.querySelector('.mensaje-busqueda');
    if (resultadosDiv) {
      resultadosDiv.style.display = 'none';
    }
    if (mensajeDiv) {
      mensajeDiv.style.display = 'none';
    }
  });
}

// ================================
// FUNCIÓN PARA RECONSTRUIR PANELES (NUEVA)
// ================================
function reconstruirPanelesEstratos() {
  // Limpiar contenedor
  panelesContainer.innerHTML = "";

  // Recrear todos los paneles en el orden actual
  estratos.forEach((estrato, index) => {
    crearPanelEstrato(index);
  });
}

// ================================
// MODIFICAR LOS EVENT LISTENERS EN crearPanelEstrato
// ================================
// Dentro de la función crearPanelEstrato, reemplaza el código de los botones:

// Botones para mover estratos - VERSIÓN CORREGIDA
panel.querySelector('.btn-mover-arriba').addEventListener('click', function (e) {
  e.stopPropagation(); // Evitar que colapse/expanda el panel

  const idx = parseInt(this.dataset.index);
  if (idx > 0) {
    // Intercambiar con el estrato superior
    [estratos[idx], estratos[idx - 1]] = [estratos[idx - 1], estratos[idx]];
    reconstruirPanelesEstratos();
    dibujar();
  }
});

panel.querySelector('.btn-mover-abajo').addEventListener('click', function (e) {
  e.stopPropagation(); // Evitar que colapse/expanda el panel

  const idx = parseInt(this.dataset.index);
  if (idx < estratos.length - 1) {
    // Intercambiar con el estrato inferior
    [estratos[idx], estratos[idx + 1]] = [estratos[idx + 1], estratos[idx]];
    reconstruirPanelesEstratos();
    dibujar();
  }
});

