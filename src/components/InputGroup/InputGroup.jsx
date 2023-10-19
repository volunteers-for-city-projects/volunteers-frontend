import React from 'react';
import PropTypes from 'prop-types';
import './InputGroup.scss';

export default function InputGroup({ title, children }) {
	return (
		<fieldset className="form-fieldset">
			<legend className="form-legend">{title}</legend>
			{children}
		</fieldset>
	);
}
InputGroup.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};
