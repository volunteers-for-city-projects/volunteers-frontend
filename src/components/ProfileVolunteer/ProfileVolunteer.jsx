import PropTypes from 'prop-types';
import './ProfileVolunteer.scss';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import ProfileOrganization from '../ProfileOrganization/ProfileOrganization';
import ProfileData from '../ProfileData/ProfileData';
import dataVolunteer from '../../utils/dataVolunteer';

function ProfileVolunteer({ isVolunteer }) {
	return (
		<section className="profile">
			{/* Переключить на волонтера или организатора isVolunteer или !isVolunteer */}
			{!isVolunteer ? (
				<>
					<ProfileMenu title="Личный кабинет волонтера" />
					<div className="profile__wrapper">
						<div className="profile__container">
							<div className="profile__image" />
							<div className="profile__name">
								<h2 className="profile__name-surname">Фамилия Имя Отчество</h2>
							</div>
							<ProfileData dataArray={dataVolunteer} />
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
						</div>
					</div>
				</>
			) : (
				<ProfileOrganization />
			)}
		</section>
	);
}

ProfileVolunteer.propTypes = {
	isVolunteer: PropTypes.bool,
};

ProfileVolunteer.defaultProps = {
	isVolunteer: true,
};

export default ProfileVolunteer;
