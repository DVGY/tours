"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async ({ email, subject, message, }) => {
    if (!process.env.EMAIL_HOST_TEST) {
        throw new Error('process.env.EMAIL_HOST not defined');
    }
    if (!process.env.EMAIL_PORT_TEST) {
        throw new Error('process.env.EMAIL_PORT not defined');
    }
    if (!process.env.EMAIL_USERNAME_TEST) {
        throw new Error('process.env.EMAIL_USERNAME not defined');
    }
    if (!process.env.EMAIL_PASSWORD_TEST) {
        throw new Error('process.env.EMAIL_PASSWORD not defined');
    }
    //---------------------------------------------//
    //----------------TEST WITH MAILTRAP----------//
    //--------------------------------------------//
    const smtpConfig = {
        host: process.env.EMAIL_HOST_TEST,
        port: parseInt(process.env.EMAIL_PORT_TEST),
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME_TEST,
            pass: process.env.EMAIL_PASSWORD_TEST,
        },
    };
    const transporter = nodemailer_1.default.createTransport(smtpConfig);
    const recieverMailOptions = {
        from: 'Tours Admin toursadmin@tours.com',
        to: email,
        subject: subject,
        text: message,
    };
    await transporter.sendMail(recieverMailOptions);
    //---------------------------------------------//
    //-------------------REAL EMAIL SEND----------//
    //--------------------------------------------//
    //   const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //   });
};
exports.sendEmail = sendEmail;
