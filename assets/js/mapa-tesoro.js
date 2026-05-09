// 1. Base de datos de misiones
// x e y definen la posición del punto en porcentaje (0% a 100%)
const misiones = [
    {
        id: 1,
        titulo: "ETAPA 1: EL ORIGEN (ALMÁCIGO)",
        pregunta: "El viaje del café no empieza en la fábrica. ¿Dónde crees que se siembran las primeras semillas?",
        imagenFondo: "url(../assets/images/etapa1.jpg)", 
        hotspots: [
            { x: "25%", y: "60%", texto: "A", esCorrecto: false, feedback: "Esos son cafetos adultos listos para cosechar, el origen es más pequeño." },
            { x: "75%", y: "45%", texto: "B", esCorrecto: true, feedback: "¡EXACTO! El almácigo es el semillero donde las 'chapolas' comienzan su vida." },
            { x: "45%", y: "25%", texto: "C", esCorrecto: false, feedback: "Esa es la vivienda del caficultor, busquemos en la tierra." }
        ]
    },
    {
        id: 2,
        titulo: "ETAPA 2: LA RECOLECCIÓN",
        pregunta: "Para una Taza Cafetera de calidad, ¿qué frutos debemos recolectar?",
        imagenFondo: "url(../assets/images/etapa2.jpg)", 
        hotspots: [
            { x: "30%", y: "50%", texto: "A", esCorrecto: true, feedback: "Los granos verdes darán un sabor amargo y astringente. ¡Prueba otra vez!" },
            { x: "80%", y: "55%", texto: "B", esCorrecto: false, feedback: "¡ASÍ ES! Solo los frutos maduros (rojos/cereza) tienen el azúcar ideal." }
        ]
    },
    {
        id: 3,
        titulo: "ETAPA 3: EL BENEFICIO",
        pregunta: "¿En qué lugar se retira la pulpa y se lava el grano antes de secarlo?",
        imagenFondo: "url(../assets/images/etapa3.jpg)", 
        hotspots: [
            { x: "50%", y: "45%", texto: "A", esCorrecto: true, feedback: "¡Correcto! En el beneficiadero se procesa el fruto para extraer la almendra." },
            { x: "85%", y: "70%", texto: "B", esCorrecto: false, feedback: "Este es el patio de secado, aquí llegan después de ser lavados." }
        ]
    }
];

// 2. Variables de estado
let indexActual = 0;

// 3. Referencias al DOM
const screenIntro = document.getElementById('screen-intro');
const screenGame = document.getElementById('screen-game');
const screenFeedback = document.getElementById('screen-feedback');
const interactiveMap = document.getElementById('interactive-map');
const interfazInferior = document.querySelector('.interfaz-juego');

const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const btnRetry = document.getElementById('btn-retry');

// 4. Funciones Principales

/**
 * Muestra la misión actual basada en el indexActual
 */
function cargarMision() {
    const mision = misiones[indexActual];
    
    // Actualizar textos e imagen
    document.getElementById('mission-title').innerText = mision.titulo;
    document.getElementById('question-text').innerText = mision.pregunta;
    interactiveMap.style.backgroundImage = mision.imagenFondo;
    
    // Limpiar puntos anteriores
    interactiveMap.innerHTML = '';

    // Crear nuevos hotspots dinámicamente
    mision.hotspots.forEach(h => {
        const punto = document.createElement('div');
        punto.className = 'hotspot';
        punto.style.left = h.x;
        punto.style.top = h.y;
        punto.innerText = h.texto;

        punto.onclick = () => procesarRespuesta(h);
        
        interactiveMap.appendChild(punto);
    });
}

/**
 * Evalúa si el punto clickeado es correcto
 */
function procesarRespuesta(hotspot) {
    // Rellenar datos de feedback
    document.getElementById('feedback-title').innerText = hotspot.esCorrecto ? "¡MUY BIEN!" : "INTÉNTALO DE NUEVO";
    document.getElementById('feedback-text').innerText = hotspot.feedback;
    document.getElementById('feedback-icon').innerText = hotspot.esCorrecto ? "✓" : "X";
    
    // Configurar botones de acción
    btnNext.style.display = hotspot.esCorrecto ? "inline-block" : "none";
    btnRetry.style.display = hotspot.esCorrecto ? "none" : "inline-block";

    // Cambiar visibilidad: Mostramos feedback, ocultamos barra de misión
    screenFeedback.classList.add('active');
    interfazInferior.style.opacity = "0";
    interfazInferior.style.pointerEvents = "none";
}

/**
 * Avanza a la siguiente misión o termina el juego
 */
function siguientePaso() {
    indexActual++;
    
    // Resetear visibilidad de la interfaz
    screenFeedback.classList.remove('active');
    interfazInferior.style.opacity = "1";
    interfazInferior.style.pointerEvents = "auto";

    if (indexActual < misiones.length) {
        cargarMision();
    } else {
        // Final del recorrido
        document.getElementById('mission-title').innerText = "¡RECORRIDO COMPLETADO!";
        document.getElementById('question-text').innerText = "Ahora eres un experto en el origen de nuestro café.";
        interactiveMap.innerHTML = ""; // Limpia el mapa
        alert("¡Felicidades! Has completado todas las etapas.");
        window.location.href = "actividades.html";
    }
}

// 5. Event Listeners
btnStart.onclick = () => {
    screenIntro.classList.remove('active');
    screenGame.classList.add('active');
    cargarMision();
};

btnRetry.onclick = () => {
    screenFeedback.classList.remove('active');
    interfazInferior.style.opacity = "1";
    interfazInferior.style.pointerEvents = "auto";
};

btnNext.onclick = siguientePaso;