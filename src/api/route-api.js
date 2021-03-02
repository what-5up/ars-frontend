import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "routes";
const PRICE_URL = "prices";

/**
 * Returns all routes of the system
 * 
 * @return {Promise<object>} [{ id, origin_code, origin, destination_code, destination }]
 */
export const getRoutes = () => getRequest(URL);

/**
 * Returns route for the given flight no 
 * 
 * @param {number} id flight no
 * 
 * @return {Promise<object>} { id, origin_code, origin, origin_rregion, destination_code, destination, destination_region }
 */
export const getRoute = (id) => getRequest(`${URL}/${id}`);

/**
 * Returns routes with unallocated prices
 * 
 * @return {Promise<object>} [ route_id ]
 */
export const getRoutesOfUnallocatedPrice = () => getRequest(`${URL}?unallocatedPrice=true`);

/**
 * Returns all the route prices for the given flight no 
 * 
 * @param {number} id flight no
 * 
 * @return {Promise<object>} [{ route_id, traveler_class, amount }]
 */
export const getRoutePrice = (id) => getRequest(`${URL}/${id}/${PRICE_URL}`);

/**
 * Add a route price 
 * 
 * @param {number} id flight no
 * @param {object} data body
 * @param {object} data.travelerClass traveler class id
 * @param {object} data.amount price
 * 
 * @return {Promise<object>} 
 */
export const addRoutePrice = (id, data) => postRequest(`${URL}/${id}/${PRICE_URL}`, data);

/**
 * Update a route price 
 * 
 * @param {number} routeId flight no
 * @param {number} classid traveler class id
 * @param {number} amount price
 * 
 * @return {Promise<object>} 
 */
export const updateRoutePrice = (routeId, classId, amount) => putRequest(`${URL}/${routeId}/${PRICE_URL}/${classId}`, { amount });

/**
 * delete a route price
 * 
 * @param {number} routeId flight no
 * @param {number} classid traveler class id
 * 
 * @return {Promise<object>}
 */
export const deleteRoutePrice = (routeId, classId) => deleteRequest(`${URL}/${routeId}/${PRICE_URL}/${classId}`);