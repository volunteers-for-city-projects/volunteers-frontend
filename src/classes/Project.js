import ProjectEventAddress from './ProjectEventAddress';
import ProjectIncome from './ProjectIncome';
import AbstractEntity from './AbstractEntity';
import { getProject } from '../utils/api/project';
import { APPROVED, PROJECT_COMPLETED } from '../utils/constants';

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

	statusApprove;

	status;

	/** @type {Array} */
	#incomes = [];

	isInIncomesPeriod() {
		const currentDate = new Date();
		if (
			this.statusApprove === APPROVED &&
			this.status !== PROJECT_COMPLETED &&
			this.startDateApplication &&
			this.endDateApplication &&
			currentDate > this.startDateApplication &&
			currentDate < this.endDateApplication
		) {
			return true;
		}
		return false;
	}

	/**
	 * status - константы STATUS_* из модуля ProjectIncome
	 * @param {String} status
	 * @returns {Promise<ProjectIncome[]>}
	 */
	loadIncomes(status = '') {
		return ProjectIncome.load(this.id).then((items) => {
			const filtered = items.filter(
				(item) =>
					item.project.id === this.id &&
					(!status || item.statusIncomes === status)
			);
			filtered.forEach((item) => item.setProject(this));
			this.#incomes = filtered;
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
