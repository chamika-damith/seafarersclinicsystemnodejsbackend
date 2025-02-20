"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Appointment {
    constructor(id, patient, date, time, appointmentType, appointmentStatus, notes) {
        this.id = id;
        this.patient = patient;
        this.date = date;
        this.time = time;
        this.appointmentType = appointmentType;
        this.appointmentStatus = appointmentStatus;
        this.notes = notes;
    }
}
exports.default = Appointment;
