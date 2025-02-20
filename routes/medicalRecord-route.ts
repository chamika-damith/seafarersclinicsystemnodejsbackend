import express from 'express';
import { addMedicalRecord, getAllMedicalRecords, getMedicalRecordById, updateMedicalRecord, deleteMedicalRecord } from "../database/medicalRecord-prisma-data-store";

const router = express.Router();

// Add a new medical record
router.post('/add', async (req, res) => {
    try {
        const medicalRecord = await addMedicalRecord(req.body);
        res.status(201).json(medicalRecord);
    } catch (err) {
        res.status(500).json({ error: 'Error adding medical record' });
    }
});

// Get all medical records
router.get('/get', async (req, res) => {
    try {
        const records = await getAllMedicalRecords();
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching medical records' });
    }
});

// Get a medical record by ID
router.get('/get/:id', async (req, res) => {
    try {
        const record = await getMedicalRecordById(req.params.id);
        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({ error: 'Medical record not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching medical record' });
    }
});

// Update a medical record by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedRecord = await updateMedicalRecord(req.params.id, req.body);
        res.status(200).json(updatedRecord);
    } catch (err) {
        res.status(500).json({ error: 'Error updating medical record' });
    }
});

// Delete a medical record by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        await deleteMedicalRecord(req.params.id);
        res.status(200).json({ message: 'Medical record deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting medical record' });
    }
});

export const medicalRecordRoute = router;