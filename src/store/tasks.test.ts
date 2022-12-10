import {actionType, div, mul, salaryReducer, sum} from "./tasks";

test('sumSalary', () => {
    const salary: number = 800
    const n: number = 200
    const result = sum(salary, n);
    expect(result).toBe(1000)
})


test('salary should be increased in n times', () => {
    expect(mul(800, 2)).toBe(1600)
    expect(mul(1000, 3)).toBe(3000)
})

test('salary should be reduced in n times', () => {
    expect(div(800, 2)).toBe(400)
    expect(div(1000, 5)).toBe(200)
})

test("reducer should handle correct actions and return correct SUM",()=>{
    expect(salaryReducer(100, {
        type:"SUM",
        number: 10000
    })).toBe(10100)
})

test("reducer should handle correct actions and return correct SUM",()=>{
    expect(salaryReducer(100, {
        type:"DIV",
        number: 10
    })).toBe(10)
})

test("reducer should handle correct actions and return correct SUM",()=>{
    expect(salaryReducer(1, {
        type:"MUL",
        number: 4
    })).toBe(4)
})