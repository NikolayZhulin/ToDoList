import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";


type ToDoListType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TasksType>
    students: Array<string>
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

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([ //tasks store
        {
            title: "What to learn",
            filter: FilterValuesType.All,
            tasks: [
                {taskId: v1(), title: "HTML&CSS", isDone: true},
                {taskId: v1(), title: "JS", isDone: true},
                {taskId: v1(), title: "JS", isDone: false},
                {taskId: v1(), title: "JS", isDone: false},
            ],
            students: [
                'Rick Kane',
                'Finnlay Bentley',
                'Samia North',
                'Isaac Morton',
                'Lily-Ann Clifford',
                'Thalia Park',
                'Sapphire Cruz',
                'Cieran Vazquez',
                'Anya Estes',
                'Dominika Field',
                'Rosanna Chung',
                'Safiyah Davey',
                'Ryley Beasley',
                'Kalvin Trejo',
                'Evie-Mae Farrell',
                'Juliet Valencia',
                'Astrid Austin',
                'Lyle Montgomery',
                'Nisha Mora',
                'Kylie Callaghan',
                'Star Wilks',
                'Marissa Colley',
                'Asa Fuller',
                'Leigh Kemp',
                'Avleen Dawson',
                'Sammy Bonilla',
                'Acacia Becker',
                'Coral Shepherd',
                'Melina Molina',
                'Kiran Bailey',
                'Clara Escobar',
                'Alexandru Horn',
                'Brandon-Lee Mercado',
                'Elouise Weston',
                'King Long',
                'Kerri Searle',
                'Kanye Hamer',
                'Elwood Benitez',
                'Mikail Whitaker',
                'Bobby Hardy',
                'Talha Ferry',
                'Priscilla Landry',
                'Olivia-Grace Cain',
                'Kiaan Wallace',
                'Wesley Padilla90',
                'Ella-Grace Wooten91',
                'Kaif Molloy92',
                'Kamal Broadhurst93',
                'Bianca Ferrell94',
                'Micheal Talbot95',
            ]
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
            students: [
                'Jago Wormald1',
                'Saul Milne2',
                'Aariz Hester3',
                'Dion Reeve4',
                'Anisa Ortega5',
                'Blade Cisneros6',
                'Malaikah Phelps7',
                'Zeeshan Gallagher8',
                'Isobella Vo9',
                'Rizwan Mathis10',
                'Menaal Leach11',
                'Kian Walton12',
                'Orion Lamb13',
                'Faizah Huynh14',
                'Crystal Vaughan15',
                'Vivien Hickman16',
                'Stuart Lu17',
                'Karol Davison18',
                'Dario Burns19',
                'Chloe Rich20',
                'Martyna Felix',
                'Nida Glass',
                'Maeve Miles',
                'Hasnain Puckett',
                'Ayman Cano',
                'Safwan Perry',
                'Fox Kelly',
                'Louise Barlow',
                'Malaki Mcgill',
                'Leanna Cline',
                'Willard Hodge',
                'Amelia Dorsey',
                'Kiah Porter',
                'Jeanne Daly',
                'Mohsin Armstrong',
                'Laurie Rangel',
                'Princess Tierney',
                'Kasim Kendall',
                'Darryl Cope',
                'Elysha Ray',
                'Liyana Harris',
                'Kashif Blackburn',
                'Atif Zimmerman',
                'Sila Hartley',
                'Ralphie Hebert',
            ]
        }
    ])

    function removeTask(taskId: string, todolistId: number) { // remove task from state
        setToDoLists(toDoLists.map((todoList, ind) => ind === todolistId
            ? {...todoList, tasks: todoList.tasks.filter(task => task.taskId !== taskId)}
            : todoList))
    }

    function addTask(title: string, todolistId: number) { // add task in state
        let newTask = {taskId: v1(), title: title, isDone: false}
        setToDoLists(toDoLists.map((todoList, ind) => ind === todolistId ? {
            ...todoList,
            tasks: [newTask, ...todoList.tasks]
        } : todoList))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: number) {
        setToDoLists(toDoLists.map((todoList, ind) => ind === todolistId
            ? {
                ...todoList,
                tasks: todoList.tasks.map(task => task.taskId === taskId ? {...task, isDone: isDone} : task)
            }
            : todoList
        ))
    }

    function changeFilter(value: FilterValuesType, todolistId: number) {
        setToDoLists(toDoLists.map((todoList, ind) => ind === todolistId
            ? {...todoList, filter: value}
            : todoList))
    }

    function removeTodolist(todolistId: number) {
        setToDoLists(toDoLists.filter((todoList, ind) => ind !== todolistId))
    }

    const editTaskTitle = (toDoListId: number, taskId: string, title: string) => {
        console.log(toDoListId,taskId,title)
        setToDoLists(toDoLists.map((toDoList, ind) => toDoListId === ind
            ?{...toDoList, tasks:[...toDoList.tasks.map(task=>task.taskId === taskId? {...task, title: title}:task)]}
            :toDoList
        ))
    }
    const editToDoListTitle = (toDoListId: number, title: string) => { // change ToDoListTitle
        setToDoLists(toDoLists.map((toDoList, ind) => toDoListId === ind
            ? {...toDoList, title:title}
            :toDoList
        ))
    }

    const addToDoList = (title: string) => {
        let newToDo: ToDoListType = {
            title: title,
            filter: FilterValuesType.All,
            tasks: [],
            students: [
                'Rick Kane',
                'Finnlay Bentley',
                'Samia North',
                'Isaac Morton',
                'Lily-Ann Clifford',
                'Thalia Park',
                'Sapphire Cruz',
                'Cieran Vazquez',
                'Anya Estes',
                'Dominika Field',
                'Rosanna Chung',
                'Safiyah Davey',
                'Ryley Beasley',
                'Kalvin Trejo',
                'Evie-Mae Farrell',
                'Juliet Valencia',
                'Astrid Austin',
                'Lyle Montgomery',
                'Nisha Mora',
                'Kylie Callaghan',
                'Star Wilks',
                'Marissa Colley',
                'Asa Fuller',
                'Leigh Kemp',
                'Avleen Dawson',
                'Sammy Bonilla',
                'Acacia Becker',
                'Coral Shepherd',
                'Melina Molina',
                'Kiran Bailey',
                'Clara Escobar',
                'Alexandru Horn',
                'Brandon-Lee Mercado',
                'Elouise Weston',
                'King Long',
                'Kerri Searle',
                'Kanye Hamer',
                'Elwood Benitez',
                'Mikail Whitaker',
                'Bobby Hardy',
                'Talha Ferry',
                'Priscilla Landry',
                'Olivia-Grace Cain',
                'Kiaan Wallace',
                'Wesley Padilla90',
                'Ella-Grace Wooten91',
                'Kaif Molloy92',
                'Kamal Broadhurst93',
                'Bianca Ferrell94',
                'Micheal Talbot95',
            ]
        }
        setToDoLists([...toDoLists, newToDo])
    }

    return (
        <div className="App">
            <AddItemForm addItem={addToDoList}/>
            {
                toDoLists.map((tl, index) => {
                    let allTodolistTasks = tl.tasks;
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }

                    return <Todolist
                        key={index}
                        id={index}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        students={tl.students}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        editTaskTitle={editTaskTitle}
                        editToDoListTitle={editToDoListTitle}
                    />
                })
            }

        </div>

    );
}

export default App;
