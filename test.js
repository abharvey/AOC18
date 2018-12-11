const { getInput } = require("./readInput.js");
const { playGame } = require("./dec9.js");
const { p2 } = require("./dec92.js");

describe("dec9", () => {
  it.skip("9 players", () => {
    expect(playGame(9, 25)).toBe(32);
  });

  it("10 players", () => {
    expect(playGame(10, 1618)).toBe(8317);
    expect(p2(10, 1618)).toBe(8317);
  });

  it.skip("13 players", () => {
    expect(playGame(13, 7999)).toBe(146373);
  });

  it.skip("17 players", () => {
    expect(playGame(17, 1104)).toBe(2764);
  });

  it("21 players", () => {
    expect(playGame(21, 6111)).toBe(54718);
    expect(p2(21, 6111)).toBe(54718);
  });

  it.skip("30 players", () => {
    expect(playGame(30, 5807)).toBe(37305);
  });
});

/*
10 players; last marble is worth 1618 points: high score is 8317
13 players; last marble is worth 7999 points: high score is 146373
17 players; last marble is worth 1104 points: high score is 2764
21 players; last marble is worth 6111 points: high score is 54718
30 players; last marble is worth 5807 points: high score is 37305
*/
