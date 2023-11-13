import './ProfileVolunteer.scss';
import {
	useNavigate,
	useOutletContext,
	Outlet,
	useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { Crumbs } from '../Crumbs/Crumbs';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import ProfileData from '../ProfileData/ProfileData';
import cityImage from '../../images/city.png';
import volunteerImage from '../../images/avatar.png';

function ProfileVolunteer() {
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
		email,
		city,
		phone,
		userSkills,
		photo,
		telegram,
	} = currentUser;

	const dataVolunteer = [
		{
			id: 0,
			title: 'Город:',
			subtitle: cities
				.filter((item) => city === Number(item.value))
				.map((item) => item.label)[0],
		},
		{
			id: 1,
			title: 'Контактные данные:',
			subtitle: [email, phone, telegram]
				.filter((item) => item !== '')
				.join(', '),
		},
		{
			id: 2,
			title: 'Навыки:',
			subtitle: userSkills
				? userSkills.map((item) => item.name).join(', ')
				: [],
		},
	];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return location.pathname === '/profile/volunteer' ||
		location.pathname === '/profile/volunteer/' ? (
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
								src={photo || volunteerImage}
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
							<h2 className="profile__name-surname">
								{`${firstName} ${secondName} ${lastName}`}
							</h2>
						</div>
						{dataVolunteer.length > 0 && (
							<ProfileData dataArray={dataVolunteer} />
						)}
					</div>
				</div>
				<div className="profile__projects">
					<div className="profile__projects-container">
						<h2 className="profile__projects-title">Ваши проекты</h2>
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

export default ProfileVolunteer;
