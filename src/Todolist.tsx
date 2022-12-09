import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox, IconButton, Tooltip} from "@mui/material";



type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number, setError?: any) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
    editTaskTitle: (toDoListId: number, taskId: string, title: string) => void
    editToDoListTitle: (toDoListId: number, title: string) => void
}

export function Todolist(props: PropsType) {

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onChangeTaskTitleHandler = (title: string, id: string) => {
        props.editTaskTitle(props.id, id, title)
    }

    const onChangeToDoListTitleHandler = (title: string) => {
        props.editToDoListTitle(props.id, title)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onTextChanged={onChangeToDoListTitleHandler}/>
            <Tooltip title="Delete" placement="top-start">
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </Tooltip>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            onChange={onChangeHandler}
                            inputProps={{'aria-label': 'controlled'}}
                            color={"secondary"}
                        />
                        <EditableSpan title={t.title}
                                      onTextChanged={(title) => onChangeTaskTitleHandler(title, t.taskId)}/>
                        <IconButton aria-label="delete" onClick={() => removeTaskHandler(t.taskId)}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                onClick={() => props.changeFilter(FilterValuesType.All, props.id)}
                variant={props.filter === FilterValuesType.All ? 'outlined' : 'text'}
                color={"secondary"}
            >All
            </Button>
            <Button onClick={() => props.changeFilter(FilterValuesType.Active, props.id)}
                    variant={props.filter === FilterValuesType.Active ? 'outlined' : 'text'}
                    color={"secondary"}
            >Active
            </Button>
            <Button onClick={() => props.changeFilter(FilterValuesType.Completed, props.id)}
                    variant={props.filter === FilterValuesType.Completed ? 'outlined' : 'text'}
                    color={"secondary"}
            >Completed
            </Button>
        </div>
    </div>
}


// className={props.filter === FilterValuesType.All ? 'active-filter' : ''}
// name={'All'}
// callback={() => props.changeFilter(FilterValuesType.All, props.id)}

