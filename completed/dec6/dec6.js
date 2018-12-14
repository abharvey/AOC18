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

function markClosestPoints(g, coordinates) {
    const grid = [...g];
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            // find closest coordinate
            const closestTwo = coordinates
                .map(pt => ({ key: pt.key, dist: manhattanDistance(pt, { x, y }) }))
                .sort((pt1, pt2) => pt1.dist - pt2.dist).slice(0, 2);

            if (closestTwo[0].dist != closestTwo[1].dist) {
                grid[x][y] = closestTwo[0].key;
            }
        }
    }

    return grid;
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

function ptNotOnEdge(pt, grid) {
    if (grid[0].includes(pt.key) || grid[grid.length - 1].includes(pt.key)) {
        return false;
    }
    for (let x = 0; x < grid.length; x++) {
        if (grid[x][0].includes(pt.key) || grid[x][grid[x].length - 1].includes(pt.key)) {
            return false;
        }
    }
    return true;
}

function dec6(input) {
    const coordinates = input.map(coordinateFromString);

    const minX = Math.min(...coordinates.map(pt => pt.x));
    const maxX = Math.max(...coordinates.map(pt => pt.x));
    const minY = Math.min(...coordinates.map(pt => pt.y));
    const maxY = Math.max(...coordinates.map(pt => pt.y));

    const grid = markClosestPoints(buildGrid(maxX + 1, maxY + 1), coordinates);

    const viable = coordinates.filter(pt =>
        ptIsViable(pt, {
            minX,
            maxX,
            minY,
            maxY
        })).filter(pt => ptNotOnEdge(pt, grid)).map(pt => pt.key);

    const mostViable = Math.max(...Object.values(countViability(grid, viable))); //?
}

getInput('./test.txt', dec6);