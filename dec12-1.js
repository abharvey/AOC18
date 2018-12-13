const { getInput } = require("./readInput");

function willHavePlant(l1, l2, c, r1, r2, rule) {
  if (rule.plants.join("") === `${l1}${l2}${c}${r1}${r2}`) return rule.result;

  return ".";
}

//apply rule
function applyRule(rule, initial) {
  // rule: [. . # . .]
  const padding = "...".split("");
  const firstThree = initial.slice(0, 2);
  const lastThree = initial.slice(initial.length - 3, initial.length);
  if (firstThree.includes("#")) {
    initial.unshift(...padding);
  }

  if (lastThree.includes("#")) {
    initial.push(...padding);
  }

  let result = new Array(initial.length + 3);
  for (let i = 3; i < initial.length; i++) {
    result[i] = willHavePlant(
      initial[i - 2],
      initial[i - 1],
      initial[i],
      initial[i + 1],
      initial[i + 2],
      rule
    );
  }
  return result;
}

function diffResults(ruleResult1, ruleResult2) {
  if (ruleResult1.length < 1) {
    return ruleResult2;
  }

  for (let i = 0; i < ruleResult1.length; i++) {
    if (ruleResult1[i] === "#" || ruleResult2[i] === "#") {
      ruleResult2[i] = "#";
    } else {
      ruleResult2[i] = ".";
    }
  }

  return ruleResult2;
}

function buildRule(line) {
  const result = line.split(" => ")[1];
  const plants = line.split(" => ")[0].split("");
  return {
    plants,
    result
  };
}

function dec12(input) {
  const initial = [".", ".", "."];
  initial.push(...input[0].replace("initial state: ", "").split(""));

  const ruleInput = input.reduce((acc, line, i) => {
    if (i > 1) {
      acc.push(line);
    }
    return acc;
  }, []);

  const rules = ruleInput.map(buildRule);
  //for rule, apply rule to initial, then diff result with new result
  let result = [...initial];
  for (let i = 0; i < 20; i++) {
    const applied = rules.map(r => applyRule(r, result));
    const diffed = applied.reduce(
      (arr, plantArr) => diffResults(arr, plantArr),
      []
    );
    result = diffResults(diffed, result);
  }
  console.log(result.join(""));
}

getInput("./test12.txt", dec12);
