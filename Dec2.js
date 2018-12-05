const { input } = require("./inputs/dec2-dumb.js");

function checkForDupe(substring, char) {
  for (let i = 1; i < substring.length; i++) {
    if (char === substring[i]) {
      console.log(`found match of ${char} @ ${i}`);
      return i;
    }
  }
  return false;
}

function checkDupAndTrip(str) {
  console.log("testing: ", str);
  let hasDupe = false;
  let hasTrip = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const substring = str.substring(i);

    // Lazy dup rechecks
    const dupIndex = checkForDupe(substring, char) || false;
    const hasTrip =
      dupIndex && checkForDupe(substring.substring(dupIndex), char);

    if (hasTrip) {
      break;
    }

    if (dupIndex) {
      hasDupe = true;
      break;
    }
  }

  return {
    hasDupe,
    hasTrip
  };
}

(function dec2Part1(inputArr) {
  let duplicateCount = 0;
  let triplicateCount = 0;

  for (let i = 0; i < input.length; i++) {
    const boxId = input[i];
    const hasDT = checkDupAndTrip(boxId);
    if (hasDT.hasDupe) {
      duplicateCount++;
    }
    if (hasDT.hasTrip) {
      triplicateCount++;
    }
  }
  console.log("checksum: ", duplicateCount * triplicateCount);
})(input);
