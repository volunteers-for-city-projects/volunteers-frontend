import PropTypes from 'prop-types';
import './ProfileVolunteerEdit.scss';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import ProfileVolunteerForm from '../ProfileVolunteerForm/ProfileVolunteerForm';

function ProfileVolunteerEdit({
	firstname,
	secondname,
	thirdname,
	isVolunteer,
	isForm,
	handleIsForm,
}) {
	return (
		<section className="profile-volunteer-edit">
			<ProfileMenu title="Личный кабинет волонтера" />
			<div className="profile-volunteer-edit__wrapper">
				<h1 className="profile-volunteer-edit__name">
					{firstname} {secondname} {thirdname}
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
	firstname: PropTypes.string.isRequired,
	secondname: PropTypes.string.isRequired,
	thirdname: PropTypes.string.isRequired,
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
