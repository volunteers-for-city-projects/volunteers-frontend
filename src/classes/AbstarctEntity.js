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
}
export default AbstractEntity;
