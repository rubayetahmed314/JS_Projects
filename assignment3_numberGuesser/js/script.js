let topHeading = document.getElementById("top_heading");
let chances = document.getElementById("chances_left");
let guessBtn = document.getElementById("guess");
let restartBtn = document.getElementById("restart");
let user_input = document.getElementById("user_input");

const thresholdMin = 15, thresholdMax = 75, maxChances = 3;
let random, min, max, correct, chancesLeft, gameOver;

start();

guessBtn.addEventListener("click", numberGuessed);
restartBtn.addEventListener("click", start);

function numberGuessed(event) {
    let input = user_input.value.toString();
    console.log(input);
    user_input.value = "";

    if (input == '' || input.match(/[^0-9]/)) {
        displayAlert("What are you doing? Input properly", 'alert-warning');
    } else if (input < min || input > max) {
        displayAlert("Out of Range! Input properly", 'alert-warning');
    } else {
        chancesLeft--;
        updateChances();

        if (input < correct) {
            displayAlert(`Your Guess: ${input}, Correct Answer is Greater!`, 'alert-info');
        } else if (input > correct) {
            displayAlert(`Your Guess: ${input}, Correct Answer is Smaller!`, 'alert-info');
        } else if (input == correct) {
            gameOver = true;
            displayAlert(`You guessed it! You have Won!`, 'alert-success');
        }
    }

    if (chancesLeft == 0) {
        if (!gameOver) {
            gameOver = true;
            displayAlert(`You have Lost! Guess better next time! Correct Answer was ${correct}`, 'alert-danger');
        }
    }

    if (gameOver) {
        guessBtn.setAttribute("disabled", true);
        user_input.setAttribute("disabled", true);
        restartBtn.style.display = "block";
    }
}

function updateChances() {
    chances.innerText = `Chances Left: ${chancesLeft}`;
}

function displayAlert(message, className) {
    clearAlert();
    let container = document.querySelector('.container');
    let afterHeading = document.getElementById("after_heading");
    let div = document.createElement('div');
    div.className = 'container alert text-center';
    div.classList.add(className);
    div.setAttribute("role", "alert");
    div.innerText = message;
    container.insertBefore(div, afterHeading);
}

function clearAlert() {
    let alert = document.querySelector('.alert');
    if (alert) {
        alert.remove();
    }
}

function start() {
    gameOver = false;
    clearAlert();
    restartBtn.style.display = "none";
    guessBtn.removeAttribute("disabled");
    user_input.removeAttribute("disabled");

    chancesLeft = maxChances;
    updateChances();

    random = Math.random();

    max = Math.floor(random * (thresholdMax - thresholdMin) + thresholdMin);

    min = Math.floor(random * thresholdMin + thresholdMin / 5);

    correct = Math.floor(random * (max - min) + min);

    if (correct == min) {
        correct += 1;
    } else if (correct == max) {
        correct -= 1;
    }

    console.log(max, min, correct);

    topHeading.innerHTML = `Guess a Number<br><strong>between</strong> ${min} and ${max} (<u>Exclusive</u>)`;


}