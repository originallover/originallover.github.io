function displayLabel(label) {
  return label.replaceAll("_and_", " / ").replaceAll("_", " ");
}

function renderLabels(rootId, labels) {
  document.querySelector(rootId).innerHTML = labels
    .map((label) => `<div class="label-item">${displayLabel(label)}</div>`)
    .join("");
}

function renderAudioSlots() {
  document.querySelector("#audioExamples").innerHTML = AUDIO_SLOTS.map((slot) => {
    const player = slot.enabled
      ? `<audio controls preload="metadata" src="./assets/audio/${slot.file}"></audio>`
      : `<div class="audio-placeholder"><span>♪</span><code>${slot.file}</code></div>`;
    return `<article class="audio-card"><h3>${slot.label}</h3>${player}</article>`;
  }).join("");
}

renderLabels("#baseClasses", BASE_CLASSES);
renderLabels("#novelClasses", NOVEL_CLASSES);
renderAudioSlots();
