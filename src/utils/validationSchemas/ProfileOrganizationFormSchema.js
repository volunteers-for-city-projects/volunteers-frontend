import * as Yup from 'yup';

export const ProfileOrganizationFormSchema = Yup.object({
	profile_organize_organization: Yup.string()
		.trim()
		.required('Поле обязательно для заполнения')
		.matches(/^[А-Яа-яёЁ0-9\s\-.,&+!№]+$/, {
			message: 'Введите название кириллицей',
			excludeEmptyString: true,
		})
		.min(2, 'Длина поля от 2 до 50 символов')
		.max(50, 'Длина поля от 2 до 50 символов'),
	profile_organize_about_organization: Yup.string()
		.trim()
		.min(10, 'Длина поля от 10 до 750 символов')
		.max(750, 'Длина поля от 10 до 750 символов'),
	// .required('Поле обязательно для заполнения')
	profile_organize_firstname: Yup.string()
		.min(2, 'Длина поля от 2 до 40 символов')
		.max(40, 'Длина поля от 2 до 40 символов')
		.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите имя кириллицей')
		.required('Поле обязательно для заполнения'),
	profile_organize_secondname: Yup.string()
		.min(2, 'Длина поля от 2 до 40 символов')
		.max(40, 'Длина поля от 2 до 40 символов')
		.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите фамилию кириллицей')
		.required('Поле обязательно для заполнения'),
	profile_organize_thirdname: Yup.string()
		.min(2, 'Длина поля от 2 до 40 символов')
		.max(40, 'Длина поля от 2 до 40 символов')
		.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите отчество кириллицей')
		.required('Поле обязательно для заполнения'),
	profile_organize_phone: Yup.string()
		.matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный телефон')
		.required('Поле обязательно для заполнения'),
	profile_organize_ogrn: Yup.string()
		.trim()
		.matches(/^\d{13}$/, {
			message: 'ОГРН должен состоять из 13 символов',
			excludeEmptyString: true,
		})
		.matches(/^[0-9]+$/, {
			message: 'ОГРН должен состоять только из цифр',
			excludeEmptyString: true,
		})
		.required('Поле обязательно для заполнения'),
	profile_organize_password: Yup.string()
		.required('Поле обязательно для заполнения')
		.min(8, 'Длина поля от 8 до 20 символов')
		.max(20, 'Длина поля от 8 до 20 символов')
		.oneOf(
			[Yup.ref('profile_organize_confirm_password'), null],
			'Пароли не совпадают'
		),
	profile_organize_confirm_password: Yup.string()
		.required('Поле обязательно для заполнения')
		.min(8, 'Длина поля от 8 до 20 символов')
		.max(20, 'Длина поля от 8 до 20 символов')
		.oneOf([Yup.ref('profile_organize_password'), null], 'Пароли не совпадают'),
});
