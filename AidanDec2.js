const fs = require("fs");

function hasNumber(line, num) {
  const set = {};
  for (c of line) {
    if (set[c]) {
      set[c] += 1;
    } else {
      set[c] = 1;
    }
  }
  return Object.values(set).some(val => val === num);
}

function hasTwo(line) {
  return hasNumber(line, 2);
}

function hasThree(line) {
  return hasNumber(line, 3);
}

function read(error, input) {
  const lines = input.split("\n");
  const sum = lines.reduce(
    (values, line) => {
      if (hasTwo(line)) {
        values[2] += 1;
      }
      if (hasThree(line)) {
        values[3] += 1;
      }
      return values;
    },
    { 2: 0, 3: 0 }
  );
  console.log(sum);

  console.log(sum[2] * sum[3]);
}
fs.readFile("./input.txt", "UTF8", read);
