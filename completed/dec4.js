const { getInput } = require("./readInput");



function dec4(input) {
    const sortedInput = input.map(line => ({
        line,
        date: Date.parse(line.match(/\d\d\d\d-\d\d-\d\d \d\d:\d\d/)[0])
        // awful regex because aidan doesn't want regex
    })).sort((a, b) => a.date - b.date);

    let i = 0, currentGuard;
    const guards = {};
    while (i < sortedInput.length) {
        // count some guard shit
        if (sortedInput[i].line.match(/#[0-9]*/)) {
            currentGuard = sortedInput[i].line.match(/#[0-9]*/)[0];
            if (!guards[currentGuard]) {
                guards[currentGuard] = {
                    id: currentGuard,
                    sleep: 0,
                    start: [],
                    end: []
                };
            }
            i++;
        } else if (sortedInput[i].line.includes('falls asleep')) {
            const startTime = sortedInput[i].date;
            const endTime = sortedInput[i + 1].date;

            guards[currentGuard].sleep += (endTime - startTime) / 1000 / 60;
            guards[currentGuard].start.push(new Date(startTime).getMinutes());
            guards[currentGuard].end.push(new Date(endTime).getMinutes());
            i += 2;
        }
    }

    // const sleepiestGuard = Object.values(guards).reduce((max, guard) => guard.sleep > max.sleep ? guard : max);

    const sleepyGuards = Object.values(guards).map(guard => {
        const timeMatrix = [];
        for (let i = 0; i < guard.start.length; i++) {
            for (let j = 0; j < 60; j++) {
                if (!timeMatrix[j]) {
                    timeMatrix[j] = 0;
                }

                if (j >= guard.start[i] && j < guard.end[i]) {
                    timeMatrix[j] += 1;
                }
            }
        }

        guard.asleepTheMostAt = timeMatrix.reduce((max, count, minute, arr) => count > arr[max[0]] ? [minute, count] : max,
            [0, 0]);
        // console.table(guard);
        return guard;
    });


    console.table(sleepyGuards);
    const frequentSleeper = sleepyGuards.reduce((frequent, guard) => guard.asleepTheMostAt[1] > frequent.asleepTheMostAt[1] ? guard : frequent, sleepyGuards[0]);

    console.table(frequentSleeper);
}

getInput("./dec4.txt", dec4);
