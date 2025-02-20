import Patient from "./patient";

export default class Appointment {
    id: string;
    patient: Patient;
    date: string;
    time: string;
    appointmentType :'REGULAR_CHECKUP' | 'MARITIME_FITNESS_ASSESSMENT' | 'EMERGENCY' | 'FOLLOW_UP';
    appointmentStatus: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    notes?: string;

    constructor(id: string, patient: Patient, date: string, time: string, appointmentType: "REGULAR_CHECKUP" | "MARITIME_FITNESS_ASSESSMENT" | "EMERGENCY" | "FOLLOW_UP", appointmentStatus: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED", notes: string) {
        this.id = id;
        this.patient = patient;
        this.date = date;
        this.time = time;
        this.appointmentType = appointmentType;
        this.appointmentStatus = appointmentStatus;
        this.notes = notes;
    }
}