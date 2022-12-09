import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type ToDoListsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

type TasksObjType = {
    [key: string]: TaskType[]
}


function App() {

    const taskId1 = v1();
    const taskId2 = v1();

    let [tasksObj, setTasks] = useState<TasksObjType>({
        [taskId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [taskId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Water", isDone: false},
        ]
    })

    let [toDoLists, setToDoList] = useState<ToDoListsType[]>([
        {id: taskId1, title: 'What to learn', filter: 'all'},
        {id: taskId2, title: 'What to buy', filter: 'completed'}

    ])

    const changeFilter = (toDoListId: string, filter: FilterValuesType) => {
        setToDoList(toDoLists.map(el => el.id === toDoListId ? {...el, filter: filter} : el))
    }

    function removeTask(id: string, toDoListId: string) {
        setTasks({...tasksObj, [toDoListId]: tasksObj[toDoListId].filter(el => el.id !== id)})
    }

    const addTask = (toDoListId: string, title: string) => {
        if (title.trim()) {
            let task = {id: v1(), title: title, isDone: false}
            setTasks({...tasksObj, [toDoListId]: [task, ...tasksObj[toDoListId]]})
        }
    }

    const changeStatus = (tId: string, toDoListId: string, tChecked: boolean) => {
        setTasks({
            ...tasksObj,
            [toDoListId]: tasksObj[toDoListId].map((el) => el.id === tId
                ? {...el, isDone: tChecked}
                : el)
        })
    }

    const deleteToDoList =(toDoId:string)=>{
        setToDoList([...toDoLists.filter(toDoList=>toDoList.id!==toDoId)])
        delete tasksObj[toDoId]
    }

    return (
        <div>
            {/*<button onClick={addToDoList}>ADD ToDoLIST</button>*/}
            <div className="App">
                {toDoLists.map(el => {
                    let tasksForTodolist = tasksObj[el.id];
                    if (el.filter === "active") {
                        tasksForTodolist = tasksObj[el.id].filter(t => !t.isDone);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasksObj[el.id].filter(t => t.isDone);
                    }
                    return (
                        <Todolist
                            key={el.id}
                            todoId={el.id}
                            title={el.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={el.filter}
                            changeFilter={changeFilter}
                            deleteToDoList={deleteToDoList}
                        />
                    )
                })}

            </div>
        </div>
    );
}

export default App;

