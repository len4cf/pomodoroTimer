const startBtn = document.querySelector(".startBtn");
const resetBtn = document.querySelector(".resetBtn");
const timerDisplay = document.querySelector(".timer");

const pomodoroBotao = document.querySelector(".pomodoroBtn");
const curtoBotao = document.querySelector(".curtoBtn");
const longoBotao = document.querySelector(".longoBtn");

let isPaused = false;
let timerInterval;
let timeLeft = 1500;

document.addEventListener("click", function (ev) {
  const isPomodoro = ev.target.classList.contains("pomodoroBtn");
  const isCurto = ev.target.classList.contains("curtoBtn");
  const isLongo = ev.target.classList.contains("longoBtn");

  if (isPomodoro || isCurto || isLongo) {
    if (isPomodoro || isCurto || isLongo) {
      const allButtons = document.querySelectorAll(
        ".pomodoroBtn, .curtoBtn, .longoBtn"
      );
      allButtons.forEach((button) => button.removeAttribute("disabled"));

      if (isPomodoro) {
        pomodoroBotao.setAttribute("disabled", "disabled");
        timeLeft = 1500;
        timerDisplay.innerHTML = "25:00";
      } else if (isCurto) {
        curtoBotao.setAttribute("disabled", "disabled");
        timeLeft = 300;
        timerDisplay.innerHTML = "05:00";
      } else if (isLongo) {
        longoBotao.setAttribute("disabled", "disabled");
        timeLeft = 3600;
        timerDisplay.innerHTML = "60:00";
      }
    }
  }
});

startBtn.addEventListener("click", function () {
  isPaused = !isPaused;
  startBtn.classList.toggle("pauseBtn", isPaused);
  startBtn.classList.toggle("startBtn", !isPaused);
  startBtn.innerHTML = isPaused ? "PAUSE" : "START";

  if (!isPaused) {
    clearInterval(timerInterval);
  } else {
    timerInterval = setInterval(updateTimer, 1000);
  }
});

resetBtn.addEventListener("click", function () {
  clearInterval(timerInterval);
  if (isPomodoro) {
    timeLeft = 1500;
  } else if (isCurto) {
    timeLeft = 300;
  } else if (isLongo) {
    timeLeft = 3600;
  }
  timerDisplay.textContent = formatNumberInStringMinute(timeLeft);
  startBtn.innerHTML = "START";
  startBtn.classList.remove("pauseBtn");
  startBtn.classList.add("startBtn");
});

function updateTimer() {
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    timerDisplay.textContent = "00:00";
    return;
  }
  timeLeft--;
  timerDisplay.textContent = formatNumberInStringMinute(timeLeft);
}

function formatNumberInStringMinute(number) {
  const minutes = Math.floor(number / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (number % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
