import * as Yup from 'yup';
import moment from 'moment';

export const VolunteerSignupFormSchema = Yup.object({
	firstname: Yup.string()
		.min(2, 'Длина поля от 2 до 40 символов')
		.max(40, 'Длина поля от 2 до 40 символов')
		.required('Поле обязательно для заполнения')
		.test('no-consecutive-dashes', 'Введите корректное имя', (value) => {
			if (typeof value !== 'string') {
				return true;
			}
			return !/--/.test(value.replace(/\s/g, ''));
		})
		.test('no-spaces-between-dashes', 'Введите корректное имя', (value) => {
			if (typeof value !== 'string') {
				return true;
			}
			if (/\s/.test(value)) {
				value.replace(/\s/g, '');
			}
			return !/\s/.test(value);
		})
		.test('no-dots', 'Введите корректное имя', (value) => {
			if (typeof value !== 'string') {
				return true;
			}
			return !/\./.test(value);
		})
		.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите имя кириллицей'),
	secondname: Yup.string()
		.min(2, 'Длина поля от 2 до 40 символов')
		.max(40, 'Длина поля от 2 до 40 символов')
		.required('Поле обязательно для заполнения')
		.test('no-consecutive-dashes', 'Введите корректную фамилию', (value) => {
			if (typeof value !== 'string') {
				return true;
			}
			return !/--/.test(value.replace(/\s/g, ''));
		})
		.test('no-spaces-between-dashes', 'Введите корректную фамилию', (value) => {
			if (typeof value !== 'string') {
				return true;
			}
			if (/\s/.test(value)) {
				value.replace(/\s/g, '');
			}
			return !/\s/.test(value);
		})
		.test('no-dots', 'Введите корректную фамилию', (value) => {
			if (typeof value !== 'string') {
				return true;
			}
			return !/\./.test(value);
		})
		.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите фамилию кириллицей'),
	thirdname: Yup.string()
		.min(2, 'Длина поля от 2 до 40 символов')
		.max(40, 'Длина поля от 2 до 40 символов')
		.required('Поле обязательно для заполнения')
		.test('no-consecutive-dashes', 'Введите корректное отчество', (value) => {
			if (typeof value !== 'string') {
				return true;
			}
			return !/--/.test(value.replace(/\s/g, ''));
		})
		.test(
			'no-spaces-between-dashes',
			'Введите корректное отчество',
			(value) => {
				if (typeof value !== 'string') {
					return true;
				}
				if (/\s/.test(value)) {
					value.replace(/\s/g, '');
				}
				return !/\s/.test(value);
			}
		)
		.test('no-dots', 'Введите корректное отчество', (value) => {
			if (typeof value !== 'string') {
				return true;
			}
			return !/\./.test(value);
		})
		.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите отчество кириллицей'),
	birthday: Yup.string()
		.matches(
			/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
			'Введите корректную дату рождения в формате dd.mm.yyyy'
		)
		.test(
			'is-valid-date',
			'Для регистрации вам должно быть не менее 18 лет',
			(value) => {
				if (!value || typeof value !== 'string') {
					return false;
				}
				const today = moment();
				const minimumAge = 18;
				const birthdate = moment(value, 'DD.MM.YYYY');
				const age = today.diff(birthdate, 'years');
				if (birthdate < today) {
					if (age < minimumAge) {
						return false;
					}
				}
				return true;
			}
		)
		.test('is-valid-date', 'Введите корректную дату', (value) => {
			if (!value || typeof value !== 'string') {
				return false;
			}
			const parts = value.split('.');
			if (parts.length !== 3) {
				return false;
			}
			const day = parseInt(parts[0], 10);
			const month = parseInt(parts[1], 10);
			const year = parseInt(parts[2], 10);
			if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
				return false;
			}
			if (year < 1900) {
				return false;
			}
			if (month === 2 && day === 29) {
				return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
			}
			if (month === 2 && day === 30) {
				return false;
			}
			if (month === 2 && day === 31) {
				return false;
			}
			if ([4, 6, 9, 11].includes(month) && day === 31) {
				return false;
			}
			const currentDate = moment();
			const inputDate = moment(value, 'DD.MM.YYYY');
			if (!inputDate.isValid() || inputDate.isAfter(currentDate)) {
				return false;
			}
			const eighteenYearsAgo = moment().subtract(18, 'years');
			if (inputDate.isAfter(eighteenYearsAgo)) {
				return false;
			}
			return true;
		}),
	phone: Yup.string().matches(
		/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
		'Введите корректный телефон'
	),
	email: Yup.string()
		.required('Поле обязательно для заполнения')
		.min(5, 'Длина поля от 5 до 320 символов')
		.max(320, 'Длина поля от 5 до 320 символов')
		.matches(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'Проверьте правильность email адреса'
		),
	telegram: Yup.string()
		.min(5, 'Длина поля от 5 до 32 символов')
		.max(32, 'Длина поля от 5 до 32 символов')
		.matches(/^@/, 'Имя должно начинаться с @')
		.matches(
			/^[@_a-zA-Z_0-9]{4,32}$/,
			'Имя должно cостоять из латинских букв или цифр'
		),
	password: Yup.string()
		.required('Поле обязательно для заполнения')
		.min(8, 'Длина поля от 8 до 20 символов')
		.max(20, 'Длина поля от 8 до 20 символов')
		.matches(/^\S*$/, 'Пароль не должен содержать пробелы')
		.oneOf([Yup.ref('confirm_password'), null], 'Пароли не совпадают'),
	confirm_password: Yup.string()
		.required('Поле обязательно для заполнения')
		.min(8, 'Длина поля от 8 до 20 символов')
		.max(20, 'Длина поля от 8 до 20 символов')
		.matches(/^\S*$/, 'Пароль не должен содержать пробелы')
		.oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
});
