import PropTypes from 'prop-types';
import './ProfileMenu.scss';
import strelka from '../../images/icon-strelka.svg';

function ProfileMenu({ isVolunteer }) {
	return (
		<div className="profile__menu">
			<div className="profile__menu-wrapper">
				<h2 className="profile__menu-title">Главная</h2>
				<img className="profile__menu-image" src={strelka} alt="стрелка" />
				{/* переключение на волонтера или организатора */}
				{!isVolunteer ? (
					<p className="profile__menu-subtitle">Личный кабинет волонтера</p>
				) : (
					<p className="profile__menu-subtitle">Личный кабинет организатора</p>
				)}
			</div>
		</div>
	);
}

ProfileMenu.propTypes = {
	isVolunteer: PropTypes.bool.isRequired,
};

export default ProfileMenu;
