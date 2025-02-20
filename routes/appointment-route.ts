import express from 'express';
import { addAppointment, deleteAppointment, getAllAppointments, getAppointmentById, updateAppointment } from "../database/appointment-prisma-data-store";
import Appointment from "../model/appointment";

const router = express.Router();

// Add a new appointment
router.post('/add', async (req, res) => {
    const { id, patientId, date, time, appointmentType, appointmentStatus, notes } = req.body;
    const newAppointment = new Appointment(id, patientId, date, time, appointmentType, appointmentStatus, notes);

    try {
        const appointment = await addAppointment(newAppointment);
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ error: 'Error adding appointment' });
    }
});

// Get all appointments
router.get('/get', async (req, res) => {
    try {
        const appointments = await getAllAppointments();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
});

// Get an appointment by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await getAppointmentById(id);
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching appointment' });
    }
});

// Update an appointment
router.put('/update', async (req, res) => {
    const { id, patientId, date, time, appointmentType, appointmentStatus, notes } = req.body;
    const updatedAppointment = new Appointment(id, patientId, date, time, appointmentType, appointmentStatus, notes);

    try {
        await updateAppointment(id, updatedAppointment);
        res.status(200).json({ message: `Appointment ${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error updating appointment' });
    }
});

// Delete an appointment by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteAppointment(id);
        res.status(200).json({ message: `Appointment ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting appointment' });
    }
});

export const appointmentRouter = router;
