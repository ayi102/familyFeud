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
        this.feudData  = feudData;
        this.currRound = null;
        this.rounds    = [];
        this.subtotal  = 0;

        this.#getRoundsData();
    }

    set currRound(currRound){
        this._currRound = currRound;
    }

    get currRound(){
        return this._currRound;
    }

    set subtotal(subtotal){
        this._subtotal = subtotal;
    }

    get subtotal()
    {
        return this._subtotal;
    }

    #getRoundsData(){
        var id = 1;
        for (var feudItem in this.feudData)
        {
            for(var roundData in this.feudData[feudItem])
            {
                this.rounds.push(new Round(id,
                                 this.feudData[feudItem][roundData]["question"],
                                 this.feudData[feudItem][roundData]["answers"],
                                 this.feudData[feudItem][roundData]["points"]));
                id += 1;
            }
        }
    }

    getCurrRoundQuestion()
    {
        return this.rounds[this.currRound].question;
    }

    checkRoundAnswer(answer)
    {
        let ptsAndIndex = this.rounds[this.currRound].checkAnswer(answer);
        this._subtotal += ptsAndIndex[0];

        return ptsAndIndex[1];
    }
}