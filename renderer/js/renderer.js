const startBtn        = document.getElementById("startBtn");
const round1Img       = document.getElementById("round1Img");
const redXImg         = document.getElementById("xImg");
const familyFeudAudio = document.getElementById("familyFeudAudio");
const fFXAudio        = document.getElementById("familyFeudXAudio");
const fFYAudio        = document.getElementById("familyFeudYAudio");
const gameBoard       = document.getElementById("gameBoard");
const guesses         = document.getElementById("guesses");
const guess           = document.getElementById("myGuess");
const questions       = document.getElementById("questions");
const question        = document.getElementById("myGuestion");
const gameBoardAnswers= [document.getElementById("answer1"),
                         document.getElementById("answer2"),
                         document.getElementById("answer3"),
                         document.getElementById("answer4"),
                         document.getElementById("answer5"),
                         document.getElementById("answer6")];

let familyFeudGamePlay;

// Setup
window.addEventListener("DOMContentLoaded", async (event) => {
    json = await getJson();
    familyFeudGamePlay = new familyFeud(json);
});

// Event Listeners

// When user presses start button, start the first round
startBtn.addEventListener("click", () => {introduceRound(1)});
guesses.addEventListener("keypress", (e) => {parseInput(e)});


// Functions

// Display start round
function introduceRound(round)
{
    // Update the round data
    familyFeudGamePlay.currRound = round;
    if(round === 1)
    {
        // Add a listener to detect that the animation ended
        //familyFeudAudio.play();
        startBtn.style.display              = 'none';
        document.body.style.backgroundImage = 'none';
        round1Img.style.display             = 'inline';
        //familyFeudAudio.addEventListener('ended', () => {displayRound(1)});
        displayRound(1); // TODO FIX THIS WHEN DONE DEVELOPING
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
        question.value                      = familyFeudGamePlay.getCurrRoundQuestion();
        questions.style.display             = 'block';
    }
}

// Parse the entered key
function parseInput(e)
{
    if(e.key === 'Enter')
    {
        let index = familyFeudGamePlay.checkRoundAnswer(guess.value);

        // Check if the guess is correct
        if( index !== -1)
        {
            gameBoardAnswers[index].textContent = guess.value;
            fFYAudio.play();
        }
        else
        {
            fFXAudio.play();
            redXImg.style.display = 'block';
            fFXAudio.addEventListener('ended', () => {redXImg.style.display = 'none';});
        }

        // Clear the guess
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
