import {combineReducers, createStore} from "redux";
import {routerReducer} from "react-router-redux";

const image = (state = false, action) => {
    switch (action.type) {
        case 'SET_IMAGE':
            return action.payload;
        case 'RESET_IMAGE':
            return false;
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({
        image,
        routing: routerReducer,
    })
);

export {store as default}
