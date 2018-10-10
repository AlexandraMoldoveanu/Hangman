function Game() {
    this.dictionary = ["peanut", "apple", "banana", "watermelon"];
    this.currentWord;
    this.triedLetters = [];
    this.currentWordState = [];
    this.numberOfGuesses = 6;
    this.generateWord();
}

Game.prototype.generateWord = function () {
    var wordIndex = Math.floor(Math.random() * this.dictionary.length);
    return this.currentWord = this.dictionary[wordIndex];

}

Game.prototype.isGameWon = function() {
    return this.currentWordState.join("") === this.currentWord;
}

Game.prototype.isGameOver = function() {
   return  this.isGameWon() || this.numberOfGuesses === 0;
}


Game.prototype.makeAMove = function (guessLetter) {
    if(this.isGameOver()) {
        return;
    }
    if(this.triedLetters.indexOf(guessLetter) !== -1){
        return;
    }else {
        this.triedLetters.push(guessLetter);
        for (var i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === guessLetter) {
                this.currentWordState[i] = guessLetter;
            }       
        }
        if (this.currentWord.indexOf(guessLetter) === -1) {
            this.numberOfGuesses = this.numberOfGuesses - 1;
        }

    } 
}




var joc1 = new Game();
joc1.makeAMove("p");
console.log(joc1.currentWord);
console.log(joc1.triedLetters);
console.log(joc1.numberOfGuesses);
console.log(joc1.currentWordState);


