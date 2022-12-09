import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {ToDoList} from "./TodoList";


//C - create (validation)
//R - read (pagination, sorting, filtration)
//U - update (validation)
//D - delete (validation)

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

type TaskStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const id1 = v1()
    const id2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: id1, title: 'What to buy', filter: 'all'},
        {id: id2, title: 'What to learn', filter: 'all'},
    ])
    const [tasks, setTask] = useState<TaskStateType>({
        [id1]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Wheat", isDone: false},
        ],
        [id2]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
    })


    const removeTask = (todoListId: string, taskId: string) => {
        setTask({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})
    }
    const addTask = (todoListId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: true};
        setTask({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        // setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTask({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }


    const changeTodoListFilter = (todoListId: string, nextFilterValue: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: nextFilterValue} : tl))
    }

    const removeToDoList=(toDoListId:string)=>{
        setTodoLists(todoLists.filter(todoList=>todoList.id!==toDoListId))
    }

    const getFilteredTasks =
        (todoListId: string, tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case "completed":
                    return tasks.filter(task => task.isDone)
                case "active":
                    return tasks.filter(task => !task.isDone)
                default:
                    return tasks
            }
        }
    let todoMappedLists = todoLists.map(todoList => {
        return (
            <ToDoList
                key={todoList.id}
                todoListId={todoList.id}
                title={todoList.title}
                tasks={getFilteredTasks(todoList.id, tasks[todoList.id], todoList.filter)}
                filter={todoList.filter}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
                removeToDoList={removeToDoList}
            />

        )
    })
    return (
        <div className="App">
            {todoMappedLists}
        </div>
    );
}

export default App;
