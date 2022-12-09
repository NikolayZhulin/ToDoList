import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Button} from "./Components/Button";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";


type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number, setError?: any) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
    editTaskTitle: (toDoListId: number, taskId: string, title: string) => void
    editToDoListTitle:(toDoListId: number, title: string) => void
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
    const onChangeTaskTitleHandler=(title:string, id:string)=>{
        props.editTaskTitle(props.id, id, title)
    }

    const onChangeToDoListTitleHandler=(title:string)=>{
        props.editToDoListTitle(props.id, title)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onTextChanged={onChangeToDoListTitleHandler}/>
            <button onClick={removeTodolist}>x</button>
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
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>

                        <EditableSpan title={t.title} onTextChanged={(title)=>onChangeTaskTitleHandler(title, t.taskId)}/>
                        <Button name={'X'} callback={() => {
                            removeTaskHandler(t.taskId)
                        }}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                className={props.filter === FilterValuesType.All ? 'active-filter' : ''}
                name={'All'}
                callback={() => props.changeFilter(FilterValuesType.All, props.id)}/>
            <Button
                className={props.filter === FilterValuesType.Active ? 'active-filter' : ''}
                name={'Active'}
                callback={() => props.changeFilter(FilterValuesType.Active, props.id)}/>
            <Button
                className={props.filter === FilterValuesType.Completed ? 'active-filter' : ''}
                name={'Completed'}
                callback={() => props.changeFilter(FilterValuesType.Completed, props.id)}/>
        </div>
        <p></p>

    </div>
}


