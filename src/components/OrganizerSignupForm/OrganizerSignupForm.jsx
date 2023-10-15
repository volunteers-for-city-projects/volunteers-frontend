import React from 'react';
import PropTypes from 'prop-types';
import './OrganizerSignupForm.scss';

import { Pushbutton } from '../Pushbutton/Pushbutton';

export default function OrganizerSignupForm({
	onSubmit,
	children,
	...restProps
}) {
	return (
		<form
			action="#"
			method="post"
			className="organizer-signup-form"
			name="organizer-auth-form"
			noValidate
			onSubmit={onSubmit}
			{...restProps}
		>
			{children}
			<div className=" organizer-signup-form__text-content">
				<Pushbutton label="Зарегистрироваться" color="white" size="medium" />
				<p className="organizer-signup-form__text">
					Нажимая кнопку «Отправить данные», я подтверждаю, что мне исполнилось
					18 лет, и соглашаюсь с Политикой конфиденциальности
				</p>
				<label
					htmlFor="organizer-signup-form"
					className="organizer-signup-form__text"
				>
					<input
						id="organizer-signup-form"
						name="organizer-signup-form"
						type="checkbox"
						className="organizer-signup-form__input"
					/>
					Даю согласие на обработку моих персональных данных
				</label>
			</div>
		</form>
	);
}

OrganizerSignupForm.propTypes = {
	children: PropTypes.node.isRequired,
	onSubmit: PropTypes.func,
};

OrganizerSignupForm.defaultProps = {
	onSubmit: () => {},
};
