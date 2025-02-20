import Appointment from "./appointment";

export default class MedicalRecord {
    id: string;
    date: string;
    diagnosis: string;
    treatment: string;
    medications: string;
    nextCheckup?: string;
    doctorNotes: string;
    maritimeFitnessStatus: 'Fit' | 'Temporarily Unfit' | 'Permanently Unfit';
    appointment?: Appointment; // Made optional

    constructor(
        id: string,
        date: string,
        diagnosis: string,
        treatment: string,
        medications: string,
        nextCheckup: string,
        doctorNotes: string,
        maritimeFitnessStatus: "Fit" | "Temporarily Unfit" | "Permanently Unfit",
        appointment?: Appointment // Made optional
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
