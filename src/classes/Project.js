import ProjectEventAddress from './ProjectEventAddress';
import ProjectIncome from './ProjectIncome';
import AbstractEntity from './AbstractEntity';
import { getProject } from '../utils/api/project';

/**
 * @class
 * @extends AbstractEntity<Project>
 */
class Project extends AbstractEntity {
	static DATE_FIELDS = [
		'startDatetime',
		'endDatetime',
		'startDateApplication',
		'endDateApplication',
	];

	id = 0;

	name;

	/** @type {Date}  */
	startDatetime;

	/** @type {Date}  */
	endDatetime;

	/** @type {Date}  */
	startDateApplication;

	/** @type {Date}  */
	endDateApplication;

	/** @type {ProjectEventAddress} */
	eventAddress;

	city;

	/** @type {Array} */
	#incomes = [];

	/**
	 * status - константы STATUS_* из модуля ProjectIncome
	 * @param {String} status
	 * @returns {Promise<ProjectIncome[]>}
	 */
	loadIncomes(status = '') {
		return ProjectIncome.load().then((items) => {
			items.forEach((item) => item.setProject(this));
			this.#incomes = status
				? items.filter((item) => item.statusIncomes === status)
				: items;
			return this.#incomes;
		});
	}

	/**
	 * @returns {ProjectIncome[]}
	 */
	getIncomes() {
		return this.#incomes;
	}

	/**
	 * @param {int} id
	 * @returns {Promise<Project>}
	 */
	static async loadOne(id) {
		return getProject(id).then((data) => this.createByData(data));
	}

	/** @returns {Project} */
	static createByData(data) {
		const project = super.createByData(data);
		project.eventAddress = ProjectEventAddress.createByData(data.event_address);
		return project;
	}
}
export default Project;
