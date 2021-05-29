import mongoose, { Document, Query } from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

export enum UserRole {
  ADMIN = 'ADMIN',
  LEAD_GUIDE = 'LEAD_GUIDE',
  GUIDE = 'GUIDE',
  USER = 'USER',
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
  correctPassword: (
    currentPassword: string,
    hasedPassword: string
  ) => Promise<boolean>;

  changedPasswordAfter: (JWTTimestamp: number) => boolean;
  createPasswordResetToken: () => string;
}

const usersSchema = new mongoose.Schema<IUsers>(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
    },
    email: {
      type: String,
      required: [true, 'Please tell us your name'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (this: IUsers, passwordConfirmValue: string) {
          return passwordConfirmValue === this.password;
        },
        message: 'Password does not match',
      },
    },

    phoneNumber: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER,
    },
  },
  {
    toJSON: {
      // transform: function (doc, ret: IUsers) {
      //   // delete ret.password
      // },
    },
  }
);

//--------------------------------------------------//
//             PRE MIDDLEWARE                       //
//--------------------------------------------------//

//-- Document Middleware --//

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersSchema.pre<IUsers>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.passwordConfirm = undefined;
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// Before saving document check password is modified or not, if yes set changedAt timestamp
usersSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

//-- Query Middleware --//

// Remove all the deleted users
usersSchema.pre<Query<unknown, IUsers, unknown>>(/^find/, function () {
  // this points to the current query
  void this.find({ active: { $ne: false } });
});

//---------------------------------------------------//
//                 METHODS                           //
//---------------------------------------------------//

// Check if the password matches entered password in db
usersSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

// Check whether password changed time stamp is less than jwt issued at timestamp
usersSchema.methods.changedPasswordAfter = function (
  this: IUsers,
  JWTTimestamp: number
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.trunc(
      this.passwordChangedAt.getTime() / 1000
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

// Create a password reset token
usersSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken;
};

const Users = mongoose.model<IUsers>('Users', usersSchema);

export default Users;
