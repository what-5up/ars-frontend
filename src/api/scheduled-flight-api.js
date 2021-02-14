import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "scheduled-flights";

/**
 * Return the scheduled flight for the given id
 * 
 * @param {number} id - scheduled flight id
 */
export const getScheduledFlight = (id) => getRequest(`${URL}/${id}`);

/**
 * Return an array of scheduled flights
 * 
 * @param {object} params - query parameters to filter the records
 * @param {?string} params.origin - origin code
 * @param {?string} params.destination - destination code
 * @param {?number} params.aircraftID - id of the scheduled flight id
 * @param {?string} params.aircraftModel - aircraft model name
 * 
 * @example //returns the scheduled flights from BIA to SIN of the aircraft model Boeing 737
 * getScheduledFlights({origin: "BIA"});
 * 
 * @example //returns the scheduled flights from BIA to SIN
 * getSchedueldFlights({origin: "BIA", destination: "SIN"});
 * 
 * @return {Promise<object>} array of {departure, origin_code, origin, destination_code, destination, aircraft_id, aircraft_model}
 */
export const getScheduledFlights = (params) => {
    params = Object.assign({ origin: null, destination: null, aircraftID: null, aircraftModel: null }, params);
    let optionalParams = [];
    Object.keys(params).forEach(key => {
        if (params[key] !== null) optionalParams.push(`${key}=${params[key]}`)
    })

    return getRequest(`${URL}${(optionalParams.length > 0) ? `?${optionalParams.join(`&`)}` : ''}`);
}

/**
 * Add a scheduled flight
 * 
 * @param {object} data - body of the request
 * @param {number} data.route - route id
 * @param {string} data.departure yyyy-MM-dd hh:mm:ss
 * @param {number} data.assignedAircraftID - aircraft id
 * 
 * @return {Promise<object>}
 */
export const addScheduledFlight = (data) => postRequest(URL, data);

/**
 * Updates the scheduled flight of the given id
 * 
 * @param {number} id - scheduled flight id 
 * @param {object} data - body of the request
 * @param {?number} data.route - route id
 * @param {?string} data.departure yyyy-MM-dd hh:mm:ss
 * @param {?number} data.assignedAircraftID - aircraft id
 * @param {?string} data.delayedDeparture yyyy-MM-dd hh:mm:ss
 * 
 * @return {Promise<object>}
 */
export const updateScheduledFlight = (id, data) => {
    data = Object.assign({ origin: null, destination: null, aircraftID: null, aircraftModel: null }, data);
    return putRequest(`${URL}/${id}`, data);
}

/**
 * Delete the scheduled flight of the given id
 * 
 * @param {number} id - scheduled flight id 
 * 
 * @return {Promise<object>}
 */
export const deleteScheduledFlight = (id) => deleteRequest(`${URL}/${id}`);

/**
 * Returns the seat-map of the aircraft of the given scheduled flight
 * 
 * @param {number} id - scheduled flight id 
 *
 * @return {Promise<object>} {maxRows, maxColumns, seatMap{id, seat_number, class, amount, is_reserved}}
 */
export const getSeatMap = (id) => getRequest(`${URL}/${id}/seat-map`);