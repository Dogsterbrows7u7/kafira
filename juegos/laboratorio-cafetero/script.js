const steps = [
  {
    id: 'cosecha',
    label: 'Cosecha',
    eyebrow: 'Etapa 1',
    title: 'Cosecha selectiva',
    instruction: 'Arrastra solo las cerezas maduras (rojas) desde la mata de café hacia la cesta. Debes recolectar 5.',
    hint: 'Las cerezas verdes todavía no están listas: si las eliges antes de tiempo afectan la calidad del café.',
    learn: [
      'La cosecha del café se hace eligiendo cerezas maduras, generalmente de color rojo intenso.',
      'Una buena selección inicial mejora el sabor final de la bebida.',
      'Las cerezas verdes o demasiado amarillas deben quedarse en la mata hasta completar su maduración.'
    ],
    badge: 'Recolector cuidadoso'
  },
  {
    id: 'despulpado',
    label: 'Despulpado',
    eyebrow: 'Etapa 2',
    title: 'Despulpado del fruto',
    instruction: 'Lleva una a una las cerezas cosechadas a la despulpadora para separar la pulpa del grano.',
    hint: 'Despulpado significa quitar la cáscara y parte de la pulpa del fruto para revelar el grano cubierto por mucílago.',
    learn: [
      'El despulpado separa la parte exterior del fruto del grano de café.',
      'Después de este proceso el grano aún conserva una capa pegajosa llamada mucílago.',
      'En esta fase es importante no maltratar los granos para conservar su calidad.'
    ],
    badge: 'Maestro del despulpado'
  },
  {
    id: 'lavado',
    label: 'Lavado',
    eyebrow: 'Etapa 3',
    title: 'Lavado del café',
    instruction: 'Arrastra todos los granos despulpados al tanque. Cuando estén completos, activa el lavado del lote.',
    hint: 'El lavado ayuda a retirar el mucílago y a dejar el grano limpio antes del secado.',
    learn: [
      'El lavado retira restos de mucílago y deja el grano listo para secarse.',
      'El agua ayuda a limpiar el café, pero debe usarse de manera controlada.',
      'Un lavado adecuado evita sabores no deseados en el café final.'
    ],
    badge: 'Lavador experto'
  },
  {
    id: 'secado',
    label: 'Secado',
    eyebrow: 'Etapa 4',
    title: 'Secado controlado',
    instruction: 'Extiende los granos en el secadero y baja la humedad hasta un rango ideal entre 10% y 12%.',
    hint: 'Puedes usar el sol o la brisa. Si secas demasiado, el grano pierde calidad; si queda muy húmedo, se daña.',
    learn: [
      'El secado reduce la humedad del café para conservarlo mejor.',
      'El rango ideal suele estar cerca del 10% al 12% de humedad.',
      'Secar demasiado o muy poco afecta la calidad y el almacenamiento del grano.'
    ],
    badge: 'Secado preciso'
  },
  {
    id: 'tostado',
    label: 'Tostado',
    eyebrow: 'Etapa 5',
    title: 'Tostado del grano',
    instruction: 'Carga los granos secos en el tostador, inicia el proceso y detén el tostado en la zona media.',
    hint: 'El tostado cambia el color, el aroma y el sabor del café. Hoy buscaremos un tostado medio, equilibrado y versátil.',
    learn: [
      'El tostado desarrolla aromas y sabores que no estaban presentes en el grano verde.',
      'Claro = más acidez, medio = equilibrio, oscuro = sabores más intensos y amargos.',
      'Controlar el punto de tostado es una decisión fundamental para el perfil de la bebida.'
    ],
    badge: 'Tostador equilibrado'
  },
  {
    id: 'molienda',
    label: 'Molienda',
    eyebrow: 'Etapa 6',
    title: 'Molienda según el método',
    instruction: 'Relaciona cada tipo de molienda con el método adecuado arrastrando fina, media y gruesa al lugar correcto.',
    hint: 'Espresso usa molienda fina, filtrado usa molienda media y prensa francesa usa molienda gruesa.',
    learn: [
      'La molienda cambia la velocidad con la que el agua extrae el sabor del café.',
      'Si la molienda es muy fina para el método, el café puede quedar amargo.',
      'Si la molienda es muy gruesa, la bebida puede salir débil o sin suficiente sabor.'
    ],
    badge: 'Molendero preciso'
  }
];

const stepState = {
  current: 0,
  completed: Array(steps.length).fill(false),
  harvest: { collected: [], correct: 0 },
  depulpado: { processed: 0 },
  lavado: { loaded: 0, washed: false },
  secado: { loaded: 0, humidity: 55, completed: false },
  tostado: { loaded: false, value: 0, running: false, timer: null, completed: false },
  molienda: { matches: {} },
  log: []
};

const harvestCherries = [
  { id: 'h1', ripeness: 'ripe', x: 207, y: 72 },
  { id: 'h2', ripeness: 'ripe', x: 243, y: 104 },
  { id: 'h3', ripeness: 'ripe', x: 93, y: 72 },
  { id: 'h4', ripeness: 'ripe', x: 64, y: 136 },
  { id: 'h5', ripeness: 'ripe', x: 187, y: 187 },
  { id: 'h6', ripeness: 'unripe', x: 253, y: 52 },
  { id: 'h7', ripeness: 'unripe', x: 74, y: 104 },
  { id: 'h8', ripeness: 'pale', x: 220, y: 167 },
  { id: 'h9', ripeness: 'pale', x: 134, y: 187 }
];

const grindAnswer = {
  espresso: 'Fina',
  filtrado: 'Media',
  prensa: 'Gruesa'
};

let dragPayload = null;

const els = {
  stepper: document.getElementById('stepper'),
  stageEyebrow: document.getElementById('stageEyebrow'),
  stageTitle: document.getElementById('stageTitle'),
  stageInstruction: document.getElementById('stageInstruction'),
  stageHint: document.getElementById('stageHint'),
  stageContainer: document.getElementById('stageContainer'),
  learningPoints: document.getElementById('learningPoints'),
  feedback: document.getElementById('feedback'),
  progressFill: document.getElementById('progressFill'),
  progressText: document.getElementById('progressText'),
  badgeArea: document.getElementById('badgeArea'),
  completedCount: document.getElementById('completedCount'),
  logBook: document.getElementById('logBook'),
  btnPrev: document.getElementById('btnPrev'),
  btnNext: document.getElementById('btnNext'),
  helpModal: document.getElementById('helpModal'),
  btnHowTo: document.getElementById('btnHowTo'),
  closeModal: document.getElementById('closeModal'),
  startModal: document.getElementById('startModal')
};

init();

function init() {
  renderStepper();
  bindGlobalEvents();
  updateUI();
  showFeedback('Bienvenido al laboratorio cafetero. Empezaremos con la cosecha: arrastra solo las cerezas maduras a la cesta.', 'info');
}

function bindGlobalEvents() {
  els.btnPrev.addEventListener('click', () => goToStep(stepState.current - 1));
  els.btnNext.addEventListener('click', () => goToStep(stepState.current + 1));
  els.btnHowTo.addEventListener('click', () => els.helpModal.classList.remove('hidden'));
  els.closeModal.addEventListener('click', () => els.helpModal.classList.add('hidden'));
  els.startModal.addEventListener('click', () => els.helpModal.classList.add('hidden'));
  els.helpModal.addEventListener('click', (e) => {
    if (e.target === els.helpModal) els.helpModal.classList.add('hidden');
  });
}

function renderStepper() {
  els.stepper.innerHTML = steps.map((step, index) => {
    const locked = !isStepUnlocked(index);
    const active = stepState.current === index;
    const done = stepState.completed[index];
    return `
      <button class="step-pill ${locked ? 'locked' : ''} ${active ? 'active' : ''} ${done ? 'done' : ''}" data-step-index="${index}" ${locked ? 'disabled' : ''}>
        <span class="step-number">${index + 1}</span>
        <span class="step-label">${step.label}</span>
      </button>
    `;
  }).join('');

  els.stepper.querySelectorAll('.step-pill').forEach(btn => {
    btn.addEventListener('click', () => goToStep(Number(btn.dataset.stepIndex)));
  });
}

function isStepUnlocked(index) {
  if (index === 0) return true;
  return stepState.completed[index - 1];
}

function goToStep(index) {
  if (index < 0 || index >= steps.length || !isStepUnlocked(index)) return;
  stepState.current = index;
  updateUI();
}

function updateUI() {
  const step = steps[stepState.current];
  els.stageEyebrow.textContent = step.eyebrow;
  els.stageTitle.textContent = step.title;
  els.stageInstruction.textContent = step.instruction;
  els.stageHint.textContent = step.hint;
  els.learningPoints.innerHTML = step.learn.map(item => `<li>${item}</li>`).join('');

  els.btnPrev.disabled = stepState.current === 0;
  els.btnNext.disabled = !stepState.completed[stepState.current] || stepState.current === steps.length - 1;

  const completeCount = stepState.completed.filter(Boolean).length;
  els.completedCount.textContent = completeCount;
  els.progressFill.style.width = `${(completeCount / steps.length) * 100}%`;
  els.progressText.textContent = `${completeCount} de ${steps.length} etapas completadas`;

  renderBadges();
  renderLog();
  renderStepper();
  renderCurrentStage();
}

function renderBadges() {
  const badges = steps.filter((_, i) => stepState.completed[i]).map(s => s.badge);
  els.badgeArea.innerHTML = badges.length
    ? badges.map(b => `<span class="badge-chip">🏅 ${b}</span>`).join('')
    : `<span class="badge-chip">Aún sin insignias</span>`;
}

function renderLog() {
  els.logBook.innerHTML = stepState.log.length
    ? stepState.log.slice().reverse().map(entry => `
      <div class="log-entry">
        <strong>${entry.title}</strong>
        <p>${entry.text}</p>
      </div>
    `).join('')
    : `<div class="log-entry"><strong>Inicio</strong><p>Tu bitácora se llenará a medida que avances por el proceso del café.</p></div>`;
}

function addLog(title, text) {
  stepState.log.push({ title, text });
  renderLog();
}

function showFeedback(message, type = 'info') {
  els.feedback.className = `feedback ${type}`;
  els.feedback.innerHTML = message;
}

function markStepComplete(index, feedbackMessage, logText) {
  if (!stepState.completed[index]) {
    stepState.completed[index] = true;
    addLog(steps[index].title, logText || feedbackMessage.replace(/<[^>]+>/g, ''));
  }
  showFeedback(feedbackMessage, 'success');
  updateUI();
}

function renderCurrentStage() {
  switch (steps[stepState.current].id) {
    case 'cosecha':
      renderHarvestStage();
      break;
    case 'despulpado':
      renderDepulpadoStage();
      break;
    case 'lavado':
      renderLavadoStage();
      break;
    case 'secado':
      renderSecadoStage();
      break;
    case 'tostado':
      renderTostadoStage();
      break;
    case 'molienda':
      renderMoliendaStage();
      break;
  }
}

function createTokenHTML(label, emoji, extraClass = '', small = '') {
  return `<div class="mini-token draggable-token ${extraClass}" draggable="true" data-label="${label}">
    <span class="emoji">${emoji}</span>
    <strong>${label}</strong>
    ${small ? `<small>${small}</small>` : ''}
  </div>`;
}

function attachDrag(item, payload) {
  item.addEventListener('dragstart', () => {
    dragPayload = payload;
    item.classList.add('dragging');
  });
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
  });
}

function attachDrop(zone, handler) {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('over');
  });
  zone.addEventListener('dragleave', () => zone.classList.remove('over'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('over');
    handler(dragPayload, zone);
    dragPayload = null;
  });
}

/* STAGE 1 */
function renderHarvestStage() {
  const available = harvestCherries.filter(ch => !stepState.harvest.collected.includes(ch.id));
  els.stageContainer.innerHTML = `
    <div class="harvest-layout">
      <div class="station-card plant-scene">
        <div class="section-title">Cosecha</div>
        <div class="counter-badge">Cerezas maduras recolectadas: <strong>${stepState.harvest.correct}/5</strong></div>

        <div class="basket-zone basket-zone-invisible dropzone" id="basketZone">
          <div class="basket-content" id="basketContent">
            ${Array.from({ length: stepState.harvest.correct }).map(() => `<div class="cherry-token ripe in-basket">🍒</div>`).join('')}
          </div>
        </div>

        <div class="coffee-plant custom-plant">
          ${available.map(ch => `
            <div class="cherry-token draggable-token ${ch.ripeness}" draggable="true" data-cherry-id="${ch.id}" style="left:${ch.x}px; top:${ch.y}px;">
              🍒
            </div>
          `).join('')}
        </div>

        <div class="ground-strip"></div>
      </div>

      <div class="station-panel">
        <div class="section-title">Observa antes de recolectar</div>
        <div class="harvest-checklist">
          <div class="check-item">
            <strong>Rojo intenso = listo para cosecha</strong>
            <span class="small-note">Son las cerezas que debes llevar a la cesta.</span>
          </div>
          <div class="check-item">
            <strong>Verde = inmaduro</strong>
            <span class="small-note">Todavía le falta madurar. Si lo cortas ahora, la calidad baja.</span>
          </div>
          <div class="check-item">
            <strong>Amarillo = casi listo</strong>
            <span class="small-note">Se ve prometedor, pero aún no es el punto ideal.</span>
          </div>
          <div class="check-item">
            <strong>Meta del juego</strong>
            <span class="small-note">Recolecta exactamente 5 cerezas maduras para continuar.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const basket = document.getElementById('basketZone');
  attachDrop(basket, (payload) => {
    if (!payload || payload.stage !== 'harvest') return;
    if (payload.ripeness !== 'ripe') {
      showFeedback('Esa cereza todavía no está lista. En la cosecha selectiva elegimos solo las <strong>maduras</strong>.', 'error');
      return;
    }
    if (stepState.harvest.collected.includes(payload.id)) return;
    stepState.harvest.collected.push(payload.id);
    stepState.harvest.correct += 1;
    showFeedback(`¡Muy bien! Has recolectado una cereza madura. Llevas <strong>${stepState.harvest.correct}/5</strong>.`, 'success');
    if (stepState.harvest.correct >= 5) {
      markStepComplete(0, 'Excelente. Ya realizaste una cosecha selectiva de calidad. <strong>Puedes pasar al despulpado</strong>.', 'Seleccioné únicamente cerezas maduras para asegurar mejor calidad desde el inicio del proceso.');
    } else {
      renderHarvestStage();
    }
  });

  els.stageContainer.querySelectorAll('[data-cherry-id]').forEach(item => {
    const id = item.dataset.cherryId;
    const cherry = harvestCherries.find(c => c.id === id);
    attachDrag(item, { stage: 'harvest', id, ripeness: cherry.ripeness });
  });
}

/* STAGE 2 */
function renderDepulpadoStage() {
  const inventoryCount = 5 - stepState.depulpado.processed;
  els.stageContainer.innerHTML = `
    <div class="stage-grid">
      <div class="station-card">
        <div class="section-title">Lote cosechado</div>
        <p class="help-text">Arrastra cada cereza desde el lote hasta la despulpadora.</p>
        <div class="inventory-row" id="cherryInventory">
          ${Array.from({ length: inventoryCount }).map((_, i) => createTokenHTML(`Cereza ${i + 1}`, '🔴', 'depulp-cherry', 'Fruto maduro')).join('')}
        </div>
      </div>

      <div class="station-card machine-area">
        <div class="depulpadora">
          <div class="machine-slot dropzone" id="depulpDrop">Suelta aquí la cereza</div>
          <div class="output-slot">
            <strong>Granos obtenidos</strong>
            <div class="mini-tray" id="depulpOutput">
              ${Array.from({ length: stepState.depulpado.processed }).map((_, i) => createTokenHTML(`Grano ${i + 1}`, '🫘', '', 'Con mucílago')).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  els.stageContainer.querySelectorAll('.depulp-cherry').forEach((item, idx) => {
    attachDrag(item, { stage: 'depulpado', index: idx });
  });

  attachDrop(document.getElementById('depulpDrop'), (payload) => {
    if (!payload || payload.stage !== 'depulpado') return;
    stepState.depulpado.processed += 1;
    showFeedback(`La despulpadora retiró la pulpa del fruto. Ya procesaste <strong>${stepState.depulpado.processed}/5</strong> cerezas.`, 'success');
    if (stepState.depulpado.processed >= 5) {
      markStepComplete(1, 'Muy bien. Ahora tienes los granos despulpados, listos para el lavado.', 'Despulpé el fruto para separar la pulpa y dejar el grano listo para la siguiente etapa.');
    } else {
      renderDepulpadoStage();
    }
  });
}

/* STAGE 3 */
function renderLavadoStage() {
  const remaining = 5 - stepState.lavado.loaded;
  els.stageContainer.innerHTML = `
    <div class="stage-grid">
      <div class="station-card">
        <div class="section-title">Granos con mucílago</div>
        <p class="help-text">Pasa todos los granos al tanque de lavado.</p>
        <div class="inventory-row" id="washInventory">
          ${Array.from({ length: remaining }).map((_, i) => createTokenHTML(`Grano ${i + 1}`, '🫘', 'wash-bean', 'Por lavar')).join('')}
        </div>
      </div>

      <div class="station-card machine-area">
        <div class="tank-machine" data-title="Tanque de lavado">
          <div class="machine-slot dropzone" id="washDrop">Suelta aquí los granos</div>
          <div class="output-slot">
            <strong>Dentro del tanque: ${stepState.lavado.loaded}/5</strong>
            <div class="mini-tray">
              ${Array.from({ length: stepState.lavado.loaded }).map((_, i) => createTokenHTML(`Lote ${i + 1}`, '💧', '', 'En agua')).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="station-panel" style="grid-column: 1 / -1;">
        <div class="section-title">Activa el lavado</div>
        <p class="help-text">Cuando los 5 granos estén dentro del tanque, presiona el botón para limpiar el lote.</p>
        <button class="btn btn-primary" id="washButton" ${stepState.lavado.loaded < 5 || stepState.lavado.washed ? 'disabled' : ''}>Lavar lote</button>
        ${stepState.lavado.washed ? `<div class="output-slot" style="margin-top:1rem;"><strong>Granos limpios</strong><div class="mini-tray">${Array.from({ length: 5 }).map((_, i) => createTokenHTML(`Grano limpio ${i + 1}`, '✨', '', 'Listo para secar')).join('')}</div></div>` : ''}
      </div>
    </div>
  `;

  els.stageContainer.querySelectorAll('.wash-bean').forEach((item, idx) => {
    attachDrag(item, { stage: 'lavado', index: idx });
  });

  attachDrop(document.getElementById('washDrop'), (payload) => {
    if (!payload || payload.stage !== 'lavado' || stepState.lavado.loaded >= 5) return;
    stepState.lavado.loaded += 1;
    showFeedback(`Grano enviado al tanque. Llevas <strong>${stepState.lavado.loaded}/5</strong> listos para el lavado.`, 'success');
    renderLavadoStage();
  });

  const washButton = document.getElementById('washButton');
  if (washButton) {
    washButton.addEventListener('click', () => {
      stepState.lavado.washed = true;
      markStepComplete(2, 'Perfecto. El mucílago fue retirado y ahora el café está listo para el secado.', 'Lavé el café para retirar el mucílago y dejar el grano limpio antes del secado.');
      renderLavadoStage();
    });
  }
}

/* STAGE 4 */
function renderSecadoStage() {
  const loaded = stepState.secado.loaded;
  els.stageContainer.innerHTML = `
    <div class="drying-layout">
      <div class="station-card patio-area">
        <div class="section-title">Secadero</div>
        <div class="sun"></div>
        <div class="drying-bed dropzone" id="dryDrop">
          <strong style="display:block; color:#fff; margin-bottom:.5rem;">Extiende aquí el café</strong>
          <div class="bean-bed" id="beanBed">
            ${Array.from({ length: loaded }).map((_, i) => `<div class="mini-token"><span class="emoji">🫘</span><strong>Lote ${i + 1}</strong><small>Secándose</small></div>`).join('')}
          </div>
        </div>
      </div>

      <div class="humidity-card">
        <div class="section-title">Control de humedad</div>
        <p class="help-text">Primero coloca los 5 lotes sobre la cama de secado. Luego usa sol y brisa hasta llegar al rango ideal.</p>
        <div class="inventory-row" id="dryInventory">
          ${Array.from({ length: 5 - loaded }).map((_, i) => createTokenHTML(`Lote ${i + 1}`, '🫘', 'dry-token', 'Húmedo')).join('')}
        </div>
        <div class="counter-badge" style="margin-top:.8rem;">Humedad actual: <strong>${stepState.secado.humidity}%</strong></div>
        <div class="humidity-meter"><span id="humidityFill" style="width:${Math.min(stepState.secado.humidity, 100)}%"></span></div>
        <div class="humidity-target">Objetivo: dejar el café entre <strong>10% y 12%</strong> de humedad.</div>
        <div class="action-row">
          <button class="btn btn-primary" id="sunBtn" ${loaded < 5 || stepState.secado.completed ? 'disabled' : ''}>☀️ Dar sol (-8%)</button>
          <button class="btn btn-secondary" id="windBtn" ${loaded < 5 || stepState.secado.completed ? 'disabled' : ''}>💨 Dar brisa (-5%)</button>
          <button class="btn btn-outline" id="resetDryBtn" ${stepState.secado.completed ? 'disabled' : ''}>Reiniciar humedad</button>
        </div>
        ${stepState.secado.completed ? `<div class="output-slot"><strong>Resultado</strong><p class="small-note">Lograste un secado adecuado. El café ya puede pasar al tostado.</p></div>` : ''}
      </div>
    </div>
  `;

  els.stageContainer.querySelectorAll('.dry-token').forEach((item, idx) => attachDrag(item, { stage: 'secado', idx }));
  attachDrop(document.getElementById('dryDrop'), (payload) => {
    if (!payload || payload.stage !== 'secado' || stepState.secado.loaded >= 5) return;
    stepState.secado.loaded += 1;
    showFeedback(`Lote extendido sobre el secadero. Ya colocaste <strong>${stepState.secado.loaded}/5</strong>.`, 'success');
    renderSecadoStage();
  });

  document.getElementById('sunBtn').addEventListener('click', () => adjustHumidity(-8));
  document.getElementById('windBtn').addEventListener('click', () => adjustHumidity(-5));
  document.getElementById('resetDryBtn').addEventListener('click', () => {
    stepState.secado.humidity = 55;
    showFeedback('Reiniciaste el secado para volver a intentar llegar al rango ideal.', 'info');
    renderSecadoStage();
  });
}

function adjustHumidity(delta) {
  if (stepState.secado.loaded < 5 || stepState.secado.completed) return;
  stepState.secado.humidity += delta;
  if (stepState.secado.humidity <= 12 && stepState.secado.humidity >= 10) {
    stepState.secado.completed = true;
    markStepComplete(3, 'Excelente control. Lograste el rango ideal de humedad para conservar la calidad del café.', 'Sequé el café hasta un rango ideal de 10% a 12% de humedad para proteger su calidad.');
  } else if (stepState.secado.humidity < 10) {
    showFeedback('Te pasaste del rango ideal: el café quedó demasiado seco. Reinicia el secado y vuelve a intentarlo.', 'error');
  } else {
    showFeedback(`La humedad bajó a <strong>${stepState.secado.humidity}%</strong>. Sigue ajustando hasta quedar entre 10% y 12%.`, 'info');
  }
  renderSecadoStage();
}

/* STAGE 5 */
function renderTostadoStage() {
  els.stageContainer.innerHTML = `
    <div class="roast-layout">
      <div class="station-card">
        <div class="section-title">Carga del tostador</div>
        <p class="help-text">Arrastra el lote seco al tostador. Luego inicia el tueste y detén el proceso cuando la barra entre en la zona media.</p>
        <div class="inventory-row">
          ${stepState.tostado.loaded ? '' : createTokenHTML('Lote seco', '🫘', 'roast-load', 'Listo para tostar')}
        </div>
        <div class="counter-badge" style="margin-top:1rem;">Meta del ejercicio: <strong>Tostado medio</strong></div>
      </div>

      <div class="station-card machine-area">
        <div class="roaster" data-title="Tostador de café">
          <div class="machine-slot dropzone" id="roastDrop">${stepState.tostado.loaded ? 'Lote cargado ✅' : 'Suelta aquí el lote seco'}</div>
          <div class="roast-meter-wrap">
            <strong id="roastValueText">Nivel de tostado: ${stepState.tostado.value}%</strong>
            <div class="roast-meter"><span id="roastFill" style="width:${stepState.tostado.value}%"></span></div>
            <div class="roast-zones">
              <div class="zone"><strong>Claro</strong><span>0%–45%</span></div>
              <div class="zone good"><strong>Medio</strong><span>46%–63%</span></div>
              <div class="zone"><strong>Oscuro</strong><span>64%–100%</span></div>
            </div>
          </div>
          <div class="action-row">
            <button class="btn btn-primary" id="startRoast" ${!stepState.tostado.loaded || stepState.tostado.running || stepState.tostado.completed ? 'disabled' : ''}>Iniciar tostado</button>
            <button class="btn btn-danger" id="stopRoast" ${!stepState.tostado.running ? 'disabled' : ''}>Detener</button>
            <button class="btn btn-outline" id="resetRoast">Reiniciar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const roastLoad = document.querySelector('.roast-load');
  if (roastLoad) attachDrag(roastLoad, { stage: 'tostado-load' });

  attachDrop(document.getElementById('roastDrop'), (payload) => {
    if (!payload || payload.stage !== 'tostado-load') return;
    stepState.tostado.loaded = true;
    showFeedback('Perfecto. Cargaste el tostador. Ahora controla el tiempo para lograr un tostado medio.', 'success');
    renderTostadoStage();
  });

  document.getElementById('startRoast').addEventListener('click', startRoast);
  document.getElementById('stopRoast').addEventListener('click', () => stopRoast(false));
  document.getElementById('resetRoast').addEventListener('click', resetRoast);

  updateRoastVisuals();
}

function updateRoastVisuals() {
  const valueText = document.getElementById('roastValueText');
  const fill = document.getElementById('roastFill');
  const startBtn = document.getElementById('startRoast');
  const stopBtn = document.getElementById('stopRoast');

  if (valueText) valueText.textContent = `Nivel de tostado: ${stepState.tostado.value}%`;
  if (fill) fill.style.width = `${stepState.tostado.value}%`;
  if (startBtn) startBtn.disabled = !stepState.tostado.loaded || stepState.tostado.running || stepState.tostado.completed;
  if (stopBtn) stopBtn.disabled = !stepState.tostado.running;
}

function startRoast() {
  if (!stepState.tostado.loaded || stepState.tostado.running || stepState.tostado.completed) return;

  if (stepState.tostado.timer) {
    clearInterval(stepState.tostado.timer);
    stepState.tostado.timer = null;
  }

  stepState.tostado.running = true;
  showFeedback('El café se está tostando... detén el proceso en la zona media.', 'info');
  updateRoastVisuals();

  stepState.tostado.timer = setInterval(() => {
    stepState.tostado.value += 2;
    updateRoastVisuals();

    if (stepState.tostado.value >= 100) {
      stopRoast(true);
    }
  }, 120);
}

function stopRoast(forceBurn = false) {
  if (stepState.tostado.timer) {
    clearInterval(stepState.tostado.timer);
    stepState.tostado.timer = null;
  }

  stepState.tostado.running = false;
  updateRoastVisuals();

  if (forceBurn) {
    showFeedback('El tostado llegó demasiado lejos. Los granos quedaron muy oscuros. Reinicia e inténtalo de nuevo.', 'error');
    return;
  }

  if (stepState.tostado.value >= 46 && stepState.tostado.value <= 63) {
    stepState.tostado.completed = true;
    markStepComplete(
      4,
      '¡Gran trabajo! Detuviste el tostado en un punto medio, ideal para un perfil equilibrado.',
      'Controlé el tostado hasta un nivel medio para obtener equilibrio entre aroma, cuerpo y sabor.'
    );
    return;
  }

  showFeedback('Ese punto no corresponde al tostado medio. Reinicia y trata de detenerlo entre 46% y 63%.', 'error');
}

function resetRoast() {
  if (stepState.tostado.timer) {
    clearInterval(stepState.tostado.timer);
    stepState.tostado.timer = null;
  }

  stepState.tostado.value = 0;
  stepState.tostado.running = false;
  stepState.tostado.completed = false;
  showFeedback('Reiniciaste el tostado. Vuelve a intentarlo y busca la zona media.', 'info');
  renderTostadoStage();
}

/* STAGE 6 */
function renderMoliendaStage() {
  const matches = stepState.molienda.matches;
  els.stageContainer.innerHTML = `
    <div class="grind-layout">
      <div class="station-card">
        <div class="section-title">Tipos de molienda</div>
        <p class="help-text">Arrastra cada tipo de molienda hacia el método correcto.</p>
        <div class="token-bank">
          ${['Fina', 'Media', 'Gruesa'].map(size => `
            <div class="grind-token draggable-token" draggable="true" data-size="${size}">
              <span class="emoji">⚪</span>
              <strong>${size}</strong>
              <small>${size === 'Fina' ? 'Más compacta' : size === 'Media' ? 'Equilibrada' : 'Más abierta'}</small>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="station-card">
        <div class="section-title">Relaciona el método</div>
        <div class="method-grid">
          ${[
            { id: 'espresso', name: 'Espresso', clue: 'Extracción rápida a presión' },
            { id: 'filtrado', name: 'Filtrado', clue: 'El agua pasa de forma media por el café' },
            { id: 'prensa', name: 'Prensa francesa', clue: 'Infusión más larga' }
          ].map(method => `
            <div class="method-card">
              <h4>${method.name}</h4>
              <p class="small-note">${method.clue}</p>
              <div class="method-drop dropzone" data-method="${method.id}">
                ${matches[method.id] ? `<div class="method-chip"><span class="emoji">⚪</span><strong>${matches[method.id]}</strong></div>` : 'Suelta aquí la molienda'}
              </div>
              <div class="match-result">${matches[method.id] ? getMatchText(method.id, matches[method.id]) : 'Todavía sin respuesta.'}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  els.stageContainer.querySelectorAll('[data-size]').forEach(token => {
    attachDrag(token, { stage: 'molienda', size: token.dataset.size });
  });

  els.stageContainer.querySelectorAll('[data-method]').forEach(zone => {
    attachDrop(zone, payload => {
      if (!payload || payload.stage !== 'molienda') return;
      stepState.molienda.matches[zone.dataset.method] = payload.size;
      renderMoliendaStage();
      checkMoliendaCompletion();
    });
  });
}

function getMatchText(methodId, size) {
  if (grindAnswer[methodId] === size) {
    return '✅ Correcto: esta molienda favorece la extracción adecuada.';
  }
  return '❌ No es la mejor opción para ese método.';
}

function checkMoliendaCompletion() {
  const allFilled = Object.keys(grindAnswer).every(k => stepState.molienda.matches[k]);
  if (!allFilled) {
    showFeedback('Sigue relacionando la molienda con cada método.', 'info');
    return;
  }

  const allCorrect = Object.entries(grindAnswer).every(([method, size]) => stepState.molienda.matches[method] === size);

  if (allCorrect) {
    markStepComplete(
      5,
      'Excelente. Asociaste correctamente cada molienda con su método de preparación.',
      'Relacioné la molienda fina con espresso, media con filtrado y gruesa con prensa francesa.'
    );
    renderFinalScreen();
  } else {
    showFeedback('Algunas relaciones no son correctas. Observa las pistas y vuelve a arrastrar hasta acertar.', 'error');
  }
}

function renderFinalScreen() {
  els.stageContainer.innerHTML = `
    <div class="final-screen">
      <div class="final-card big">
        <div>
          <div class="medal">🏆</div>
          <h2>¡Misión completada!</h2>
          <p class="help-text" style="max-width:540px; margin:1rem auto 0;">
            Completaste todas las etapas del proceso del café.
            Ya conoces cómo se recolecta, procesa y transforma el café hasta llegar a la taza.
          </p>
        </div>
      </div>

      <div class="final-card">
        <div class="section-title">Resumen de aprendizaje</div>
        <div class="summary-list">
          <div class="entry">
            <strong>Proceso dominado</strong>
            <p>Cosecha, despulpado, lavado, secado, tostado y molienda.</p>
          </div>
          <div class="entry">
            <strong>Idea clave</strong>
            <p>Cada decisión durante el proceso cambia el resultado final del café.</p>
          </div>
          <div class="entry">
            <strong>Próximo paso</strong>
            <p>Puedes reiniciar la página para volver a jugar.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}