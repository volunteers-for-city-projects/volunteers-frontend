import { useEffect } from 'react';
import './ProfileOrganization.scss';
import {
	useNavigate,
	useOutletContext,
	useLocation,
	Outlet,
} from 'react-router-dom';
import ProfileData from '../ProfileData/ProfileData';
import { Crumbs } from '../Crumbs/Crumbs';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import CardProject from '../CardProject/CardProject';
import cardsProjectsArray from '../../utils/cardsProjectsArray';
import ProfileButtonsTabs from '../ProfileButtonsTabs/ProfileButtonsTabs';
import ProfilePagination from '../ProfilePagination/ProfilePagination';
import cityImage from '../../images/city.png';
import organizationImage from '../../images/avatar.png';

function ProfileOrganization() {
	const {
		currentUser,
		handleChangePasswordForm,
		cities,
		skills,
		projectCategories,
		setModal,
	} = useOutletContext();
	const navigate = useNavigate();
	const location = useLocation();

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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return location.pathname === '/profile/organizer' ||
		location.pathname === '/profile/organizer/' ? (
		<section className="profile">
			<div className="profile__menu-container">
				<Crumbs />
			</div>
			<div className="profile__wrapper">
				<div className="profile__personal">
					<div className="profile__personal-container">
						<div className="profile__personal-label">
							<img
								className="profile__image"
								src={photo || organizationImage}
								alt="Логотип организатора"
							/>
							<div className="profile__personal-btn">
								<Pushbutton
									label="Изменить пароль"
									color="#3F3F3F"
									size="large-var"
									minWidth="280px"
									backgroundColor="transparent"
									border="1px solid #A6C94F"
									onClick={() => handleChangePasswordForm()}
								/>
								<Pushbutton
									label="Редактировать профиль"
									color="#3F3F3F"
									size="large-var"
									minWidth="280px"
									backgroundColor="transparent"
									border="1px solid #A6C94F"
									onClick={() => navigate('edit-profile')}
								/>
							</div>
						</div>
						<div className="profile__name">
							<h2 className="profile__name-surname">{title}</h2>
						</div>
						<ProfileData dataArray={dataOrganization} />
					</div>
				</div>
				<div className="profile__projects">
					<div className="profile__projects-container">
						<div className="profile__projects-label">
							<h2 className="profile__projects-title">Ваши проекты</h2>
							<div className="profile__projects-btn">
								<Pushbutton
									label="Добавить проект"
									color="white"
									size="large-var"
									minWidth="283px"
									backgroundColor="#A6C94F"
									border="none"
									onClick={() => navigate('/profile/organizer/create-project')}
								/>
							</div>
						</div>

						{cardsProjectsArray.length > 0 && <ProfileButtonsTabs />}

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

						{cardsProjectsArray.length >= 4 && <ProfilePagination />}
					</div>
				</div>
			</div>
		</section>
	) : (
		<Outlet
			context={{
				currentUser,
				handleChangePasswordForm,
				cities,
				skills,
				projectCategories,
				setModal,
			}}
		/>
	);
}

export default ProfileOrganization;
