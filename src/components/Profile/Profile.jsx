import React, { useState } from 'react';

import './Profile.scss';

import { useOutletContext } from 'react-router-dom';

import ProfileVolunteer from '../ProfileVolunteer/ProfileVolunteer';
import ProfileVolunteerEdit from '../ProfileVolunteerEdit/ProfileVolunteerEdit';
import ProfileOrganization from '../ProfileOrganization/ProfileOrganization';
import ProfileOrganizationEdit from '../ProfileOrganizationEdit/ProfileOrganizationEdit';

function Profile() {
	const { currentUser } = useOutletContext();
	const { role } = currentUser;

	const [isForm, setIsForm] = useState(false);

	const handleIsForm = () => {
		setIsForm((prev) => !prev);
	};

	if (role === 'volunteer') {
		if (isForm) {
			return <ProfileVolunteerEdit handleIsForm={handleIsForm} />;
		}
		return (
			<ProfileVolunteer
				title="Личный кабинет волонтера"
				handleIsForm={handleIsForm}
			/>
		);
	}

	if (role === 'organizer') {
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
