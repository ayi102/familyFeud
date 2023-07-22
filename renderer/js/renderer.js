const startBtn        = document.getElementById("startBtn");
const round1Img       = document.getElementById("round1Img");
const familyFeudAudio = document.getElementById("familyFeudAudio");

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
        round1Img.addEventListener('animationend', animationEndCallback);
        familyFeudAudio.play();
        startBtn.style.display              = 'none';
        document.body.style.backgroundImage = 'none';
        round1Img.style.display             = 'inline';
    }
}

animationEndCallback = (e) => 
{
    round1Img.removeEventListener('animationend', animationEndCallback);
    familyFeudAudio.pause();
    round1Img.style.display = 'none';
}