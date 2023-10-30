import PropTypes from 'prop-types';
import './ProfileVolunteer.scss';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import ProfileOrganization from '../ProfileOrganization/ProfileOrganization';
import ProfileData from '../ProfileData/ProfileData';
import dataVolunteer from '../../utils/dataVolunteer';

function ProfileVolunteer({ isVolunteer }) {
	return (
		<>
			{/* Переключить на волонтера или организатора isVolunteer или !isVolunteer */}
			{!isVolunteer ? (
				<section className="profile">
					<div className="profile__menu-container">
						<ProfileMenu title="Личный кабинет волонтера" />
					</div>
					<div className="profile__wrapper">
						<div className="profile__personal">
							<div className="profile__image" />
							<div className="profile__name">
								<h2 className="profile__name-surname">Фамилия Имя Отчество</h2>
							</div>
							<ProfileData dataArray={dataVolunteer} />
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
			) : (
				<ProfileOrganization />
			)}
		</>
	);
}

ProfileVolunteer.propTypes = {
	isVolunteer: PropTypes.bool,
};

ProfileVolunteer.defaultProps = {
	isVolunteer: true,
};

export default ProfileVolunteer;
