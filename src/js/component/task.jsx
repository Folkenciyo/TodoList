import React from "react";
import PropTypes from "prop-types";

const Task = props => {
	return <li>{props.label}</li>;
};

Task.propTypes = {
	label: PropTypes.string
};

export default Task;
