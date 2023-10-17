import './ProfileVolunteer.scss';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Pushbutton } from '../Pushbutton/Pushbutton';

function ProfileVolunteer() {
	const data = [
		{
			id: 0,
			title: 'Город:',
			subtitle: 'название города',
		},
		{
			id: 1,
			title: 'Контактные данные:',
			subtitle: 'почта, телефон, телеграм',
		},
		{
			id: 2,
			title: 'Навыки:',
			subtitle: 'Коммуникативные навыки, работа с ПК, вождение авто',
		},
	];
	return (
		<section className="profile">
			<ProfileMenu />
			<div className="profile__container">
				<div className="profile__image" />
				<div className="profile__name">
					<h2 className="profile__name-surname">Фамилия Имя Отчество</h2>
				</div>
				<div className="profile__data">
					{data.map((item) => (
						<div data={item} key={item.id}>
							<h3 className="profile__data-title">{item.title}</h3>
							<p className="profile__data-subtitle">{item.subtitle}</p>
						</div>
					))}
				</div>
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

export default ProfileVolunteer;
