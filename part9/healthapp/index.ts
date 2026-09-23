import express from 'express';
import bmiCalculator from './bmiCalculator.ts';
import {calcExercises} from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (!height || !weight) {
        res.status(400).send({
            error: 'malformatted parameters'
        });
    } else if ((isNaN(Number(height))) || isNaN(Number(weight))) {
        res.status(400).send({
            error: 'malformatted parameters'
        });
    } else {
        const response = bmiCalculator.calculateBmi(Number((height)), Number(weight));
        res.send({
                bmi: response.bmi,
                weight: Number(weight),
                height: Number(height)
            }
        ).status(200);
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if (!target || !daily_exercises) {
        return res.status(400).send(
            {
                error: 'parameters missing',
            }
        );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    if (daily_exercises.some((value) => isNaN(Number(value))) || isNaN(Number(target))) {

        return res.status(400).send({error: 'malformatted parameters',});
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const result = calcExercises(Number(target),  daily_exercises.map(Number));

    return res.send(
        {
            periodLength: Number(result.periodLength),
            trainingDays: Number(result.trainingDays),
            success: Boolean(result.success),
            rating: Number(result.rating),
            ratingDescription: String(result.comment),
            target: Number(result.target),
            average: Number(result.average),
        });

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});