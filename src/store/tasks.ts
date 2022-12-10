export const sum = (salary: number, n: number) => salary + n;
export const div = (salary: number, n: number) => salary / n;
export const mul = (salary: number, n: number) => salary * n;

export type actionType = {
    type: "SUM" | "DIV" | "MUL",
    number: number
}

export const salaryReducer = (state: number, action: actionType) => {
    switch (action.type) {
        case "SUM":
            return state + action.number;
        case "DIV":
            return state / action.number;
        case "DIV":
            return state * action.number;
        default:
            return state;
    }
}