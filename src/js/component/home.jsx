import React, { useEffect, useState } from "react";
import Task from "./task.jsx";

//create your first component
const Home = () => {
	const INPUT = document.querySelector("input");
	const [list, setList] = useState([]);
	const [toDoList, setToDoList] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/folkencillo", {
			headers: new Headers({
				"Content-Type": "application/json"
			})
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(responseAsJSON => {
				setList(responseAsJSON);
			});
	}, []);

	useEffect(() => {
		setToDoList(
			list.map((task, index) => {
				return <Task label={task.label} key={index.toString()} />;
			})
		);
	}, [list]);

	return (
		<div className="m-auto">
			<form
				onSubmit={event => {
					event.preventDefault();
					setList([...list, { label: INPUT.value, done: false }]);
				}}>
				<input type="text" />
			</form>
			<ul>{toDoList}</ul>
		</div>
	);
};

export default Home;
