import { useOutletContext } from 'react-router-dom';
import './ProfileOrganizationEdit.scss';
import { Crumbs } from '../Crumbs/Crumbs';
import ProfileOrganizationForm from '../ProfileOrganizationForm/ProfileOrganizationForm';

function ProfileOrganizationEdit() {
	const { currentUser } = useOutletContext();
	const { title } = currentUser;

	return (
		<section className="profile-organize-edit">
			<div className="profile-organize-edit__menu-container">
				<Crumbs />
			</div>
			<div className="profile-organize-edit__wrapper">
				<h1 className="profile-organize-edit__name">{title}</h1>
				<div className="profile-organize-edit__content">
					<ProfileOrganizationForm />
				</div>
			</div>
		</section>
	);
}

export default ProfileOrganizationEdit;
