const startBtn        = document.getElementById("startBtn");
const round1Img       = document.getElementById("round1Img");
const familyFeudAudio = document.getElementById("familyFeudAudio");
const gameBoard       = document.getElementById("gameBoard");
const guesses         = document.getElementById("guesses");
const guess           = document.getElementById("myGuess");
const questions       = document.getElementById("questions");

// Event Listeners

// When user presses start button, start the first round
startBtn.addEventListener("click", () => {introduceRound(1)});
guesses.addEventListener("keypress", (e) => {parseInput(e)});


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
        familyFeudAudio.addEventListener('ended', () => {displayRound(1)});
    }
}

// Display the round play
function displayRound(round)
{
    if(round === 1)
    {
        familyFeudAudio.pause();
        round1Img.style.display             = 'none';
        document.body.style.backgroundImage = "url(images/RoundBg.png)";
        gameBoard.style.display             = 'grid';
        guesses.style.display               = 'block';
        questions.style.display             = 'block';
    }
}

// Parse the entered key
function parseInput(e)
{
    if(e.key === 'Enter')
    {
        // Determine if the guess
        guess.value = "";
    }
}

// Wrapper for requesting JSON
async function getJson() {
    const json = await requestJson('./metadata/qAndA.json');
    return json
}

// request json data
async function requestJson(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}