import PropTypes from 'prop-types';
import './ProfileMenu.scss';
import strelka from '../../images/icon-strelka.svg';

function ProfileMenu({ title }) {
	return (
		<div className="profile__menu">
			<div className="profile__menu-wrapper">
				<h2 className="profile__menu-title">Главная</h2>
				<img className="profile__menu-image" src={strelka} alt="стрелка" />
				<p className="profile__menu-subtitle">{title}</p>
			</div>
		</div>
	);
}

ProfileMenu.propTypes = {
	title: PropTypes.string.isRequired,
};

export default ProfileMenu;
