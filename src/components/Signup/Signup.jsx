import React, { useState, useEffect } from 'react';
import './Signup.scss';

// import PageMenu from '../PageMenu/PageMenu';
import { useSearchParams } from 'react-router-dom';
import VolunteerSignupForm from '../VolunteerSignupForm/VolunteerSignupForm';
import OrganizerSignupForm from '../OrganizerSignupForm/OrganizerSignupForm';
import FormToggleButtonGroup from '../FormToggleButtonGroup/FormToggleButtonGroup';

export default function Signup() {
	const [isPageTitle, setIsPageTitle] = useState('');
	const [isActiveForm, setIsActiveForm] = useState('');
	const [searchParam, setSearchParam] = useSearchParams();
	const [isActiveButton, setIsActiveButton] = useState(
		searchParam.get('role') || 'volunteer'
	);

	const handleToggle = (buttonName) => {
		setIsActiveButton(buttonName);
	};

	useEffect(() => {
		if (isActiveButton.includes('volunteer')) {
			setIsPageTitle('Регистрация волонтёра');
			setIsActiveForm('volunteer');
			searchParam.set('role', 'volunteer');
			setSearchParam(searchParam);
		}
		if (isActiveButton.includes('organizer')) {
			setIsActiveForm('organizer');
			setIsPageTitle('Регистрация организатора');
			searchParam.set('role', 'organizer');
			setSearchParam(searchParam);
		}
	}, [setIsPageTitle, isActiveButton, searchParam, setSearchParam]);

	return (
		<main className="content">
			<section className="signup">
				{/* <PageMenu title={isPageTitle} isProjectPage={false} projectTitle="" /> */}
				<div className="signup__wrap">
					<div
						className={`signup__image
					${isActiveForm === 'volunteer' && 'signup__image_volunteer'}
					${isActiveForm === 'organizer' && 'signup__image_organizer'}`}
					/>
					<div className="signup__content-wrap">
						<h1 className="signup__title">{isPageTitle}</h1>
						<FormToggleButtonGroup
							isActiveButton={isActiveButton}
							handleToggle={handleToggle}
						/>

						{isActiveForm === 'volunteer' && <VolunteerSignupForm />}
						{isActiveForm === 'organizer' && <OrganizerSignupForm />}
					</div>
				</div>
			</section>
		</main>
	);
}
