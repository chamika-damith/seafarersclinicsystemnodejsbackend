"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRoute = void 0;
const express_1 = __importDefault(require("express"));
const patient_prisma_data_store_1 = require("../database/patient-prisma-data-store");
const router = express_1.default.Router();
// Add a new patient
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, dateOfBirth, nationality, seamanBookNumber, vesselName, company } = req.body;
    const newPatient = { id, name, dateOfBirth, nationality, seamanBookNumber, vesselName, company };
    try {
        const patient = yield (0, patient_prisma_data_store_1.addPatient)(newPatient);
        res.status(201).json(patient);
    }
    catch (err) {
        res.status(500).json({ error: 'Error adding patient' });
    }
}));
// Get all patients
router.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield (0, patient_prisma_data_store_1.getAllPatients)();
        res.status(200).json(patients);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching patients' });
    }
}));
// Get a patient by ID
// @ts-ignore
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const patient = yield (0, patient_prisma_data_store_1.getPatientById)(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching patient' });
    }
}));
// Update a patient
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const { name, dateOfBirth, nationality, seamanBookNumber, vesselName, company } = req.body;
    const updatedPatient = { id, name, dateOfBirth, nationality, seamanBookNumber, vesselName, company };
    try {
        yield (0, patient_prisma_data_store_1.updatePatient)(id, updatedPatient);
        res.status(200).json({ message: `Patient ${id} updated successfully` });
    }
    catch (err) {
        res.status(500).json({ error: 'Error updating patient' });
    }
}));
// Delete a patient
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, patient_prisma_data_store_1.deletePatient)(id);
        res.status(200).json({ message: `Patient ${id} deleted successfully` });
    }
    catch (err) {
        res.status(500).json({ error: 'Error deleting patient' });
    }
}));
exports.patientRoute = router;
