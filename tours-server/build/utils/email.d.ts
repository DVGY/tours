interface IEmailOptions {
    email: string;
    subject: string;
    message: string;
}
export declare const sendEmail: ({ email, subject, message, }: IEmailOptions) => Promise<void>;
export {};
