import express from 'express';
import { addPatient, getAllPatients, getPatientById, updatePatient, deletePatient } from '../database/patient-prisma-data-store';

const router = express.Router();

// Add a new patient
router.post('/add', async (req, res) => {
    const { id, name, dateOfBirth, nationality, seamanBookNumber, vesselName, company } = req.body;

    const newPatient = { id, name, dateOfBirth, nationality, seamanBookNumber, vesselName, company };

    try {
        const patient = await addPatient(newPatient);
        res.status(201).json(patient);
    } catch (err) {
        res.status(500).json({ error: 'Error adding patient' });
    }
});

// Get all patients
router.get('/get', async (req, res) => {
    try {
        const patients = await getAllPatients();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching patients' });
    }
});

// Get a patient by ID
// @ts-ignore
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await getPatientById(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching patient' });
    }
});

// Update a patient
router.put('/update', async (req, res) => {
    const {id} = req.body;
    const { name, dateOfBirth, nationality, seamanBookNumber, vesselName, company } = req.body;

    const updatedPatient = { id, name, dateOfBirth, nationality, seamanBookNumber, vesselName, company };

    try {
        await updatePatient(id, updatedPatient);
        res.status(200).json({ message: `Patient ${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error updating patient' });
    }
});

// Delete a patient
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deletePatient(id);
        res.status(200).json({ message: `Patient ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting patient' });
    }
});

export const patientRoute = router;
