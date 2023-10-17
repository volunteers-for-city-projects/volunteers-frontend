import './ProfileMenu.scss';
import strelka from '../../images/icon-strelka.svg';

function ProfileMenu() {
	return (
		<div className="profile__menu">
			<div className="profile__menu-wrapper">
				<h2 className="profile__menu-title">Главная</h2>
				<img className="profile__menu-image" src={strelka} alt="стрелка" />
				<p className="profile__menu-subtitle">Личный кабинет волонтера</p>
			</div>
		</div>
	);
}

export default ProfileMenu;
