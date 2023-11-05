import PropTypes from 'prop-types';
import './ProfileOrganization.scss';
import ProfileData from '../ProfileData/ProfileData';
import dataOrganization from '../../utils/dataOrganization';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import CardProject from '../CardProject/CardProject';
import cardsProjectsArray from '../../utils/cardsProjectsArray';
import ProfileButtonsTabs from '../ProfileButtonsTabs/ProfileButtonsTabs';
import ProfilePagination from '../ProfilePagination/ProfilePagination';
import city from '../../images/city.png';

function ProfileOrganization({ handleChangePassword }) {
	return (
		<section className="profile">
			<div className="profile__menu-container">
				<ProfileMenu title="Личный кабинет организатора" />
			</div>
			<div className="profile__wrapper">
				<div className="profile__personal">
					<div className="profile__personal-container">
						<div className="profile__image" />
						<div className="profile__name">
							<h2 className="profile__name-surname">ООО "Организация"</h2>
						</div>
						<ProfileData dataArray={dataOrganization} />
					</div>
					<div className="profile__button">
						<Pushbutton
							label="Изменить пароль"
							color="white"
							size="pre-large"
							minWidth="280px"
							backgroundColor="#A6C94F"
							border="none"
							onClick={handleChangePassword}
						/>
						<Pushbutton
							label="Редактировать профиль"
							color="white"
							size="pre-large"
							minWidth="280px"
							backgroundColor="#A6C94F"
							border="none"
						/>
					</div>
				</div>
				<div className="profile__projects">
					<div className="profile__projects-container">
						<h2 className="profile__projects-title">Ваши проекты</h2>

						<div className="profile__projects-tabs">
							{cardsProjectsArray.length > 0 && <ProfileButtonsTabs />}
						</div>
						{cardsProjectsArray.length > 0 ? (
							<div className="profile__projects-cards">
								{cardsProjectsArray.map((item) => (
									<CardProject cardProject={item} key={item.id} />
								))}
							</div>
						) : (
							<div className="profile__blank">
								<p className="profile__blank-title">
									Здесь будут отображаться ваши проекты
								</p>
								<img className="profile__blank-image" src={city} alt="город" />
							</div>
						)}

						{cardsProjectsArray.length >= 6 && <ProfilePagination />}
					</div>
					<div className="profile__projects-button">
						<Pushbutton
							label="Создать новый проект"
							color="white"
							size="pre-large"
							minWidth="283px"
							backgroundColor="#A6C94F"
							border="none"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProfileOrganization;

ProfileOrganization.propTypes = {
	handleChangePassword: PropTypes.func.isRequired,
};
