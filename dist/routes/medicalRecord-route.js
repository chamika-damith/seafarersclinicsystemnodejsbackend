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
exports.medicalRecordRoute = void 0;
const express_1 = __importDefault(require("express"));
const medicalRecord_prisma_data_store_1 = require("../database/medicalRecord-prisma-data-store");
const router = express_1.default.Router();
// Add a new medical record
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicalRecord = yield (0, medicalRecord_prisma_data_store_1.addMedicalRecord)(req.body);
        res.status(201).json(medicalRecord);
    }
    catch (err) {
        res.status(500).json({ error: 'Error adding medical record' });
    }
}));
// Get all medical records
router.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield (0, medicalRecord_prisma_data_store_1.getAllMedicalRecords)();
        res.status(200).json(records);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching medical records' });
    }
}));
// Get a medical record by ID
router.get('/get/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = yield (0, medicalRecord_prisma_data_store_1.getMedicalRecordById)(req.params.id);
        if (record) {
            res.status(200).json(record);
        }
        else {
            res.status(404).json({ error: 'Medical record not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching medical record' });
    }
}));
// Update a medical record by ID
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRecord = yield (0, medicalRecord_prisma_data_store_1.updateMedicalRecord)(req.params.id, req.body);
        res.status(200).json(updatedRecord);
    }
    catch (err) {
        res.status(500).json({ error: 'Error updating medical record' });
    }
}));
// Delete a medical record by ID
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, medicalRecord_prisma_data_store_1.deleteMedicalRecord)(req.params.id);
        res.status(200).json({ message: 'Medical record deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Error deleting medical record' });
    }
}));
exports.medicalRecordRoute = router;
