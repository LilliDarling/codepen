const focus = document.getElementById("focus");
const breathe = document.getElementById("breathe");
const catNap = document.getElementById("cat-nap");
const timeDisp = document.getElementById("time-disp");
const start = document.getElementById("start-pause");
const resetBtn = document.getElementById("reset");
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const focusTimeInput = document.getElementById("focus-time-input");
const breatheTimeInput = document.getElementById("breathe-time-input");
const catNapTimeInput = document.getElementById("cat-nap-time-input");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
const customAlertBox = document.getElementById("custom-alert-box");
const customAlertMessage = document.getElementById("custom-alert-message");
const customAlertBtn = document.getElementById("custom-alert-btn");

let interval;
let timeLeft;
let isRunning = false;
let currentMode = "focus";

let TIMES = {
  focus: 25 * 60,
  breathe: 5 * 60,
  catNap: 15 * 60
};

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(
    2,
    "0"
  )}`;
}

function customAlert(message) {
  customAlertMessage.textContent = message;
  customAlertBox.classList.add("show");
}

function hideCustomAlert() {
  customAlertBox.classList.remove("show");
}

function updateTimer() {
  if (timeLeft <= 0) {
    clearInterval(interval);
    isRunning = false;
    start.textContent = "Start";
    customAlert(`Time for ${currentMode === "focus" ? "breathe" : "focus"}!`);
    return;
  }
  timeLeft--;
  timeDisp.textContent = formatTime(timeLeft);
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(interval);
    start.textContent = "Start";
  } else {
    interval = setInterval(updateTimer, 1000);
    start.textContent = "Pause";
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  start.textContent = "Start";
  timeLeft = TIMES[currentMode];
  timeDisp.textContent = formatTime(timeLeft);
}

function switchMode(mode) {
  currentMode = mode;
  resetTimer();
  focus.classList.remove("active");
  breathe.classList.remove("active");
  catNap.classList.remove("active");

  if (mode === "focus") {
    focus.classList.add("active");
  } else if (mode === "breathe") {
    breathe.classList.add("active");
  } else {
    catNap.classList.add("active");
  }
}

function openSettingsModal() {
  focusTimeInput.value = TIMES.focus / 60;
  breatheTimeInput.value = TIMES.breathe / 60;
  catNapTimeInput.value = TIMES.catNap / 60;
  settingsModal.classList.add("show");
}

function closeSettingsModal() {
  settingsModal.classList.remove("show");
}

function saveSettings() {
  const newFocusTime = parseInt(focusTimeInput.value);
  const newBreatheTime = parseInt(breatheTimeInput.value);
  const newCatNapTime = parseInt(catNapTimeInput.value);

  if (
    isNaN(newFocusTime) ||
    newFocusTime <= 0 ||
    isNaN(newBreatheTime) ||
    newBreatheTime <= 0 ||
    isNaN(newCatNapTime) ||
    newCatNapTime <= 0
  ) {
    customAlert("Please enter valid positive numbers for all times.");
    return;
  }

  TIMES.focus = newFocusTime * 60;
  TIMES.breathe = newBreatheTime * 60;
  TIMES.catNap = newCatNapTime * 60;

  closeSettingsModal();
  resetTimer();
  customAlert("Changes Saved!");
}

start.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
focus.addEventListener("click", () => switchMode("focus"));
breathe.addEventListener("click", () => switchMode("breathe"));
catNap.addEventListener("click", () => switchMode("catNap"));

settingsBtn.addEventListener("click", openSettingsModal);
saveBtn.addEventListener("click", saveSettings);
cancelBtn.addEventListener("click", closeSettingsModal);

customAlertBtn.addEventListener("click", hideCustomAlert);

document.addEventListener("DOMContentLoaded", () => {
  timeLeft = TIMES[currentMode];
  timeDisp.textContent = formatTime(timeLeft);
  switchMode(currentMode);
});
