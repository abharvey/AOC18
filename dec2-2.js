const { getInput } = require("./inputs/readInput");

const filterMatchingCharacters = (idStr1, idStr2) =>
  Array.from(idStr1)
    .filter((char, index) => char === idStr2[index])
    .join("");

const dec2 = input => {
  // n squared baby
  const fileMatches = input.reduce((longest, boxId, index, boxIds) => {
    const long = input.reduce((longestMatch, otherBoxId) => {
      if (boxId === otherBoxId) {
        return longestMatch;
      }

      const matchingChars = filterMatchingCharacters(boxId, otherBoxId);
      if (matchingChars.length > longestMatch.length) {
        return matchingChars;
      }

      return longestMatch;
    }, "");

    if (long.length > longest.length) {
      return long;
    }

    return longest;
  }, "");

  console.log(fileMatches);
};

getInput("./inputs/dec2.txt", dec2);
