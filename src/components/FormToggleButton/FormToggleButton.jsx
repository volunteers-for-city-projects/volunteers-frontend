import React from 'react';
import PropTypes from 'prop-types';
import './FormToggleButton.scss';

export default function FormToggleButton({ buttonText, isActive, onToggle }) {
	const handleClick = () => {
		onToggle(!isActive);
	};

	return (
		<button
			className={`toggle-button ${isActive ? 'toggle-button_active' : ''}`}
			onClick={handleClick}
		>
			{buttonText}
		</button>
	);
}

FormToggleButton.propTypes = {
	buttonText: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
};
