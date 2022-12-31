import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropType = {
    title: string;
    onTextChanged: (title: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropType) => {
    console.log('edit span is called')
    const [title, setTitle] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setTitle(props.title);
    },[props.title])
    const deactivateEditMode = useCallback(() => {
        setEditMode(false);
        props.onTextChanged(title);
    },[ props.onTextChanged,title])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    },[])

    return editMode
        ? <TextField id="outlined-basic"
                     label={"Change task text"}
                     variant="standard"
                     value={title} onBlur={deactivateEditMode}
                     onChange={onChangeHandler} autoFocus
                     color={"secondary"}
                     style={{width: '150px'}}
                     size={"small"}
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})