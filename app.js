const color = document.querySelectorAll("div");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const btn = document.querySelector("button");
const displayScore = document.getElementById("score");

const pattern = [];
const userInput = [];

let chooseColor;
let areTheyEqual;

displayScore.innerText = 0;

function generatePattern() {
  chooseColor = Math.floor(Math.random() * 4 + 1);
  switch (chooseColor) {
    case 1:
      pattern.push("red");
      break;
    case 2:
      pattern.push("yellow");
      break;
    case 3:
      pattern.push("green");
      break;
    case 4:
      pattern.push("blue");

      break;
  }

  // Waits 1 second before displaying
  setTimeout(() => {
    for (let i = 0; i < pattern.length; i++) {
      let chosenColor;
      setTimeout(() => {
        switch (pattern[i]) {
          case "red":
            chosenColor = red;
            break;
          case "yellow":
            chosenColor = yellow;

            break;
          case "green":
            chosenColor = green;

            break;
          case "blue":
            chosenColor = blue;

            break;
        }
        chosenColor.classList.add("selected");
        setTimeout(() => {
          chosenColor.classList.remove("selected");
        }, 500);
      }, i * 1000);
    }
  }, 1000);
}

let n = 0;

// Start game
btn.addEventListener("click", () => {
  userInput.splice(0, userInput.length);
  pattern.splice(0, pattern.length);
  generatePattern(); // Start with a color in pattern

  color.forEach((square) => {
    square.addEventListener("click", () => {
      userInput.push(square.id); // Adds color to userInput array
      n = 0;
      if (userInput.length != pattern.length) {
        while (n < userInput.length) {
          if (!(userInput[n] == pattern[n])) {
            console.log("Game over!");
          }
          n++;
        }
      } else if (userInput.length == pattern.length) {
        if (JSON.stringify(userInput) == JSON.stringify(pattern)) {
          generatePattern();
          displayScore.innerText = pattern.length - 1;

          userInput.splice(0, userInput.length);
          console.log(pattern);
          console.log(userInput);
        } else {
          console.log("game over!");
          displayScore.innerText = "Game Over";
        }
      }
    });
  });
  console.log(pattern);
  console.log(userInput);
});
