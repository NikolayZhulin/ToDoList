import {userReducer} from "./user-reducer";


test('user reducer should increment only age',()=>{
    const startState = {age:20, childrenCounter:2, name:'Nikolay'}

    const action= {type:"INCREMENT-AGE"}

    const result = userReducer(startState,action)

    expect(result.age).toBe(21)
})


test('user reducer should increment only childrenCounter',()=>{
    const startState = {age:20, childrenCounter:2, name:'Nikolay'}

    const action= {type:"INCREMENT-CHILDREN-COUNTER"}

    const result = userReducer(startState,action);

    expect(result.childrenCounter).toBe(3);
})

test("Reducer should change only name in state",()=>{
    const startState = {age:20, childrenCounter:2, name:'Nikolay'}
    let newName="Viktor"
    let result = userReducer(startState,{type:"CHANGE-USER-NAME", name : newName})
    expect(result.name).toBe("Viktor")
})