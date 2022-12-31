import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./Components/AddItemForm";
import {Header} from "./Components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    addToDoListAC,
    editToDoListTitleAC,
    removeToDoListAC,
} from "./Action Creators/ToDoListsActionCreators";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import {v1} from "uuid";


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

export enum FilterValuesType {
    All = "all",
    Active = "active",
    Completed = "completed",
}

function App() {
    console.log('---------------------app is called')
    const toDoLists = useSelector<AppRootState, ToDoListType[]>(store => store.toDoLists)
    const dispatch = useDispatch();


    const removeTodolist= useCallback((todolistId: number)=> {
        dispatch(removeToDoListAC(todolistId))
    },[])

    const editToDoListTitle = useCallback((toDoListId: number, title: string) => {
        dispatch(editToDoListTitleAC(toDoListId, title))
    },[])
    const addToDoList = useCallback((title: string) => {
        dispatch(addToDoListAC(title))
    },[])

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

                        let tasksForTodolist = tl.tasks;

                        return <Grid item key={index}>
                            <Paper elevation={2}
                                   style={{padding: '15px',}}>
                                <Todolist
                                    id={index}
                                    tasks={tasksForTodolist}
                                    title={tl.title}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
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
