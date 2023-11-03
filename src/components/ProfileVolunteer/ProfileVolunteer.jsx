import './ProfileVolunteer.scss';
import { useOutletContext } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import ProfileOrganization from '../ProfileOrganization/ProfileOrganization';
import ProfileData from '../ProfileData/ProfileData';
import dataVolunteer from '../../utils/dataVolunteer';
import city from '../../images/city.png';

function ProfileVolunteer() {
	const { currentUser } = useOutletContext();
	const {
		first_name: firstName,
		last_name: lastName,
		role,
		second_name: secondName,
	} = currentUser;

	return role === 'volunteer' ? (
		<section className="profile">
			<div className="profile__menu-container">
				<ProfileMenu title="Личный кабинет волонтера" />
			</div>
			<div className="profile__wrapper">
				<div className="profile__personal">
					<div className="profile__personal-container">
						<div className="profile__image" />
						<div className="profile__name">
							<h2 className="profile__name-surname">
								{`${lastName} ${firstName} ${secondName}`}
							</h2>
						</div>
						<ProfileData dataArray={dataVolunteer} />
					</div>
					<div className="profile__button">
						<Pushbutton
							label="Изменить пароль"
							color="white"
							size="pre-large"
							minWidth="280px"
							backgroundColor="#A6C94F"
							border="none"
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
						<div className="profile__blank">
							<p className="profile__blank-title">
								Здесь будут отображаться ваши проекты
							</p>
							<img className="profile__blank-image" src={city} alt="город" />
						</div>
					</div>
				</div>
			</div>
		</section>
	) : (
		<ProfileOrganization />
	);
}

export default ProfileVolunteer;
