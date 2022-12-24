import React from "react";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeToDoListFilterAC, editTaskTitleAC,
    removeTaskAC, removeToDoListAC
} from "../Action Creators/ToDoListsActionCreators";
import {toDoListsReducer} from "./ToDoListsReducer";
import {v1} from "uuid";
import {FilterValuesType, ToDoListType} from "../App";

let taskId1=v1();

let toDoLists: ToDoListType[]

beforeEach(()=>{
    toDoLists = [
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
                {taskId: taskId1, title: "HTML&CSS2", isDone: true},
                {taskId: v1(), title: "JS2", isDone: true},
                {taskId: v1(), title: "JS2", isDone: false},
                {taskId: v1(), title: "JS2", isDone: false},
                {taskId: v1(), title: "JS2", isDone: true},
            ],
        }
    ]
})

test("Reducer should add 1 task in second todo list", ()=>{
    let result = toDoListsReducer(toDoLists, addTaskAC("New TASK", 1))
    expect(Array.isArray(result)).toBe(true)
    expect(result[1].tasks.length).toBe(6)
})

test('Task should be delete from todolist',()=>{
    const result = toDoListsReducer(toDoLists, removeTaskAC(taskId1, 1))
    expect(result[1].tasks.length).toBe(4)
    expect(result[0].tasks.length).toBe(4)
})

test('Task should be change current status',()=>{
    const result = toDoListsReducer(toDoLists, changeTaskStatusAC(taskId1, false,1))
    expect(result[1].tasks[0].isDone).toBe(false)
    expect(result[0].tasks[0].isDone).toBe(true)
})

test('TodoList should change filter',()=>{
    const result = toDoListsReducer(toDoLists, changeToDoListFilterAC(FilterValuesType.Active,1))
    expect(result[1].filter).toBe(FilterValuesType.Active)
    expect(result[0].filter).toBe(FilterValuesType.All)
})

test('TodoList should be delete',()=>{
    const result = toDoListsReducer(toDoLists, removeToDoListAC(0))
    expect(result.length).toBe(1)
    expect(result[1]).not.toBeDefined()
})

test('Task title should change',()=>{
    const result = toDoListsReducer(toDoLists, editTaskTitleAC(1,taskId1, 'new' ))
    expect(result.length).toBe(2)
    expect(result[1].tasks[0].title).toBe('new')
})


