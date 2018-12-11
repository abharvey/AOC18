const { getInput } = require("./readInput.js");

const spliceRem = function(arr, index, circleSize) {
  while (index < circleSize) {
    arr[index] = arr[index + 1];
    index++;
  }
};

const spliceAdd = function(arr, index, item, circleSize) {
  console.log(arr);
  let i = index;
  while (i <= circleSize) {
    arr[i + 1] = arr[index];
    i++;
  }
  arr[index] = item;
};

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
  spliceAdd(circle, nextPosition, nextMarble, circleSize);
  return { nextPosition };
}

function remove7thMarble(currentMarble, circle, circleSize) {
  let seventh = currentMarble - 7;
  if (seventh < 0) {
    seventh = circleSize + seventh;
  }
  const value = circle[seventh];
  // remove marble ** Optimize, don't use splice?
  spliceRem(circle, seventh, circleSize);
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
  const players = new Array(playerCount).fill(0);
  let currentPlayer = 0;

  let currentMarble = 0;
  // we could pre-allocate, but splice is still the fastest insertion method for JS
  const circle = new Array(marbles + 1).fill(0); // pre allocate required memory
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
  const score = players.sort().reverse()[0];
  return score;
};

function dec9(input) {
  console.log(input[0]);
  const gameInput = input[0]
    .replace(" points", "")
    .split(" players; last marble is worth ")
    .map(num => parseInt(num, 10));

  const score = playGame(...gameInput);
}

console.log(playGame(9, 25));
// getInput("./dec9.txt", dec9);

module.exports = {
  p2: playGame,
  playGame,
  dec9
};
