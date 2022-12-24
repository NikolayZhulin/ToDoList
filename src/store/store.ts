import {combineReducers, createStore} from "redux";
import {toDoListsReducer} from "../Reducers/ToDoListsReducer";

const rootReducer = combineReducers({
    toDoLists: toDoListsReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)