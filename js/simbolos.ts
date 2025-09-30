// Registro y carga de símbolos SVG
export const simbolosSVG = {};

export function registrarSimboloSVG(nombre, ruta) {
  if (!simbolosSVG[nombre]) {
    simbolosSVG[nombre] = new Image();
    simbolosSVG[nombre].src = ruta;
    simbolosSVG[nombre].onerror = () => console.error(`❌ Error cargando símbolo SVG: ${nombre} desde ${ruta}`);
    simbolosSVG[nombre].onload = () => console.log(`✅ Símbolo SVG cargado: ${nombre}`);
  }
}

export function registrarTodosLosSimbolos() {
  registrarSimboloSVG('10.2.1 Macrofosiles', 'simbolos/10.2.1 Macrofosiles.svg');
  registrarSimboloSVG('10.2.2 Invertebrados', 'simbolos/10.2.2 Invertebrados.svg');
  registrarSimboloSVG('10.2.3 Anélidos', 'simbolos/10.2.3 Anélidos.svg');
  registrarSimboloSVG('10.2.4 Artrópodos', 'simbolos/10.2.4 Artrópodos.svg');
  registrarSimboloSVG('10.2.5 Aracnidos', 'simbolos/10.2.5 Aracnidos.svg');
  registrarSimboloSVG('10.2.6 Crustáceos', 'simbolos/10.2.6 Crustáceos.svg');
  registrarSimboloSVG('10.2.7 Insectos', 'simbolos/10.2.7 Insectos.svg');
  registrarSimboloSVG('10.2.8 Trilobites', 'simbolos/10.2.8 Trilobites.svg');
  registrarSimboloSVG('10.2.9 Braquiopodos', 'simbolos/10.2.9 Braquiopodos.svg');
  registrarSimboloSVG('10.2.10 Briozoos', 'simbolos/10.2.10 Briozoos.svg');
  registrarSimboloSVG('10.2.11 Cnidarios', 'simbolos/10.2.11 Cnidarios.svg');
  registrarSimboloSVG('10.2.12 Corales', 'simbolos/10.2.12 Corales.svg');
  registrarSimboloSVG('10.2.13 Estromatoporoideos', 'simbolos/10.2.13 Estromatoporoideos.svg');
  registrarSimboloSVG('10.2.14 Equinodermos', 'simbolos/10.2.14 Equinodermos.svg');
  registrarSimboloSVG('10.2.15 Crinoideos', 'simbolos/10.2.15 Crinoideos.svg');
  registrarSimboloSVG('10.2.16 Equinoideos', 'simbolos/10.2.16 Equinoideos.svg');
  registrarSimboloSVG('10.2.17 Graptolitos', 'simbolos/10.2.17 Graptolitos.svg');
  registrarSimboloSVG('10.2.18 moluscos', 'simbolos/10.2.18 moluscos.svg');
  registrarSimboloSVG('10.2.19 Cefalópodos', 'simbolos/10.2.19 Cefalópodos.svg');
  registrarSimboloSVG('10.2.20 Amonoideos', 'simbolos/10.2.20 Amonoideos.svg');
  registrarSimboloSVG('10.2.21 Belemnoideos', 'simbolos/10.2.21 Belemnoideos.svg');
  registrarSimboloSVG('10.2.22 Nautiloideos', 'simbolos/10.2.22 Nautiloideos.svg');
  registrarSimboloSVG('10.2.23 Gastrópodos', 'simbolos/10.2.23 Gastrópodos.svg');
  registrarSimboloSVG('10.2.24 Pelecípodos', 'simbolos/10.2.24 Pelecípodos.svg');
  registrarSimboloSVG('10.2.25 Esponjas', 'simbolos/10.2.25 Esponjas.svg');
  registrarSimboloSVG('10.2.26 Vertebrados', 'simbolos/10.2.26 Vertebrados.svg');
  registrarSimboloSVG('10.2.27 Anfibios', 'simbolos/10.2.27 Anfibios.svg');
  registrarSimboloSVG('10.2.28 Peces', 'simbolos/10.2.28 Peces.svg');
  registrarSimboloSVG('10.2.29 Mamíferos', 'simbolos/10.2.29 Mamíferos.svg');
  registrarSimboloSVG('10.2.30 Reptiles', 'simbolos/10.2.30 Reptiles.svg');
  registrarSimboloSVG('10.2.31 Plantas', 'simbolos/10.2.31 Plantas.svg');
  registrarSimboloSVG('10.2.32 Hojas', 'simbolos/10.2.32 Hojas.svg');
  registrarSimboloSVG('10.2.33 Raíces', 'simbolos/10.2.33 Raíces.svg');
  registrarSimboloSVG('10.2.34 Madera', 'simbolos/10.2.34 Madera.svg');
  registrarSimboloSVG('10.2.35 Algas', 'simbolos/10.2.35 Algas.svg');
  registrarSimboloSVG('10.2.36 Coníferas', 'simbolos/10.2.36 Coníferas.svg');
  registrarSimboloSVG('10.2.37 Helechos', 'simbolos/10.2.37 Helechos.svg');
  registrarSimboloSVG('10.2.38 Plantas o árboles con flores', 'simbolos/10.2.38 Plantas o árboles con flores.svg');
  registrarSimboloSVG('10.2.39 Estromatolitos', 'simbolos/10.2.39 Estromatolitos.svg');
  registrarSimboloSVG('10.2.40 Fungi', 'simbolos/10.2.40 Fungi.svg');
  registrarSimboloSVG('10.2.41 Trazas fósiles', 'simbolos/10.2.41 Trazas fósiles.svg');
  registrarSimboloSVG('10.2.42 Madrigueras', 'simbolos/10.2.42 Madrigueras.svg');
  registrarSimboloSVG('10.2.43 Coprolitos', 'simbolos/10.2.43 Coprolitos.svg');
  registrarSimboloSVG('10.2.44 Huellas', 'simbolos/10.2.44 Huellas.svg');
  registrarSimboloSVG('10.2.45 Microfósiles', 'simbolos/10.2.45 Microfósiles.svg');
  registrarSimboloSVG('10.2.46 Conodontos', 'simbolos/10.2.46 Conodontos.svg');
  registrarSimboloSVG('10.2.47 Diatomeas', 'simbolos/10.2.47 Diatomeas.svg');
  registrarSimboloSVG('10.2.48 Foraminíferos', 'simbolos/10.2.48 Foraminíferos.svg');
  registrarSimboloSVG('10.2.49 Grandes foraminíferos o fusulínidos', 'simbolos/10.2.49 Grandes foraminíferos o fusulínidos.svg');
  registrarSimboloSVG('10.2.50 Foraminíferos bentónicos, pequeños', 'simbolos/10.2.50 Foraminíferos bentónicos, pequeños.svg');
  registrarSimboloSVG('10.2.51 Foraminíferos planctónicos, pequeños', 'simbolos/10.2.51 Foraminíferos planctónicos, pequeños.svg');
  registrarSimboloSVG('10.2.52 Nanofósiles', 'simbolos/10.2.52 Nanofósiles.svg');
  registrarSimboloSVG('10.2.53 Ostrácodos', 'simbolos/10.2.53 Ostrácodos.svg');
  registrarSimboloSVG('10.2.54 Palinomorfos', 'simbolos/10.2.54 Palinomorfos.svg');
  registrarSimboloSVG('10.2.55 Acritarcos', 'simbolos/10.2.55 Acritarcos.svg');
  registrarSimboloSVG('10.2.56 Quitinozoos', 'simbolos/10.2.56 Quitinozoos.svg');
  registrarSimboloSVG('10.2.57 Dinoflagelados', 'simbolos/10.2.57 Dinoflagelados.svg');
  registrarSimboloSVG('10.2.58 Polen o esporas', 'simbolos/10.2.58 Polen o esporas.svg');
  registrarSimboloSVG('10.2.59 Radiolarios', 'simbolos/10.2.59 Radiolarios.svg');
  registrarSimboloSVG('10.2.60 Silicoflagelados', 'simbolos/10.2.60 Silicoflagelados.svg');
  registrarSimboloSVG('10.2.61 Espículas', 'simbolos/10.2.61 Espículas.svg');
  registrarSimboloSVG('concreciones', 'simbolos/concreciones.svg');
  registrarSimboloSVG('meteorizacion_esferoidal', 'simbolos/meteorizacion_esferoidal.svg');
  registrarSimboloSVG('raices', 'simbolos/raices.svg');
  registrarSimboloSVG('SNGM Algas calcáreas', 'simbolos/SNGM Algas calcáreas.svg');
  registrarSimboloSVG('SNGM Bioturbación', 'simbolos/SNGM Bioturbación.svg');
  registrarSimboloSVG('SNGM Diatomeas', 'simbolos/SNGM Diatomeas.svg');
  registrarSimboloSVG('SNGM Fauna fósil indiferenciada', 'simbolos/SNGM Fauna fósil indiferenciada.svg');
  registrarSimboloSVG('SNGM Flora fósil', 'simbolos/SNGM Flora fósil.svg');
  registrarSimboloSVG('SNGM Foraminíferos', 'simbolos/SNGM Foraminíferos.svg');
  registrarSimboloSVG('SNGM Invertebrados marinos', 'simbolos/SNGM Invertebrados marinos.svg');
  registrarSimboloSVG('SNGM Mamíferos marinos', 'simbolos/SNGM Mamíferos marinos.svg');
  registrarSimboloSVG('SNGM Microfauna sin especificar', 'simbolos/SNGM Microfauna sin especificar.svg');
  registrarSimboloSVG('SNGM Peces, esqueletos y escamas', 'simbolos/SNGM Peces, esqueletos y escamas.svg');
  registrarSimboloSVG('SNGM Polen y o esporas', 'simbolos/SNGM Polen y o esporas.svg');
  registrarSimboloSVG('SNGM Radiolarios', 'simbolos/SNGM Radiolarios.svg');
  registrarSimboloSVG('SNGM Raiz en posición de vida', 'simbolos/SNGM Raiz en posición de vida.svg');
  registrarSimboloSVG('SNGM Rastros y pisadas 1', 'simbolos/SNGM Rastros y pisadas 1.svg');
  registrarSimboloSVG('SNGM Rastros y pisadas 2', 'simbolos/SNGM Rastros y pisadas 2.svg');
  registrarSimboloSVG('SNGM Restos de tronco', 'simbolos/SNGM Restos de tronco.svg');
  registrarSimboloSVG('SNGM Trazas fósiles 2', 'simbolos/SNGM Trazas fósiles 2.svg');
  registrarSimboloSVG('SNGM Trazas fósiles 3', 'simbolos/SNGM Trazas fósiles 3.svg');
  registrarSimboloSVG('SNGM Trazas fósiles', 'simbolos/SNGM Trazas fósiles.svg');
  registrarSimboloSVG('SNGM Tronco en posición de vida', 'simbolos/SNGM Tronco en posición de vida.svg');
  registrarSimboloSVG('SNGM Vertebrados', 'simbolos/SNGM Vertebrados.svg');
}