import Volunteer from './Volunteer';
import AbstractEntity from './AbstractEntity';
/* ,postIncome,  */
import {
	getIncomes,
	acceptIncome,
	deleteIncome,
	rejectIncome,
	postIncome,
	getIncome,
} from '../utils/api/income';
import { phoneToServerFormat } from '../utils/utils';

export const STATUS_SUBBMITED = 'application_submitted';
export const STATUS_REJECTED = 'rejected';
export const STATUS_ACCEPTED = 'accepted';

const STATUS_MESSAGES = {
	[STATUS_ACCEPTED]: 'Подтврждена',
	[STATUS_REJECTED]: 'Отклонена',
	[STATUS_SUBBMITED]: 'Принята системой',
};
/**
 * @typedef {import('../../classes/Project').default} Project
 * @class
 */
class ProjectIncome extends AbstractEntity {
	/**
	 * @readonly
	 * @type {integer} readonly */
	id;

	/** @type {Object} Данные проекта из API */
	#projectData;

	/** @type {Project} ИД Проекта */
	#project;

	/** @type {Volunteer} ИД волонтера */
	volunteer;

	/** @type {statusIncomes} Статус заявки волонтера Enum */
	statusIncomes;

	/**
	 * @readonly
	 * @type {Date} Дата создания заявки  readOnly */
	createdAt;

	phone;

	telegram;

	cover_letter;

	getStatusText() {
		return STATUS_MESSAGES[this.statusIncomes];
	}

	isAccepted() {
		return this.statusIncomes === STATUS_ACCEPTED;
	}

	isRejected() {
		return this.statusIncomes === STATUS_REJECTED;
	}

	isSubmited() {
		return this.statusIncomes === STATUS_SUBBMITED;
	}

	save() {
		if (!this.id) {
			postIncome();
		}
	}

	/**
	 *  POST /incomes/{id}/accept_incomes/
	 * @returns {Promise{}}
	 */
	accept() {
		return acceptIncome(this.id).then(() => {
			this.statusIncomes = STATUS_ACCEPTED;
		});
	}

	// DELETE /incomes/{id}/delete_incomes/
	delete() {
		return deleteIncome(this.id);
	}

	/**
	 * @returns {Promise}
	 */
	reject() {
		return rejectIncome(this.id);
	}

	/**
	 *
	 * @param {Project} project
	 */
	setProject(project) {
		this.project = project;
		return this;
	}

	getProjectData() {
		return this.#projectData;
	}

	/**
	 *
	 * @param {Object} data
	 * @returns {ProjectIncome}
	 */
	static createByData(data) {
		/**
		 * @type {ProjeectIncome} income
		 */
		const income = super.createByData(data);
		if (!income.id) return income;

		income.#projectData =
			data.project; /* Создать сразу объект класса  Project нельзя из-за циклической зависимости  */
		income.volunteer = Volunteer.createByData(data.volunteer);
		return income;
	}

	static async loadOne(id) {
		return getIncome(id).then((data) => this.createByData(data));
	}

	/**
	 * Load list from API
	 * @returns {Promise<ProjectIncome[]>}
	 */
	static load(projectId = 0) {
		return getIncomes(projectId).then((data) =>
			super.createListByData(data.results)
		);
	}

	static createNew(incomeData, userId, projectId) {
		const { phone, email, telegram, letter } = incomeData;
		return postIncome({
			phone: phoneToServerFormat(phone),
			email,
			telegram,
			cover_letter: letter,
			project: projectId,
			volunteer: userId,
		});
	}
}
export default ProjectIncome;
