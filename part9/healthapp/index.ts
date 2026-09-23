import express from 'express';
import bmiCalculator from './bmiCalculator.ts';
import {calcExercises} from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const response = bmiCalculator.calculateBmi(weight, height);

    if (isNaN(height) || isNaN(weight)) {
        res.send({
            error: 'malformatted parameters',
        }).status(400);
    } else {
        res.send(response).status(200);
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { dailyExercises, target } = req.body;

    if ( !target || !dailyExercises)  {
        console.log(target);
        console.log(dailyExercises);
        return res.status(400).send(
            {
                error: 'missing values',
            }
        );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    if (dailyExercises.some(isNaN))  {
        return res.status(400).send({ error: 'malformed parameters',});
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calcExercises(target, dailyExercises);

    return res.send({ result });

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});