import PropTypes from 'prop-types';
import './ProfileVolunteerEdit.scss';
import { useOutletContext } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import ProfileVolunteerForm from '../ProfileVolunteerForm/ProfileVolunteerForm';

function ProfileVolunteerEdit({ isVolunteer, isForm, handleIsForm }) {
	const { currentUser } = useOutletContext();
	const { firstName, lastName, secondName } = currentUser;

	return (
		<section className="profile-volunteer-edit">
			<div className="profile-volunteer-edit__menu-container">
				<ProfileMenu title="Личный кабинет волонтера" />
			</div>
			<div className="profile-volunteer-edit__wrapper">
				<h1 className="profile-volunteer-edit__name">
					{`${firstName} ${secondName} ${lastName}`}
				</h1>
				<div className="profile-volunteer-edit__content">
					<ProfileVolunteerForm
						isVolunteer={isVolunteer}
						isForm={isForm}
						handleIsForm={handleIsForm}
					/>
				</div>
			</div>
		</section>
	);
}

ProfileVolunteerEdit.propTypes = {
	isVolunteer: PropTypes.bool,
	isForm: PropTypes.bool,
	handleIsForm: PropTypes.func,
};

ProfileVolunteerEdit.defaultProps = {
	isVolunteer: false,
	isForm: false,
	handleIsForm: () => {},
};

export default ProfileVolunteerEdit;
