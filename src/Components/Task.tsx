import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, FC, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TasksType} from "../App";
import {changeTaskStatusAC, editTaskTitleAC, removeTaskAC} from "../Action Creators/ToDoListsActionCreators";


type TaskPropsType = {
    task: TasksType
    todoListId: number
}

export const Task: FC<TaskPropsType> = React.memo(({
                                                       task,
                                                       todoListId
                                                   }) => {

    const dispatch = useDispatch()
let {isDone, title, taskId} = task

    const onTextChangeHandler = useCallback((title: string) => {
        dispatch(editTaskTitleAC(todoListId, taskId, title))
    },[dispatch])

    const onDeleteTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(taskId, todoListId))
    },[dispatch])

    const onTaskStatusChangeHandler = useCallback((e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(changeTaskStatusAC(taskId, e.currentTarget.checked, todoListId))
    },[dispatch])

    return (
        <>
            <Checkbox
                checked={isDone}
                onChange={onTaskStatusChangeHandler}
                inputProps={{'aria-label': 'controlled'}}
                color={"secondary"}
            />

            <EditableSpan title={title}
                          onTextChanged={(title) => onTextChangeHandler(title)}/>

            <IconButton aria-label="delete" onClick={onDeleteTaskHandler}>
                <Delete/>
            </IconButton>
        </>
    )
})
