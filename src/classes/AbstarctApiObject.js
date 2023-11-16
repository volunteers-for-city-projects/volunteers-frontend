import request from '../utils/api/request';
/**
 * @class
 */
class AbstractApiObject {
	static ENDPOINT;

	static DATE_FIELDS = ['createdAt'];

	static createByData(dataObject) {
		const instance = new this();
		Object.keys(dataObject).forEach((k) => {
			const kCamel = AbstractApiObject.#camelCase(k);
			let value = dataObject[k];
			instance[kCamel] = value;
			if (this.DATE_FIELDS.includes(kCamel)) {
				const match = value.match(/^(\d\d)\.(\d\d).(\d\d\d\d) (\d{1,2}:\d\d)/);
				if (match) {
					value = `${match[3]}/${match[2]}/${match[1]} ${match[4]}`;
				}
				instance[kCamel] = new Date(value);
			}
		});

		return instance;
	}

	static #camelCase(str) {
		return str
			.trim()
			.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
	}

	/**
	 * Async load entity from API and create instance
	 * @param {int} id
	 * @returns {Promise<ProjectIncome[]>}
	 */
	static load(id) {
		const token = localStorage.getItem('token');
		return request(`/${this.ENDPOINT}/${id}/`, 'GET', '', token).then((data) =>
			this.createByData(data)
		);
	}

	static loadList() {
		const token = localStorage.getItem('token');
		return request(this.ENDPOINT, 'GET', '', token).then((answer) => {
			const incomes = answer.results;
			return incomes.map((data) => this.createByData(data));
		});
	}
}
export default AbstractApiObject;
