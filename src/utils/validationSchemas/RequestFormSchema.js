import * as Yup from 'yup';

const RequestFormSchema = Yup.object().shape({
	message: Yup.string()
		.min(10, 'Длина поля от 10 до 750 символов')
		.max(750, 'Длина поля от 10 до 750 символов')
		.required('Поле обязательно для заполнения'),
	firstName: Yup.string()
		.min(2, 'Длина поля от 2 до 40 символов')
		.max(40, 'Длина поля от 2 до 40 символов')
		.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите имя кириллицей')
		.required('Поле обязательно для заполнения'),
	phone: Yup.string()
		.matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный телефон')
		.required('Поле обязательно для заполнения'),
	email: Yup.string()
		.min(6, 'Длина поля от 6 до 256 символов')
		.max(256, 'Длина поля от 6 до 256 символов')
		.matches(
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			'Проверьте правильность email адреса'
		)
		.required('Поле обязательно для заполнения'),
});

export default RequestFormSchema;
