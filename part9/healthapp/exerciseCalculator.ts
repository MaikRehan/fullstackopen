/**
 *

 interface ParsedArguments {
 value1: [number]
 value2: number
 }
 const parseArguments = (args: string[]): ParsedArguments => {
 if (args.length < 2) throw new Error('Not enough arguments');

 if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {


 return {
 paramter1: Number(args[2]),
 }
 } else {
 throw new Error('Provided values were not numbers!');
 }

 try {
 if (process.argv.length < 1) {
 calculateBmi(value1, value2)
 }

 } catch (error: unknown) {
 let errorMessage = 'Something bad happened.'
 if (error instanceof Error) {
 errorMessage += ' Error: ' + error.message;
 }
 }
 console.log(errorMessage);
 }

 */

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
    let periodLength: number = exercises.length

    let trainingDays: number = 0
    for (let i = 0; i < exercises.length; i++) {
        if (exercises[i] > 0)
            trainingDays = trainingDays + 1
    }

    let average: number = 0
    for (let i = 0; i < exercises.length; i++) {
        average += exercises[i]
    }
    average = average / periodLength

    let rating: number = 0
    let comment: string = ''
    if (target < average) {
        rating = 3
        comment = 'good job'
    } else if (target < average * 2) {
        rating = 2
        comment = 'good, but could be better'
    } else if (target < average * 4) {
        rating = 1
        comment = 'train some more'
    }

    let success: boolean = true
    if (average < target) {
        success = false
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        comment: comment,
        target: target,
        average: average
    }
}

const parameter1 = [3, 0, 2, 4.5, 0, 3, 1]
const parameter2 = 2
console.log(calcExercises(parameter2, parameter1))
