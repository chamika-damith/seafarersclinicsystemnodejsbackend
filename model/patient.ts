export default class Patient {


    constructor(id: string, name: string, dateOfBirth: string, nationality: string, seamanBookNumber: string, vesselName: string, company: string) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.seamanBookNumber = seamanBookNumber;
        this.vesselName = vesselName;
        this.company = company;
    }

    id: string;
    name: string;
    dateOfBirth: string;
    nationality: string;
    seamanBookNumber: string;
    vesselName?: string;
    company?: string;
}