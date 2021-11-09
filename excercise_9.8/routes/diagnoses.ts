import express from "express";
import diagnosesJson from "../diagnoses.json";
import { Diagnosis } from "../types";

const diagnosesData: Array<Diagnosis> =  diagnosesJson as Array<Diagnosis>;

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosesData);
});

export default router;