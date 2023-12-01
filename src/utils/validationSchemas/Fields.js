import * as Yup from 'yup';

export const phone = Yup.string().matches(
	/^(\+7|8)\s?\([1-9]{1}\d{2}\)\s\d{3}-\d{2}-\d{2}$/,
	'Введите корректный телефон'
);
export const telegram = Yup.string()
	.min(5, 'Длина поля от 5 до 32 символов')
	.max(32, 'Длина поля от 5 до 32 символов')
	.matches(/^@/, 'Имя должно начинаться с @')
	.matches(
		/^[@_a-zA-Z0-9]{4,32}$/,
		'Имя должно cостоять из латинских букв или цифр'
	)
	.test(
		'double underscore',
		'Поле не может содержать 2 подчеркивания подряд',
		(value) => !value?.includes('__')
	)
	.test(
		'start underscore',
		'Поле не может начинаться с подчеркивания',
		(value) => !value?.startsWith('@_')
	)
	.test(
		'end underscore',
		'Поле не может заканчиваться на подчеркивание',
		(value) => !value?.endsWith('_')
	);

export const letter = Yup.string()
	.min(10, 'Длина поля от 10 до 530 символов')
	.max(530, 'Длина поля от 10 до 530 символов')
	.nullable(true);
