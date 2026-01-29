"use strict";

const passage = document.querySelector(".main__passage");
const personalBest = document.querySelector(".main__pb");
const easyButton = document.querySelector(".easyButton");
const mediumButton = document.querySelector(".meduimButton");
const hardButton = document.querySelector(".hardButton");
const passageButton = document.querySelector(".main__passage button");
const passageStart = document.querySelector(".main__passage-start");
const hiddenHr = document.querySelector(".hiddenHr");
const mainDiv = document.querySelector(".main");
const testComplete = document.querySelector(".main__test-complete");
const resetButton = document.querySelector(
  ".main__test-complete_stats-resetButton",
);

const textStatWPM = document.querySelector(".main__nav-stats_WPM");
const textStatAccuracy = document.querySelector(".main__nav-stats_ACC");
const textStatTime = document.querySelector(".main__nav-stats_TIME");

const testStatWPM = document.querySelector(".main__test-complete_stats-WPM");
const testStatAccuracy = document.querySelector(
  ".main__test-complete_stats-ACC",
);
const testCorrectStrokes = document.querySelector(
  ".main__test-complete_stats-correct",
);
const testIncorrectStrokes = document.querySelector(
  ".main__test-complete_stats-incorrect",
);

const imgBaselineAndClassic = document.querySelector(
  ".main__test-complete_div",
);
const imgPb = document.querySelector(".main__test-complete_pb");

const textBaseline = document.querySelector(
  ".main__test-complete_text-baseline",
);
const textClassic = document.querySelector(".main__test-complete_text-classic");
const textPb = document.querySelector(".main__test-complete_text-pb");

const buttonTextBaseline = document.querySelector(
  ".main__test-complete_stats-button_baseline",
);
const buttonTextClassic = document.querySelector(
  ".main__test-complete_stats-button_classic",
);

const confetti = document.querySelector(".main__test-complete_confetti");

const passageContent = document.createElement("p");
const passageContentAfter = document.querySelector(".textCont");

var currentText,
  gameStart = false,
  first,
  second,
  count = 0,
  difficulty = 1,
  passageLength,
  wordCount = 0,
  currentTime = textStatTime.textContent;

var statCorrect = 0,
  statIncorrect = 0;

//function that generates a random number to pick from the already established possible passages
function rand() {
  let rand = Math.floor(Math.random() * 9) + 1;
  return rand;
}

//fetches the passage from data.json and dependat on the difficulty sets the on page text to be equivalent to it
function getData(difficulty) {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      if (difficulty === 3) {
        gameStart = false;
        passageContent.classList.add("blur", "textCont");
        currentText = data.hard[rand()].text;
        passageContent.textContent = currentText;
      } else if (difficulty === 2) {
        gameStart = false;
        passageContent.classList.add("blur", "textCont");
        currentText = data.medium[rand()].text;
        passageContent.textContent = currentText;
      } else if (difficulty === 1) {
        gameStart = false;
        passageContent.classList.add("blur", "textCont");
        currentText = data.easy[rand()].text;
        passageContent.textContent = currentText;
      }
      passage.appendChild(passageContent);
    })
    .catch((e) => alert(e));
}

//sets the start values
getData(1);
passageContent.classList.add("blur", "textCont");

//button event listener that cheks if the difficulty button is pressed and sets the styling for it and difficulty
easyButton.addEventListener("click", () => {
  if (mediumButton.id === "main__nav-settings_btn-active") {
    mediumButton.removeAttribute("id");
  } else if (hardButton.id === "main__nav-settings_btn-active") {
    hardButton.removeAttribute("id");
  }
  easyButton.setAttribute("id", "main__nav-settings_btn-active");
  passageStart.removeAttribute("id");
  difficulty = 1;
  getData(difficulty);
  gameReset("");
});

//check above
mediumButton.addEventListener("click", () => {
  if (easyButton.id === "main__nav-settings_btn-active") {
    easyButton.removeAttribute("id");
  } else if (hardButton.id === "main__nav-settings_btn-active") {
    hardButton.removeAttribute("id");
  }
  mediumButton.setAttribute("id", "main__nav-settings_btn-active");
  passageStart.removeAttribute("id");
  difficulty = 2;
  getData(difficulty);
  gameReset("");
});

//check above
hardButton.addEventListener("click", () => {
  if (easyButton.id === "main__nav-settings_btn-active") {
    easyButton.removeAttribute("id");
  } else if (mediumButton.id === "main__nav-settings_btn-active") {
    mediumButton.removeAttribute("id");
  }
  hardButton.setAttribute("id", "main__nav-settings_btn-active");
  passageStart.removeAttribute("id");
  difficulty = 3;
  getData(difficulty);
  gameReset("");
});

//button event listener that check the pre-game-start button for a click which starts the game and removes itself

passageButton.addEventListener("click", () => {
  passageStart.setAttribute("id", "hidden");
  hiddenHr.removeAttribute("id");
  passageContent.classList.remove("blur");
  gameStart = true;
});

document.addEventListener("keydown", handleKeypress);

function handleKeypress() {
  //checks for keyboard clicks on the global scale not dependat on an element and stores it inside the keyPress value
  var keyPress = event.key;

  if (gameStart == true && count !== passageLength - 1) {
    if (
      //checks for keys that have alternate functions
      keyPress !== "Shift" &&
      keyPress !== "Alt" &&
      keyPress !== "Backspace" &&
      keyPress !== "CapsLock" &&
      keyPress !== "Control" &&
      keyPress !== "Tab"
    ) {
      if (count === 0) {
        //sets the lenght of the chosen passage to be used later on
        passageLength = currentText.length;

        const timerInterval = setInterval(() => {
          textStatTime.textContent = currentTime;

          if (currentTime === 0) {
            clearInterval(timerInterval);
            gameStart = false;
          } else {
            currentTime--;
          }
        }, 1000);
      }

      let currentTextCopy = currentText.split("").reverse(); //splits the passage into an array and reverses it

      for (let i = 0; i < passageLength; i++) {
        //checks if currentTextCopy has a span inside it by going backwards and if it has it splits it into two arrays otherwise sets the second one to the currentTextCopy
        if (currentTextCopy[i] === ">") {
          [first, second] = [
            currentTextCopy.slice(i).reverse(),
            currentTextCopy.slice(0, i).reverse(),
          ];
          break;
        } else if (i === currentTextCopy.length - 1) {
          first = [];
          second = currentTextCopy.reverse();
        }
      }

      if (second[0] === " ") {
        wordCount++;
      }

      if (keyPress === second[0]) {
        second.splice(0, 1, `<span class="correctLetter">${keyPress}</span>`); //puts correctLetter span inside the second array and the keyPress inside it
        passageContent.innerHTML = first.join("") + second.join(""); //joins the first and second arrays
        passage.appendChild(passageContent); //puts the passageContent inside the passage
        statCorrect++;
      } else {
        second.splice(0, 1, `<span class="wrongLetter">${keyPress}</span>`);
        passageContent.innerHTML = first.join("") + second.join("");
        passage.appendChild(passageContent);
        statIncorrect++;
      }

      count++;
      currentText = passageContent.innerHTML; //sets the currentText to be the passageContent
      textStatAccuracy.textContent = `${Math.floor((statCorrect / (statCorrect + statIncorrect)) * 100)}`;
      textStatWPM.textContent = wordCount;
    }
  } else {
    //when the game is finished
    gameReset("hard");
  }
}

function gameReset(type) {
  if (type === "hard") {
    if (Number(personalBest.textContent) === 0) {
      showStats("baseline");
    } else if (
      Number(textStatWPM.textContent) < Number(personalBest.textContent)
    ) {
      showStats("classic");
    } else if (
      Number(textStatWPM.textContent) > Number(personalBest.textContent)
    ) {
      showStats("pb");
    }

    resetButton.addEventListener("click", () => {
      getData(difficulty);
      showStats("");
    });
  }

  textStatWPM.textContent = 0;
  textStatAccuracy.textContent = 100;
  textStatTime.textContent = 60;

  statCorrect = 0;
  statIncorrect = 0;
  wordCount = 0;

  first = [];
  second = [];

  count = 0;

  // document.removeEventListener("keydown", handleKeypress);
}

function showStats(currentStats) {
  if (currentStats === "baseline") {
    personalBest.textContent = textStatWPM.textContent;

    mainDiv.setAttribute("style", "display: none;");

    testComplete.removeAttribute("id");

    imgBaselineAndClassic.removeAttribute("id");
    imgPb.setAttribute("id", "hidden");

    textBaseline.removeAttribute("id");
    textClassic.setAttribute("id", "hidden");
    textPb.setAttribute("id", "hidden");

    buttonTextBaseline.removeAttribute("id");
    buttonTextClassic.setAttribute("id", "hidden");

    confetti.setAttribute("id", "hidden");
  } else if (currentStats === "classic") {
    mainDiv.setAttribute("style", "display: none;");

    testComplete.removeAttribute("id");

    imgBaselineAndClassic.removeAttribute("id");
    imgPb.setAttribute("id", "hidden");

    textClassic.removeAttribute("id");
    textBaseline.setAttribute("id", "hidden");
    textPb.setAttribute("id", "hidden");

    buttonTextClassic.removeAttribute("id");
    buttonTextBaseline.setAttribute("id", "hidden");

    confetti.setAttribute("id", "hidden");
  } else if (currentStats === "pb") {
    personalBest.textContent = textStatWPM.textContent;

    mainDiv.setAttribute("style", "display: none;");

    testComplete.removeAttribute("id");

    imgPb.removeAttribute("id");
    imgBaselineAndClassic.setAttribute("id", "hidden");

    textPb.removeAttribute("id");
    textClassic.setAttribute("id", "hidden");
    textBaseline.setAttribute("id", "hidden");

    buttonTextBaseline.removeAttribute("id");
    buttonTextClassic.setAttribute("id", "hidden");

    confetti.removeAttribute("id");
  } else {
    mainDiv.removeAttribute("style");
    passageStart.removeAttribute("id");
    hiddenHr.setAttribute("id", "hidden");
    passageContent.classList.add("blur");

    testComplete.setAttribute("id", "hidden");
  }

  showTestStats();
}

function showTestStats() {
  testStatWPM.textContent = textStatWPM.textContent;
  testStatAccuracy.textContent = textStatAccuracy.textContent;
  testCorrectStrokes.textContent = statCorrect;
  testIncorrectStrokes.textContent = statIncorrect;
}
