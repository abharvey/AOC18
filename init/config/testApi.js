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

const pixelApi = lines => {
  const input = lines.reduce(
    (obj, line) => {
      console.log(line);
      const pixel = line
        .replace("position=<", "")
        .replace(">", "")
        .split(" velocity=<");

      console.log(pixel);
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
  console.log(input);
};

getInput("./api/testinput.txt", pixelApi);
