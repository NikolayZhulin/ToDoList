import React, {ChangeEvent, FocusEventHandler, useState} from "react";
import {setEngine} from "crypto";

type EditableSpan = {
    title: string;
    editHandler: (title: string) => void;
}

export const EditableSpan = (props: EditableSpan) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onBlurHandler=()=>{
        props.editHandler(title)
        setEditMode(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value
        setTitle(newTitle)
    }

    return (
        !editMode
            ? <span onDoubleClick={() => setEditMode(true)}>{props.title}</span>
            : <input value={title} type="text" onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
    )
}