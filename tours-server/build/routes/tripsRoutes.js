"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const tripsController_1 = require("../controllers/tripsController");
const router = express_1.default.Router();
router.route('/').get(tripsController_1.getAllTrips).post(tripsController_1.createTrip);
router.route('/:id').get(tripsController_1.getTrip).patch(tripsController_1.updateTrip).delete(tripsController_1.deleteTrip);
module.exports = router;
