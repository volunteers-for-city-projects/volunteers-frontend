import './ProfileVolunteer.scss';
import { useOutletContext } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import ProfileData from '../ProfileData/ProfileData';
import dataVolunteer from '../../utils/dataVolunteer';

function ProfileVolunteer() {
	const { currentUser } = useOutletContext();
	const {
		first_name: firstName,
		last_name: lastName,
		role,
		second_name: secondName,
	} = currentUser;

	return (
		role === 'volunteer' && (
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
					</div>
				</div>
			</section>
		)
	);
}

export default ProfileVolunteer;
