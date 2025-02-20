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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMedicalRecord = addMedicalRecord;
exports.getAllMedicalRecords = getAllMedicalRecords;
exports.getMedicalRecordById = getMedicalRecordById;
exports.updateMedicalRecord = updateMedicalRecord;
exports.deleteMedicalRecord = deleteMedicalRecord;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Add a new medical record
function addMedicalRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            return yield prisma.medicalRecord.create({
                data: {
                    id: record.id,
                    date: record.date,
                    diagnosis: record.diagnosis,
                    treatment: record.treatment,
                    medications: record.medications,
                    nextCheckup: record.nextCheckup || null,
                    doctorNotes: record.doctorNotes,
                    maritimeFitnessStatus: record.maritimeFitnessStatus,
                    appointmentId: ((_a = record.appointment) === null || _a === void 0 ? void 0 : _a.id) || null,
                },
            });
        }
        catch (err) {
            console.error('Error adding medical record:', err);
            throw new Error("Failed to add medical record.");
        }
    });
}
// Get all medical records
function getAllMedicalRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.medicalRecord.findMany({
                include: {
                    appointment: {
                        include: { patient: true }
                    }
                },
            });
        }
        catch (err) {
            console.error('Error fetching medical records:', err);
            throw new Error("Failed to fetch medical records.");
        }
    });
}
// Get a medical record by ID
function getMedicalRecordById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.medicalRecord.findUnique({
                where: { id },
                include: {
                    appointment: {
                        include: { patient: true }
                    }
                },
            });
        }
        catch (err) {
            console.error(`Error fetching medical record with ID ${id}:`, err);
            throw new Error("Medical record not found.");
        }
    });
}
// Update a medical record by ID
function updateMedicalRecord(id, updatedData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.medicalRecord.update({
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
        }
        catch (err) {
            console.error(`Error updating medical record with ID ${id}:`, err);
            throw new Error("Failed to update medical record.");
        }
    });
}
// Delete a medical record by ID
function deleteMedicalRecord(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.medicalRecord.delete({
                where: { id },
            });
        }
        catch (err) {
            console.error(`Error deleting medical record with ID ${id}:`, err);
            throw new Error("Failed to delete medical record.");
        }
    });
}
