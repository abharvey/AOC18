const { input } = require("./inputs/dec2-dumb.js");

function checkDupAndTrip(str) {
  console.log("testing: ", str);
  let hasDup = false;
  let hasTrip = false;
  for (let searchIndex = 0; searchIndex < str.length; searchIndex++) {
    const char = str[searchIndex];
    for (
      let duplicateSearch = searchIndex + 1;
      duplicateSearch < str.length;
      duplicateSearch++
    ) {
      if (char === str[duplicateSearch]) {
        hasDup = true;
        console.log(`duplicate of ${char} @ ${duplicateSearch}`);
        for (
          let triplicateSearch = duplicateSearch + 1;
          triplicateSearch < str.length;
          triplicateSearch++
        ) {
          if (char === str[triplicateSearch]) {
            console.log(`triplicate of ${char} @ ${triplicateSearch}`);
            hasTrip = true;
            hasDup = false;
            break;
          }
        }
        break;
      }
      if (hasTrip) {
        break;
      }
    }
    if (hasDup) {
      break;
    }
  }

  return {
    hasDup,
    hasTrip
  };
}

(function dec2Part1(inputArr) {
  let duplicateCount = 0;
  let triplicateCount = 0;

  for (let i = 0; i < input.length; i++) {
    const boxId = input[i];
    const hasDT = checkDupAndTrip(boxId);
    if (hasDT.hasDup) {
      duplicateCount++;
    }
    if (hasDT.hasTrip) {
      triplicateCount++;
    }
  }
  console.log("checksum: ", duplicateCount * triplicateCount);
})(input);
