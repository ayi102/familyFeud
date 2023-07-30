class Round{
    constructor(id, question, answers, points)
    {
        this.id       = id;
        this.question = question;
        this.answers  = answers;
        this.points   = points;
    }

    set id(id){
        this._id = id;
    }

    get id()
    {
        return this._id;
    }

    set question(question){
        this._question = question;
    }

    get question()
    {
        return this._question;
    }

    set answers(answers){
        this._answers = answers;
    }

    get answers()
    {
        return this._answers;
    }

    set points(points){
        this._points = points;
    }

    get points()
    {
        return this._points;
    }

    checkAnswer(answer)
    {
        let index  = -1;
        let points = 0;

        // Check if the answer is in the list
        index = this._answers.indexOf(answer);
        if( index !== -1)
        {
            points = this._points[index];
        }

        return [points, index];
    }
}

// Declaration
class familyFeud{
    constructor(feudData) {
        this.feudData          = feudData;
        this.currRound         = 1;
        this.rounds            = [];
        this.finalRound        = [];
        this.subtotal          = 0;
        this.fam1Subtotal      = 0;
        this.fam2Subtotal      = 0;
        this.currFamily        = 1;
        this.missedGuesses     = 0;
        this.rightGuesses      = 0;
        this.roundStartSkips   = 0;
        this.isRoundStarted    = false;
        this.isNum1Answer      = false;

        this.#getRoundsData();
    }

    set currRound(currRound){
        this._currRound = currRound;
    }

    get currRound(){
        return this._currRound;
    }

    set fam1Subtotal(fam1Subtotal){
        this._fam1Subtotal = fam1Subtotal;
    }

    get fam1Subtotal(){
        return this._fam1Subtotal;
    }

    set fam2Subtotal(fam2Subtotal){
        this._fam2Subtotal = fam2Subtotal;
    }

    get fam2Subtotal(){
        return this._fam2Subtotal;
    }

    isNoMoreGuesses(){

        // Subtract 1 from this since the index starts at 1
        if(this.missedGuesses === 4 || this.rightGuesses === this.rounds[this.currRound - 1].answers.length)
        {
            this.missedGuesses = 0;
            this.rightGuesses  = 0;
            return true;
        }
        else
        {
            return false;
        }
    }

    #getRoundsData(){
        var id = 1;
        for (var feudItem in this.feudData)
        {
            for(var roundData in this.feudData[feudItem])
            {
                console.log(roundData);
                if(roundData !== "finalRound")
                {
                    this.rounds.push(new Round(id,
                                    this.feudData[feudItem][roundData]["question"],
                                    this.feudData[feudItem][roundData]["answers"],
                                    this.feudData[feudItem][roundData]["points"]));
                    id += 1;
                }
                else
                {
                    for(var finalRoundData in this.feudData[feudItem][roundData])
                    {
                        this.finalRound.push(new Round(id,
                                            this.feudData[feudItem][roundData][finalRoundData]["question"],
                                            this.feudData[feudItem][roundData][finalRoundData]["answers"],
                                            this.feudData[feudItem][roundData][finalRoundData]["points"]));
                    }
                }
            }
        }
    }

    getCurrRoundQuestion()
    {
        this.missedGuesses   = 0;
        this.rightGuesses    = 0;
        this.roundStartSkips = 0;
        this.isRoundStarted  = false;
        this.isNum1Answer    = false;

        // Subtract 1 from this since the index starts at 1
        return this.rounds[this.currRound - 1].question;
    }

    checkRoundAnswer(answer)
    {
        // Subtract 1 from this since the index starts at 1
        let ptsAndIndex = this.rounds[this.currRound-1].checkAnswer(answer);
        this.subtotal += ptsAndIndex[0];

        // Only count missed guesses once the game has started
        if(ptsAndIndex[1] === -1 && this.isRoundStarted == true)
        {
            this.missedGuesses++;
        }
        else if(ptsAndIndex[1] !== -1)
        {
            // If there were three missed guesses before this right answer, then set the right guesses to the max
            // There should be nore more right guesses after this
            if(this.missedGuesses === 3)
            {
                this.rightGuesses = this.rounds[this.currRound - 1].answers.length;
            }
            else
            {
                this.rightGuesses++;

            }

            // Check to see if number one answer was discovered
            if(ptsAndIndex[1] === 0)
            {
                this.isNum1Answer = true;
            }
        }

        // If the round hasn't started yet, then check to see if it has
        if(this.isRoundStarted == false)
        {
            // Keep track of how many preround guesses have been given
            this.roundStartSkips++;

            // Check if both teams had a guesses
            // Check if at least on correct answer has ever been given
            if(((this.roundStartSkips % 2 === 0) && this.rightGuesses >= 1) || this.isNum1Answer === true)
            {
                this.isRoundStarted = true;
            }
        }

        return ptsAndIndex;
    }

    awardPoints(familyId){
        if(familyId == 1)
        {
            this._fam1Subtotal += this.subtotal;
        }
        else
        {
            this._fam2Subtotal += this.subtotal;
        }

        this.subtotal = 0;
    }
}