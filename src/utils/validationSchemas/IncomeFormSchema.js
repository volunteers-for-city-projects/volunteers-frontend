import * as Yup from 'yup';

export const IncomeFormSchema = Yup.object({
	phone: Yup.string().matches(
		/^\+7\s?|8\s\([1-9]{1}\d{2}\)\s\d{3}-\d{2}-\d{2}$/,
		'Введите корректный телефон'
	),

	photo: Yup.string(),
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
	letter: Yup.string()
		.min(10, 'Длина поля от 10 до 750 символов')
		.max(750, 'Длина поля от 10 до 750 символов')
		.nullable(true),
});
