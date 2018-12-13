const { getInput } = require("../readInput.js");

function getNextMarblePosition(currentMarble, circleLength) {
  //between the marbles that are 1 and 2 marbles clockwise of the current marble.
  let nextPosition = currentMarble + 2; //ClockWise will be + , counter will be -

  if (nextPosition > circleLength) {
    nextPosition = nextPosition - circleLength;
  }
  return nextPosition;
}

function addMarbleToCircle(currentMarble, nextMarble, circle, circleSize) {
  const nextPosition = getNextMarblePosition(currentMarble, circleSize);

  //   ** Optimize ** don't use splice
  circle.splice(nextPosition, 0, nextMarble);
  return { nextPosition };
}

function remove7thMarble(currentMarble, circle, circleSize) {
  let seventh = currentMarble - 7;
  if (seventh < 0) {
    seventh = circleSize + seventh;
  }
  const value = circle[seventh];
  // remove marble ** Optimize, don't use splice?
  circle.splice(seventh, 1);
  // new current was the marble clockwise to the one removed, same index as seventh
  if (seventh > circleSize) {
    seventh = seventh - circleSize;
  }
  return { value, seventh };
}

function nextPlayer(currentPlayer, players) {
  return currentPlayer === players.length - 1 ? 0 : currentPlayer + 1;
}

const playGame = (playerCount, marbles) => {
  const startTime = Date.now();
  const players = new Array(playerCount).fill(0); //?
  let currentPlayer = 0;

  let currentMarble = 0;
  // we could pre-allocate, but splice is still the fastest insertion method for JS
  const circle = new Array(marbles + 1); // pre allocate required memory
  let circleSize = 1; // size of array as the elves see the circle
  for (let i = 1; i < marbles + 1; i++) {
    if (i % 10000 === 0) {
      console.log(i / 10000, "...", (Date.now() - startTime) / 1000);
    }
    //current player takes Turn
    if (i % 23 === 0) {
      // add to score
      players[currentPlayer] += i;
      // the marble 7 marbles counter-clockwise from the current marble is removed from the circle
      const removal = remove7thMarble(currentMarble, circle, circleSize);
      circleSize--;
      players[currentPlayer] += removal.value;
      currentMarble = removal.seventh;
    } else {
      const placementResult = addMarbleToCircle(
        currentMarble,
        i,
        circle,
        circleSize
      );
      circleSize++;
      currentMarble = placementResult.nextPosition;
    }
    currentPlayer = nextPlayer(currentPlayer, players);
  }
  console.log((Date.now() - startTime) / 1000);
  return players.sort().reverse()[0];
};

function dec9(input) {
  //   console.log(input[0]);
  const gameInput = input[0]
    .replace(" points", "")
    .split(" players; last marble is worth ")
    .map(num => parseInt(num, 10));

  const score = playGame(...gameInput);
  console.log(score);
}

playGame(455, 7122300);
// getInput("./dec9.txt", dec9);

module.exports = {
  p2: playGame,
  playGame,
  dec9
};
