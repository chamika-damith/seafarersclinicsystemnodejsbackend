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
exports.addPatient = addPatient;
exports.deletePatient = deletePatient;
exports.getAllPatients = getAllPatients;
exports.getPatientById = getPatientById;
exports.updatePatient = updatePatient;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Add a new patient
function addPatient(p) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newPatient = yield prisma.patient.create({
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
        }
        catch (err) {
            console.log('Error adding patient:', err);
        }
    });
}
// Delete a patient by ID
function deletePatient(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.patient.delete({
                where: { id: id },
            });
            console.log('Patient deleted:', id);
        }
        catch (err) {
            console.log('Error deleting patient:', err);
        }
    });
}
// Get all patients
function getAllPatients() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.patient.findMany();
        }
        catch (err) {
            console.log('Error getting patients from Prisma:', err);
        }
    });
}
// Get a patient by ID
function getPatientById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.patient.findUnique({
                where: { id: id },
            });
        }
        catch (err) {
            console.log('Error fetching patient:', err);
        }
    });
}
// Update a patient by ID
function updatePatient(id, p) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedPatient = yield prisma.patient.update({
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
        }
        catch (err) {
            console.log('Error updating patient:', err);
        }
    });
}
