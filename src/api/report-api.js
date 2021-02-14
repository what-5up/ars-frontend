import { getRequest, generateOptionalParametersQuery } from "./utils";

const URL = "report";

/**
 * Return all the passengers for the next immediate flight. Categorized by the boundary age of 18.
 * 
 * @param {number} route route id
 * 
 * @return {Promise<object>} { above18, below18 } { route, departure, first_name, last_name, passenger_age }
 */
export const getPassengersByFlightNo = (route = null) => getRequest(`${URL}/1${route!==null ? `?route=${route}` : ''}`);

/**
 * Return all the bookings categorized by the passenger type
 * 
 * @param {object} params - query parameters to filter the records
 * @param {?string} params.startDate - yyyy-MM-dd
 * @param {?string} params.endDate - yyyy-MM-dd
 * 
 * @return {Promise<object>} [{ account_type, number_of_bookings }]
 */
export const getBookingsByPassengerType = (params) => {
    params = Object.assign({ startDate: null, endDate: null }, params);
    return getRequest(`${URL}/2${generateOptionalParametersQuery(params)}`);
}

/**
 * Return all the bookings categorized by the passenger type
 * 
 * @param {object} params - query parameters to filter the records
 * @param {?string} params.destination - destination code
 * @param {?string} params.startDate - yyyy-MM-dd
 * @param {?string} params.endDate - yyyy-MM-dd
 * 
 * @return {Promise<object>} [{ dest_code, dest_name, no_of_passengers }]
 */
export const getBookingsByPassengerType = (params) => {
    params = Object.assign({ destination: null, startDate: null, endDate: null }, params);
    return getRequest(`${URL}/3${generateOptionalParametersQuery(params)}`);
}

/**
 * Return a list of revenue by aircraft model by each month
 * 
 * @return {Promise<object>} [model = [{month: "month", revenue:"revenue"}]]
 */
export const getRevenueByAircraftModel = () => getRequest(`${URL}/4`);

/**
 * Return the past details of flights
 * 
 * @return {Promise<object>} [{ id, route, departure, delayed_departure, class, passengers }]
 */
export const getPastFlightDetails = () =>  getRequest(`${URL}/5`);
