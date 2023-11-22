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
