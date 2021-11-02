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
			body: JSON.stringify({ todoList }),
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
			<form>
				<div>
					<input
						type="submit"
						value="SUBMIT"
						onClick={() => {
							upload(todoList);
						}}
					/>
				</div>
				<div>
					<ul>{listComponents}</ul>
				</div>
			</form>
		</div>
	);
};

export default Home;
