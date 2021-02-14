import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "users";
const BOOKING_URL = "bookings";

/**
 * Return the user for the given user id
 * 
 * @param {numeber} id - user id
 * 
 * @returns {Promise<object>}
 */
export const getUser = (id) => getRequest(`${URL}/${id}`);

//TODO: implement getUsers
const getUsers = () => {
    
}
/**
 * Add an user to the database
 * 
 * @param {object} data - object of the data to be inserted
 * @param {number} data.title - title id
 * @param {string} data.email 
 * @param {string} data.firstName 
 * @param {string} data.lastName 
 * @param {string} data.gender - 'm', 'f', 'o'
 * @param {string} data.password  
 * 
 * @returns {Promise<object>} {userID}
 */
export const addUser = (data) => postRequest(URL, data);

/**
 * Update the user for the given id
 * 
 * @param {number} id - user id
 * @param {object} data
 * @param {number} data.title - title id
 * @param {string} data.email 
 * @param {string} data.firstName 
 * @param {string} data.lastName 
 * @param {string} data.gender - 'm', 'f', 'o'
 * @param {string} data.password  
 * 
 * @returns {Promise<object>}
 */
export const updateUser = (id, data) => {
    data = Object.assign({ title: null, email: null, firstName: null, lastName: null, gender: null, password: null }, data);
    return putRequest(`${URL}/${id}`, data);
}
/**
 * Delete the user for the given id
 * 
 * @param {number} id
 * 
 * @returns {Promise<object>} 
 */
export const deleteUser = (id) => deleteRequest(`${URL}/${id}`);

/**
 * Get the booking of a user for the given id
 * 
 * @param {number} userID - user id
 * @param {number} bookingID - booking id
 * 
 * @returns {Promise<object>} 
 */
export const getBookingByUser = (userID, bookingID) => getRequest(`${URL}/${userID}/${BOOKING_URL}/${bookingID}`);

/**
 * Get the bookings of a user 
 * 
 * @param {number} id - user id
 * 
 * @returns {Promise<object>} 
 */
export const getBookingsByUser = (id) => getRequest(`${URL}/${id}/${BOOKING_URL}`);

/**
 * Add a booking
 * 
 * @param {number} id - user id
 * @param {object} data
 * @param {number} data.scheduledFlightId
 * @param {number} data.finalAmount - total price
 * @param {object[]} data.reservedSeats - array of passengers with their assigned seat id
 * @param {number} data.reservedSeats.seatId
 * @param {number} data.reservedSeats.passengerId
 * 
 * @description reservedSeats is an array of passengers with their assigned seat id
 * 
 * @returns {Promise<object>} {bookingID}
 */
export const addBookingByUser = (id, data) => postRequest(`${URL}/${id}/${BOOKING_URL}`, data);

/**
 * Update the state of the booking for the given id
 * 
 * @param {number} userID - user id
 * @param {number} bookingID - booking id
 * @param {string} state - state to be updated
 * 
 * @returns {Promise<object>}
 */
export const updateBooking = (userID, bookingID, state) => putRequest(`${URL}/${userID}/${BOOKING_URL}/${bookingID}`, {state: state} );