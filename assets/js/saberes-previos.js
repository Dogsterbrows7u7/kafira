function verificarSaberes() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');

    const resultDiv = document.getElementById('resultado-previos');
    
    if (!q1 || !q2 || !q3 || !q4 || !q5) {
        alert("¡Casi listo! Por favor responde todas las divertidas preguntas antes de avanzar.");
        return;
    }

    // Calcular aciertos
    let aciertos = 0;
    if (q1.value === 'cabras') aciertos++;
    if (q2.value === 'calcetin') aciertos++;
    if (q3.value === 'vino') aciertos++;
    if (q4.value === 'brasil') aciertos++;
    if (q5.value === 'leche') aciertos++;

    // Mensaje dinamico
    let titulo = "";
    if (aciertos === 5) titulo = "¡Eres un experto del cafetal! (5/5 correctas)";
    else if (aciertos >= 3) titulo = "¡Tienes alma de cafetero! (" + aciertos + "/5 correctas)";
    else titulo = "¡Apenas estás calentando el agua! (" + aciertos + "/5 correctas)";

    resultDiv.innerHTML = `
        <h3 style="color: var(--vino); font-family: 'Playfair Display'; margin-bottom: 1rem;">${titulo}</h3>
        <p style="color: var(--cafe-oscuro); font-size: 1.05rem; margin-bottom: 1.5rem;">
            Adivinar todo está bien, pero descubrir la verdad es mucho más emocionante. ¡Estás a punto de adentrarte en un viaje fascinante por la historia, los mitos y la cultura del café!
        </p>
        <a href="historia-origenes.html" class="btn-ir-actividad" style="display: inline-block;">Comenzar la Historia del Café</a>
    `;

    resultDiv.style.display = 'block';
    resultDiv.style.opacity = '0';
    setTimeout(() => {
        resultDiv.style.transition = 'opacity 0.5s ease';
        resultDiv.style.opacity = '1';
    }, 50);
}
