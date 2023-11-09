import React, { useEffect } from 'react';

import './Profile.scss';

import {
	useOutletContext,
	useLocation,
	useNavigate,
	Outlet,
} from 'react-router-dom';

function Profile() {
	const {
		currentUser,
		cities,
		skills,
		projectCategories,
		setModal,
		handleChangePassword,
	} = useOutletContext();
	const { role } = currentUser;
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/profile' || location.pathname === '/profile/') {
			if (role === 'volunteer') {
				navigate('/profile/volunteer');
			}
			if (role === 'organizer') {
				navigate('/profile/organizer');
			}
		}
	}, [location.pathname, navigate, role]);

	return (
		<Outlet
			context={{
				currentUser,
				cities,
				skills,
				projectCategories,
				setModal,
				handleChangePassword,
			}}
		/>
	);
}

export default Profile;
