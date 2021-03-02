/**
 * Update the objects immutably
 * @param {Object} oldObject object
 * @param {Object} updatedProperties additonal properties
 */
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const addOrUpdateArray = (arr,obj) => {
    let copy = [];
    let index = arr.findIndex(item => item.id == obj.id)
    if(index < 0){
        arr.push(obj)
    }
    else{
        arr[index] = {...arr[index], ...obj}
    }
    copy = arr
    return copy
}
/**
 * Format a value to SL currency
 * 
 * @param {string | number} price 
 * 
 * @return {string} of format "Rs. xxx,xxx"
 */
export const formatPrice = (price) => {
    return 'Rs. ' + price.toString().split( /(?=(?:...)*$)/ ).join(',');
}

/**
 * Get date and time from timestamp
 * 
 * @param {string} timestamp 
 * 
 * @return {Object} with property date and time
 */
export const getDateTime = (timestamp) => {
    let dateTime = {} 
    let date = new Date(timestamp);
	let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	let day = date.toLocaleDateString();
    dateTime.day = day;
    dateTime.time = time
    return dateTime;
}