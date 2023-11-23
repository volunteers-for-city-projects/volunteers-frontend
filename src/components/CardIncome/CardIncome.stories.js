import CardIncome from './CardIncome';
import './CardIncome.scss';

export default {
	title: 'Blocks/VolunteerCard',
	component: CardIncome,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
};

export const Default = {
	args: {
		volunteer: {
			id: 1,
			user: {
				first_name: 'string',
				second_name: 'string',
				last_name: 'string',
				role: 'admin',
				id: 0,
				email: 'user@example.com',
			},
			city: 0,
			telegram: 'string',
			skills: [
				{ id: 0, name: 'Коммуникативные навыки' },
				{ id: 1, name: 'работа с ПК' },
				{ id: 2, name: 'вождение авто' },
			],
			photo: '/static/media/fotoProfile.488b8a9c1456e781f1b7fcecf9820d48.svg',
			date_of_birth: '2023-11-12',
			phone: 'string',
		},
	},
};
