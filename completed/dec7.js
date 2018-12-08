const { getInput } = require('./readInput');

function getToFrom(line) {
    //Step B must be finished before step W can begin.
    return line
        .replace("Step ", "")
        .replace(" can begin.", "")
        .split(" must be finished before step ");
}

function requiredObject(instructions) {
    return instructions.reduce((obj, inst) => {
        obj[inst[1]] = obj[inst[1]] || [];
        obj[inst[0]] = obj[inst[0]] || [];
        obj[inst[1]].push(inst[0]);
        return obj;
    }, {})
}

function removeDoneValue(val, obj) {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = obj[key].filter(v => v !== val);
        return acc;
    }, {});
}

function getNextToDo(obj) {
    return Object.keys(obj).reduce((doables, key) => {
        if (obj[key].length === 0) {
            doables.push(key);
        }

        return doables; //?
    }, []).sort()[0];
}

function removeDone(did, obj) {
    const newObj = { ...obj };
    delete newObj[did];
    return newObj;
}

function dec7(input) {
    let instructions = input.map(getToFrom);
    const order = [];

    const required = requiredObject(instructions);

    let newReq = required;
    while (Object.keys(newReq).length > 0) {
        const toDo = getNextToDo(newReq);
        newReq = removeDone(toDo, removeDoneValue(toDo, newReq));
        order.push(toDo);
    }

    console.log(order.join(''));
}

getInput('./dec7.txt', dec7);