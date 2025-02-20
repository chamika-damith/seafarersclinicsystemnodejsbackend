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
exports.appointmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const appointment_prisma_data_store_1 = require("../database/appointment-prisma-data-store");
const appointment_1 = __importDefault(require("../model/appointment"));
const router = express_1.default.Router();
// Add a new appointment
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, patientId, date, time, appointmentType, appointmentStatus, notes } = req.body;
    const newAppointment = new appointment_1.default(id, patientId, date, time, appointmentType, appointmentStatus, notes);
    try {
        const appointment = yield (0, appointment_prisma_data_store_1.addAppointment)(newAppointment);
        res.status(201).json(appointment);
    }
    catch (err) {
        res.status(500).json({ error: 'Error adding appointment' });
    }
}));
// Get all appointments
router.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointment_prisma_data_store_1.getAllAppointments)();
        res.status(200).json(appointments);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
}));
// Get an appointment by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointment = yield (0, appointment_prisma_data_store_1.getAppointmentById)(id);
        if (appointment) {
            res.status(200).json(appointment);
        }
        else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching appointment' });
    }
}));
// Update an appointment
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, patientId, date, time, appointmentType, appointmentStatus, notes } = req.body;
    const updatedAppointment = new appointment_1.default(id, patientId, date, time, appointmentType, appointmentStatus, notes);
    try {
        yield (0, appointment_prisma_data_store_1.updateAppointment)(id, updatedAppointment);
        res.status(200).json({ message: `Appointment ${id} updated successfully` });
    }
    catch (err) {
        res.status(500).json({ error: 'Error updating appointment' });
    }
}));
// Delete an appointment by ID
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, appointment_prisma_data_store_1.deleteAppointment)(id);
        res.status(200).json({ message: `Appointment ${id} deleted successfully` });
    }
    catch (err) {
        res.status(500).json({ error: 'Error deleting appointment' });
    }
}));
exports.appointmentRouter = router;
