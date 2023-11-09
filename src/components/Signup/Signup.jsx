import React, { useState, useEffect } from 'react';
import './Signup.scss';
import {
	Outlet,
	useNavigate,
	useOutletContext,
	useLocation,
} from 'react-router-dom';
import FormToggleButtonGroup from '../FormToggleButtonGroup/FormToggleButtonGroup';

export default function Signup() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isPageTitle, setIsPageTitle] = useState('');
	const [isActiveForm, setIsActiveForm] = useState('');
	const [isActiveButton, setIsActiveButton] = useState(
		location.pathname === '/registration/volunteer' ||
			location.pathname === '/registration'
			? 'volunteer'
			: 'organizer'
	);
	const { setModal, cities, skills } = useOutletContext();

	const handleToggle = (buttonName) => {
		if (buttonName === 'volunteer') {
			navigate('/registration/volunteer');
		}
		if (buttonName === 'organizer') {
			navigate('/registration/organizer');
		}
		setIsActiveButton(buttonName);
	};

	useEffect(() => {
		if (
			location.pathname === '/registration/volunteer' ||
			location.pathname === '/registration/volunteer/' ||
			location.pathname === '/registration'
		) {
			setIsActiveForm('volunteer');
			setIsPageTitle('Регистрация волонтёра');
			navigate('/registration/volunteer');
		}
		if (
			location.pathname === '/registration/organizer' ||
			location.pathname === '/registration/organizer/'
		) {
			setIsActiveForm('organizer');
			setIsPageTitle('Регистрация организатора');
			navigate('/registration/organizer');
		}
	}, [isActiveButton, navigate, location.pathname]);

	return (
		<main className="content">
			<section className="signup">
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
						<Outlet
							context={{
								setModal,
								cities,
								skills,
							}}
						/>
					</div>
				</div>
			</section>
		</main>
	);
}
