const color = document.querySelectorAll("div");
const topLeft = document.getElementById("1");
const topRight = document.getElementById("2");
const bottomLeft = document.getElementById("3");
const bottomRight = document.getElementById("4");
const btn = document.querySelector("button");
const displayScore = document.getElementById("score");

// Declaring arrays
const pattern = [];
const userInput = [];

// Display score
displayScore.innerText = 0;

// Styles the squares to show the pattern
function setStyling() {
  let seconds;
  for (let i = 0; i < pattern.length; i++) {
    setTimeout(() => {
      switch (pattern[i]) {
        case 1:
          chosenColor = topLeft;
          break;
        case 2:
          chosenColor = topRight;
          break;
        case 3:
          chosenColor = bottomLeft;
          break;
        case 4:
          chosenColor = bottomRight;
          break;
        default:
          console.log(chosenColor); // See what chosenColor is, cause this shouldn't happen 😭
      }
      chosenColor.classList.add("selected");
      // waits half a second
      setTimeout(() => {
        chosenColor.classList.remove("selected");
      }, 500);
    }, i * 1000);
    seconds = i;
  }

  // Waits until pattern is over to allow clicking
  setTimeout(() => {
    removeNoClick();
  }, seconds * 1000 + 1250);
}

const removeNoClick = () => {
  // Removes noClick class so user can click again after pattern was shown
  color.forEach((el) => {
    el.classList.remove("noClick");
  });
};

function generatePattern() {
  // For each color add a noClick class to prevent clicking while pattern is showing
  color.forEach((el) => {
    el.classList.add("noClick");
  });

  // Chooses next color
  let position = Math.floor(Math.random() * 4 + 1);
  pattern.push(position);

  // Waits 1 second before displaying selected color
  setTimeout(() => setStyling(), 1000);
}

// Start game
function startGame() {
  btn.classList.add("buttonFade");

  // Wait .5 seconds and display: none button
  setTimeout(() => {
    btn.classList.add("hide");
  }, 500);

  // Clearing userInput & pattern array to prevent bugs.
  userInput.splice(0, userInput.length);
  pattern.splice(0, pattern.length);
  generatePattern(); // Start with a color in pattern
}

// Game logic
btn.addEventListener("click", () => {
  startGame();

  // Waits for user to click square
  color.forEach((square) => {
    square.addEventListener("click", () => {
      // Add color to userInput array
      userInput.push(parseFloat(square.id));

      // If all colors are guessed correctly:
      if (JSON.stringify(userInput) == JSON.stringify(pattern)) {
        displayScore.innerText = pattern.length; // Score is updated
        userInput.splice(0, userInput.length); // userInput array is cleared
        generatePattern(); // Generates new pattern
      } else {
        // Checks whether selected color is wrong
        for (let i = 0; i < userInput.length; i++) {
          if (userInput[i] != pattern[i]) {
            // If strings don't match in index
            displayScore.innerText = "Game over!";
          }
        }
      }
    });
  });
});
