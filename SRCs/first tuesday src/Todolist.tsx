import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Conponents/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoId: string
    title: string | null;
    tasks: Array<TaskType>;
    removeTask: (taskId: string, toDoListId: string) => void;
    addTask: (toDoListId: string, title: string) => void;
    changeStatus: (id: string, toDoListId: string, isDone: boolean) => void;
    filter: FilterValuesType;
    changeFilter: (toDoListId: string, filter: FilterValuesType) => void;
    deleteToDoList: (todoID: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError('')
    }

    const onClickHandler = () => {
        title.trim() ? props.addTask(props.todoId, title) : setError('Error');
        setTitle('');
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            title.trim() ? props.addTask(props.todoId, title) : setError('Error');
            setTitle('');
        }
    }

    const onClickRemoveHandler = (tId: string) => {
        props.removeTask(tId, props.todoId)
    }

    const changeStatusHandler = (tID: string, tChecked: boolean) => {
        props.changeStatus(tID, props.todoId, tChecked)
    }

    const deleteToDoListHandler =()=>{
        props.deleteToDoList(props.todoId)
    }

    const errClass = error ? 'error' : '';


    return <div>
        <h3>{props.title}
            <button onClick={deleteToDoListHandler}>X</button>
        </h3>
        <div>
            <input className={errClass} value={title} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {
                return (
                    t.title && <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={(e) => changeStatusHandler(t.id, e.currentTarget.checked)}
                        />
                        <span>{t.title}</span>
                        <button onClick={() => onClickRemoveHandler(t.id)}>x</button>
                    </li>)
            })}
        </ul>
        <div>
            <Button
                callback={() => props.changeFilter(props.todoId, 'all')}
                className={props.filter === 'all' ? 'active-filter' : ''}
                name={'All'}/>
            <Button
                callback={() => props.changeFilter(props.todoId, 'active')}
                className={props.filter === 'active' ? 'active-filter' : ''}
                 name={'Active'}/>
            <Button
                callback={() => props.changeFilter(props.todoId, 'completed')}
                className={props.filter === 'completed' ? 'active-filter' : ''}
                name={'Completed'}/>
        </div>
    </div>
}
