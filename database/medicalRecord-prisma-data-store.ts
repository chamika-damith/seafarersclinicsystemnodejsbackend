import { PrismaClient } from '@prisma/client';
import MedicalRecord from "../model/medicalRecord";

const prisma = new PrismaClient();

// Add a new medical record
export async function addMedicalRecord(record: MedicalRecord) {
    try {
        return await prisma.medicalRecord.create({
            data: {
                id: record.id,
                date: record.date,
                diagnosis: record.diagnosis,
                treatment: record.treatment,
                medications: record.medications,
                nextCheckup: record.nextCheckup || null,
                doctorNotes: record.doctorNotes,
                maritimeFitnessStatus: record.maritimeFitnessStatus,
                appointmentId: record.appointment?.id || null,
            },
        });
    } catch (err) {
        console.error('Error adding medical record:', err);
        throw new Error("Failed to add medical record.");
    }
}

// Get all medical records
export async function getAllMedicalRecords() {
    try {
        return await prisma.medicalRecord.findMany({
            include: {
                appointment: {
                    include: { patient: true }
                }
            },
        });

    } catch (err) {
        console.error('Error fetching medical records:', err);
        throw new Error("Failed to fetch medical records.");
    }
}

// Get a medical record by ID
export async function getMedicalRecordById(id: string) {
    try {
        return await prisma.medicalRecord.findUnique({
            where: { id },
            include: {
                appointment: {
                    include: { patient: true }
                }
            },
        });

    } catch (err) {
        console.error(`Error fetching medical record with ID ${id}:`, err);
        throw new Error("Medical record not found.");
    }
}

// Update a medical record by ID
export async function updateMedicalRecord(id: string, updatedData: Partial<MedicalRecord>) {
    try {
        return await prisma.medicalRecord.update({
            where: { id },
            data: {
                date: updatedData.date,
                diagnosis: updatedData.diagnosis,
                treatment: updatedData.treatment,
                medications: updatedData.medications,
                nextCheckup: updatedData.nextCheckup,
                doctorNotes: updatedData.doctorNotes,
                maritimeFitnessStatus: updatedData.maritimeFitnessStatus,
                appointment: updatedData.appointment
                    ? { connect: { id: updatedData.appointment.id } }
                    : undefined,
            },
            include: { appointment: true }, // Ensure updated appointment data is returned
        });
    } catch (err) {
        console.error(`Error updating medical record with ID ${id}:`, err);
        throw new Error("Failed to update medical record.");
    }
}


// Delete a medical record by ID
export async function deleteMedicalRecord(id: string) {
    try {
        return await prisma.medicalRecord.delete({
            where: { id },
        });
    } catch (err) {
        console.error(`Error deleting medical record with ID ${id}:`, err);
        throw new Error("Failed to delete medical record.");
    }
}
