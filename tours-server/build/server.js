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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const app_1 = require("./app");
dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;
let DB = '';
if (process.env.MONGO_CONNECTION_STRING && process.env.MONGO_PASSWORD) {
    DB = process.env.MONGO_CONNECTION_STRING.replace('<PASSWORD>', process.env.MONGO_PASSWORD);
}
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
app_1.app.listen(port, () => {
    console.log(`\x1b[32m -> Server started on port ${port}\x1b[0m`);
});
