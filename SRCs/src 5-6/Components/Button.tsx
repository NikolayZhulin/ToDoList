import React from "react"
import {FilterValuesType} from "../App";

type ButtonPropsType = {
	name: string
	callback: () => void
	className?:string
}

export const Button = (props: ButtonPropsType) => {
	
	const onClickButtonHandler = () => {
		props.callback()
	}
	
	return (
		<button className={props.className} onClick={onClickButtonHandler}>{props.name}</button>
	)
}