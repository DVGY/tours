import mongoose, { Document } from 'mongoose';
export declare enum UserRole {
    ADMIN = "ADMIN",
    LEAD_GUIDE = "LEAD_GUIDE",
    GUIDE = "GUIDE",
    USER = "USER",
    GUEST = "GUEST"
}
export interface IUsers extends Document {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string | undefined;
    phoneNumber: string;
    photo: string;
    passwordChangedAt: Date;
    passwordResetToken: string | undefined;
    passwordResetExpires: Date | undefined;
    active: boolean;
    role: UserRole;
    correctPassword: (currentPassword: string, hasedPassword: string) => Promise<boolean>;
    changedPasswordAfter: (JWTTimestamp: number) => boolean;
    createPasswordResetToken: () => string;
}
declare const Users: mongoose.Model<IUsers, {}, {}>;
export default Users;
