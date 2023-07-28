const startBtn        = document.getElementById("startBtn");
const round1Img       = document.getElementById("round1Img");
const round2Img       = document.getElementById("round2Img");
const round3Img       = document.getElementById("round3Img");
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
const family1Btn      = document.getElementById("family1Btn");
const family2Btn      = document.getElementById("family2Btn");

let familyFeudGamePlay;

// Setup
window.addEventListener("DOMContentLoaded", async (event) => {
    json = await getJson();
    familyFeudGamePlay = new familyFeud(json);
});

// Event Listeners

// When user presses start button, start the first round
startBtn.addEventListener("click", () => {introduceRound()});
family1Btn.addEventListener("click", () => {submitPoints(1)});
family2Btn.addEventListener("click", () => {submitPoints(2)});
guesses.addEventListener("keypress", (e) => {parseInput(e)});


// Functions

// Display start round
function introduceRound()
{
    // Add a listener to detect that the animation ended
    familyFeudAudio.play();
    family1Btn.style.display            = 'none';
    family2Btn.style.display            = 'none';
    startBtn.style.display              = 'none';
    gameBoard.style.display             = 'none';
    questions.style.display             = 'none';
    document.body.style.backgroundImage = 'none';

    if(familyFeudGamePlay.currRound === 1)
    {
        round1Img.style.display = 'inline';
    }
    else if(familyFeudGamePlay.currRound === 2)
    {
        round2Img.style.display = 'inline';
    }
    else if(familyFeudGamePlay.currRound === 3)
    {
        round3Img.style.display = 'inline';
    }
    familyFeudAudio.addEventListener('ended', () => {displayRound()});
    //displayRound(); // TODO FIX THIS WHEN DONE DEVELOPING
}

function submitPoints(familyId){
    familyFeudGamePlay.currRound++;
    familyFeudGamePlay.awardPoints(familyId);

    if(familyFeudGamePlay.currRound < 4)
    {
        introduceRound();
    }
    else
    {
        introduceFinalRound();
    }
    
}

function introduceFinalRound(){
    console.log("Final Round!");
}

// Display the round play
function displayRound()
{
    for(let i = 0; i < gameBoardAnswers.length; i++)
    {
        gameBoardAnswers[i].textContent = String(i+1);
    }
    familyFeudAudio.pause();
    round1Img.style.display             = 'none';
    round2Img.style.display             = 'none';
    round3Img.style.display             = 'none';
    document.body.style.backgroundImage = "url(images/RoundBg.png)";
    gameBoard.style.display             = 'grid';
    guesses.style.display               = 'block';
    question.value                      = familyFeudGamePlay.getCurrRoundQuestion();
    questions.style.display             = 'block';
}

// Parse the entered key
function parseInput(e)
{
    if(e.key === 'Enter')
    {
        let ptsAndIndex = familyFeudGamePlay.checkRoundAnswer(guess.value);

        // Check if the guess is correct
        if( ptsAndIndex[1] !== -1)
        {
            gameBoardAnswers[ptsAndIndex[1]].textContent = String(guess.value).concat("(",ptsAndIndex[0], ")");
            fFYAudio.play();
        }
        else
        {
            fFXAudio.play();
            redXImg.style.display = 'block';
            fFXAudio.addEventListener('ended', () => {redXImg.style.display = 'none';});
        }
        if(familyFeudGamePlay.isNoMoreGuesses() == true)
        {
            // Display the new screen
            guesses.style.display    = 'none';
            question.value           = "Which family won?"
            family1Btn.style.display = 'block';
            family2Btn.style.display = 'block';
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
