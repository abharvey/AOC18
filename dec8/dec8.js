const { getInput } = require("../readInput");

var heads = [];

function sumMetas(node, startIndex) {
  // [children, metas, ...metas || ...children]

  const head = node.slice(startIndex, startIndex + 2);
  heads.push({ [startIndex]: head[0], [startIndex + 1]: head[1] });
  if (head[0] === 0) {
    return { endIndex: startIndex + head[1] + 1 };
  }

  let nextChild = startIndex + 2; //?
  let sum = 0;
  for (let i = 0; i < head[0]; i++) {
    resolved = sumMetas(node, nextChild);
    nextChild = resolved.endIndex + 1;
  }

  return { endIndex: startIndex + nextChild };
}

function dec8(input) {
  const numStrings = input[0].split(" ");
  const nums = numStrings.map(n => parseInt(n, 10));
  const metaSum = sumMetas(nums, 0, []); //?
  console.log(heads);
  const headIndices = heads.reduce(
    (indices, head) => indices.concat(Object.keys(head)),
    []
  );
  //   console.log(headIndices);

  for (let i = 0; i < headIndices.length; i++) {
    nums[headIndices[i]] = null;
  }
  //   console.log(nums);
  const metas = nums.filter(n => n);
  //   console.log(metas);
  const sum = metas.reduce((acc, num) => acc + num, 0);
  console.log(sum);
}

getInput("./test8.txt", dec8);

/*
2 3 0 3 10 11 12 1 1 0  1 99  2  1  1  2
0 1 2 3  4  5  6 7 8 9 10 11 12 13 14 15
| | | |          | | |  |
10,11,12,99,2,1,1,2
*/
