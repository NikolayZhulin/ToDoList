type StateType = {
    age: number;
    childrenCounter: number;
    name: string;
}

type ActionType = {
    type: string;
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "INCREMENT-AGE":
            return {...state, age: state.age + 1}
        case "INCREMENT-CHILDREN-COUNTER":
            return {...state, childrenCounter: state.childrenCounter + 1}
        case "CHANGE-USER-NAME":
            return {...state, name: action.name}
        default:
            throw new Error("I don't understand this action type")
    }
}