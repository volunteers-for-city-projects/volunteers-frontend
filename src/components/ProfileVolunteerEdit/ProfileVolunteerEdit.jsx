import './ProfileVolunteerEdit.scss';
import { useOutletContext } from 'react-router-dom';
import { Crumbs } from '../Crumbs/Crumbs';
import ProfileVolunteerForm from '../ProfileVolunteerForm/ProfileVolunteerForm';

function ProfileVolunteerEdit() {
	const { currentUser } = useOutletContext();
	const { firstName, lastName, secondName } = currentUser;

	return (
		<section className="profile-volunteer-edit">
			<div className="profile-volunteer-edit__menu-container">
				<Crumbs />
			</div>
			<div className="profile-volunteer-edit__wrapper">
				<h1 className="profile-volunteer-edit__name">
					{`${firstName} ${secondName} ${lastName}`}
				</h1>
				<div className="profile-volunteer-edit__content">
					<ProfileVolunteerForm />
				</div>
			</div>
		</section>
	);
}

export default ProfileVolunteerEdit;
