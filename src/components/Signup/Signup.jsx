import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Signup.scss';

import PageMenu from '../PageMenu/PageMenu';
import VolunteerSignupForm from '../VolunteerSignupForm/VolunteerSignupForm';
import OrganizerSignupForm from '../OrganizerSignupForm/OrganizerSignupForm';
import FormToggleButtonGroup from '../FormToggleButtonGroup/FormToggleButtonGroup';

export default function Signup({ title, setIsPageTitle }) {
	const [isActiveForm, setIsActiveForm] = useState('');
	const [isActiveButton, setIsActiveButton] = useState('volunteer');

	const handleToggle = (buttonName) => {
		setIsActiveButton(buttonName);
	};

	useEffect(() => {
		if (isActiveButton.includes('volunteer')) {
			setIsPageTitle('Регистрация волонтёра');
			setIsActiveForm('volunteer');
		}
		if (isActiveButton.includes('organizer')) {
			setIsActiveForm('organizer');
			setIsPageTitle('Регистрация организатора');
		}
	}, [setIsPageTitle, isActiveButton]);
	// TODO написать валидацию, также сделать мин длину и максимальную длину, стилизовать страницу, добавить сторис, написать стили для загрузки
	return (
		<section className="signup">
			<PageMenu title={title} isProjectPage={false} projectTitle="" />
			<div className="signup__wrap">
				<div className="signup__image" />
				<div className="signup__content-wrap">
					<h1 className="signup__title">{title}</h1>
					<FormToggleButtonGroup
						isActiveButton={isActiveButton}
						handleToggle={handleToggle}
					/>

					{isActiveForm === 'volunteer' && <VolunteerSignupForm />}
					{isActiveForm === 'organizer' && <OrganizerSignupForm />}
				</div>
			</div>
		</section>
	);
}

Signup.propTypes = {
	title: PropTypes.string.isRequired,
	setIsPageTitle: PropTypes.func,
};

Signup.defaultProps = {
	setIsPageTitle: () => {},
};
