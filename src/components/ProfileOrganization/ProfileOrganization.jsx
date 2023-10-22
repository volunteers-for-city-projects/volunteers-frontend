import ProfileData from '../ProfileData/ProfileData';
import dataOrganization from '../../utils/dataOrganization';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import CardProject from '../CardProject/CardProject';
import cardsProjectsArray from '../../utils/cardsProjectsArray';
import ProfileButtonsTabs from '../ProfileButtonsTabs/ProfileButtonsTabs';

function ProfileOrganization() {
	return (
		<section className="profile-org">
			<ProfileMenu title="Личный кабинет организатора" />
			<div className="profile__wrapper">
				<div className="profile__personal">
					<div className="profile__image" />
					<div className="profile__name">
						<h2 className="profile__name-surname">ООО "Организация"</h2>
					</div>
					<ProfileData dataArray={dataOrganization} />
					<div className="profile__button">
						<Pushbutton
							label="Редактировать профиль"
							color="white"
							size="medium"
							minWidth={380}
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
					<div className="profile__button">
						<Pushbutton
							label="Создать новый проект"
							color="white"
							size="medium"
							minWidth={380}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProfileOrganization;
