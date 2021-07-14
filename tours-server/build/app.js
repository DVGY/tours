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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const hpp_1 = __importDefault(require("hpp"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv = __importStar(require("dotenv"));
const tripsRoutes_1 = __importDefault(require("./routes/tripsRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const reviewsRoutes_1 = __importDefault(require("./routes/reviewsRoutes"));
const errorHandler_1 = require("./utils/errorHandler");
const app = express_1.default();
exports.app = app;
dotenv.config({ path: './config.env' });
app.use(helmet_1.default());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
// Allow 100 request per hour from same IP
const options = {
    windowMs: 60000,
    max: 100,
    message: 'Too many request from this IP. Try later',
};
const limiter = express_rate_limit_1.default(options);
app.use('/api', limiter);
const allowedOrigins = ['http://localhost:3000'];
const corsoptions = {
    origin: allowedOrigins,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH'],
    credentials: true,
};
app.use(cors_1.default(corsoptions));
app.use(express_1.default.json({ limit: '10kb' }));
app.use(cookie_parser_1.default());
app.use(express_mongo_sanitize_1.default());
app.use(xss_clean_1.default());
app.use(hpp_1.default({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price',
    ],
}));
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
    });
});
app.get('/docker', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: 'Hi, I am inside docker and NGINX is looking after me',
    });
});
app.use('/api/v1/trips', tripsRoutes_1.default);
app.use('/api/v1/users', usersRoutes_1.default);
app.use('/api/v1/reviews', reviewsRoutes_1.default);
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `can't find ${req.originalUrl} on this server !!!`,
    });
});
app.use(errorHandler_1.errorHandler);
