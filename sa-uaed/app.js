const scenarios = {
  meeting: {
    label: "2 speakers · overlapping speech",
    tracks: [
      ["Speaker 1", "#4dd8ff", [[0.4, 3.3], [6.3, 2.7]]],
      ["Speaker 2", "#b19cff", [[2.6, 3.2], [9.5, 1.8]]],
      ["S1 · Laugh", "#b9ff66", [[1.8, 0.9], [7.7, 0.8]]],
      ["S2 · Cough", "#ff9a62", [[5.1, 0.6]]],
      ["Alarm", "#ffcf5a", [[8.6, 2.4]]]
    ]
  },
  clinic: {
    label: "3 speakers · clinical conversation",
    tracks: [
      ["Speaker 1", "#4dd8ff", [[0.2, 2.8], [7.9, 2.1]]],
      ["Speaker 2", "#b19cff", [[3.2, 3.8], [9.1, 2.4]]],
      ["Speaker 3", "#8de1bf", [[1.8, 1.4]]],
      ["S2 · Cough", "#ff9a62", [[4.2, 0.7], [10.4, 0.5]]],
      ["S1 · Laugh", "#b9ff66", [[8.8, 0.9]]]
    ]
  },
  kitchen: {
    label: "2 speakers · domestic soundscape",
    tracks: [
      ["Speaker 1", "#4dd8ff", [[0.6, 2.9], [8.2, 2.5]]],
      ["Speaker 2", "#b19cff", [[3.3, 3.1]]],
      ["S2 · Laugh", "#b9ff66", [[5.4, 1.1]]],
      ["S1 · Cough", "#ff9a62", [[9.4, 0.6]]],
      ["Water", "#54d6b6", [[1.8, 4.6]]]
    ]
  }
};

const duration = 12;
let scenarioKey = "meeting";
let current = 0;
let playing = false;
let lastFrame = 0;
let frameHandle = null;

const tracks = document.querySelector("#tracks");
const playButton = document.querySelector("#playButton");
const resetButton = document.querySelector("#resetButton");
const playhead = document.querySelector("#playhead");
const timeLabel = document.querySelector("#currentTime");
const sceneLabel = document.querySelector("#sceneLabel");
const activeSummary = document.querySelector("#activeSummary");
const activeDetail = document.querySelector("#activeDetail");
const waveBars = document.querySelector(".wave-bars");

const resultData = {
  libri: {
    context: "Held-out simulated benchmark",
    gain: "+19.1",
    narrative: "Dedicated event subspaces nearly double speaker-attributed cough performance while DER remains unchanged.",
    der: "8.09 → 8.07",
    values: { cough: [28.2, 47.3], laugh: [37.1, 47.6], sed: [98.4, 97.9] }
  },
  ears: {
    context: "Zero-shot · genuine human voices",
    gain: "+15.0",
    narrative: "The largest real-voice gain appears in laughter, showing that the learned subspaces transfer beyond TTS-generated events.",
    der: "8.45 → 8.43",
    values: { cough: [37.5, 47.0], laugh: [25.9, 40.9], sed: [96.5, 96.2] }
  }
};

function renderWaveform() {
  const bars = Array.from({ length: 150 }, (_, index) => {
    const value = 8 + Math.abs(Math.sin(index * .61) * 34 + Math.cos(index * .19) * 17);
    return `<i style="--h:${Math.min(58, value).toFixed(0)}px"></i>`;
  });
  waveBars.innerHTML = bars.join("");
}

function renderTracks() {
  const scenario = scenarios[scenarioKey];
  sceneLabel.textContent = scenario.label;
  tracks.innerHTML = scenario.tracks.map(([label, color, events]) => `
    <div class="track" style="--track-color:${color}">
      <div class="track-label"><span></span>${label}</div>
      <div class="track-lane">
        ${events.map(([start, eventDuration]) => `<i class="event" data-label="${label}" data-start="${start}" data-end="${start + eventDuration}" style="--start:${start};--duration:${eventDuration}"></i>`).join("")}
      </div>
    </div>
  `).join("");
  updateUI();
}

function formatTime(value) {
  return `00:${value.toFixed(1).padStart(4, "0")}`;
}

function updateUI() {
  const laneStart = window.innerWidth <= 800 ? 104 : 166;
  const waveformWidth = document.querySelector("#waveform").clientWidth;
  const available = Math.max(0, waveformWidth - laneStart - 24);
  playhead.style.left = `${laneStart + (current / duration) * available}px`;
  timeLabel.textContent = formatTime(current);

  const active = [];
  document.querySelectorAll(".event").forEach((event) => {
    const isActive = current >= Number(event.dataset.start) && current <= Number(event.dataset.end);
    event.classList.toggle("active", isActive);
    if (isActive) active.push(event.dataset.label);
  });
  activeSummary.textContent = active.length ? `${active.length} active` : "No event";
  activeDetail.textContent = active.length ? active.join(" · ") : "The model reports no active class at this frame.";
}

function renderResults(key) {
  const data = resultData[key];
  document.querySelector("#resultContext").textContent = data.context;
  document.querySelector("#headlineGain").textContent = data.gain;
  document.querySelector("#resultNarrative").textContent = data.narrative;
  document.querySelector("#derValue").textContent = data.der;
  Object.entries(data.values).forEach(([metric, values]) => {
    const row = document.querySelector(`[data-metric="${metric}"]`);
    row.querySelector(".baseline-bar").style.setProperty("--value", `${values[0]}%`);
    row.querySelector(".ours-bar").style.setProperty("--value", `${values[1]}%`);
    document.querySelector(`#${metric}BaselineLabel`).textContent = values[0].toFixed(1);
    document.querySelector(`#${metric}OursLabel`).textContent = values[1].toFixed(1);
  });
}

function tick(timestamp) {
  if (!playing) return;
  if (!lastFrame) lastFrame = timestamp;
  current += (timestamp - lastFrame) / 1000;
  lastFrame = timestamp;
  if (current >= duration) {
    current = duration;
    setPlaying(false);
  }
  updateUI();
  if (playing) frameHandle = requestAnimationFrame(tick);
}

function setPlaying(next) {
  playing = next;
  playButton.classList.toggle("playing", playing);
  playButton.setAttribute("aria-label", playing ? "Pause demo trace" : "Play demo trace");
  playButton.innerHTML = playing
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  lastFrame = 0;
  if (playing) {
    if (current >= duration) current = 0;
    frameHandle = requestAnimationFrame(tick);
  } else if (frameHandle) {
    cancelAnimationFrame(frameHandle);
  }
}

playButton.addEventListener("click", () => setPlaying(!playing));
resetButton.addEventListener("click", () => { setPlaying(false); current = 0; updateUI(); });
document.querySelectorAll(".scenario-button").forEach((button) => {
  button.addEventListener("click", () => {
    scenarioKey = button.dataset.scenario;
    document.querySelectorAll(".scenario-button").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    setPlaying(false);
    current = 0;
    renderTracks();
  });
});
document.querySelectorAll(".result-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".result-button").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderResults(button.dataset.result);
  });
});
document.querySelector("#waveform").addEventListener("click", (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const laneStart = window.innerWidth <= 800 ? 104 : 166;
  const x = Math.min(Math.max(event.clientX - rect.left - laneStart, 0), rect.width - laneStart - 24);
  current = (x / Math.max(1, rect.width - laneStart - 24)) * duration;
  updateUI();
});
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !["INPUT", "BUTTON", "A"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    setPlaying(!playing);
  }
});
window.addEventListener("resize", updateUI);

renderWaveform();
renderTracks();
renderResults("libri");
