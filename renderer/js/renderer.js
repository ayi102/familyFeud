const startBtn = document.getElementById("startBtn");

// Event Listeners

// When user presses start button, start the first round
startBtn.addEventListener("click", startRound, 1);

// Display start round
 function startRound(round)
{
    startBtn.style.display = 'none';
}