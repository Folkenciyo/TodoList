import React from "react";
import PropTypes from "prop-types";

const TodoList = props => {
	return <li>{props.label}</li>;
};

TodoList.propTypes = {
	label: PropTypes.string
};

export default TodoList;
