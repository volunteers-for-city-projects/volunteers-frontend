import './ProfileOrganization.scss';
import ProfileData from '../ProfileData/ProfileData';
import dataOrganization from '../../utils/dataOrganization';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import CardProject from '../CardProject/CardProject';
import cardsProjectsArray from '../../utils/cardsProjectsArray';
import ProfileButtonsTabs from '../ProfileButtonsTabs/ProfileButtonsTabs';
import ProfilePagination from '../ProfilePagination/ProfilePagination';

function ProfileOrganization() {
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
							label="Редактировать профиль"
							color="white"
							size="pre-large"
							minWidth="380px"
							backgroundColor="#A6C94F"
							border="none"
						/>
					</div>
				</div>
				<div className="profile__projects">
					<h2 className="profile__projects-title">Ваши проекты</h2>
					<div className="profile__projects-tabs">
						<ProfileButtonsTabs />
					</div>
					<div className="profile__projects-cards">
						{cardsProjectsArray.map((item) => (
							<CardProject cardProject={item} key={item.id} />
						))}
					</div>
					{cardsProjectsArray.length >= 6 ? <ProfilePagination /> : null}

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
