import {combineReducers} from "redux";
import {commentReducer} from "./commentReducer";
import {problemReducer} from "./problemReducer";

export const rootReducer = combineReducers({
    comment: commentReducer,
    problem: problemReducer
})