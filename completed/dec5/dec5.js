const { getInput } = require("../readInput");

function charShouldReact(leftChar, rightChar) {
    return leftChar.toUpperCase() === rightChar.toUpperCase() && leftChar !== rightChar;
}

function shouldReact(left, polymer) {
    const leftChar = left[left.length - 1];
    const rightChar = polymer[0];
    const should = charShouldReact(leftChar, rightChar);
    // if (should) {
    //     reactionCount[leftChar.toLowerCase()] = reactionCount[leftChar.toLowerCase()] + 1 || 1;
    // }
    return should;
}

function arraysEmpty(left, polymer) {
    return polymer.length === 0 || left.length === 0;
}
// Gives same solution as formPolymerWhile1
function formPolymer(polymer) {
    let left = [];
    left.push(polymer[0]);
    polymer = polymer.slice(1);
    while (polymer.length > 0) {
        if (!arraysEmpty(left, polymer) && shouldReact(left, polymer)) {
            left = left.slice(0, left.length - 1);
            polymer = polymer.slice(1);
        } else {
            left.push(polymer[0]);
            polymer = polymer.slice(1);
        }
    }
    return left;
}


function dec5(input) {
    let polymer = input[0].split('');

    const removeChar = (poly, char) => {
        return poly.filter(c => c.toLowerCase() != char.toLowerCase());
    }

    const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const formed = alpha
        .map(unit => removeChar(polymer, unit))
        .map(poly => formPolymer(poly))
        .map(poly => poly.join(''))
        .map(string => string.length)
        .sort((a, b) => a - b);
    // Mine
    console.log(formed[0]);

    const min = alpha.reduce((max, char) => {
        let temp = input[0]
            .split(char)
            .join("")
            .split(char.toUpperCase())
            .join("");
        return Math.min(max, formPolymer(temp).length);
    }, input[0].length);
    // Aidan's
    console.log(min);
}

getInput("./dec5.txt", dec5);

//test data
//dabAcCaCBAcCcaDA
//dabAcCaCBAcCcaDAxxaaDCBaAbcdAA
//xxaaDCBaAbcdAA
