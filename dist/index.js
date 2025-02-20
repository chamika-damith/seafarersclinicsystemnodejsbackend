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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const patient_route_1 = require("./routes/patient-route");
const appointment_route_1 = require("./routes/appointment-route");
const medicalRecord_route_1 = require("./routes/medicalRecord-route");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use('/patient', patient_route_1.patientRoute);
app.use('/appointment', appointment_route_1.appointmentRouter);
app.use('/medicalRecord', medicalRecord_route_1.medicalRecordRoute);
function connectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            console.log('Connected to Database');
        }
        catch (error) {
            console.error('Error connecting to database', error);
        }
    });
}
connectDatabase();
app.listen(3000, (err) => {
    console.log("Server running on port 3000");
});
