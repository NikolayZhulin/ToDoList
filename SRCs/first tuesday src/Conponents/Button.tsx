import React from "react"
import {FilterValuesType} from "../App";

type ButtonPropsType = {
	name: string
	className: string
	callback: () => void
}

export const Button = (props: ButtonPropsType) => {

	return (
		<button onClick={props.callback} className={props.className}>{props.name}</button>
	)
}