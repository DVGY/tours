import mongoose, {
  Document,
  Schema,
  Query,
  Aggregate,
  PromiseProvider,
} from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

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
  passwordResetToken: string;
  passwordResetExpires: Date;
  active: boolean;
  role: UserRole;
  correctPassword: (
    currentPassword: string,
    hasedPassword: string
  ) => Promise<boolean>;
}

const usersSchema: Schema = new mongoose.Schema(
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
      // },
    },
  }
);

//--------------------------------------------------//
//             PRE MIDDLEWARE                       //
//--------------------------------------------------//

// Document Middleware
// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersSchema.pre<IUsers>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.passwordConfirm = undefined;
  this.password = await bcryptjs.hash(this.password, 10);
  next();
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

const Users = mongoose.model<IUsers>('Users', usersSchema);

export default Users;
