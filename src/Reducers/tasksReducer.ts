import React from "react";
import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: ToDoListType[], action: ActionCreatorsType) => {
    switch (action.type) {
        case "ADD-TASK":
            const newTask = {taskId: v1(), title: action.payload.title, isDone: false}
            return state.map((todolist, ind) => ind === action.payload.todolistId
                ? {...todolist, tasks: [newTask, ...todolist.tasks]}
                : todolist);
        case "REMOVE-TASK":
            return state.filter((todolist, ind) => ind === action.payload.todolistId
                ? [...todolist.tasks].filter(task => task.taskId !== action.payload.taskId)
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
            return state.filter((todolist, ind) => ind === action.payload.todolistId
                ? {...todolist, filter: action.payload.value}
                : todolist);
        case "REMOVE-TODOLIST":
            return state.filter((todolist, ind) => ind !== action.payload.todolistId)
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
            return {...state, newToDoList}
        default:
            return state;
    }
}

export type ActionCreatorsType =
    AddTaskACType
    | RemoveTaskACType
    | ChangeTaskStatusACType
    | ChangeToDoListFilterACType
    | RemoveToDoListACType
    | EditTaskTitleACType
    | editToDoListTitleACType
    | addToDoListACType;

export type AddTaskACType = ReturnType<typeof addTaskAC>
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatus>
export type ChangeToDoListFilterACType = ReturnType<typeof changeToDoListFilterAC>
export type RemoveToDoListACType = ReturnType<typeof removeToDoListAC>
export type EditTaskTitleACType = ReturnType<typeof editTaskTitleAC>
export type editToDoListTitleACType = ReturnType<typeof editToDoListTitleAC>
export type addToDoListACType = ReturnType<typeof addToDoListAC>

export const addTaskAC = (title: string, todolistId: number) => {
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todolistId,
        }
    } as const;
}

export const removeTaskAC = (taskId: string, todolistId: number) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskId,
            todolistId,
        }
    } as const;
}

export const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: number) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskId,
            isDone,
            todolistId,
        }
    } as const;
}

export const changeToDoListFilterAC = (value: FilterValuesType, todolistId: number) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            value,
            todolistId,
        }
    } as const;
}

export const removeToDoListAC = (todolistId: number) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId
        }
    } as const;
}

export const editTaskTitleAC = (toDoListId: number, taskId: string, title: string) => {
    return {
        type: "EDIT-TASK-TITLE",
        payload: {
            toDoListId,
            taskId,
            title,
        }
    } as const;
}

export const editToDoListTitleAC = (toDoListId: number, title: string) => {
    return {
        type: "EDIT-TODOLIST-TITLE",
        payload: {
            toDoListId,
            title
        }
    } as const;
}

export const addToDoListAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title
        }
    } as const;
}