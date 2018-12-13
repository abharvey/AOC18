const fs = require("fs");

function test(points) {
  const minY = points.reduce((min, point) => {
    return Math.min(min, point.y);
  }, points[0].y);
  const maxY = points.reduce((max, point) => {
    return Math.max(max, point.y);
  }, points[0].y);
  return maxY - minY >= 10;
}

function parseLine(line) {
  return line;
}

function printPoints(points) {
  const minX = points.reduce((min, point) => {
    return Math.min(min, point.x);
  }, points[0].x);
  const maxX = points.reduce((max, point) => {
    return Math.max(max, point.x);
  }, points[0].x);
  const minY = points.reduce((min, point) => {
    return Math.min(min, point.y);
  }, points[0].y);
  const maxY = points.reduce((max, point) => {
    return Math.max(max, point.y);
  }, points[0].y);

  for (let x = minX; x <= maxX; x++) {
    let line = "";
    for (let y = maxY; y >= minY; y--) {
      if (points.some(point => point.x === x && point.y === y)) {
        line += "#";
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
}

function read(error, input) {
  const points = input.split("\n").map(parseLine);
  let t;
  for (t = 0; test(points); t++) {
    points.forEach(point => {
      point.x += point.vx;
      point.y += point.vy;
    });
  }
  console.log(t);
  printPoints(points);
}
fs.readFile("./input.txt", "UTF8", read);
