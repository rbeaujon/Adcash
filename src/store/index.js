import { createStore } from 'redux';
import { combineReducers } from "redux";
import  postReducer from './post/post.reducer';


const reducers = combineReducers ({
    postReducer
})

const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());    

export default store;
