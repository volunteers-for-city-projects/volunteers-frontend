import React from 'react';
import PropTypes from 'prop-types';
import FormToggleButton from '../FormToggleButton/FormToggleButton';
import './FormToggleButtonGroup.scss';

export default function FormToggleButtonGroup({
	isActiveButton,
	handleToggle,
}) {
	return (
		<div className="toggle-button-group">
			<FormToggleButton
				buttonText="Волонтер"
				isActive={isActiveButton === 'volunteer'}
				onToggle={() => handleToggle('volunteer')}
			/>
			<FormToggleButton
				buttonText="Организатор"
				isActive={isActiveButton === 'organizer'}
				onToggle={() => handleToggle('organizer')}
			/>
		</div>
	);
}

FormToggleButtonGroup.propTypes = {
	isActiveButton: PropTypes.string,
	handleToggle: PropTypes.func,
};

FormToggleButtonGroup.defaultProps = {
	isActiveButton: '',
	handleToggle: () => {},
};
