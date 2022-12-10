import {FilterValuesType} from "../App";

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