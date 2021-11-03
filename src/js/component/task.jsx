import React from "react";
import PropTypes from "prop-types";

const Task = props => {
	return (
		<li>
			{props.label}
			<button
				onClick={() => {
					props.changeStatus();
				}}></button>
		</li>
	);
};

Task.propTypes = {
	label: PropTypes.string,
	changeStatus: PropTypes.func
};

export default Task;
