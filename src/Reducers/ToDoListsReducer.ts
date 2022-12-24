import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";
import {ActionCreatorsType} from "../Action Creators/ToDoListsActionCreators";

const initialState:ToDoListType[] = [
     // {
     //     title: "What to learn",
     //     filter: FilterValuesType.All,
     //     tasks: [
     //         {taskId: v1(), title: "HTML&CSS", isDone: true},
     //         {taskId: v1(), title: "JS", isDone: true},
     //         {taskId: v1(), title: "JS", isDone: false},
     //         {taskId: v1(), title: "JS", isDone: false},
     //     ],
     // },
     // {
     //     title: "What to do",
     //     filter: FilterValuesType.All,
     //     tasks: [
     //         {taskId: v1(), title: "HTML&CSS2", isDone: true},
     //         {taskId: v1(), title: "JS2", isDone: true},
     //         {taskId: v1(), title: "JS2", isDone: false},
     //         {taskId: v1(), title: "JS2", isDone: false},
     //         {taskId: v1(), title: "JS2", isDone: true},
     //     ],
     // }
 ]

export const toDoListsReducer = (state: ToDoListType[] = initialState, action: ActionCreatorsType) => {
    switch (action.type) {
        case "ADD-TASK":
            const newTask = {taskId: v1(), title: action.payload.title, isDone: false}
            return state.map((todolist, ind) => ind === action.payload.todolistId
                ? {...todolist, tasks: [newTask, ...todolist.tasks]}
                : todolist );
        case "REMOVE-TASK":
            return state.map((todolist, ind) => ind === action.payload.todolistId
                ? {...todolist, tasks: todolist.tasks.filter(task => task.taskId !== action.payload.taskId)}
                : todolist);
        case "CHANGE-TASK-STATUS":
            return state.map((toDoList, ind) => ind === action.payload.todolistId
                ? {
                    ...toDoList,
                    tasks: toDoList.tasks.map(task => task.taskId === action.payload.taskId
                        ? {...task, isDone: action.payload.isDone}
                        : task)
                }
                : toDoList);
        case "CHANGE-TODOLIST-FILTER":
            return state.map((todolist, ind) => action.payload.todolistId === ind
                ? {...todolist, filter: action.payload.value}
                : todolist);
        case "REMOVE-TODOLIST":
            return state.filter((todolist, ind) => action.payload.todolistId !== ind)
        case "EDIT-TASK-TITLE":
            return state.map((todolist, ind) => ind === action.payload.toDoListId
                ? {
                    ...todolist,
                    tasks: [...todolist.tasks.map(task => task.taskId === action.payload.taskId
                        ? {...task, title: action.payload.title}
                        : task)]
                }
                : todolist)
        case "EDIT-TODOLIST-TITLE":
            return state.map((todolist, ind) => ind === action.payload.toDoListId
                ? {...todolist, title: action.payload.title}
                : todolist)
        case "ADD-TODOLIST":
            const newToDoList: ToDoListType = {
                title: action.payload.title,
                filter: FilterValuesType.All,
                tasks: [],
            }
            return [...state, newToDoList]
        default:
            return state;
    }
}

