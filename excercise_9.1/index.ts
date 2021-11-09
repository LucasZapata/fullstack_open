import express from "express";
import {calculateBmi} from "./calculateBmi ";
import { analyze, excerciseInput } from "./exerciseCalculator ";
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const params = req.query;
    if (!params.height || !params.weight){
        res.send('Missing height and weight data');
    }
    if (isNaN(Number(params.height)) || isNaN(Number(params.weight))){
        res.send('Missing height and weight data');
    }
    else res.send(calculateBmi(Number(params.height), Number(params.weight)));
});

app.post('/excercise', (req, res) => {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body as excerciseInput;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if(!body.dailyTraining || !body.target)
        res.send('Missing height and weight data');
    res.send(analyze(body));
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
