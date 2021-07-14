"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const tripsModel_1 = __importDefault(require("../models/tripsModel"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
const reviewsModel_1 = __importDefault(require("../models/reviewsModel"));
dotenv.config({ path: './config.env' });
let DB = '';
if (!process.env.MONGO_CONNECTION_STRING) {
    throw new mongoose_1.Error('process.env.MONGO_CONNECTION_STRING not defined');
}
if (!process.env.MONGO_PASSWORD) {
    throw new mongoose_1.Error('process.env.MONGO_PASSWORD not defined');
}
if (!process.env.MONGO_DEV_DB) {
    throw new mongoose_1.Error('process.env.MONGO_DEV_DB not defined');
}
if (!process.env.NODE_ENV) {
    throw new mongoose_1.Error('process.env.NODE_ENV not defined');
}
DB = process.env.MONGO_CONNECTION_STRING.replace('<DATABASE>', process.env.MONGO_DEV_DB);
DB = DB.replace('<PASSWORD>', process.env.MONGO_PASSWORD);
mongoose_1.default
    .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('\x1b[32m%s\x1b[0m', ' -> DB connection successfull!');
})
    .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', ' -> DB connection FAIL');
    console.log(err);
});
const tripsData = JSON.parse(fs.readFileSync(path_1.default.resolve(__dirname, '..' + '/assets/trips.json'), 'utf-8'));
const usersData = JSON.parse(fs.readFileSync(path_1.default.resolve(__dirname, '..' + '/assets/users.json'), 'utf-8'));
const reviewsData = JSON.parse(fs.readFileSync(path_1.default.resolve(__dirname, '..' + '/assets/reviews.json'), 'utf-8'));
const executeSeedDatabase = async (Trips, tripsData) => {
    if (process.argv[2] === '--import') {
        await Trips.create(tripsData);
        await usersModel_1.default.create(usersData);
        await reviewsModel_1.default.create(reviewsData);
        return Promise.resolve('Import');
    }
    if (process.argv[2] === '--delete') {
        await Trips.deleteMany();
        await usersModel_1.default.deleteMany();
        await reviewsModel_1.default.deleteMany();
        return Promise.resolve('Delete');
    }
    return Promise.reject('Specifiy --import or --delete args');
};
executeSeedDatabase(tripsModel_1.default, tripsData)
    .then((args) => {
    console.log(args + ' Completed');
    process.exit(0);
})
    .catch((err) => {
    console.log('Failed:', err);
    process.exit(1);
});
// ts-node ${pwd}/src/utils/seedTripsDevData.ts --import
