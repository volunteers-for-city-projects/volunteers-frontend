import clsx from 'clsx';

/**
 * Возвращает функцию, которая помогает сократить написание классов по БЭМ.
 * На вход принимает имя блока  и placeholder
 * Возвращает функцию, которая принимает массив классов,
 * а на выходе возвращает склеенную строку из классов с заменой placeholder на baseClass
 * @param {baseClass} baseClass  - имя базового класса
 * @returns {function (classes: Array) => string }
 * @example
 * // returns 'home-page__header home-page__header home-page__header_theme_lite '
 * bemClassHelper('home-page', '#')(['#__header', '#__header_theme_lite'])
 */
export const bemClassHelper =
	(block, placeholder = '#') =>
	(...classes) =>
		clsx(classes.map((item) => item.replace(placeholder, block)));

/**
 * Конвертирует строку +7ХХХХХХХХХХ или 8ХХХХХХХХХХ в формат номера +7 (ХХХ) ХХХ-ХХ-ХХ или 8(ХХХ) ХХХ-ХХ-ХХ
 *
 * @param {String} phoneString
 * @returns String
 */
export const phoneToHumanFormat = (phoneString) => {
	const expr = /(\+7|8)(\d{3})(\d{3})(\d{2})(\d{2})/g;
	const m = expr.exec(phoneString);
	return m ? `${m[1]} (${m[2]}) ${m[3]}-${m[4]}-${m[5]}` : '';
};

/**
 * Преобразует телефон из пользовательского формата (+7 (ХХХ) ХХХ-ХХ-ХХ или 8(ХХХ) ХХХ-ХХ-ХХ) в серверный  (+7ХХХХХХХХХХ)
 *
 * @param {String} phoneString
 * @returns String
 */
export const phoneToServerFormat = (phone) => {
	let cleared = phone.replace(/\D/g, '');
	if (cleared.startsWith('8')) {
		cleared = `7${cleared.slice(1)}`;
	}
	return `+${cleared}`;
};
