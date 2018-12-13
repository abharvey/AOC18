const fs = require("fs");

function getInput(filePath, callBack) {
  const readInput = cb => (error, input) => {
    if (error) {
      console.error("ERROR:", error);
    }
    const inputArray = input.split("\n");
    cb(inputArray);
  };

  fs.readFile(`${filePath}`, "UTF8", readInput(callBack));
}

const withEndPosition = p => {
  let t = 100000;
  const afterPix = {
    xStart: p.xPos,
    yStart: p.yPos,
    xEnd: p.xPos + p.xVel * t,
    yEnd: p.yPos + p.yVel * t
  };
  return afterPix;
};
const pixelIsConverging = p => {
  if (
    Math.abs(p.xPos + p.xVel) < Math.abs(p.xPos) &&
    Math.abs(p.yPos + p.yVel) < Math.abs(p.yPos)
  ) {
    return true;
  }
  return false;
};

const waitUntilVisible = pixels => {
  return pixels
    .map(p => ({
      xPos: p.position[0],
      yPos: p.position[1],
      xVel: p.velocity[0],
      yVel: p.velocity[1]
    }))
    .filter(p => pixelIsConverging(p))
    .map(p => withEndPosition(p));
};

const pixelApi = lines => {
  const input = lines.reduce(
    (obj, line) => {
      //   console.log(line);
      const pixel = line
        .replace("position=<", "")
        .replace(">", "")
        .split(" velocity=<");

      //   console.log(pixel);
      const position = pixel[0].split(", ").map(p => parseInt(p, 10));
      const velocity = pixel[1].split(", ").map(v => parseInt(v, 10));
      obj.pixels.push({
        position,
        velocity
      });
      return obj;
    },
    { pixels: [] }
  );
  //   res.send(input);

  const pixels = waitUntilVisible(input.pixels);

  console.log(pixels);
};

getInput("./api/input.txt", pixelApi);
