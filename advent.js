const { input } = require("./advent-input.js");

const dec1Part1 = inputArr => {
  return inputArr.reduce((frequency, delta) => frequency + delta, 0);
};

const dec1Part2 = inputArr => {
  let frequency = 0;
  const previousValues = [frequency];

  while (true) {
    for (let i = 0; i < inputArr.length; i++) {
      const delta = inputArr[i];
      const nextFrequency = frequency + delta;

      if (previousValues.includes(nextFrequency)) {
        return nextFrequency;
      }

      previousValues.push(nextFrequency);
      frequency = nextFrequency;
    }
  }
};

console.log(dec1Part2(input));
