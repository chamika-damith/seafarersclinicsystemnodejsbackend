import { PrismaClient } from '@prisma/client';
import Patient from "../model/patient";

const prisma = new PrismaClient();

// Add a new patient
export async function addPatient(p: Patient) {
    try {
        const newPatient = await prisma.patient.create({
            data: {
                id: p.id,
                name: p.name,
                dateOfBirth: p.dateOfBirth,
                nationality: p.nationality,
                seamanBookNumber: p.seamanBookNumber,
                vesselName: p.vesselName,
                company: p.company,
            },
        });
        console.log('Patient Added:', newPatient);
        return newPatient;
    } catch (err) {
        console.log('Error adding patient:', err);
    }
}

// Delete a patient by ID
export async function deletePatient(id: string) {
    try {
        await prisma.patient.delete({
            where: { id: id },
        });
        console.log('Patient deleted:', id);
    } catch (err) {
        console.log('Error deleting patient:', err);
    }
}

// Get all patients
export async function getAllPatients() {
    try {
        return await prisma.patient.findMany();
    } catch (err) {
        console.log('Error getting patients from Prisma:', err);
    }
}

// Get a patient by ID
export async function getPatientById(id: string) {
    try {
        return await prisma.patient.findUnique({
            where: { id: id },
        });
    } catch (err) {
        console.log('Error fetching patient:', err);
    }
}

// Update a patient by ID
export async function updatePatient(id: string, p: Patient) {
    try {
        const updatedPatient = await prisma.patient.update({
            where: { id: id },
            data: {
                name: p.name,
                dateOfBirth: p.dateOfBirth,
                nationality: p.nationality,
                seamanBookNumber: p.seamanBookNumber,
                vesselName: p.vesselName,
                company: p.company,
            },
        });
        console.log('Patient updated:', updatedPatient);
    } catch (err) {
        console.log('Error updating patient:', err);
    }
}
