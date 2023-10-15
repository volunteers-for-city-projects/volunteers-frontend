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
			<div className=" volunteer-signup-form__text-content">
				<p className="volunteer-signup-form__text">
					Нажимая кнопку «Отправить данные», я подтверждаю, что мне исполнилось
					18 лет, и соглашаюсь с Политикой конфиденциальности
				</p>

				<label
					htmlFor="volunteer-signup-form"
					className="volunteer-signup-form__text"
				>
					<input
						id="volunteer-signup-form"
						name="volunteer-signup-form"
						type="checkbox"
						className="volunteer-signup-form__input"
					/>
					Даю согласие на обработку моих персональных данных
				</label>
			</div>
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
