import PropTypes from 'prop-types';
import './ProfileOrganizationEdit.scss';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import ProfileOrganizationForm from '../ProfileOrganizationForm/ProfileOrganizationForm';

function ProfileOrganizationEdit({ organization, handleIsForm }) {
	return (
		<section className="profile-organize-edit">
			<div className="profile-organize-edit__menu-container">
				<ProfileMenu title="Личный кабинет организатора" />
			</div>
			<div className="profile-organize-edit__wrapper">
				<h1 className="profile-organize-edit__name">{organization}</h1>
				<div className="profile-organize-edit__content">
					<ProfileOrganizationForm handleIsForm={handleIsForm} />
				</div>
			</div>
		</section>
	);
}

ProfileOrganizationEdit.propTypes = {
	organization: PropTypes.string.isRequired,
	handleIsForm: PropTypes.func,
};

ProfileOrganizationEdit.defaultProps = {
	handleIsForm: () => {},
};

export default ProfileOrganizationEdit;
