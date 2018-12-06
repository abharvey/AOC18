const { getInput } = require("./inputs/readInput");

function initializeFabric(fabricSize) {
  //Put an extra row/column in so we get an empty bottom edge for good looks
  const fabric = [];
  for (let i = 0; i <= fabricSize[0]; i++) {
    const row = [];
    for (let j = 0; j <= fabricSize[1]; j++) {
      row.push(null);
    }
    fabric.push(row);
  }
  return fabric;
}

function dec3(input) {
  const patches = input.map(line => {
    const id = line.match(/#[0-9]*/)[0];
    const coordinates = line.match(/[0-9]*,[0-9]*/)[0];
    const dimensions = line.match(/[0-9]*x[0-9]*/)[0];

    return {
      id,
      x: parseInt(coordinates.split(",")[0], 10),
      y: parseInt(coordinates.split(",")[1], 10),
      w: parseInt(dimensions.split("x")[0], 10),
      h: parseInt(dimensions.split("x")[1], 10),
      overlapping: false
    };
  });

  const minFabricSize = patches.reduce(
    (size, patch) => {
      const newSize = [patch.x + patch.w, patch.y + patch.h];

      if (newSize[0] < size[0]) {
        newSize[0] = size[0];
      }
      if (newSize[1] < size[1]) {
        newSize[1] = size[1];
      }
      return newSize;
    },
    [0, 0]
  );

  const fabric = initializeFabric(minFabricSize);

  for (let patch of patches) {
    if (patch) {
      for (let i = patch.x; i < patch.w + patch.x; i++) {
        for (let j = patch.y; j < patch.h + patch.y; j++) {
          if (fabric[i][j]) {
            fabric[i][j].overlapping = true;
            patch.overlapping = true;
          }
          fabric[i][j] = patch;
        }
      }
    }
  }
  //   console.table(fabric);

  //   const overlap = fabric.reduce(
  //     (sum, row) => sum + row.reduce((s, c) => (c > 1 ? s + 1 : s), 0),
  //     0
  //   );
  //   console.info(overlap);
  const noOverlap = patches.filter(patch => !patch.overlapping);
  console.log(noOverlap);
}

getInput("./inputs/dec3.txt", dec3);

/*
    #1 @ 1,3: 4x4
    #2 @ 3,1: 4x4
    #3 @ 5,5: 2x2 
    
    [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ]
 */
