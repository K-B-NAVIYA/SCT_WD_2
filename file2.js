let timer;
let elapsedTime = 0;
let running = false;
let startTime = 0;
let lapStartTime = 0;
let laps = [];

const timeDisplay = document.getElementById("timeDisplay");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const lapsContainer = document.getElementById("laps");

startButton.addEventListener("click", () => {
    if (!running) {
        running = true;
        startButton.textContent = "Lap";
        pauseButton.disabled = false;
        resetButton.disabled = false;
        startTime = Date.now() - elapsedTime;
        lapStartTime = startTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateTimeDisplay();
        }, 10);
    } else {
        recordLap();  
    }
});

pauseButton.addEventListener("click", () => {
    running = false;
    startButton.textContent = "Start";
    clearInterval(timer);
    timer = null;
});

resetButton.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    elapsedTime = 0;
    running = false;
    laps = [];
    startButton.textContent = "Start";
    pauseButton.disabled = true;
    resetButton.disabled = true;
    updateTimeDisplay();
    renderLaps();
});

function updateTimeDisplay() {
    const totalMilliseconds = elapsedTime % 1000;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);

    const milliseconds = totalMilliseconds.toString().padStart(3, "0").slice(0, 2);
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const minutes = totalMinutes.toString().padStart(2, "0");

    timeDisplay.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    let lapTime = elapsedTime - lapStartTime;
    laps.push(lapTime); 
    lapStartTime = elapsedTime; 
    renderLaps(); 
}

function renderLaps() {
    lapsContainer.innerHTML = laps
        .map((lap, index) => {
            const totalMilliseconds = lap % 1000;
            const totalSeconds = Math.floor(lap / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);

            const milliseconds = totalMilliseconds.toString().padStart(3, "0").slice(0, 2);
            const seconds = (totalSeconds % 60).toString().padStart(2, "0");
            const minutes = totalMinutes.toString().padStart(2, "0");

            return `<li>Lap ${index + 1}: ${minutes}:${seconds}.${milliseconds}</li>`;
        })
        .join("");
}