// ui.js
// Módulo de interfaz de usuario: paneles, controles, tramas

import { estratos, panelesContainer, IZQUIERDA_X, PIXELES_POR_METRO, tramasSVG, simbolosSVG, dibujar } from './main.js';

/**
 * Crea un panel de control para un estrato específico.
 * @param {number} index - Índice del estrato en el array global `estratos`.
 */
export function crearPanelEstrato(index) {
  const estrato = estratos[index];
  const panel = document.createElement('div');
  panel.className = 'panel-estrato';
  panel.innerHTML = `
    <h3>Nombre del Estrato</h3>
    <input type="text" class="input-nombre" value="${estrato.nombre}" placeholder="Nombre del estrato" style="width: 100%; padding: 8px; margin-bottom: 15px; font-size: 16px; border: 2px solid #ddd; border-radius: 4px;">
    <div class="controles">
      <label>Trama:</label>
      <select class="select-trama">
        <option value="solido" ${estrato.trama === 'solido' ? 'selected' : ''}>Color sólido</option>
        <option value="conglomerado_op1" ${estrato.trama === 'conglomerado_op1' ? 'selected' : ''}>601 Grava o conglomerado opción 1</option>
        <option value="conglomerado_op2" ${estrato.trama === 'conglomerado_op2' ? 'selected' : ''}>602 Conglomerado o grava opción 2</option>
        <option value="conglomerado_cruzado" ${estrato.trama === 'conglomerado_cruzado' ? 'selected' : ''}>603 Grava o conglomerado con estratificación cruzada</option>
        <option value="brecha_op1" ${estrato.trama === 'brecha_op1' ? 'selected' : ''}>605 Brecha 1ra opción</option>
        <option value="brecha_op2" ${estrato.trama === 'brecha_op2' ? 'selected' : ''}>606 Brecha 2da opción</option>
        <option value="arenisca_maciza" ${estrato.trama === 'arenisca_maciza' ? 'selected' : ''}>607 Arenisca o arena maciza</option>
        <option value="arenisca_estratificada" ${estrato.trama === 'arenisca_estratificada' ? 'selected' : ''}>608 Arenisca o arena estratificada</option>
        <option value="arenisca_cruzada_op1" ${estrato.trama === 'arenisca_cruzada_op1' ? 'selected' : ''}>609 Arenisca o arena con estratificación cruzada 1ra opción</option>
        <option value="arenisca_cruzada_op2" ${estrato.trama === 'arenisca_cruzada_op2' ? 'selected' : ''}>610 Arenisca o arena con estratificación cruzada 2da opción</option>
        <option value="arenisca_ondulada" ${estrato.trama === 'arenisca_ondulada' ? 'selected' : ''}>611 Arenisca o arena con estratificación ondulada</option>
        <option value="arenisca_arcillosa" ${estrato.trama === 'arenisca_arcillosa' ? 'selected' : ''}>612 Arenisca arcillosa o argilizada</option>
        <option value="arenisca_calcare" ${estrato.trama === 'arenisca_calcare' ? 'selected' : ''}>613 Arenisca calcárea</option>
        <option value="arenisca_dolomitica" ${estrato.trama === 'arenisca_dolomitica' ? 'selected' : ''}>614 Arenisca dolomítica</option>
        <option value="limolita_arcillosa" ${estrato.trama === 'limolita_arcillosa' ? 'selected' : ''}>616 Limo, limolita o lutita arcillosa</option>
        <option value="limolita_calcare" ${estrato.trama === 'limolita_calcare' ? 'selected' : ''}>617 Limolita calcárea</option>
        <option value="limolita_dolomitica" ${estrato.trama === 'limolita_dolomitica' ? 'selected' : ''}>618 Limolita dolomítica</option>
        <option value="lutita_arenosa" ${estrato.trama === 'lutita_arenosa' ? 'selected' : ''}>619 Lutita arenosa o limosa</option>
        <option value="lutita" ${estrato.trama === 'lutita' ? 'selected' : ''}>620 Arcilla o lutita</option>
        <option value="lutita_chert" ${estrato.trama === 'lutita_chert' ? 'selected' : ''}>621 Lutita chert o chert pizarroso</option>
        <option value="lutita_dolomitica" ${estrato.trama === 'lutita_dolomitica' ? 'selected' : ''}>622 Lutita dolomítica</option>
        <option value="lutita_calcare" ${estrato.trama === 'lutita_calcare' ? 'selected' : ''}>623 Lutita calcárea o mármol</option>
        <option value="lutita_carbonosa" ${estrato.trama === 'lutita_carbonosa' ? 'selected' : ''}>624 Lutita carbonosa</option>
        <option value="lutita_petrolifera" ${estrato.trama === 'lutita_petrolifera' ? 'selected' : ''}>625 Lutita petrolífera</option>
        <option value="creta" ${estrato.trama === 'creta' ? 'selected' : ''}>626 Creta</option>
        <option value="caliza" ${estrato.trama === 'caliza' ? 'selected' : ''}>627 Caliza</option>
        <option value="caliza_clastica" ${estrato.trama === 'caliza_clastica' ? 'selected' : ''}>628 Caliza clástica</option>
        <option value="caliza_fosilifera" ${estrato.trama === 'caliza_fosilifera' ? 'selected' : ''}>629 Caliza fosilífera clástica</option>
        <option value="caliza_nodular" ${estrato.trama === 'caliza_nodular' ? 'selected' : ''}>630 Caliza nodular o con estratificación irregular</option>
        <option value="caliza_madrigueras" ${estrato.trama === 'caliza_madrigueras' ? 'selected' : ''}>631 Caliza, rellenos irregulares (madrigueras) de dolomita sacaroidal</option>
        <option value="caliza_cruzada" ${estrato.trama === 'caliza_cruzada' ? 'selected' : ''}>632 Caliza con estratificación cruzada</option>
        <option value="caliza_chert_cruzada" ${estrato.trama === 'caliza_chert_cruzada' ? 'selected' : ''}>633 Caliza chert con estratificación cruzada</option>
        <option value="caliza_arenosa_chert" ${estrato.trama === 'caliza_arenosa_chert' ? 'selected' : ''}>634 Caliza arenosa y con chert, clástica con estratificación cruzada</option>
        <option value="caliza_oolitica" ${estrato.trama === 'caliza_oolitica' ? 'selected' : ''}>635 Caliza oolítica</option>
        <option value="caliza_arenosa" ${estrato.trama === 'caliza_arenosa' ? 'selected' : ''}>636 Caliza arenosa</option>
        <option value="caliza_limosa" ${estrato.trama === 'caliza_limosa' ? 'selected' : ''}>637 Caliza limosa</option>
        <option value="caliza_lutitica" ${estrato.trama === 'caliza_lutitica' ? 'selected' : ''}>638 Caliza lutítica o arcillosa</option>
        <option value="caliza_chert_op1" ${estrato.trama === 'caliza_chert_op1' ? 'selected' : ''}>639 Caliza con chert 1ra opción</option>
        <option value="caliza_chert_op2" ${estrato.trama === 'caliza_chert_op2' ? 'selected' : ''}>640 Caliza con chert 2da opción</option>
        <option value="caliza_dolomitica" ${estrato.trama === 'caliza_dolomitica' ? 'selected' : ''}>641 Caliza dolomítica, dolomita calcárea</option>
        <option value="dolomita" ${estrato.trama === 'dolomita' ? 'selected' : ''}>642 Dolomita o dolomía</option>
        <option value="dolomita_cruzada" ${estrato.trama === 'dolomita_cruzada' ? 'selected' : ''}>643 Dolomita o dolomía con estratificación cruzada</option>
        <option value="dolomita_oolitica" ${estrato.trama === 'dolomita_oolitica' ? 'selected' : ''}>644 Dolomita o dolomía oolítica</option>
        <option value="dolomita_arenosa" ${estrato.trama === 'dolomita_arenosa' ? 'selected' : ''}>645 Dolomita o dolomía arenosa</option>
        <option value="dolomita_limosa" ${estrato.trama === 'dolomita_limosa' ? 'selected' : ''}>646 Dolomita o dolomía limosa</option>
        <option value="dolomita_lutitica" ${estrato.trama === 'dolomita_lutitica' ? 'selected' : ''}>647 Dolomita o dolomía arcillosa o lutítica</option>
        <option value="dolomita_chert" ${estrato.trama === 'dolomita_chert' ? 'selected' : ''}>648 Dolomita o dolomía con chert</option>
        <option value="chert_op1" ${estrato.trama === 'chert_op1' ? 'selected' : ''}>649 Chert estratificado 1ra opción</option>
        <option value="chert_op2" ${estrato.trama === 'chert_op2' ? 'selected' : ''}>650 Chert estratificado 2da opción</option>
        <option value="chert_fosilifero" ${estrato.trama === 'chert_fosilifero' ? 'selected' : ''}>651 Chert estratificado fosilífero</option>
        <option value="roca_fosilifera" ${estrato.trama === 'roca_fosilifera' ? 'selected' : ''}>652 Roca fosilífera</option>
        <option value="roca_diatomitica" ${estrato.trama === 'roca_diatomitica' ? 'selected' : ''}>653 Roca diatomítica o con diatomeas</option>
        <option value="subgrauvaca" ${estrato.trama === 'subgrauvaca' ? 'selected' : ''}>654 Subgrauvaca</option>
        <option value="subgrauvaca_cruzada" ${estrato.trama === 'subgrauvaca_cruzada' ? 'selected' : ''}>655 Subgrauvaca con estratificación cruzada</option>
        <option value="subgrauvaca_ondulada" ${estrato.trama === 'subgrauvaca_ondulada' ? 'selected' : ''}>656 Subgrauvaca con estratificación ondulada</option>
        <option value="turba" ${estrato.trama === 'turba' ? 'selected' : ''}>657 Turba</option>
        <option value="carbon" ${estrato.trama === 'carbon' ? 'selected' : ''}>658 Carbón</option>
        <option value="carbon_impuro" ${estrato.trama === 'carbon_impuro' ? 'selected' : ''}>659 Carbón con huesos o impuro</option>
        <option value="paleosuelo" ${estrato.trama === 'paleosuelo' ? 'selected' : ''}>660 Paleosuelo, arcilla basal, underclay</option>
        <option value="flintclay" ${estrato.trama === 'flintclay' ? 'selected' : ''}>661 Flintclay o pedernal</option>
        <option value="bentonita" ${estrato.trama === 'bentonita' ? 'selected' : ''}>662 Bentonita</option>
        <option value="glauconita" ${estrato.trama === 'glauconita' ? 'selected' : ''}>663 Glauconita</option>
        <option value="limonita" ${estrato.trama === 'limonita' ? 'selected' : ''}>664 Limonita</option>
        <option value="siderita" ${estrato.trama === 'siderita' ? 'selected' : ''}>665 Siderita</option>
        <option value="fosforita" ${estrato.trama === 'fosforita' ? 'selected' : ''}>666 Roca fosfática nodular, fósforita</option>
        <option value="yeso" ${estrato.trama === 'yeso' ? 'selected' : ''}>667 Yeso</option>
        <option value="sal" ${estrato.trama === 'sal' ? 'selected' : ''}>668 Sal</option>
        <option value="arenisca_limolita" ${estrato.trama === 'arenisca_limolita' ? 'selected' : ''}>669 Arenisca y limolita interestratificada</option>
        <option value="arenisca_lutita" ${estrato.trama === 'arenisca_lutita' ? 'selected' : ''}>670 Arenisca y lutita interestratificada</option>
        <option value="arenisca_lutita_ondulada" ${estrato.trama === 'arenisca_lutita_ondulada' ? 'selected' : ''}>671 Arenisca y lutita interestratificada con estratificación ondulada</option>
        <option value="lutita_caliza_limosa" ${estrato.trama === 'lutita_caliza_limosa' ? 'selected' : ''}>672 Lutita y caliza limosa interestratificada</option>
        <option value="lutita_caliza_op1" ${estrato.trama === 'lutita_caliza_op1' ? 'selected' : ''}>673 Lutita y caliza interestratificada 1ra opción</option>
        <option value="lutita_caliza_op2" ${estrato.trama === 'lutita_caliza_op2' ? 'selected' : ''}>674 Lutita y caliza interestratificada 2da opción</option>
        <option value="lutita_caliza_calcare" ${estrato.trama === 'lutita_caliza_calcare' ? 'selected' : ''}>675 Lutita calcárea y caliza interestratificada</option>
        <option value="caliza_limosa_lutita_op1" ${estrato.trama === 'caliza_limosa_lutita_op1' ? 'selected' : ''}>676 Caliza limosa y lutita interestratificada 1ra opción</option>
        <option value="caliza_lutita_op1" ${estrato.trama === 'caliza_lutita_op1' ? 'selected' : ''}>677 Caliza y lutita interestratificada 1ra opción</option>
        <option value="caliza_lutita_op2" ${estrato.trama === 'caliza_lutita_op2' ? 'selected' : ''}>678 Caliza y lutita interestratificada 2da opción</option>
        <option value="caliza_lutita_op3" ${estrato.trama === 'caliza_lutita_op3' ? 'selected' : ''}>679 Caliza y lutita interestratificada 3ra opción</option>
        <option value="caliza_lutita_calcare" ${estrato.trama === 'caliza_lutita_calcare' ? 'selected' : ''}>680 Caliza y lutita calcárea interestratificada</option>
        <option value="till_op1" ${estrato.trama === 'till_op1' ? 'selected' : ''}>681 Till o diamicto 1ra opción</option>
        <option value="till_op2" ${estrato.trama === 'till_op2' ? 'selected' : ''}>682 Till o diamicto 2da opción</option>
        <option value="till_op3" ${estrato.trama === 'till_op3' ? 'selected' : ''}>683 Till o diamicto 3ra opción</option>
        <option value="loess_op1" ${estrato.trama === 'loess_op1' ? 'selected' : ''}>684 Loess 1ra opción</option>
        <option value="loess_op2" ${estrato.trama === 'loess_op2' ? 'selected' : ''}>685 Loess 2da opción</option>
        <option value="loess_op3" ${estrato.trama === 'loess_op3' ? 'selected' : ''}>686 Loess 3ra opción</option>
        <option value="metamorfismo" ${estrato.trama === 'metamorfismo' ? 'selected' : ''}>701 Metamorfismo</option>
        <option value="cuarcita" ${estrato.trama === 'cuarcita' ? 'selected' : ''}>702 Cuarcita</option>
        <option value="pizarra" ${estrato.trama === 'pizarra' ? 'selected' : ''}>703 Pizarra</option>
        <option value="granito_esquistoso" ${estrato.trama === 'granito_esquistoso' ? 'selected' : ''}>704 Granito esquistoso o gneísico</option>
        <option value="esquisto" ${estrato.trama === 'esquisto' ? 'selected' : ''}>705 Esquisto</option>
        <option value="esquisto_contorsionado" ${estrato.trama === 'esquisto_contorsionado' ? 'selected' : ''}>706 Esquisto contorsionado</option>
        <option value="esquisto_gneis" ${estrato.trama === 'esquisto_gneis' ? 'selected' : ''}>707 Esquisto y gneis</option>
        <option value="gneis" ${estrato.trama === 'gneis' ? 'selected' : ''}>708 Gneis</option>
        <option value="gneis_contorsionado" ${estrato.trama === 'gneis_contorsionado' ? 'selected' : ''}>709 Gneis contorsionado</option>
        <option value="esteatita" ${estrato.trama === 'esteatita' ? 'selected' : ''}>710 Esteatita, talco o serpentinita</option>
        <option value="roca_tufitica" ${estrato.trama === 'roca_tufitica' ? 'selected' : ''}>711 Roca tufítica</option>
        <option value="toba_cristalina" ${estrato.trama === 'toba_cristalina' ? 'selected' : ''}>712 Toba cristalina</option>
        <option value="toba_desvitrificada" ${estrato.trama === 'toba_desvitrificada' ? 'selected' : ''}>713 Toba desvitrificada</option>
        <option value="brecha_volcanica_toba" ${estrato.trama === 'brecha_volcanica_toba' ? 'selected' : ''}>714 Brecha volcánica y toba</option>
        <option value="brecha_volcanica" ${estrato.trama === 'brecha_volcanica' ? 'selected' : ''}>715 Brecha volcánica o aglomerado</option>
        <option value="roca_zeolitica" ${estrato.trama === 'roca_zeolitica' ? 'selected' : ''}>716 Roca zeolítica</option>
        <option value="flujos_basalticos" ${estrato.trama === 'flujos_basalticos' ? 'selected' : ''}>717 Flujos basálticos</option>
        <option value="granito_op1" ${estrato.trama === 'granito_op1' ? 'selected' : ''}>718 Granito 1ra opción</option>
        <option value="granito_op2" ${estrato.trama === 'granito_op2' ? 'selected' : ''}>719 Granito 2da opción</option>
        <option value="roca_ignea_bandeada" ${estrato.trama === 'roca_ignea_bandeada' ? 'selected' : ''}>720 Roca ígnea bandeada</option>
        <option value="roca_ignea_op1" ${estrato.trama === 'roca_ignea_op1' ? 'selected' : ''}>721 Roca ígnea 1ra opción</option>
        <option value="roca_ignea_op2" ${estrato.trama === 'roca_ignea_op2' ? 'selected' : ''}>722 Roca ígnea 2da opción</option>
        <option value="roca_ignea_op3" ${estrato.trama === 'roca_ignea_op3' ? 'selected' : ''}>723 Roca ígnea 3ra opción</option>
        <option value="roca_ignea_op4" ${estrato.trama === 'roca_ignea_op4' ? 'selected' : ''}>724 Roca ígnea 4ta</option>
        <option value="roca_ignea_op5" ${estrato.trama === 'roca_ignea_op5' ? 'selected' : ''}>725 Roca ígnea 5ta</option>
        <option value="roca_ignea_op6" ${estrato.trama === 'roca_ignea_op6' ? 'selected' : ''}>726 Roca ígnea 6ta</option>
        <option value="roca_ignea_op7" ${estrato.trama === 'roca_ignea_op7' ? 'selected' : ''}>727 Roca ígnea 7ma</option>
        <option value="roca_ignea_op8" ${estrato.trama === 'roca_ignea_op8' ? 'selected' : ''}>728 Roca ígnea 8va</option>
        <option value="roca_porfirica_op1" ${estrato.trama === 'roca_porfirica_op1' ? 'selected' : ''}>729 Roca porfírica 1ra opción</option>
        <option value="roca_porfirica_op2" ${estrato.trama === 'roca_porfirica_op2' ? 'selected' : ''}>730 Roca porfírica 2da opción</option>
        <option value="vitrofiro" ${estrato.trama === 'vitrofiro' ? 'selected' : ''}>731 Vitrófiro</option>
        <option value="cuarzo" ${estrato.trama === 'cuarzo' ? 'selected' : ''}>732 Cuarzo</option>
        <option value="SNGM 001 Grava o conglomerado imbricado clastosoportado" ${estrato.trama === 'SNGM 001 Grava o conglomerado imbricado clastosoportado' ? 'selected' : ''}>SNGM 001 Grava o conglomerado imbricado clastosoportado</option>
        <option value="mineralizacion" ${estrato.trama === 'mineralizacion' ? 'selected' : ''}>733 Mineralización</option>
      </select>
      <label>Color:</label>
      <input type="color" class="input-color" value="${estrato.color}">
      <label>Tamaño trama:</label>
      <input type="range" class="slider-tamano" min="4" max="80" value="${estrato.tamanoTrama}" step="1">
      <span class="valor-tamano">${estrato.tamanoTrama} px</span>
      <label>Alto (px):</label>
      <input type="range" class="slider-alto" min="0" max="1000" value="${estrato.alto}" step="1">
      <span class="valor-alto">${estrato.alto} px</span>
      <span class="valor-metros-alto">(${(estrato.alto / PIXELES_POR_METRO).toFixed(1)} m)</span>
      <label>Ancho (px):</label>
      <input type="range" class="slider-ancho" min="100" max="500" value="${estrato.ancho}" step="1">
      <span class="valor-ancho">${estrato.ancho} px</span>
      <span class="valor-metros-ancho">(${(estrato.ancho / PIXELES_POR_METRO).toFixed(1)} m)</span>
      <label>Tipo borde inferior:</label>
      <select class="select-borde-superior">
        <option value="recto" ${estrato.tipoBordeSuperior === 'recto' ? 'selected' : ''}>Recto</option>
        <option value="inf_transparente" ${estrato.tipoBordeSuperior === 'inf_transparente' ? 'selected' : ''}>Recto con base transparente</option>
        <option value="sup_transparente" ${estrato.tipoBordeSuperior === 'sup_transparente' ? 'selected' : ''}>Recto con techo transparente</option>
        <option value="sup_inf_transparente" ${estrato.tipoBordeSuperior === 'sup_inf_transparente' ? 'selected' : ''}>Recto con base y techo transparente</option>
        <option value="sup_inf_der_transparente" ${estrato.tipoBordeSuperior === 'sup_inf_der_transparente' ? 'selected' : ''}>Recto con todos los bordes transparentes</option>
        <option value="segmentado" ${estrato.tipoBordeSuperior === 'segmentado' ? 'selected' : ''}>Segmentado</option>
        <option value="ondulado" ${estrato.tipoBordeSuperior === 'ondulado' ? 'selected' : ''}>Ondulado</option>
        <option value="ondulado_inf_trans" ${estrato.tipoBordeSuperior === 'ondulado_inf_trans' ? 'selected' : ''}>Ondulado con base transparente</option>
        <option value="ondulado_sup_trans" ${estrato.tipoBordeSuperior === 'ondulado_sup_trans' ? 'selected' : ''}>Ondulado con techo transparente</option>
        <option value="ondulado_inf_sup_trans" ${estrato.tipoBordeSuperior === 'ondulado_inf_sup_trans' ? 'selected' : ''}>Ondulado con base y techo transparente</option>
        <option value="discontinuo" ${estrato.tipoBordeSuperior === 'discontinuo' ? 'selected' : ''}>Discontinuo</option>
        <option value="canal" ${estrato.tipoBordeSuperior === 'canal' ? 'selected' : ''}>Canal</option>
        <option value="canal2" ${estrato.tipoBordeSuperior === 'canal2' ? 'selected' : ''}>Canal 2</option>
        <option value="vacio_1" ${estrato.tipoBordeSuperior === 'vacio_1' ? 'selected' : ''}>Vacío, hiato o no visible (1)</option>
        <option value="vacio_2" ${estrato.tipoBordeSuperior === 'vacio_2' ? 'selected' : ''}>Vacío, hiato o no visible (2)</option>
      </select>
      <!-- Panel para Símbolos a la Derecha -->
      <div class="contenedor-simbolos-derecha" style="margin-top: 15px; border-top: 1px solid #ccc; padding-top: 15px;">
        <h4 style="margin: 10px 0 5px 0; font-size: 14px;">Símbolos a la Derecha</h4>
        <div class="lista-simbolos-derecha"></div>
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
      <button class="btn-eliminar" data-index="${index}">🗑️ Eliminar</button>
    </div>
  `;

  panelesContainer.prepend(panel);

  // Referencias a elementos del DOM
  const inputNombre = panel.querySelector('.input-nombre');
  const selectTrama = panel.querySelector('.select-trama');
  const inputColor = panel.querySelector('.input-color');
  const sliderTamano = panel.querySelector('.slider-tamano');
  const valorTamano = panel.querySelector('.valor-tamano');
  const sliderAlto = panel.querySelector('.slider-alto');
  const valorAlto = panel.querySelector('.valor-alto');
  const valorMetrosAlto = panel.querySelector('.valor-metros-alto');
  const sliderAncho = panel.querySelector('.slider-ancho');
  const valorAncho = panel.querySelector('.valor-ancho');
  const valorMetrosAncho = panel.querySelector('.valor-metros-ancho');
  const selectBordeSuperior = panel.querySelector('.select-borde-superior');
  const btnEliminar = panel.querySelector('.btn-eliminar');

  // Símbolos a la derecha
  const listaSimbolosDerecha = panel.querySelector('.lista-simbolos-derecha');
  const selectSimboloDerecha = panel.querySelector('.select-simbolo-derecha');
  const btnAgregarSimboloDerecha = panel.querySelector('.btn-agregar-simbolo-derecha');

  // Renderiza los símbolos ya asociados al estrato
  const renderizarSimbolosDerecha = () => {
    listaSimbolosDerecha.innerHTML = '';
    estrato.simbolosDerecha.forEach((simboloInfo, idx) => {
      const nombreOpcion = selectSimboloDerecha.querySelector(`option[value="${simboloInfo.tipo}"]`)?.textContent || simboloInfo.tipo;
      const item = document.createElement('div');
      item.innerHTML = `
        <span>${nombreOpcion} (${(simboloInfo.proporcionY * 100).toFixed(0)}%)</span>
        <button class="btn-eliminar-simbolo" data-index="${idx}" style="padding: 2px 6px; background: #ff5252; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">🗑️</button>
      `;
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      item.style.padding = '5px';
      item.style.margin = '2px 0';
      item.style.background = '#f9f9f9';
      item.style.borderRadius = '4px';
      item.style.fontSize = '12px';
      listaSimbolosDerecha.appendChild(item);
    });
  };

  renderizarSimbolosDerecha();

  // Eventos
  btnAgregarSimboloDerecha.addEventListener('click', () => {
    const tipo = selectSimboloDerecha.value;
    if (tipo === 'ninguno') return;
    estrato.simbolosDerecha.push({ tipo, proporcionY: 0.5 });
    renderizarSimbolosDerecha();
    dibujar();
  });

  listaSimbolosDerecha.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar-simbolo')) {
      const idx = parseInt(e.target.dataset.index);
      estrato.simbolosDerecha.splice(idx, 1);
      renderizarSimbolosDerecha();
      dibujar();
    }
  });

  const actualizar = () => {
    estrato.nombre = inputNombre.value;
    estrato.trama = selectTrama.value;
    estrato.color = inputColor.value;
    estrato.tamanoTrama = parseInt(sliderTamano.value);
    estrato.alto = parseInt(sliderAlto.value);
    estrato.ancho = parseInt(sliderAncho.value);
    estrato.tipoBordeSuperior = selectBordeSuperior.value;

    // Actualizar valores mostrados
    valorTamano.textContent = `${estrato.tamanoTrama} px`;
    valorAlto.textContent = `${estrato.alto} px`;
    valorMetrosAlto.textContent = `(${(estrato.alto / PIXELES_POR_METRO).toFixed(1)} m)`;
    valorAncho.textContent = `${estrato.ancho} px`;
    valorMetrosAncho.textContent = `(${(estrato.ancho / PIXELES_POR_METRO).toFixed(1)} m)`;

    // Actualizar punto de control si es manual
    if (estrato.puntoControl.posicionManual) {
      estrato.puntoControl.x = IZQUIERDA_X + estrato.ancho * estrato.puntoControl.proporcionX;
      estrato.puntoControl.y = estrato.topY + estrato.puntoControl.proporcionY * estrato.alto;
    } else {
      estrato.puntoControl.x = IZQUIERDA_X + estrato.ancho;
    }

    dibujar();
  };

  // Vincular eventos
  inputNombre.addEventListener('input', actualizar);
  selectTrama.addEventListener('change', actualizar);
  inputColor.addEventListener('input', actualizar);
  sliderTamano.addEventListener('input', actualizar);
  sliderAlto.addEventListener('input', actualizar);
  sliderAncho.addEventListener('input', actualizar);
  selectBordeSuperior.addEventListener('change', actualizar);

  btnEliminar.addEventListener('click', () => {
    const idx = parseInt(btnEliminar.dataset.index);
    estratos.splice(idx, 1);
    panelesContainer.innerHTML = '';
    estratos.forEach((_, i) => crearPanelEstrato(i));
    dibujar();
  });
}

/**
 * Genera un patrón de trama reutilizable para el canvas.
 * @param {string} tipo - Nombre de la trama (debe coincidir con las claves en `tramasSVG`).
 * @param {string} color - Color de la trama (usado en fallback).
 * @param {number} tamano - Tamaño base del patrón en píxeles.
 * @returns {CanvasPattern} Patrón listo para usar en `ctx.fillStyle`.
 */
export function crearTrama(tipo, color = '#cccccc', tamano = 30) {
  const canvasTrama = document.createElement('canvas');
  canvasTrama.width = tamano;
  canvasTrama.height = tamano;
  const ctxTrama = canvasTrama.getContext('2d');

  ctxTrama.fillStyle = color;
  ctxTrama.strokeStyle = color;
  ctxTrama.lineWidth = Math.max(0.5, tamano / 60);

  if (tramasSVG[tipo]) {
    const img = tramasSVG[tipo];
    if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
      try {
        const escala = 5 * tamano / Math.max(img.naturalWidth, img.naturalHeight);
        const canvasTemp = document.createElement('canvas');
        const ctxTemp = canvasTemp.getContext('2d');
        canvasTemp.width = img.naturalWidth * escala;
        canvasTemp.height = img.naturalHeight * escala;
        ctxTemp.drawImage(img, 0, 0, canvasTemp.width, canvasTemp.height);
        return ctxTrama.createPattern(canvasTemp, 'repeat');
      } catch (e) {
        console.warn(`⚠️ Error al crear patrón para ${tipo}:`, e);
        ctxTrama.fillRect(0, 0, tamano, tamano);
      }
    } else {
      console.warn(`Imagen no lista para trama: ${tipo}`);
      ctxTrama.fillRect(0, 0, tamano, tamano);
    }
  } else {
    // Fallback para tramas no SVG
    switch (tipo) {
      case 'solido':
      default:
        ctxTrama.fillRect(0, 0, tamano, tamano);
    }
  }

  return ctxTrama.createPattern(canvasTrama, 'repeat');
}

/**
 * Dibuja un símbolo SVG en el canvas.
 * @param {CanvasRenderingContext2D} ctx - Contexto del canvas.
 * @param {string} tipo - Nombre del símbolo (clave en `simbolosSVG`).
 * @param {number} x - Coordenada X del centro del símbolo.
 * @param {number} y - Coordenada Y del centro del símbolo.
 * @param {number} size - Tamaño del símbolo (ancho y alto).
 */
export function dibujarSimbolo(ctx, tipo, x, y, size) {
  const img = simbolosSVG[tipo];
  if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  } else {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
    ctx.fillStyle = '#ffffff';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('?', x, y + 3);
    console.warn(`Símbolo no cargado: ${tipo}`);
  }
}