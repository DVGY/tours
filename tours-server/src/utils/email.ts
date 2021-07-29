import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

import { IUsers } from '../models/usersModel';
import { Error } from 'mongoose';

type EmailServiceTransporter =
  | nodemailer.Transporter<SMTPTransport.SentMessageInfo>
  | null
  | undefined;

class EmailService {
  public readonly url: string;
  public readonly user: IUsers;
  private transporter: EmailServiceTransporter;

  constructor(
    user: IUsers,
    url: string,
    transporter?: EmailServiceTransporter
  ) {
    this.url = url;
    this.user = user;
    this.transporter = transporter;
  }

  private getTransporter() {
    return this.transporter;
  }

  public setTransporter(transporterOptions: SMTPTransport.Options) {
    this.transporter = nodemailer.createTransport(transporterOptions);
    return this;
  }

  private async send(recieverMailOptions: Mail.Options) {
    if (!this.getTransporter()) {
      throw new Error(
        'Transporter not defined, either send it via constructor or define via setTransporter()'
      );
    }

    await this.getTransporter()?.sendMail(recieverMailOptions);
  }
}

interface IEmailOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async ({
  email,
  subject,
  message,
}: IEmailOptions): Promise<void> => {
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

  const smtpConfig: SMTPTransport.Options = {
    host: process.env.EMAIL_HOST_TEST,
    port: parseInt(process.env.EMAIL_PORT_TEST),
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.EMAIL_USERNAME_TEST,
      pass: process.env.EMAIL_PASSWORD_TEST,
    },
  };
  const transporter = nodemailer.createTransport(smtpConfig);

  const recieverMailOptions: Mail.Options = {
    from: 'Tours Admin toursadmin@tours.com',
    to: email,
    subject: subject,
    html: '<p1>Lol</p1>',
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
