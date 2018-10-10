function Game() {
    this.dictionary = ["peanut", "apple", "banana", "watermelon"];
    this.currentWord;
    this.triedLetters = [];
    this.currentWordState = [];
    this.numberOfGuesses = 6;
    this.generateWord();
    this.newWordState;
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


Game.prototype.generateCurrentWordState = function(){
    var newWordState = "";
    for(var i = 0; i< this.currentWord.length; i++){
        if(this.currentWordState[i]){
            newWordState = newWordState + this.currentWordState[i];
        }
        else{
            newWordState = newWordState + " - ";
        }
       
    }
    return newWordState;
}

var joc1 = new Game();

document.getElementById("currentWord").innerText = joc1.generateCurrentWordState();
document.getElementById("numberOfGuesses").innerText = joc1.numberOfGuesses;
document.getElementById("triedLetters").innerText = joc1.triedLetters.join();

window.addEventListener("keydown", function(event){
    if (event.keyCode >= 65 && event.keyCode <= 90){
        joc1.makeAMove(event.key);
        document.getElementById("currentWord").innerText = joc1.generateCurrentWordState();
        document.getElementById("numberOfGuesses").innerText = joc1.numberOfGuesses;
        document.getElementById("triedLetters").innerText = joc1.triedLetters.join();
    }
})





