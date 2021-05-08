import { Query, Document } from "mongoose";
/**
 * @public
 * A class to filter, sort, limit and paginate query params
 *
 * @example
 * ```
 * Rest Endpoint `/api/v1/trips?difficulty=medium&ratingsAverage[gte]=4.7&ratingsAverage[lt]=5.0&sort=-price,ratingsAverage&fields=name,ratings,price&paginate=1&limit=10`
 * req.query = {
 *
 *               difficulty: 'medium',
 *               ratingsAverage: { gte: '4.7', lt: '5.0' },
 *               sort: '-price,ratingsAverage',
 *               fields: 'name,ratings,price',
 *               limit: '10'
 * }
 * ```
 *
 * @param T - The Document Interface
 * @param U - The query parameters inside req.params
 */
export declare class APIFeatures<T extends Document, U extends {
    sort?: string;
    fields?: string;
    limit?: string;
    paginate?: string;
}> {
    query: Query<T[], T, unknown>;
    queryParams: U;
    constructor(query: Query<T[], T, unknown>, queryParams: U);
    /**
     * @public
     * Find Document properties that matches value in Collection
     *
     * @example
     * ```
     * Rest Endpoint `/api/v1/trips?difficulty=medium&ratingsAverage=4.7&sort=-price,ratingsAverage`
     *
     * ```
     * Remove the non mongoose Document props (sort,limit and etc) as find will fail or return null or empty array
     *
     * @returns Query instance
     */
    filter(): APIFeatures<T, U>;
    /**
     * Sort the Document by sort params in req.query
     *
     * @example
     * ```
     * Rest Endpoint /api/v1/trips?sort=-price,ratingsAverage
     *
     * req.query = {sort: '-price,ratingsAverage'}
     *
     * ```
     * Sort Documents by descending price and ascending ratingsAverage
     * @returns Query instance
     */
    sort(): APIFeatures<T, U>;
    /**
     * Show only the Document properties equals to fields params (Field Projection)
     *
     * @example
     * ```
     * Rest Endpoint /api/v1/trips?fields=name,price,-description
     *
     * req.query = {fields: '-name,price,-description'}
     *
     * Show documents with the above query params only
     * ```
     * @returns Query instance
     */
    limitFields(): APIFeatures<T, U>;
    /**
     * Return number of according to the pagination and limit
     *
     * @example
     * ```
     * Rest Endpoint /api/v1/trips?paginate=1&limit=3
     *
     * req.query = {paginate: '1', limit: '3'}
     *
     * Show documents starting from 0 to 3
     * ```
     * @returns Query instance
     */
    paginate(): APIFeatures<T, U>;
}
export default APIFeatures;
