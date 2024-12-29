// script.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

document.getElementById("start").addEventListener("click", () => {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
  if (timerInterval) {
    const lapTime = document.createElement("li");
    lapTime.textContent = formatTime(elapsedTime);
    lapsList.appendChild(lapTime);
  }
});
