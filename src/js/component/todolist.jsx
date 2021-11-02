import React from "react";
import PropTypes from "prop-types";

const TodoList = () => {
	return <li>{props[0].label}</li>;
};

TodoList.propTypes = {
	label: PropTypes.string
};

export default TodoList;
