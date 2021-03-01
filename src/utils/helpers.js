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