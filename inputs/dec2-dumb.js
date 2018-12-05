const input = [
  "abcdef", // false : false
  "bababc", // true : true
  "abbcdededd", // true : false
  "abcccd", // false : true
  "aabcdd", // true : false
  "abcdee", // true : false
  "ababab" // false : true
];

const example = [
  "abcdef",
  "bababc",
  "abbcde",
  "abcccd",
  "aabcdd",
  "abcdee",
  "ababab"
];

module.exports = {
  input: input
};
