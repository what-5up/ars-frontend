import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = 'account-types'

/**
 * Returns all account tyeps
 * 
 * @return {Promise<object>} [{ id, account_type_name, discount, criteria }]
 */
export const getAccountTypes = () => getRequest(URL);

/**
 * Add a scheduled flight
 * 
 * @param {object} data - body of the request
 * @param {string} data.accountTypeName - name of the account type
 * @param {number} data.discount discount percentage
 * @param {number} data.criteria - minimum number bookings for the upgrade
 * 
 * @return {Promise<object>}
 */
export const addAccountType = (data) => postRequest(URL, data);

/**
 * Updates the account type of the given id
 * 
 * @param {number} id - account type id 
 * @param {object} data - body of the request
 * @param {?string} data.accountTypeName - name of the account type
 * @param {?number} data.discount discount percentage
 * @param {?number} data.criteria - minimum number bookings for the upgrade
 * 
 * @return {Promise<object>}
 */
export const updateAccountType = (id, data) => {
    data = Object.assign({ accountTypeName: null, discount: null, criteria: null }, data);
    return putRequest(`${URL}/${id}`, data);
}

/**
 * Delete the account type of the given id
 * 
 * @param {number} id - account type id 
 * 
 * @return {Promise<object>} 
 */
export const deleteAccountType = (id) => deleteRequest(`${URL}/${id}`);