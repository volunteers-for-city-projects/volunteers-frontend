import * as Yup from 'yup';

export const ProfileVolunteerFormSchema = Yup.object({
	profile_volunteer_firstname: Yup.string()
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
	profile_volunteer_lastname: Yup.string()
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
	profile_volunteer_secondname: Yup.string()
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
	profile_volunteer_phone: Yup.string().matches(
		/^\+7|8 \([1-9]{1}\d{2}\) \d{3}-\d{2}-\d{2}$/,
		'Введите корректный телефон'
	),
	profile_volunteer_telegram: Yup.string()
		.min(5, 'Длина поля от 5 до 32 символов')
		.max(32, 'Длина поля от 5 до 32 символов')
		.matches(/^@/, 'Имя должно начинаться с @')
		.matches(
			/^[@_a-zA-Z_0-9]{4,32}$/,
			'Имя должно cостоять из латинских букв или цифр'
		),
});
