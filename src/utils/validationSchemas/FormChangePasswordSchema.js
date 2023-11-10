import * as Yup from 'yup';

const FormChangePasswordSchema = Yup.object().shape({
	currentPassword: Yup.string()
		.required('Поле обязательно для заполнения')
		.min(8, 'Длина поля от 8 до 20 символов')
		.max(20, 'Длина поля от 8 до 20 символов')
		.matches(/^\S*$/, 'Пароль не должен содержать пробелы'),

	newPassword: Yup.string()
		.required('Поле обязательно для заполнения')
		.min(8, 'Длина поля от 8 до 20 символов')
		.max(20, 'Длина поля от 8 до 20 символов')
		.matches(/^\S*$/, 'Пароль не должен содержать пробелы')
		.oneOf([Yup.ref('repeatNewPassword'), null], 'Пароли не совпадают'),

	repeatNewPassword: Yup.string()
		.required('Поле обязательно для заполнения')
		.min(8, 'Длина поля от 8 до 20 символов')
		.max(20, 'Длина поля от 8 до 20 символов')
		.matches(/^\S*$/, 'Пароль не должен содержать пробелы')
		.oneOf([Yup.ref('newPassword'), null], 'Пароли не совпадают'),
});

export default FormChangePasswordSchema;
