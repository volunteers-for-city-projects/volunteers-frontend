import React, { useState, useEffect } from 'react';

import './Profile.scss';

import ProfileVolunteer from '../ProfileVolunteer/ProfileVolunteer';
import ProfileVolunteerEdit from '../ProfileVolunteerEdit/ProfileVolunteerEdit';
import ProfileOrganization from '../ProfileOrganization/ProfileOrganization';
import ProfileOrganizationForm from '../ProfileOrganizationForm/ProfileOrganizationForm';

function Profile() {
	const [isForm, setIsForm] = useState(false);
	const [isVolunteer, setIsVolunteer] = useState(false);

	const handleIsForm = () => {
		setIsForm((prev) => !prev);
	};

	useEffect(() => {
		setIsVolunteer(true);
	}, []);

	if (isVolunteer) {
		if (isForm) {
			// eslint-disable-next-line no-return-assign
			return (
				<ProfileVolunteerEdit
					isVolunteer={isVolunteer}
					isForm={isForm}
					handleIsForm={handleIsForm}
					firstname="Фамилия"
					secondname="Имя"
					thirdname="Отчество"
				/>
			);
		}
		return (
			<ProfileVolunteer
				title="Личный кабинет волонтера"
				isVolunteer={isVolunteer}
				isForm={isForm}
				handleIsForm={handleIsForm}
			/>
		);
	}
	if (isForm) {
		return (
			<ProfileOrganizationForm
				isVolunteer={isVolunteer}
				isForm={isForm}
				handleIsForm={handleIsForm}
			/>
		);
	}
	return (
		<ProfileOrganization
			title="Личный кабинет организатора"
			isVolunteer={isVolunteer}
			isForm={isForm}
			handleIsForm={handleIsForm}
		/>
	);
}

export default Profile;
