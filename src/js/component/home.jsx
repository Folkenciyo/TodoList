import React, { useEffect, useState } from "react";
import Task from "./task.jsx";

//create your first component
const Home = () => {
	const INPUT = document.querySelector("input");
	const [list, setList] = useState([]);
	const [toDoList, setToDoList] = useState([]);
	const [update, setUpdate] = useState(false);

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
		if (update) {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/folkencillo",
				{
					method: "PUT",
					body: JSON.stringify(list),
					headers: new Headers({
						"Content-Type": "application/json"
					})
				}
			)
				.then(response => {
					if (!response.ok) {
						setUpdate(false);
						throw new Error("MAAAAL");
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	}, [update]);

	useEffect(() => {
		/* setUpdate(true); */
		if (list.length != 0) {
			setToDoList(
				list.map((task, index) => {
					return (
						<Task
							label={task.label}
							key={index.toString()}
							changeStatus={changeStatus}
							id={index}
						/>
					);
				})
			);
		}
	}, [list]);

	const changeStatus = indexDestroy => {
		setList(list.filter((_, index) => index !== indexDestroy));
		setUpdate(true);
		console.log(setList(list.filter((_, index) => index !== indexDestroy)));
	};

	return (
		<div className="m-auto text-center mt5">
			<h1>Mis cositas por hacer</h1>
			<div className="list">
				<form
					onSubmit={event => {
						event.preventDefault();
						setUpdate(true);
						setList([...list, { label: INPUT.value, done: false }]);
					}}>
					<input type="text" />
				</form>
				<div className="tasks container-fluid">
					<ul>{toDoList}</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
