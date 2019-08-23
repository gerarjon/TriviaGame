$(document).ready( function() {
// Questions
//==============================================
var questions = [{
    question: "What is the full name of Exodia?",
    answers: ["Exodia, The Forbidden One", "Exodia, The Forgotten One", "Exodia, The Exalted One", "Exodia Winged Dragon of Ra"],
    correctAnswer: "Exodia, The Forbidden One",
    // image:,
}, {
    question: "What does the card \"Pot of Greed\" do?",
    answers: ["Lets you draw 2 cards", "Lets you draw 1 card", "Wins you the game", "Sends the card on top of your opponent's deck to the graveyyard"],
    correctAnswer: "Lets you draw 2 cards",
}, {
    question: "How many \"Blue-Eyes White Dragon\" cards does Kaiba own?",
    answers: ["4", "3", "5", "Mokuba has them"],
    correctAnswer: "3",
}, {
    question: "What is Jaiden Yuki's \"Ace\" card?",
    answers: ["Elemental Hero Flame Wingman", "Winged Kuriboh", "Polymerization", "Elemental Hero Neos"],
    correctAnswer: "Elemental Hero Neos",
}, {
    question: "How tall is Yugi Moto?",
    answers: ["5'0", "4'11", "5'2", "4'8"],
    correctAnswer: "5'0",
}];
var gameHTML;
var theClock;
var counter = 30;
var questionCounter = 0;
var correct= 0;
var incorrect =0;
var unanswered = 0;
var selectedAnswer;
var startSound = new Audio("assets/sounds/Its-time-to-duel.mp3")
var winSound;
var loseSound = new Audio("assets/sounds/Points-drop.mp3");
var qcontainer = $("#question-container");
// Game Object
//===============================================
var game = {
    // Function for timer
    timeCountdown: () => {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if ( counter === 0 ) {
                clearInterval(theClock);
                timeUp();
            }
            if ( counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    },
    // Function that posts a question
    generateQuestion: () => {
        game.timeCountdown();
        qcontainer.html(`<h3 class="text-center">Time Remaining: <span class="timer red">30</span></h3><br><h2 class="text-center">Question: ${questions[questionCounter].question}</h2>`);
        // Loop through the answers
        for ( var i = 0; i < questions[questionCounter].answers.length; i++) {
            // Appends a button with an id and data-name of that answer
            qcontainer.append(`<button class="answer-button" id="button-${i}" data-name="${questions[questionCounter].answers[i]}">${questions[questionCounter].answers[i]}</button>`);
        }
    },
    generateWin: () => {
        console.log("correct!");
        correct++;
        setTimeout(game.wait, 3500);
    },
    generateLoss: () => {
        loseSound.play();
        console.log("You lose!");
        incorrect++;
        setTimeout(game.wait, 3500)
    },
    wait: () => {
        // if
        questionCounter < questions.length ? (
            questionCounter++,
            counter = 30,
            game.generateQuestion() ) :
            // else 
            ( this.endScreen() 
        )
    },
    endScreen: () => {
        console.log("the end");
    },
    reset: () => {
        counter = 30;
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        game.generateQuestion();
        game.timeCountdown();
    }
}
// Click Events
// ==============================================
// Hides rules when start button is pressed
$("#start-button").on("click", function() {
    $(".rules-container").hide();
    startSound.play();
    qcontainer.html(`<img class="loading-gif" src="assets/images/GerarW2.gif">`)
    setTimeout(game.generateQuestion, 3300);
})
$(document).on("click", ".answer-button", function(event) {
    selectedAnswer = $(event.target).data("name");
    // if
    selectedAnswer === questions[questionCounter].correctAnswer ? (
        clearInterval(theClock),
        game.generateWin() ) :
        // else
        ( 
        clearInterval(theClock),
        game.generateLoss()
    )
    console.log(questions[questionCounter].correctAnswer);
})
});
