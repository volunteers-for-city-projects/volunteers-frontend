import PropTypes from 'prop-types';
import './ProfileOrganization.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ProfileData from '../ProfileData/ProfileData';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import CardProject from '../CardProject/CardProject';
import cardsProjectsArray from '../../utils/cardsProjectsArray';
import ProfileButtonsTabs from '../ProfileButtonsTabs/ProfileButtonsTabs';
import ProfilePagination from '../ProfilePagination/ProfilePagination';
import cityImage from '../../images/city.png';
import organizationImage from '../../images/fotoProfile.svg';

function ProfileOrganization({ handleIsForm }) {
	const { currentUser, handleChangePassword, cities } = useOutletContext();
	const {
		firstName,
		lastName,
		secondName,
		about,
		email,
		city,
		phone,
		photo,
		title,
	} = currentUser;
	const navigate = useNavigate();

	const dataOrganization = [
		{
			id: 0,
			title: 'Об организации',
			subtitle: about,
		},
		{
			id: 1,
			title: 'Город:',
			subtitle: cities
				.filter((item) => city === Number(item.value))
				.map((item) => item.label)[0],
		},
		{
			id: 2,
			title: 'Представитель организации:',
			subtitle: `${firstName} ${secondName} ${lastName}`,
		},
		{
			id: 3,
			title: 'Контактные данные:',
			subtitle: [email, phone].filter((item) => item !== '').join(', '),
		},
	];

	return (
		<section className="profile">
			<div className="profile__menu-container">
				<ProfileMenu title="Личный кабинет организатора" />
			</div>
			<div className="profile__wrapper">
				<div className="profile__personal">
					<div className="profile__personal-container">
						<img
							className="profile__image"
							src={photo || organizationImage}
							alt="Логотип организатора"
						/>
						<div className="profile__name">
							<h2 className="profile__name-surname">{title}</h2>
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
							onClick={handleIsForm}
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
								<img
									className="profile__blank-image"
									src={cityImage}
									alt="город"
								/>
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
							onClick={() => navigate('/project')}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

ProfileOrganization.propTypes = {
	handleIsForm: PropTypes.func,
};

ProfileOrganization.defaultProps = {
	handleIsForm: () => {},
};

export default ProfileOrganization;
