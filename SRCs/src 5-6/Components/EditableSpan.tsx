import React, {ChangeEvent, useState} from "react";

type EditableSpanPropType = {
    title: string;
    onTextChanged:(title:string)=>void
}
export const EditableSpan = (props: EditableSpanPropType) => {
    const [title, setTitle] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const deactivateEditMode = () =>{
        setEditMode(false);
        props.onTextChanged(title);
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return editMode
        ? <input value={title} onBlur={deactivateEditMode} onChange={onChangeHandler} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}