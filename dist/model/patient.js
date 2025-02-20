"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Patient {
    constructor(id, name, dateOfBirth, nationality, seamanBookNumber, vesselName, company) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.seamanBookNumber = seamanBookNumber;
        this.vesselName = vesselName;
        this.company = company;
    }
}
exports.default = Patient;
