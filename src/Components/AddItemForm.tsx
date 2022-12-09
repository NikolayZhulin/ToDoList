import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type AddItemPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null) //set error message when we get error

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { // add input value in state
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { //reset error and add item if we dont have an error
        setError(null);
        if (e.charCode === 13) {
            title.trim()
                ? props.addItem(title.trim())
                : setError('Error')
            setTitle('')
        }
    }

    const addTaskHandler = () => {  //reset error and add item if we dont have an error
        !title.trim()
            ? setError('Error')
            : props.addItem(title.trim());
        setTitle('')
    }

    return <div>
        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? "error" : ""}*/}
        {/*/>*/}
        <TextField id="outlined-basic"
                   error={!!error}
                   label={!!error?'Enter correct value':"Add your task..."}
                   variant="outlined"
                   value={title}
                   onChange={onChangeHandler} autoFocus
                   onKeyPress={onKeyPressHandler}
                   style={{width: ''}}
                   size={"small"}
        />
        <Button onClick={addTaskHandler}
                variant={"outlined"}
                color={"secondary"}
                style={{minWidth:'39px', minHeight: '39px'}}
        >+</Button>
        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}