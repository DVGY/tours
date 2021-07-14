"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOne = exports.createOne = exports.updateOne = exports.deleteOne = void 0;
const AppError_1 = require("../utils/AppError");
const catchAsync_1 = require("../utils/catchAsync");
const getModelName = (userDefinedModel) => {
    return userDefinedModel.modelName.toLocaleLowerCase();
};
//----------------------------------------------------------------//
//---------------CRUD CONTROLLER/HANDLER FUNCTIONS  --------------//
//---------------------------------------------------------------//
//--------------------------------------------//
//---------DELETE A DATA IN RESOURCE----------//
//-------------------------------------------//
const deleteOne = (userDefinedModel) => catchAsync_1.catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await userDefinedModel.findByIdAndDelete(id);
    const modelName = getModelName(userDefinedModel);
    if (!doc) {
        return next(new AppError_1.AppError(`No ${modelName} found with that Id`, 400));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
exports.deleteOne = deleteOne;
//--------------------------------------------//
//---------UPDATE A DATA IN RESOURCE----------//
//-------------------------------------------//
// BUG
// eslint-disable-next-line @typescript-eslint/ban-types
const updateOne = (userDefinedModel
// userDef:Model<UserDefinedDocument,{},{}>
) => catchAsync_1.catchAsync(async (req, res, next) => {
    const { id } = req.params;
    // const doc = await userDefinedModel.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // const doc2 = await userDef.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    await Promise.resolve();
    const modelName = userDefinedModel.modelName;
    // if (!doc) {
    //   return next(new AppError(`No ${modelName} found with that Id`, 400));
    // }
    res.status(200).json({
        status: 'success',
        // [modelName]: { doc },
    });
});
exports.updateOne = updateOne;
//--------------------------------------------//
//---------CREATE A DATA IN RESOURCE----------//
//-------------------------------------------//
const createOne = (userDefinedModel) => catchAsync_1.catchAsync(async (req, res, next) => {
    const doc = await userDefinedModel.create(req.body);
    const modelName = getModelName(userDefinedModel);
    res.status(201).json({
        status: 'success',
        data: {
            [modelName]: doc,
        },
    });
});
exports.createOne = createOne;
//--------------------------------------------//
//---------GET A DATA FROM RESOURCE----------//
//-------------------------------------------//
const getOne = (userDefinedModel, populateOptions) => catchAsync_1.catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let query = userDefinedModel.findById(id);
    if (populateOptions)
        query = query.populate(populateOptions);
    const doc = await query;
    const modelName = getModelName(userDefinedModel);
    res.status(200).json({
        status: 'success',
        data: {
            [modelName]: doc,
        },
    });
});
exports.getOne = getOne;
//--------------------------------------------//
//---------GET ALL DATA FROM RESOURCE----------//
//-------------------------------------------//
// BUG
// export const getAll = (
//   userDefinedModel: UserDefinedModel,
// ): RequestHandler => catchAsync(
//   async (
//     req: Request<unknown, unknown, unknown, queryParamsFilter>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const queryProps: queryParamsFilter = { ...req.query };
//     const features = new APIFeatures<ITrips, queryParamsFilter>(
//       userDefinedModel.find(),
//       queryProps
//     );
//     features.filter().sort().limitFields().paginate();
//     const trips = await features.query;
//     res.status(200).json({
//       status: 'success',
//       results: trips.length,
//       data: {
//         trips,
//       },
//     });
//   }
// );
// export interface queryParamsFilter {
//   name?: string;
//   duration?: string;
//   price?: string;
//   priceDiscount?: string;
//   maxGroupSize?: string;
//   difficulty?: string;
//   ratingsAverage?: string;
//   ratingsQuantity?: string;
//   createdAt?: Date;
//   startDate?: Date[];
//   secretTrip?: boolean;
//   sort?: string;
//   limit?: string;
//   fields?: string;
//   paginate?: string;
//   year?: string;
//   // [someQueryProp: string]: undefined | string;
// }
