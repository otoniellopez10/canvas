import { combineReducers } from "redux";

import nodeReducer from "./nodeReducer";

const rootReducers = combineReducers({
    nodeReducer,
});

export default nodeReducer;