import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox, IconButton, Tooltip} from "@mui/material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeToDoListFilterAC,
    editTaskTitleAC,
    removeTaskAC
} from "./Action Creators/ToDoListsActionCreators";
import {useDispatch} from "react-redux";


type PropsType = {
    id: number;
    title: string;
    tasks: TasksType[];
    removeTodolist: (id: number) => void;
    filter: FilterValuesType;
    editToDoListTitle: (toDoListId: number, title: string) => void;
}

export function Todolist(props: PropsType) {

    const dispatch = useDispatch();


    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeFilterCallBack = (filter: FilterValuesType) => {
        dispatch(changeToDoListFilterAC(filter, props.id))
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onTextChanged={(title) => props.editToDoListTitle(props.id, title)}/>
            <Tooltip title="Delete" placement="top-start">
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </Tooltip>
        </h3>
        <AddItemForm addItem={(title) => dispatch(addTaskAC(title, props.id))}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.taskId, newIsDoneValue, props.id));
                    }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            onChange={onChangeHandler}
                            inputProps={{'aria-label': 'controlled'}}
                            color={"secondary"}
                        />
                        <EditableSpan title={t.title}
                                      onTextChanged={(title) => dispatch(editTaskTitleAC(props.id, t.taskId, title))}/>
                        <IconButton aria-label="delete" onClick={() => dispatch(removeTaskAC(t.taskId, props.id))}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                onClick={() => changeFilterCallBack(FilterValuesType.All)}
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                color={"secondary"}
            >All
            </Button>
            <Button onClick={() => changeFilterCallBack(FilterValuesType.Active)}
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    color={"secondary"}
            >Active
            </Button>
            <Button onClick={() => changeFilterCallBack(FilterValuesType.Completed)}
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    color={"secondary"}
            >Completed
            </Button>
        </div>
    </div>
}


