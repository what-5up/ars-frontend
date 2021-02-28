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
    let index = arr.findIndex(item => item.key == obj.key)
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