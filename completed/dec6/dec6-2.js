const { getInput } = require('../readInput');

// manhattan distance is  the distance between two points is the sum of the absolute differences of their Cartesian coordinates.
// two points (3, 5) & (5, 7) distance = (3-5, 5-7) = (2+2) = 4;
function manhattanDistance(pt1, pt2) {
    return Math.abs(pt1.x - pt2.x) + Math.abs(pt1.y - pt2.y);
}

function coordinateFromString(string) {
    const coordinate = string.split(',').map(str => parseInt(str, 10));
    return { key: string, x: coordinate[0], y: coordinate[1] };
}

function buildGrid(width, height) {
    const grid = [[]];
    for (let i = 0; i < width; i++) {
        grid[i] = [];
        for (let j = 0; j < height; j++) {
            grid[i].push('x');
        }
    }
    return grid;
}

function ptIsViable(pt, ranges) {
    return pt.x > ranges.minX && pt.x < ranges.maxX && pt.y > ranges.minY && pt.y < ranges.maxY
}

function countDistancesLessThan(num, g, coordinates) {
    const grid = [...g];
    let count = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            // math the distances
            grid[x][y] = coordinates.reduce((sum, pt) => {
                sum = sum + manhattanDistance(pt, { x, y });
                return sum;
            }, 0);
            if (grid[x][y] < num) {
                count++;
            }
        }
    }
    return count; /* ? */
}

function countViability(g, v) {
    const viability = {};
    for (let x = 0; x < g.length; x++) {
        for (let y = 0; y < g[x].length; y++) {
            if (v.includes(g[x][y])) {
                if (!viability[g[x][y]]) {
                    viability[g[x][y]] = 1;
                } else {
                    viability[g[x][y]]++;
                }
            }
        }
    }
    return viability;
}

function dec6(input) {
    const coordinates = input.map(coordinateFromString);

    const minX = Math.min(...coordinates.map(pt => pt.x));
    const maxX = Math.max(...coordinates.map(pt => pt.x));
    const minY = Math.min(...coordinates.map(pt => pt.y));
    const maxY = Math.max(...coordinates.map(pt => pt.y));

    const regionSize = countDistancesLessThan(10000, buildGrid(maxX + 1, maxY + 1), coordinates);

    // console.table(grid);
}

getInput('./dec6.txt', dec6);