let timerId;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const timerDisplay = document.getElementById('display');
const lapTimes = document.getElementById('lap-times');

function formatTime(timeInMillis) {
  const totalSeconds = Math.floor(timeInMillis / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = timeInMillis % 1000;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).slice(0, 2)}`;
}

function updateTimer() {
  if (isRunning) {
    const now = Date.now();
    elapsedTime = now - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
    requestAnimationFrame(updateTimer);
  }
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    requestAnimationFrame(updateTimer);
  }
}

function pauseTimer() {
  if (isRunning) {
    isRunning = false;
  }
}

function resetTimer() {
  isRunning = false;
  elapsedTime = 0;
  timerDisplay.textContent = "00:00:00:00";
  lapTimes.innerHTML = '';
}

function addLap() {
  const lapTime = document.createElement('li');
  lapTime.textContent = formatTime(elapsedTime);
  lapTimes.appendChild(lapTime);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
