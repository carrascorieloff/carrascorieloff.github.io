// Importar traducciones
import esTranslations from './es.json' assert { type: 'json' };
import enTranslations from './en.json' assert { type: 'json' };

const translations = {
    es: esTranslations,
    en: enTranslations
};

let currentLang = 'es';
let listeners = [];

/**
 * Traduce una clave
 * @param {string} key - Clave con formato "seccion.subseccion.clave"
 * @param {Object} params - Parámetros para interpolación {nombre: 'valor'}
 * @returns {string} Texto traducido
 */
export function t(key, params = {}) {
    const keys = key.split('.');
    let value = translations[currentLang];
    
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            console.warn(`⚠️ Traducción no encontrada: ${key}`);
            return key;
        }
    }
    
    if (typeof value !== 'string') {
        console.warn(`⚠️ Traducción no es string: ${key}`);
        return key;
    }
    
    // Interpolar parámetros
    let result = value;
    for (const [param, val] of Object.entries(params)) {
        result = result.replace(new RegExp(`\\{${param}\\}`, 'g'), val);
    }
    
    return result;
}

/**
 * Cambia el idioma actual
 * @param {string} lang - 'es' o 'en'
 */
export function setLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`⚠️ Idioma no soportado: ${lang}`);
        return;
    }
    
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('preferred_language', lang);
    
    // Notificar a los listeners
    listeners.forEach(listener => listener(lang));
}

/**
 * Obtiene el idioma actual
 * @returns {string}
 */
export function getLanguage() {
    return currentLang;
}

/**
 * Detecta el idioma del navegador o usa el guardado
 * @returns {string}
 */
export function detectLanguage() {
    // 1. Verificar localStorage
    const stored = localStorage.getItem('preferred_language');
    if (stored && translations[stored]) {
        return stored;
    }
    
    // 2. Detectar idioma del navegador
    const browserLang = navigator.language?.split('-')[0] || 'es';
    if (translations[browserLang]) {
        return browserLang;
    }
    
    // 3. Fallback a español
    return 'es';
}

/**
 * Registra un listener para cambios de idioma
 * @param {Function} listener - Función que recibe el nuevo idioma
 */
export function addLanguageListener(listener) {
    listeners.push(listener);
}

/**
 * Elimina un listener
 * @param {Function} listener
 */
export function removeLanguageListener(listener) {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
        listeners.splice(index, 1);
    }
}

/**
 * Obtiene las traducciones completas para un idioma
 * @param {string} lang
 * @returns {Object}
 */
export function getTranslations(lang) {
    return translations[lang] || translations.es;
}

// Inicializar con el idioma detectado
const detectedLang = detectLanguage();
currentLang = detectedLang;
document.documentElement.lang = detectedLang;

console.log(`🌍 Idioma detectado: ${detectedLang}`);