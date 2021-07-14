"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["LEAD_GUIDE"] = "LEAD_GUIDE";
    UserRole["GUIDE"] = "GUIDE";
    UserRole["USER"] = "USER";
    UserRole["GUEST"] = "GUEST";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
const usersSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Please enter a valid email'],
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
            validator: function (passwordConfirmValue) {
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
}, {
    toJSON: {
    // transform: function (doc, ret: IUsers) {
    //   // delete ret.password
    // },
    },
});
//--------------------------------------------------//
//             PRE MIDDLEWARE                       //
//--------------------------------------------------//
//-- Document Middleware --//
// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.passwordConfirm = undefined;
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
// Before saving document check password is modified or not, if yes set changedAt timestamp
usersSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew)
        return next();
    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
});
//-- Query Middleware --//
// Remove all the deleted users
usersSchema.pre(/^find/, function () {
    // this points to the current query
    void this.find({ active: { $ne: false } });
});
//---------------------------------------------------//
//                 METHODS                           //
//---------------------------------------------------//
// Check if the password matches entered password in db
usersSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcryptjs_1.default.compare(candidatePassword, userPassword);
};
// Check whether password changed time stamp is less than jwt issued at timestamp
usersSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = Math.trunc(this.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    // False means NOT changed
    return false;
};
// Create a password reset token
usersSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto_1.default
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};
const Users = mongoose_1.default.model('Users', usersSchema);
exports.default = Users;
