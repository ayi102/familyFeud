const startBtn        = document.getElementById("startBtn");
const round1Img       = document.getElementById("round1Img");
const round2Img       = document.getElementById("round2Img");
const round3Img       = document.getElementById("round3Img");
const round4Img       = document.getElementById("bonusRoundImg");
const redXImg         = document.getElementById("xImg");
const winnerImg       = document.getElementById("winnerImg");
const familyFeudAudio = document.getElementById("buzzAlt");
const fFXAudio        = document.getElementById("familyFeudXAudio");
const fFYAudio        = document.getElementById("familyFeudYAudio");
const winnerAudio     = document.getElementById("winnerAudio");
const gameBoard       = document.getElementById("gameBoard");
const bonusBoard      = document.getElementById("bonusBoard");
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
const family1ScoreDiv = document.getElementById("family1ScoreDiv");
const family2ScoreDiv = document.getElementById("family2ScoreDiv");
const family1Score    = document.getElementById("family1Score");
const family2Score    = document.getElementById("family2Score");
const bonusQs         = [document.getElementById("bonusQ1"),
                        document.getElementById("bonusQ2"),
                        document.getElementById("bonusQ3"),
                        document.getElementById("bonusQ4"),
                        document.getElementById("bonusQ5"),
                        document.getElementById("bonusQ6"),
                        document.getElementById("bonusQ7"),
                        document.getElementById("bonusQ8"),
                        document.getElementById("bonusQ9"),
                        document.getElementById("bonusQ10")];
const bonusSs         = [document.getElementById("bonusS1"),
                         document.getElementById("bonusS2"),
                         document.getElementById("bonusS3"),
                         document.getElementById("bonusS4"),
                         document.getElementById("bonusS5"),
                         document.getElementById("bonusS6"),
                         document.getElementById("bonusS7"),
                         document.getElementById("bonusS8"),
                         document.getElementById("bonusS9"),
                         document.getElementById("bonusS10")];

let familyFeudGamePlay;
let bonusFinalScore = 0;

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
familyFeudAudio.addEventListener('ended', displayRound);

for(let i = 0; i < bonusQs.length; i++)
{
    bonusQs[i].addEventListener("keypress", (e) => {displayBonusScore(e, i)});
}


// Functions

// Display start round
function introduceRound()
{
    // Add a listener to detect that the animation ended
    winnerAudio.pause();
    familyFeudAudio.play();
    family1Btn.style.display            = 'none';
    family2Btn.style.display            = 'none';
    startBtn.style.display              = 'none';
    gameBoard.style.display             = 'none';
    questions.style.display             = 'none';
    document.body.style.backgroundImage = 'none';
    winnerImg.style.display             = 'none';
    family1ScoreDiv.style.display       = 'none';
    family2ScoreDiv.style.display       = 'none';

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
    else if(familyFeudGamePlay.currRound === 4)
    {
        round4Img.style.display = 'inline';
    }

    if(parseInt(familyFeudGamePlay.currRound) >= 4)
    {
        familyFeudAudio.removeEventListener('ended', displayRound);
        familyFeudAudio.addEventListener('ended', displayFinalRound);
    }
}

function submitPoints(familyId){
    familyFeudGamePlay.currRound++;
    familyFeudGamePlay.awardPoints(familyId);

    family1Score.value = String(familyFeudGamePlay.fam1Subtotal);
    family2Score.value = String(familyFeudGamePlay.fam2Subtotal);

    if(parseInt(familyFeudGamePlay.currRound) < 4)
    {
        introduceRound();
    }
    else
    {
        gameBoard.style.display  = 'none';
        family1Btn.style.display = 'none';
        family2Btn.style.display = 'none';
        family1ScoreDiv.style.display = 'block';
        family2ScoreDiv.style.display = 'block';
        if(parseInt(family1Score.value) > parseInt(family2Score.value))
        {
            question.value = "Congratulations! Family 1 !";
        }
        else
        {
            question.value = "Congratulations! Family 2 !";
        }
        winnerAudio.play();
        winnerImg.style.display = 'block';
        startBtn.style.display  = 'block';
        startBtn.textContent    = "Start Bonus Round";
    }
    
}

function displayFinalRound(){
    familyFeudAudio.pause();
    round1Img.style.display             = 'none';
    round2Img.style.display             = 'none';
    round3Img.style.display             = 'none';
    round4Img.style.display             = 'none';
    document.body.style.backgroundImage = "url(images/RoundBg.png)";
    questions.style.display             = 'block';
    question.value                      = "Final Round Total = 0";
    bonusBoard.style.display            = 'grid';
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
    family1ScoreDiv.style.display       = 'block';
    family2ScoreDiv.style.display       = 'block';
}

function displayBonusScore(e, i)
{
    if(e.key === "Enter")
    {
        let newIndex = i;
        if(newIndex >= 5)
        {
            newIndex = newIndex - 5; 
        }
        let pts = familyFeudGamePlay.checkBonusRoundAnswer(newIndex, bonusQs[i].value);
        if(pts > 0)
        {
            fFYAudio.play();
        }
        else
        {
            fFXAudio.play();
        }
        bonusSs[i].value = String(pts);
        bonusFinalScore += pts;
        question.value = "Final Round Total = ".concat(String(bonusFinalScore));
    }

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
            guesses.style.display         = 'none';
            question.value                = "Which family won?"
            family1ScoreDiv.style.display = 'none';
            family2ScoreDiv.style.display = 'none';
            family1Btn.style.display      = 'block';
            family2Btn.style.display      = 'block';
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
