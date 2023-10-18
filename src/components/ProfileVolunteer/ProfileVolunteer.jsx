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
			<ProfileMenu isVolunteer />
			<div className="profile__container">
				<div className="profile__image" />
				{/* Переключение на организацию или волонтера - !isVolunteer или isVolunteer */}
				{isVolunteer ? (
					<>
						<div className="profile__name">
							<h2 className="profile__name-surname">Фамилия Имя Отчество</h2>
						</div>
						<ProfileData dataArray={dataVolunteer} />
					</>
				) : (
					<ProfileOrganization />
				)}

				<div className="profile__button">
					<Pushbutton
						label="Редактировать профиль"
						color="white"
						size="medium"
					/>
				</div>
			</div>
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
