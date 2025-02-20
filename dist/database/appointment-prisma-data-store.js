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
exports.addAppointment = addAppointment;
exports.getAllAppointments = getAllAppointments;
exports.getAppointmentById = getAppointmentById;
exports.updateAppointment = updateAppointment;
exports.deleteAppointment = deleteAppointment;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Add a new appointment
function addAppointment(a) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newAppointment = yield prisma.appointment.create({
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
        }
        catch (err) {
            console.log('Error adding appointment:', err);
        }
    });
}
// Get all appointments
function getAllAppointments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.appointment.findMany();
        }
        catch (err) {
            console.log('Error fetching appointments:', err);
        }
    });
}
// Get an appointment by ID
function getAppointmentById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.appointment.findUnique({ where: { id } });
        }
        catch (err) {
            console.log('Error fetching appointment:', err);
        }
    });
}
// Update an appointment by ID
function updateAppointment(id, a) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedAppointment = yield prisma.appointment.update({
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
        }
        catch (err) {
            console.log('Error updating appointment:', err);
        }
    });
}
// Delete an appointment by ID
function deleteAppointment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.appointment.delete({ where: { id } });
            console.log('Appointment deleted:', id);
        }
        catch (err) {
            console.log('Error deleting appointment:', err);
        }
    });
}
