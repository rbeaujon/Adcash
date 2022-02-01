export const GET_ALL_POST = 'UPDATE_GIFTWRAP_IN_CART';
export const UPDATE_POST = 'REMOVE_GIFTWRAP_IN_CART';
export const UPDATE_CUSTOMER_SELECTION = 'UPDATE_CUSTOMER_SELECTION';
export const CHECKBOX_SELECTED = 'CHECKBOX_SELECTED';

/** @namespace Adcash/Store/Post/Action/getPost */
export const getPost = () => ({
    type: GET_ALL_POST,
    payload: {}
});

/** @namespace  Adcash/Store/Post/Action/updatePost */
export const updatePost = (id, info, category) => ({
    type: UPDATE_POST,
    payload: {
        id,
        info,
        category
    }
});

/** @namespace  Adcash/Store/Post/Action/updateSelectedItem */ 
    export const updateCustomerSelection = (actionSelected) => ({
        type: UPDATE_CUSTOMER_SELECTION,
        payload: {
            actionSelected
        }    
});

/** @namespace  Adcash/Store/Post/Action/checkboxSelected */ 
    export const checkboxSelected = (id) => ({
        type: CHECKBOX_SELECTED,
        payload: {
            id
        }    
});