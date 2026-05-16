/**
 * LÓGICA: SIMULADOR DE CATA SENSORIAL
 */

// Elementos del DOM
const screenIntro = document.getElementById('screen-intro');
const screenMision1 = document.getElementById('screen-mision1');
const screenMision2 = document.getElementById('screen-mision2');
const screenMision3 = document.getElementById('screen-mision3');
const modalFeedback = document.getElementById('modal-feedback');

const fbIcon = document.getElementById('fb-icon');
const fbTitle = document.getElementById('fb-title');
const fbText = document.getElementById('fb-text');
const fbBtn = document.getElementById('fb-btn');
const coffeeLiquid = document.getElementById('coffee-liquid');

let isSliderMoved = false;

// 1. Iniciar Juego
function iniciarJuego() {
  screenIntro.classList.remove('active');
  screenMision1.classList.add('active');
}

// 2. Interacción: Misión 1 - Slider de Café
function actualizarCafe(valor) {
  isSliderMoved = true;

  // Cambiar de color claro a oscuro
  // RGB de #c39a6b a #1a0f0a
  const r = Math.floor(195 - (valor / 100) * 169);
  const g = Math.floor(154 - (valor / 100) * 139);
  const b = Math.floor(107 - (valor / 100) * 97);

  coffeeLiquid.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// 3. Procesar Respuestas
function verificarRespuesta(mision, respuesta) {
  if (mision === 1) {
    if (!isSliderMoved && respuesta === 'tueste') {
      mostrarFeedback(
        false,
        "¡Antes de responder, prueba a mover el slider de Misión 1 para ver cómo cambia físicamente la bebida!",
        () => cerrarModal()
      );
      return;
    }

    if (respuesta === 'tueste') {
      mostrarFeedback(
        true,
        "¡EXACTO, INVESTIGADOR! El sabor 'cargado' o amargo suele ser producto de un tueste oscuro. La gente lo asocia a 'fuerza', pero un tueste muy oscuro a veces quema las notas cítricas y dulces del grano de calidad.",
        () => avanzar(2)
      );
    } else if (respuesta === 'cafeina') {
      mostrarFeedback(
        false,
        "¡Oh no! Muchos creen esto, pero la cafeína no define el cuerpo o la contundencia de un café. El secreto está en cómo se tuesta el grano.",
        () => cerrarModal()
      );
    } else {
      mostrarFeedback(
        false,
        "El agua es fundamental, pero no es la responsable directa del tueste o del sabor amargo excesivo que llamamos 'fuerte'. ¡Intenta de nuevo!",
        () => cerrarModal()
      );
    }
  }

  else if (mision === 2) {
    if (respuesta === 'flor') {
      mostrarFeedback(
        true,
        "¡MAGNÍFICO! Los cafés de los suelos volcánicos del Eje Cafetero y Pereira brillan por tener una acidez balanceada, notas dulces a panela y un aroma floral o afrutado.",
        () => avanzar(3)
      );
    } else if (respuesta === 'ceniza') {
      mostrarFeedback(
        false,
        "Este olor a humo o ceniza ocurre cuando el café se quema durante un mal proceso de tueste oscuro. ¡Un buen café no debe saber a quemado!",
        () => cerrarModal()
      );
    } else {
      mostrarFeedback(
        false,
        "La madera seca, aunque nostálgica, puede indicar granos viejos o mal almacenados. Buscamos vida y dulzor natural en un café fresco.",
        () => cerrarModal()
      );
    }
  }

  else if (mision === 3) {
    if (respuesta === 'hirviendo') {
      mostrarFeedback(
        true,
        "¡CORRECTO! El agua hirviendo o con burbujas quema el café, destruyendo sus sutiles notas aromáticas y dejando un sabor amargo. La temperatura ideal es justo antes de hervir, aproximadamente entre 90°C y 96°C.",
        finalizarJuego
      );
    } else if (respuesta === 'caliente') {
      mostrarFeedback(
        false,
        "El agua bien caliente, antes de hervir, es la temperatura ideal. ¡Buscamos al enemigo del sabor, no a su amigo!",
        () => cerrarModal()
      );
    } else {
      mostrarFeedback(
        false,
        "El agua fría no quema el café; de hecho, se usa para hacer Cold Brew. El enemigo que buscamos quema los aceites por exceso de calor.",
        () => cerrarModal()
      );
    }
  }
}

// 4. Utilidad Feedback
function mostrarFeedback(acierto, mensaje, accionOnClick) {
  fbIcon.innerText = acierto ? "✓" : "X";
  fbTitle.innerText = acierto ? "¡EXCELENTE!" : "CASI...";
  fbText.innerText = mensaje;

  if (acierto) {
    fbBtn.innerText = "SIGUIENTE";
    fbBtn.className = "btn-cata";
  } else {
    fbBtn.innerText = "VOLVER A INTENTAR";
    fbBtn.className = "btn-cata outline";
  }

  fbBtn.onclick = accionOnClick;
  modalFeedback.classList.remove('hidden');
}

function cerrarModal() {
  modalFeedback.classList.add('hidden');
}

// 5. Flujo de Pantallas
function avanzar(siguienteMision) {
  cerrarModal();

  if (siguienteMision === 2) {
    screenMision1.classList.remove('active');
    screenMision2.classList.add('active');
  } else if (siguienteMision === 3) {
    screenMision2.classList.remove('active');
    screenMision3.classList.add('active');
  }
}

// 6. Finalizar juego y volver a Actividades
function finalizarJuego() {
  fbIcon.innerText = "★";
  fbTitle.innerText = "¡CATA COMPLETADA!";
  fbText.innerText = "¡Enhorabuena, Investigador Experto! Has demostrado tener un paladar educado. Ahora sabes distinguir qué le da la intensidad al café y qué aromas buscar en una taza cafetera perfecta.";

  fbBtn.innerText = "VOLVER A ACTIVIDADES";
  fbBtn.className = "btn-cata";

  // Ruta correcta desde juegos/cata-cafetera/cata-cafetera.html hacia pages/actividades.html
  fbBtn.onclick = () => {
    window.location.href = "../../pages/actividades.html";
  };
}