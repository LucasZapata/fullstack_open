import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";


const app = express();
app.use(express.json());
app.use((_req, _res, next) => { next(); }, cors({maxAge: 84600}));

app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientRouter);

app.get('/api/ping', (_req, res) =>{
    res.send('pong');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
