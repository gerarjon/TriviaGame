$(document).ready( function() {
// Questions
//==============================================
var questions = [{
    question: "What is the full name of Exodia?",
    answers: ["Exodia, The Forbidden One", "Exodia, The Forgotten One", "Exodia, The Exalted One", "Exodia Winged Dragon of Ra"],
    correctAnswer: "Exodia, The Forbidden One",
    image: "assets/images/gifs/exodia.gif",
}, {
    question: "What does the card \"Pot of Greed\" do?",
    answers: ["Lets you draw 2 cards", "Lets you draw 1 card", "Wins you the game", "Sends the card on top of your opponent's deck to the graveyard"],
    correctAnswer: "Lets you draw 2 cards",
    image: "assets/images/gifs/pot-of-greed.gif",
}, {
    question: "How many \"Blue-Eyes White Dragon\" cards does Kaiba own?",
    answers: ["He has 4", "He has 3", "He has 5", "Mokuba has them"],
    correctAnswer: "He has 3",
    image: "assets/images/gifs/blue-eyes-rip.gif",
}, {
    question: "What is Jaiden Yuki's \"Ace\" card?",
    answers: ["Elemental Hero Flame Wingman", "Winged Kuriboh", "Polymerization", "Elemental Hero Neos"],
    correctAnswer: "Elemental Hero Neos",
    image: "assets/images/gifs/neos.gif"
}, {
    question: "How tall is Yugi Moto?",
    answers: ["5'0", "4'11", "5'2", "4'8"],
    correctAnswer: "5'0",
    image: "assets/images/gifs/yugi.gif"
},  {
    question: "If your opponent just activated the spell card \"Dark Hole\", what would be the best card to negate the effect of \"Dark Hole\" if both you and your opponent have no cards in your hand(s)?",
    answers: ["Anti-Spell Fragrance", "Magic Jammer", "Goblin Out of the Frying Pan", "Magic Drain"],
    correctAnswer: "Goblin Out of the Frying Pan",
    image: "assets/images/goblin-card.png"
}, {
    question: "Which of the following cards has the highest ORIGINAL ATK? (This can also include cards exclusive to the OCG, effects of cards that increase original ATK are considered negated.)",
    answers: ["Rocket Arrow Express", "Five Headed Dragon", "Dragon Master Knight", "All of the above"],
    correctAnswer: "All of the above",
    image: "assets/images/dgm.png"
}, {
    question: "Who is big brother?",
    answers: ["Seto Kaiba", "Tristan Taylor", "Marik Ishtar", "Bandit Keith"],
    correctAnswer: "Seto Kaiba",
    image: "assets/images/gifs/kaiba.gif"
}, {
    question: "What is the name of the motorbikes used in Yugioh 5d's?",
    answers: ["Duel Accelerators", "Duel Runners", "Sonic Duelers", "Duel Disks"],
    correctAnswer: "Duel Runners",
    image: "assets/images/gifs/duel-runner.gif"
}];
// Global Variables
//===============================================
var gameHTML;
var theClock;
var counter = 15;
var questionCounter = 0;
var correct= 0;
var incorrect = 0;
var unanswered = 0;
var selectedAnswer;
var startSound = new Audio("assets/sounds/Its-time-to-duel.mp3")
var winSound = new Audio("assets/sounds/v0003_01_00_08_0.wav");
var loseSound = new Audio("assets/sounds/Points-drop.mp3");
var endSound = new Audio("assets/sounds/Youre-a-Third-Rate-Duelist.mp3")
var qcontainer = $("#question-container");
// Game Object
//===============================================
var game = {
    // Function for timer
    timeCountdown: () => {
        theClock = setInterval(fifteenSeconds, 1000);
        function fifteenSeconds() {
            if ( counter === 0 ) {
                clearInterval(theClock);
                game.timeUp();
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
        // Writes "Time Remaining: (time)"
        qcontainer.html(`<h3 class="text-center">Time Remaining: <span class="timer red">15</span></h3><br><h2 class="text-center">Question: ${questions[questionCounter].question}</h2>`);
        // Loop through the answers
        for ( var i = 0; i < questions[questionCounter].answers.length; i++) {
            // Appends a button with an id and data-name of that answer
            qcontainer.append(`<button class="answer-button" id="button-${i}" data-name="${questions[questionCounter].answers[i]}">${questions[questionCounter].answers[i]}</button>`);
        }
    },
    // Function that writes the answer
    generateWin: () => {
        winSound.play();
        correct++;
        gameHTML = `<h2>Nice job!</h2><p>The answer was "${questions[questionCounter].correctAnswer}"</p><br><img class="gif" src="${questions[questionCounter].image}">`
        qcontainer.html(gameHTML);
        setTimeout(game.wait, 3000);
    },
    // Function that tells the answer when they pick the wrong one
    generateLoss: () => {
        loseSound.play();
        incorrect++;
        gameHTML = `<h2>Not so good....</h2><p>The correct answer was "${questions[questionCounter].correctAnswer}"</p><br><img class="gif" src="${questions[questionCounter].image}">`;
        qcontainer.html(gameHTML);
        setTimeout(game.wait, 3000)
    },
    // Function that runs when they run out of time
    timeUp: () => {
        loseSound.play();
        unanswered++;
        gameHTML = `<h2>Time's up!</h2><p><p>The correct answer was "${questions[questionCounter].correctAnswer}"</p><br><img class="gif" src="${questions[questionCounter].image}">`;
        qcontainer.html(gameHTML);
        setTimeout(game.wait, 3000)
    },
    // Checks to see if there are more questions
    wait: () => {
        questionCounter++;
        if ( questionCounter < questions.length ) {
            counter = 15;
            game.generateQuestion();
        }
        else {
            game.endScreen(); 
        }
    },
    // Displays the results screen 
    endScreen: () => {
        endSound.play();
        qcontainer.empty();
        pFinish = `<h1>Finish!!!</h1>`
        pWin = `<h2>Correct Answers: ${correct}</h2>`;
        pLose = `<h2>Wrong Answers: ${incorrect}</h2>`;
        pUnAns = `<h2>Unanswered: ${unanswered}</h2>`;
        gameHTML = $("<button>")
        gameHTML.addClass("start");
        gameHTML.attr("id", "reset-button")
        gameHTML.text("Play Again");
        qcontainer.append(pFinish);
        qcontainer.append(pWin);
        qcontainer.append(pLose);
        qcontainer.append(pUnAns);
        qcontainer.append(gameHTML);
    },
    // Starts game again
    reset: () => {
        counter = 15;
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        game.generateQuestion();
    }
}
// Click Events
// ==============================================
// Hides rules when start button is pressed
$("#start-button").on("click", function() {
    $(".rules-container").hide();
    startSound.play();
    qcontainer.html(`<img class="loading-gif" src="assets/images/GerarW2.gif">`);
    setTimeout(game.reset, 3300);
})
// Reset Button
$(document).on("click", "#reset-button", function() {
    startSound.play();
    qcontainer.html(`<img class="loading-gif" src="assets/images/GerarW2.gif">`);
    setTimeout(game.reset, 3300);
})
// Answers button
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
})
});
