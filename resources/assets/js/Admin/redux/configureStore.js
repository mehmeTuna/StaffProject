import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";

import staffReducer from "./reducers/StaffReducer";

const configureStore = preloadedState => {
    const composed = applyMiddleware(thunk);

    return createStore(staffReducer, preloadedState, compose(composed));
};

export default configureStore;
