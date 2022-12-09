import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {Header} from "./Components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTaskAC, addToDoListAC,
    changeToDoListFilterAC,
    changeTaskStatus, editTaskTitleAC, editToDoListTitleAC,
    removeTaskAC,
    removeToDoListAC,
    tasksReducer
} from "./Reducers/tasksReducer";


export type ToDoListType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TasksType>
}
export type TasksType = {
    taskId: string
    title: string
    isDone: boolean
}

// export type FilterValuesType = "all" | "active" | "completed";

export enum FilterValuesType {
    All = "all",
    Active = "active",
    Completed = "completed",
}


function App() {

    // const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
    //     {
    //         title: "What to learn",
    //         filter: FilterValuesType.All,
    //         tasks: [
    //             {taskId: v1(), title: "HTML&CSS", isDone: true},
    //             {taskId: v1(), title: "JS", isDone: true},
    //             {taskId: v1(), title: "JS", isDone: false},
    //             {taskId: v1(), title: "JS", isDone: false},
    //         ],
    //     },
    //     {
    //         title: "What to do",
    //         filter: FilterValuesType.All,
    //         tasks: [
    //             {taskId: v1(), title: "HTML&CSS2", isDone: true},
    //             {taskId: v1(), title: "JS2", isDone: true},
    //             {taskId: v1(), title: "JS2", isDone: false},
    //             {taskId: v1(), title: "JS2", isDone: false},
    //             {taskId: v1(), title: "JS2", isDone: true},
    //         ],
    //     }
    // ])

    const [toDoLists, dispatchToDoLists]= useReducer(tasksReducer,[
        {
            title: "What to learn",
            filter: FilterValuesType.All,
            tasks: [
                {taskId: v1(), title: "HTML&CSS", isDone: true},
                {taskId: v1(), title: "JS", isDone: true},
                {taskId: v1(), title: "JS", isDone: false},
                {taskId: v1(), title: "JS", isDone: false},
            ],
        },
        {
            title: "What to do",
            filter: FilterValuesType.All,
            tasks: [
                {taskId: v1(), title: "HTML&CSS2", isDone: true},
                {taskId: v1(), title: "JS2", isDone: true},
                {taskId: v1(), title: "JS2", isDone: false},
                {taskId: v1(), title: "JS2", isDone: false},
                {taskId: v1(), title: "JS2", isDone: true},
            ],
        }
    ])

    function removeTask(taskId: string, todolistId: number) { // remove task from state
        dispatchToDoLists(removeTaskAC(taskId, todolistId))
    }

    function addTask(title: string, todolistId: number) { // add task in state
        dispatchToDoLists(addTaskAC(title, todolistId))
    }
    //
    function changeStatus(taskId: string, isDone: boolean, todolistId: number) {
        dispatchToDoLists(changeTaskStatus(taskId, isDone, todolistId))
    }
    //
    function changeFilter(value: FilterValuesType, todolistId: number) {
        dispatchToDoLists(changeToDoListFilterAC(value, todolistId))

    }
    //
    function removeTodolist(todolistId: number) {
        dispatchToDoLists(removeToDoListAC(todolistId))
    }
    //
    const editTaskTitle = (toDoListId: number, taskId: string, title: string) => {
        dispatchToDoLists(editTaskTitleAC(toDoListId, taskId, title))
    }

    const editToDoListTitle = (toDoListId: number, title: string) => { // change ToDoListTitle
        dispatchToDoLists(editToDoListTitleAC(toDoListId, title))
    }
    //
    const addToDoList = (title: string) => {
       dispatchToDoLists(addToDoListAC(title))
    }

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container
                      style={{padding: '15px',}}
                >
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={5}
                      direction="row"
                      justifyContent="center">
                    {toDoLists.map((tl, index) => {
                        let allTodolistTasks = tl.tasks;
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                        }

                        return <Grid item>
                            <Paper elevation={2}
                                   style={{padding: '15px',}}>
                                <Todolist
                                    key={index}
                                    id={index}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    editTaskTitle={editTaskTitle}
                                    editToDoListTitle={editToDoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;