import { PrismaClient } from '@prisma/client';
import Appointment from "../model/appointment";

const prisma = new PrismaClient();

// Add a new appointment
export async function addAppointment(a: Appointment) {
    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                id: a.id,
                patientId: a.patient.id,
                date: a.date,
                time: a.time,
                appointmentType: a.appointmentType,
                appointmentStatus: a.appointmentStatus,
                notes: a.notes,
            },
        });
        console.log('Appointment Added:', newAppointment);
        return newAppointment;
    } catch (err) {
        console.log('Error adding appointment:', err);
    }
}

// Get all appointments
export async function getAllAppointments() {
    try {
        return await prisma.appointment.findMany();
    } catch (err) {
        console.log('Error fetching appointments:', err);
    }
}

// Get an appointment by ID
export async function getAppointmentById(id: string) {
    try {
        return await prisma.appointment.findUnique({ where: { id } });
    } catch (err) {
        console.log('Error fetching appointment:', err);
    }
}

// Update an appointment by ID
export async function updateAppointment(id: string, a: Appointment) {
    try {
        const updatedAppointment = await prisma.appointment.update({
            where: { id },
            data: {
                patientId: a.patient.id,
                date: a.date,
                time: a.time,
                appointmentType: a.appointmentType,
                appointmentStatus: a.appointmentStatus,
                notes: a.notes,
            },
        });
        console.log('Appointment Updated:', updatedAppointment);
    } catch (err) {
        console.log('Error updating appointment:', err);
    }
}

// Delete an appointment by ID
export async function deleteAppointment(id: string) {
    try {
        await prisma.appointment.delete({ where: { id } });
        console.log('Appointment deleted:', id);
    } catch (err) {
        console.log('Error deleting appointment:', err);
    }
}
