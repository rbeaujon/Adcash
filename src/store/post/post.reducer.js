import { GET_ALL_POST, UPDATE_POST, UPDATE_CUSTOMER_SELECTION, CHECKBOX_SELECTED } from './post.actions';

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

        if(state.checkboxSelected.indexOf(payload.id) === -1) {
            
            return {
                    ...state,
                    checkboxSelected: [...state.checkboxSelected,payload.id],
                    howManyCheckBoxAreSelected: cant + 1

            }
        }
        else {
            for( var i = 0; i < state.checkboxSelected.length; i++) { 
                
                if (state.checkboxSelected[i] === payload.id) { 
                    state.checkboxSelected.splice(i, 1); 
                    i--;
                }
                state.howManyCheckBoxAreSelected = cant - 1
            }
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
