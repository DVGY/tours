import sendGridMail, { MailDataRequired } from '@sendgrid/mail';
import { Error } from 'mongoose';
import { convert } from 'html-to-text';
import * as dotenv from 'dotenv';
dotenv.config();

function getMessage(htmlTemplate: string, subject: string, to: string) {
  const from = 'gaurav.y@hotmail.com';

  return {
    to,
    from,
    subject,
    text: convert(htmlTemplate),
    html: htmlTemplate,
  } as MailDataRequired;
}

const setApiKey = () => {
  if (!process.env.EMAIL_PASSWORD_SENDGRID) {
    throw new Error('process.env.EMAIL_PASSWORD_SENDGRID is not defined');
  }

  sendGridMail.setApiKey(process.env.EMAIL_PASSWORD_SENDGRID);
};
setApiKey();

export async function sendEmail(
  htmlTemplate: string,
  subject: string,
  to: string
): Promise<void> {
  const mailMessageConfig = getMessage(htmlTemplate, subject, to);

  await sendGridMail.send(mailMessageConfig);
}

// transportOptions: SMTPTransport.Options

//**************************************************//
// NOT WORKING/ WORKS ONLY WITH NODEMAILER-SENDGRID//
//*************************************************//

//   type EmailServiceTransporter =
//   | nodemailer.Transporter<SMTPTransport.SentMessageInfo>
//   | null
//   | undefined;

// export class EmailService {
//   private readonly url: string;
//   private readonly user: IUsers;
//   private transporter: EmailServiceTransporter;

//   constructor(
//     user: IUsers,
//     url: string,
//     transporter?: EmailServiceTransporter
//   ) {
//     this.url = url;
//     this.user = user;
//     this.transporter = transporter;
//   }

//   private getTransporter() {
//     return this.transporter;
//   }

//   public setTransporter(transporterOptions: SMTPTransport.Options): this {
//     this.transporter = nodemailer.createTransport(transporterOptions);
//     return this;
//   }

//   private async send(recieverMailOptions: Mail.Options) {
//     if (!this.getTransporter()) {
//       throw new Error(
//         'Transporter not defined, either send it via constructor or define via setTransporter()'
//       );
//     }

//     await this.getTransporter()?.sendMail(recieverMailOptions);
//   }

//   async sendWelcome(recieverMailOptions: Mail.Options): Promise<void> {
//     await this.send(recieverMailOptions);
//   }
//   async sendPasswordReset(recieverMailOptions: Mail.Options): Promise<void> {
//     await this.send(recieverMailOptions);
//   }
// }
// export const getTransporter =
//   (): nodemailer.Transporter<SMTPTransport.SentMessageInfo> => {
//     const transporter = nodemailer.createTransport(getTransportOptions());
//     return transporter;
//   };

// if (!process.env.EMAIL_HOST_TEST) {
//   throw new Error('process.env.EMAIL_HOST not defined');
// }
// if (!process.env.EMAIL_PORT_TEST) {
//   throw new Error('process.env.EMAIL_PORT not defined');
// }
// if (!process.env.EMAIL_USERNAME_TEST) {
//   throw new Error('process.env.EMAIL_USERNAME not defined');
// }
// if (!process.env.EMAIL_PASSWORD_TEST) {
//   throw new Error('process.env.EMAIL_PASSWORD not defined');
// }
