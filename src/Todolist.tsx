import React, {ChangeEvent, useCallback} from 'react';
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
import {Task} from "./Components/Task";


type PropsType = {
    id: number;
    title: string;
    tasks: TasksType[];
    removeTodolist: (id: number) => void;
    filter: FilterValuesType;
    editToDoListTitle: (toDoListId: number, title: string) => void;
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('todolist   ')
    const dispatch = useDispatch();


    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [dispatch, props.id])

    const changeFilterCallBack = useCallback((filter: FilterValuesType) => {
        dispatch(changeToDoListFilterAC(filter, props.id))
    }, [dispatch, props.id])


    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
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
                tasksForTodolist.map(t => {

                    return <li key={t.taskId}
                               className={t.isDone ? "is-done" : ""}>
                        <Task task={t}
                              todoListId={props.id}/>
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
})


