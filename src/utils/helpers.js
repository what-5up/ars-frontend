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