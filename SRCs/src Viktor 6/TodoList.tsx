import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
//rsc
// typescript =>
// 1. Variable
// 2. Param of func
// 3. Return of func

type TodoListPropsType = {
    todoListId:string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (todoListId:string,title: string) => void
    removeTask: (todoListId:string,taskId: string) => void
    changeTaskStatus: (todoListId:string, taskId: string, isDone: boolean) => void
    changeTodoListFilter: (todoListId:string,nextFilterValue: FilterValuesType) => void
    removeToDoList:(removeToDoList:string)=>void
}

export const ToDoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const tasksListItems = props.tasks.length
        ? <ul>{
            props.tasks.map((task) => {
                const removeTask = () => props.removeTask(props.todoListId,task.id)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                    props.changeTaskStatus(props.todoListId,task.id, e.currentTarget.checked)

                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatus}
                        />
                        <span
                            className={task.isDone ? "task-done" : ""}>{task.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                )
            })}</ul>
        : <span>List is empty</span>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(props.todoListId,trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(props.todoListId,filter)


    const errorStyles = {fontWeight: "bold", color: "red"}
    const errorMessage = error
        ? <div style={errorStyles}>Please, enter task title</div>
        : null

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={()=>props.removeToDoList(props.todoListId)}>X</button>
            <div>
                <input
                    value={title}
                    onKeyDown={onEnterAddTask}
                    onChange={setLocalTitle}
                    className={error ? "input-error" : ""}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            {tasksListItems}
            <div>
                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={onClickHandlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};
