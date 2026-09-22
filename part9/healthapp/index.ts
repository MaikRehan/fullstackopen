import express from 'express';
import bmiCalculator from './bmiCalculator.ts';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});