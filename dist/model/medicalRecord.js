"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MedicalRecord {
    constructor(id, date, diagnosis, treatment, medications, nextCheckup, doctorNotes, maritimeFitnessStatus, appointment // Made optional
    ) {
        this.id = id;
        this.date = date;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.medications = medications;
        this.nextCheckup = nextCheckup;
        this.doctorNotes = doctorNotes;
        this.maritimeFitnessStatus = maritimeFitnessStatus;
        this.appointment = appointment;
    }
}
exports.default = MedicalRecord;
