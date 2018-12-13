const { getInput } = require("./readInput");

function ruleMatches(ruleString, substring) {
  //   console.log(ruleString, substring);
  return ruleString === substring;
}

function dec12(input) {
  const initial = `...${input[0].replace("initial state: ", "")}...`;
  const rules = input.reduce((acc, r, i) => {
    const rule = r.split(" => ");
    if (i > 1) {
      acc[rule[0]] = rule[1] === "#" ? "#" : ".";
    }
    return acc;
  }, {});

  const ruleStrings = Object.keys(rules);
  let current = initial;
  let next = current;
  for (let i = 0; i < ruleStrings.length; i++) {
    const currentRule = ruleStrings[i];

    if (
      current.substring(current.length - 3, current.length - 1).includes("#")
    ) {
      current = `${current}...`;
    }
    if (current.substring(0, 2).includes("#")) {
      current = `...${current}`;
    }

    for (let j = 2; j < current.length - 3; j++) {
      let nextArr = next.split("");
      if (ruleMatches(currentRule, current.substring(j - 2, j + 3))) {
        console.log(
          `replacing: ${nextArr[j]} with ${
            rules[ruleStrings[i]]
          } at ${j} with rule ${i}`
        );
        nextArr.splice(j, 1, rules[ruleStrings[i]]);
        next = nextArr.join("");
      }
    }
  }
  console.log(next);
  /* Expected:       ...#...#....#.....#..#..#..#........... */
}

getInput("./test12.txt", dec12);
