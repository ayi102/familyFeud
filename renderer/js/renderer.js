const startBtn        = document.getElementById("startBtn");
const round1Img       = document.getElementById("round1Img");
const familyFeudAudio = document.getElementById("familyFeudAudio");
const gameBoard       = document.getElementById("gameBoard");

// Event Listeners

// When user presses start button, start the first round
startBtn.addEventListener("click", () => {introduceRound(1)});


// Functions

// Display start round
function introduceRound(round)
{
    if(round === 1)
    {
        // Add a listener to detect that the animation ended
        familyFeudAudio.play();
        startBtn.style.display              = 'none';
        document.body.style.backgroundImage = 'none';
        round1Img.style.display             = 'inline';
        familyFeudAudio.addEventListener('ended', () => {playRound(1)});
    }
}

// Display the round play
function playRound(round)
{
    if(round === 1)
    {
        familyFeudAudio.pause();
        round1Img.style.display             = 'none';
        document.body.style.backgroundImage = "url(images/RoundBg.png)";
        gameBoard.style.display             = 'inline';
    }
}