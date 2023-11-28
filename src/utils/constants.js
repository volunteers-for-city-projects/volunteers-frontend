export const REG_EX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const REG_EX_PASSWORD = /^\S*$/;
export const ERROR_MESSAGE_REQUIRED = 'Поле обязательно для заполнения';
export const ERROR_MESSAGE_EMAIL = 'Проверьте правильность адреса';
export const ERROR_MESSAGE_PASSWORD_MIN = 'Длина поля от 8 до 20 символов';
export const ERROR_MESSAGE_PASSWORD_MAX = 'Длина поля от 8 до 20 символов';
export const ERROR_MESSAGE_PASSWORD_REG_EX =
	'Пароль не должен содержать пробелы';
export const ERROR_MESSAGE_PASSWORD_NO_MATCH = 'Пароли не совпадают';
export const ERROR_MESSAGE_CONNECTION_PROBLEM =
	'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const ERROR_MESSAGE_EMAIL_MIN_MAX = 'Длина поля от 5 до 256 символов';

export const PROJECT_CARD_DISPLAY_LIMIT = 6;
export const DATE_FORMAT_FROM_SERVER = 'DD.MM.YYYY hh:mm';
export const MESSAGE_PROJECT_COMPLETED = 'Проект завершён ';
export const MESSAGE_PROJECT_APPLICATIONS_EXPECTED = 'Приём заявок начнётся ';
export const MESSAGE_PROJECT_ACCEPTANCE_APPLICATIONS_OPEN = 'Приём заявок до ';
export const MESSAGE_PROJECT_ACCEPTANCE_APPLICATIONS_OVER =
	'Приём заявок окончен, дата начала проекта: ';
export const MESSAGE_PROJECT_NO_DATE =
	'Проект - черновик. Необходимо заполнить даты!';
export const MESSAGE_PROJECT_NOT_DEFINED = 'Статус проекта не определен!';
export const MESSAGE_PROJECT_EDITING = 'Черновик';
export const MESSAGE_PROJECT_PENDING = 'На модерации';
export const MESSAGE_PROJECT_REJECTED = 'Отклонён модератором';
export const MESSAGE_PROJECT_CANCELED_BY_ORGANIZER = 'Отменён организатором';
export const APPROVED = 'approved';
export const EDITING = 'editing';
export const PENDING = 'pending';
export const REJECTED = 'rejected';
export const CANCELED_BY_ORGANIZER = 'canceled_by_organizer';
export const OPEN = 'open';
export const READY_FOR_FEEDBACK = 'ready_for_feedback';
export const RECEPTION_OF_RESPONSES_CLOSED = 'reception_of_responses_closed';
export const PROJECT_COMPLETED = 'project_completed';
export const ROLE_ORGANIZER = 'organizer';
