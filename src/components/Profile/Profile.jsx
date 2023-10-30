import React, { useState, useEffect } from 'react';

import './Profile.scss';

import ProfileVolunteer from '../ProfileVolunteer/ProfileVolunteer';
import ProfileVolunteerEdit from '../ProfileVolunteerEdit/ProfileVolunteerEdit';
import ProfileOrganization from '../ProfileOrganization/ProfileOrganization';
import ProfileOrganizationEdit from '../ProfileOrganizationEdit/ProfileOrganizationEdit';

function Profile() {
	const [isForm, setIsForm] = useState(false);
	const [isVolunteer, setIsVolunteer] = useState(false);

	const handleIsForm = () => {
		setIsForm((prev) => !prev);
	};

	useEffect(() => {
		setIsVolunteer(false);
	}, []);

	if (isVolunteer) {
		if (isForm) {
			// eslint-disable-next-line no-return-assign
			return (
				<ProfileVolunteerEdit
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

	if (!isVolunteer) {
		if (isForm) {
			return (
				<ProfileOrganizationEdit
					handleIsForm={handleIsForm}
					organization="ООО «Организация»"
				/>
			);
		}
		return (
			<ProfileOrganization
				title="Личный кабинет организатора"
				handleIsForm={handleIsForm}
			/>
		);
	}
}

export default Profile;
