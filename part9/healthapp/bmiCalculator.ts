interface CalculateBmi {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): CalculateBmi => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (mass: number, height: number) => {
    const bmiValue = (mass / ((height/ 100) * (height/ 100)));
    if (bmiValue < 0) {
        throw new Error('no negative values allowed');
    } else if (bmiValue < 18.5) {
        console.log('Underweight');
    } else if (bmiValue > 18.5 && bmiValue < 25) {
        console.log('Normal range');
    } else if (bmiValue > 25 && bmiValue < 30) {
        console.log('Overweight');
    } else if (bmiValue > 30) {
        console.log('Obese');
    }
}

try {
    const {value1, value2} = parseArguments(process.argv);
    calculateBmi(value1, value2)
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}