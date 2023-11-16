import request from '../utils/api/request';

const camelCase = (str) =>
	str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

/**
 * @class
 */
class AbstractEntity {
	static DATE_FIELDS = ['createdAt'];

	static createByData(dataObject) {
		const instance = new this();
		Object.keys(dataObject).forEach((k) => {
			const kCamel = camelCase(k);
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

	/**
	 *
	 * @param {Object[]} list
	 * @returns {Array}
	 */
	static createListByData(list) {
		return list.map((item) => this.createByData(item));
	}

	/**
	 * Async load entity from API and create instance
	 * @param {int} id
	 * @returns {Promise<ProjectIncome[]>}
	 */
	static loadOne(id) {
		return this.apiRequest(id, 'GET', '').then((data) =>
			this.createByData(data)
		);
	}

	/** TODO: вынести из абстрактного класса работу с API   */
	static load() {
		const token = localStorage.getItem('token');
		return request(this.ENDPOINT, 'GET', '', token).then((answer) => {
			const incomes = answer.results;
			return incomes.map((data) => this.createByData(data));
		});
	}

	/**
	 *
	 * @param {*} path
	 * @param {'POST'|'GET'|'DELETE'|'PUT'} method
	 * @param {*} body
	 * @returns {Promise}
	 */
	static apiRequest(path, method, body = '') {
		const token = localStorage.getItem('token');
		return request(this.ENDPOINT + path, method, body, token);
	}
}
export default AbstractEntity;
