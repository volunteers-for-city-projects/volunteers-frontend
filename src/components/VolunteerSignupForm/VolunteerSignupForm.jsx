import React from 'react';
import PropTypes from 'prop-types';
import './VolunteerSignupForm.scss';

export default function VolunteerSignupForm({
	onSubmit,
	children,
	...restProps
}) {
	return (
		<form
			action="#"
			method="post"
			className="volunteer-signup-form"
			name="volunteer-auth-form"
			noValidate
			onSubmit={onSubmit}
			{...restProps}
		>
			{children}
		</form>
	);
}

VolunteerSignupForm.propTypes = {
	children: PropTypes.node.isRequired,
	onSubmit: PropTypes.func,
};

VolunteerSignupForm.defaultProps = {
	onSubmit: () => {},
};
