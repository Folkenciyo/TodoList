import React, { useEffect, useState } from "react";
import TodoList from "./todolist.jsx";

//create your first component
const Home = () => {
	let todoList = [
		{ label: "Morision por React.js", done: false },
		{ label: "Dormir más", done: false },
		{ label: "hacer café matutino", done: false },
		{ label: "Ir a casa", done: false },
		{ label: "Ir al gim", done: false }
	];
	const [list, setList] = useState([]);
	const [listComponents, setListComponents] = useState([]);
	const INPUT = document.querySelector("#upload");
	const [addingTask, setaddingTask] = useEffect([]);

	useEffect(() => {
		if (list) {
			setListComponents(
				list.map((list, index) => {
					return (
						<TodoList label={list.label} key={index.toString()} />
					);
				})
			);
		}
	}, [list]);

	//TEORICAMENTE: Enviamos la lista de la API a list
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/folkencillo", {
			headers: new Headers({
				"Content-Type": "application/json"
			})
		})
			.then(response => {
				console.log(response);

				if (response.ok) {
					return response.json();
				}
			})
			.then(responseAsJSON => {
				setList(responseAsJSON);
			});
	}, []);

	console.log(list, "list");

	//TEORICAMENTE: ACTUALIZA; pero sabemos q no lo hace.
	const upload = list => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/folkencillo", {
			method: "PUT",
			body: JSON.stringify({ list }),
			headers: new Headers({
				"Content-Type": "application/json"
			})
		})
			.then(response => {
				console.log(response);

				if (response.ok) {
					return response.json();
				}
			})
			.then(responseAsJSON => {
				console.log("API-sub", responseAsJSON);
			});
	};

	return (
		<div className="m-auto">
			<form
				onSubmit={event => {
					event.preventDefault();
					setaddingTask([...addingTask, INPUT]);
				}}>
				<div>
					<input
						type="text"
						value="Cuentame tus problemas"
						id="upload"
					/>
				</div>
			</form>
			<div>
				<ul>{listComponents}</ul>
			</div>
		</div>
	);
};

export default Home;
