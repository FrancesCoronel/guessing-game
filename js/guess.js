/** 
 * The Guessing Game
 * FVCproductions
 * guess.js
 */

$(document).ready(function() {

    // declaring all necessary variables
    var guesses = [];
    var guess = 0;
    var guessCount = 0;
    var difference = 0;
    var correct = Math.round(Math.random() * 100);

    // because music makes the world a better place
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('autoplay', 'autoplay');
    $.get();
    audioElement.addEventListener("load", function() {
        audioElement.play();
    }, true);
    var play = function() {
        audioElement.play();
    };

    /**
     * Enter Button
     * Works with Submit Click Function
     */
    $('#userGuess').keypress(function(e) {
        if (e.which === 13) { // Enter Key Pressed
            $('#submit').click();
        }
    });

    /**
     * Reset Game
        (1) all text & styles go back to original values
        (2) generate new random #
        (3) make empty array and put counts back to 0
        (4) stop music
     */
    $("#reset").on("click", function() {
        guesses = [];
        guessCount = 0;
        correct = Math.round(Math.random() * 100);
        $("#message").html("");
        $("#userGuess").val("");
        for (var i = 0; i <= 10; i++) {
            $("#guess" + i).text("");
            $("#circle" + i).removeAttr('style');
        }
        audioElement.pause();
    });

    /**
     * Submit Guess
        (1) checks for # of cases
        (2) changes styling of different texts based on guess
        (3) gives user image/audio based on final results
     */
    $("#submit").on("click", function() {

        // grab guess from input
        guess = parseInt($("#userGuess").val(), 10);

        // so that red border only applies when user is being stupid
        $("#userGuess").removeAttr('style');

        // checks if guess is valid #
        if (guess < 1 || guess > 100 || isNaN(guess)) {
            $("#userGuess").css("border", "red solid 3px");
            $("#message").html("<h1>Enter a valid number, fool.</h1>");
        }
        // checks if guess has already been tried
        else if (jQuery.inArray(guess, guesses) !== -1) {
            $("#userGuess").css("border", "red solid 3px");
            $("#message").html("<h1>You guessed that already, derp.<h1>");
        }
        // checks if guess is correct
        else if (guess === correct) {
            $("#message").html("<h1>Congrats, bud! The answer was " + correct + "!</h1><img src='images/success.gif'/><h1>Press the 'Reset Game' button to play again.</h1>");
            audioElement.setAttribute('src', 'audio/success.mp3');
            play();
        }
        // otherwise, push guess to array of guesses and adds +1 to guessCount
        else {
            guesses.push(guess);
            guessCount += 1;
            // comparing difference and making appropriate style changes
            difference = Math.abs(guess - correct);
            // very hot if absolute difference is equal to or less than 5
            if (5 >= difference) {
                $("#message").html("<h1 style='color:#E13328'>Oooh, very hot.</h1>");
                $("#guess" + guessCount).text(guess);
                $("#circle" + guessCount).css("background", "#E13328");
            }
            // warm if absolute difference is equal to or less than 10
            else if (10 >= difference) {
                $("#message").html("<h1 style='color:#FDE731'>Eh, warm.</h1>");
                $("#guess" + guessCount).text(guess);
                $("#circle" + guessCount).css("background", "#FDE731");
            }
            // otherwise, it's just very cold
            else {
                $("#message").html("<h1 style='color:#82BDF9'>Brrr, so cold.</h1>");
                $("#guess" + guessCount).text(guess);
                $("#circle" + guessCount).css("background", "#82BDF9");
            }
            // to see if answer should be higher or lower (not based on previous guess)
            tempDiff = guess - correct;
            if (tempDiff > 0) {
                $("#message").append("<h2 style='color:white'>Guess lower.</h1>");
            } else {
                $("#message").append("<h2 style='color:white'>Guess higher.</h1>");
            };
            // if user has reached max # of guesses
            if (guessCount === 10) {
                // checking if last guess is correct
                // if it is, then gives success gif with audio
                if (guess === correct) {
                    $("#message").html("<h1>Congrats, bud! The answer was " + correct + "!</h1><img src='images/success.gif'/><h1>Press the 'Reset Game' button to play again.</h1>");
                    audioElement.setAttribute('src', 'audio/success.mp3');
                    play();

                } else {
                    // otherwise, gives fail gif with audio
                    $("#message").html("<h1>YOU SUCK! The answer was " + correct + "!</h1><img src='images/fail.gif'/><h1>Press the 'Reset Game' button to play again.</h1>");
                    audioElement.setAttribute('src', 'audio/fail.mp3');
                    play();
                }
            }
        }
    });

    /**
     * Hint Provides Answer
     */
    $("#hint").on("click", function() {
        $("#message").html("<h1>I guessed " + correct + ", ya cheater.</h1>");
    });

});