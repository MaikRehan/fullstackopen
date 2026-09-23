export type Operation = 'multiply' | 'add' | 'divide';

export const calculator = (a: number, b: number, operation: Operation): number => {
    switch (operation) {
        case "multiply":
            return a * b;
        case "divide":
            if (b === 0) throw new Error('can\'t divide by 0!');
            return a / b;
        case "add":
            return a + b;
        default:
            throw new Error('unknown operation: ' + operation);
    }
};
try {
    console.log(calculator(1, 5, 'divide'));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])

calculator(a, b, 'divide');


