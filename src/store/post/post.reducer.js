import { UPDATE_CUSTOMER_SELECTION, CHECKBOX_SELECTED } from './post.actions';

export const getinitialState = () => ({
    
        id: 'ID en Reducer',
        info: 'info en Reducer',
        category: 'Category en Reducer',
        actionSelected: '',
        checkboxSelected:[],
        howManyCheckBoxAreSelected: null
    
});

/** @namespace  Adcash/Store/Post/Post/Reducer */
export const postReducer = (
    state = getinitialState(),
    action
) => {
    const { payload, type } = action;

    switch (type) {

    case UPDATE_CUSTOMER_SELECTION:
            return {
                ...state,
                actionSelected: payload.actionSelected
            }

    case CHECKBOX_SELECTED:

        const cant = state.checkboxSelected.length;
        var record = true;
        if(payload.location === 'aistica'){
            var itemId =  parseInt(payload.id);
        }
        else {
            itemId = payload.id;
        }
        var newItem = {                        
            id: itemId,
            location: payload.location
        }
        if(state.checkboxSelected.length === 0){
            state.checkboxSelected.push(newItem);
            return {
                ...state,
                howManyCheckBoxAreSelected: cant + 1
            }
        }

        state.checkboxSelected.map((key, index) => {
            if (key.id === itemId && key.location === payload.location) {
                state.checkboxSelected.splice(index, 1); 
                state.howManyCheckBoxAreSelected = cant - 1
                record = false;
                return {
                    ...state
                }
            }      
 
        })

            if(record === true) {   

                state.checkboxSelected.push(newItem);
                state.howManyCheckBoxAreSelected = cant + 1
                return {
                    ...state
                }
            }
 
         
        // eslint-disable-next-line no-fallthrough
        default:
            return state;
    }


};

export default postReducer;
