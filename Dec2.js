const { getInput } = require("./inputs/readInput");

function checkForDupe(substring, char) {
  for (let i = 1; i < substring.length; i++) {
    if (char === substring[i]) {
      return i;
    }
  }
  return -1;
}

function checkDupAndTrip(str) {
  //console.log("***testing*** : ", str);
  let duplicate = "";
  let triplicate = "";

  // Tried to be far too fast with the forward search, made the checks more complex
  //   think data structure usage next time
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (!str.substring(0, i).includes(char) && triplicate !== char) {
      const searchString = str.substring(i);
      // Lazy dup check
      let dupIndex = checkForDupe(searchString, char);

      if (dupIndex > 0) {
        const searchForTripString = searchString.substring(dupIndex);
        const tripIndex = checkForDupe(searchForTripString, char);
        if (tripIndex > 0) {
          if (
            checkForDupe(searchForTripString.substring(tripIndex), char) < 0
          ) {
            triplicate = char;
          }
        } else {
          duplicate = char;
        }
      }
    } else {
      //console.log("done with", char);
    }
  }

  const ret = {
    hasDupe: !!duplicate,
    hasTrip: !!triplicate
  };
  //console.log(ret);
  return ret;
}

function dec2Part1(inputArr) {
  let duplicateCount = 0;
  let triplicateCount = 0;

  for (let i = 0; i < inputArr.length; i++) {
    const boxId = inputArr[i];
    const hasDT = checkDupAndTrip(boxId);
    if (hasDT.hasDupe) {
      duplicateCount++;
    }
    if (hasDT.hasTrip) {
      triplicateCount++;
    }
  }
  console.log(
    "checksum: ",
    duplicateCount,
    triplicateCount,
    duplicateCount * triplicateCount
  );
}

getInput("input.txt", dec2Part1);
