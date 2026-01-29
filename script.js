function startGame() {
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        console.log("Motion permission:", response);
      })
      .catch(console.error);
  }

  // rest of your existing startGame code below
}
const words = [
  "muddled",
  "nexus",
  "sequestration",
  "rain check"
];

let index = 0;
let timeLeft = 60;
let timerInterval = null;
let gameStarted = false;

const wordDiv = document.getElementById("word");
const timerDiv = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

function nextWord() {
  index++;
  if (index >= words.length) index = 0;
  wordDiv.textContent = words[index];
}

function startGame() {
  gameStarted = true;
  index = -1;
  timeLeft = 60;
  timerDiv.textContent = timeLeft;
  nextWord();
  startBtn.style.display = "none";

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      wordDiv.textContent = "Time!";
      gameStarted = false;
      startBtn.style.display = "block";
    }
  }, 1000);
}

startBtn.addEventListener("click", startGame);

// Motion detection
window.addEventListener("deviceorientation", (event) => {
  if (!gameStarted) return;

  const beta = event.beta; // front-back tilt

  if (beta > 45) {
    // Correct
    nextWord();
  } else if (beta < -45) {
    // Pass
    nextWord();
  }
});
