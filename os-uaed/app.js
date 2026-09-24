function displayLabel(label) {
  return label.replaceAll("_and_", " / ").replaceAll("_", " ");
}

function renderLabels(rootId, labels) {
  document.querySelector(rootId).innerHTML = labels
    .map((label) => `<div class="label-item">${displayLabel(label)}</div>`)
    .join("");
}

function renderAudioSlots() {
  document.querySelector("#audioExamples").innerHTML = AUDIO_SLOTS
    .map((slot) => `
      <article class="audio-card">
        <h3>${slot.label}</h3>
        <audio controls preload="metadata" src="./assets/audio/${slot.file}">
          Your browser does not support the audio element.
        </audio>
      </article>
    `)
    .join("");
}

renderLabels("#baseClasses", BASE_CLASSES);
renderLabels("#novelClasses", NOVEL_CLASSES);
renderAudioSlots();
