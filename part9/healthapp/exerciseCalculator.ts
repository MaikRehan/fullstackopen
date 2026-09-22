interface ParsedArguments {
    values: number[]
    target: number
}

const parseArguments = (args: string[]): ParsedArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const valueArray = args.slice(3).map(Number);

    if (!isNaN(Number(args[2])) && !valueArray.some(isNaN)) {
        return {
            values: valueArray,
            target: Number(args[2])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

interface ExerciseResults {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    comment: string
    target: number
    average: number
}


const calcExercises = (target: number, exercises: number[]): ExerciseResults => {
    const periodLength: number = exercises.length;

    let trainingDays: number = 0;
    for (let i = 0; i < exercises.length; i++) {
        if (exercises[i] > 0)
            trainingDays = trainingDays + 1;
    }

    let average: number = 0;
    for (let i = 0; i < exercises.length; i++) {
        average += exercises[i];
    }
    average = average / periodLength;

    let rating: number = 0;
    let comment: string = '';
    if (target < average) {
        rating = 3;
        comment = 'good job';
    } else if (target < average * 2) {
        rating = 2;
        comment = 'good, but could be better';
    } else if (target < average * 4) {
        rating = 1;
        comment = 'train some more';
    }

    let success: boolean = true;
    if (average < target) {
        success = false;
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        comment: comment,
        target: target,
        average: average
    };
};

try {
    const {target, values} = parseArguments(process.argv);
    console.log(calcExercises(target, values));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}