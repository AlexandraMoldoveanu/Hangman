function Game(dict) {
    this.dictionary = dict;
    this.currentWord = "";
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
            newWordState = newWordState +  this.currentWordState[i];
        }
        else{
            newWordState = newWordState + " - ";
        }
       
    }
    return newWordState;
}

Game.prototype.generateHint = function(){
    var randomNumber = Math.floor(Math.random() * this.currentWord.length);
    if(this.isGameOver()) {
        return;
    }
        if(!this.currentWordState[randomNumber]){
            for(var i = 0; i < this.currentWord.length; i++){
                if(this.currentWord[i] === this.currentWord[randomNumber]){
                    this.currentWordState[i] = this.currentWord[randomNumber];
                }
            }
            this.currentWordState[randomNumber] = this.currentWord[randomNumber];
        }  else {
            this.generateHint();
        }
        
    }





var joc1 = {};
var modeButtons = $(".mode");


window.addEventListener("keydown", function(event){
    if (event.keyCode >= 65 && event.keyCode <= 90){
        joc1.makeAMove(event.key);
        updateDom();
    }
})

function updateDom(){
    document.getElementById("currentWord").innerText = joc1.generateCurrentWordState();
    document.getElementById("numberOfGuesses").innerText = joc1.numberOfGuesses;
    document.getElementById("triedLetters").innerText = joc1.triedLetters.join();
}

var modeButtons = $(".mode");
console.log(modeButtons[0]);
 (function setupModeButtons(){
	for(var i=0; i<modeButtons.length; i++){
        var jQueryButton = $(modeButtons[i]);
        jQueryButton.click(function(){
            modeButtons.each( (index, element) => $(element).removeClass("option-selected") ); 
            $(this).toggleClass('option-selected');
        })
	
 	}
 })();



 $("#btn").click(function(){
     //input de la user in care alege dificutatea jocului(easy 3-7 cuv; med 8-12; hard 13-16)
     
     var minOfLetters = parseInt($(".option-selected").attr("min-letters"));
     var maxOfLetters = parseInt($(".option-selected").attr("max-letters"));

     //ex: daca a ales easy, generez un random num intre 3 si 7 pe care il dau mai departe ca parametru pentru url;   
    
    var randomNumber = Math.floor(Math.random() * (maxOfLetters - minOfLetters) + minOfLetters);

    console.log(randomNumber);
    var numOfLettersParam = "";
    for(var i = 0; i<randomNumber; i++){
        numOfLettersParam = numOfLettersParam + "?";
    }
    console.log(numOfLettersParam);
    var url = `https://api.datamuse.com/words?sp=${numOfLettersParam}&md=p`;
   
    $.get(url)
    .done(function(data){
        joc1 =  new Game([]);
        
        for(var i = 0; i < data.length; i++){
            if(data[i]["tags"] && data[i]["tags"].length === 1 && data[i]["tags"][0]==="n"){
                joc1.dictionary.push(data[i]["word"]);
            }
        }
        joc1.generateWord();
        for(var i = 0; i < joc1.currentWord.length; i++){
            if(joc1.currentWord[i] === joc1.currentWord[0]){
                joc1.currentWordState[i] = joc1.currentWord[0];
            }
        }
        joc1.currentWordState[0] = joc1.currentWord[0];

        updateDom();
        console.log(joc1.dictionary);
         console.log(joc1.currentWord);
    })
    .fail(function(error){
      console.log("OH NO, IT FAILED!");
      console.log(error);
    })
 })

 $("#hint").click(function(){
     if(joc1.generateHint){
        joc1.generateHint();
        updateDom();
     }
  
}); 

    
 



