const { getInput } = require("./readInput");

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
    }, {});
}

function removeDoneValue(val, obj) {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = obj[key].filter(v => v !== val);
        return acc;
    }, {});
}

function getDoables(obj, workers) {
    return Object.keys(obj).reduce((doables, key) => {
        if (obj[key].length === 0) {
            doables.push(key);
        }

        return doables;
    }, []).filter(t => !tasksInProgress(workers).includes(t));
}

function tasksInProgress(workers) {
    return workers.filter(w => w.task).map(w => w.task);
}

function removeDone(did, obj) {
    const newObj = { ...obj };
    delete newObj[did];
    return newObj;
}

function computeDuration(task) {
    return 60 + (task.toLowerCase().charCodeAt(0) - 96);
}

function performWork(time, workers) {
    return workers.map(worker => ({ ...worker, timeRemaining: Math.max(worker.timeRemaining - time, 0) }));
}

const workIsComplete = w => w.timeRemaining === 0;

function getCompletedWork(workers) {
    return workers.filter(workIsComplete).map(w => w.task).filter(w => w);
}

function clearCompletedWork(workers) {
    return workers.map(w => {
        if (workIsComplete(w)) {
            return { ...w, task: null };
        }
        return w;
    });
}

function nextInterval(workers) {
    return workers.sort((w1, w2) => w1.timeRemaining - w2.timeRemaining).filter(w => w.timeRemaining > 0)[0].timeRemaining;
}

function availableWorker(workers) {
    return workers.reduce((available, worker) => {
        if (worker.timeRemaining === 0) {
            return worker
        }
        return available;
    }, null);
}

function initWorkers(num) {
    const workers = [];
    for (let i = 0; i < num; i++) {
        workers.push({ id: i, task: null, timeRemaining: 0 });
    }
    return workers;
}

function haveWorkToDo(workers) {
    return workers.some(w => w.timeRemaining > 0);
}

function dec7(input) {
    let instructions = input.map(getToFrom);
    const order = [];
    let workers = initWorkers(5);
    const required = requiredObject(instructions);

    let currentTime = 0;
    let newReq = required;
    while (Object.keys(newReq).length > 0 || haveWorkToDo(workers)) {
        // if there are tasks
        const toDos = getDoables(newReq, workers);
        for (let i = 0; i < toDos.length; i++) {
            const toDo = toDos[i];
            // if there are available workers
            const worker = availableWorker(workers);
            if (worker) {
                // assign task to a worker
                worker.task = toDo;
                worker.timeRemaining = computeDuration(toDo);
            } else {
                break;
            } //else don't do work yet so break;
        }
        console.log(workers);
        // 'wait' for next task to complete
        const waitInterval = nextInterval(workers);
        console.log('Current Time:', currentTime, 'sec');
        console.log('Next Tick Duration:', waitInterval);
        // perform work, add work performed to current time
        workers = performWork(waitInterval, workers);
        currentTime += waitInterval;
        console.log('Work Completed @', currentTime, 'sec');

        // clear completed work and add to the completed order
        const completed = getCompletedWork(workers);
        for (let i = 0; i < completed.length; i++) {
            newReq = removeDone(completed[i], removeDoneValue(completed[i], newReq));
            order.push(completed[i]);
        }
        workers = clearCompletedWork(workers);
    }

    console.log(order.join(""), currentTime);
}

getInput("./dec7.txt", dec7);
