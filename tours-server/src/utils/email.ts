import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

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
