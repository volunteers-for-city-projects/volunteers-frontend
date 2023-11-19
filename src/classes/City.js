import AbstractEntity from './AbstractEntity';
import { getCities } from '../utils/api/signupApi';

class City extends AbstractEntity {
	/**
	 * @readonly
	 * @property {int}
	 */
	id;

	/**
	 * Название города (minLength: 1, maxLength: 250)
	 * @readonly
	 * @property {string}
	 */
	name;

	static cities = [];

	static load() {
		if (City.cities) Promise.resolve(City.cities);

		return getCities().then((cities) => {
			super.createListByData(cities).forEach((item) => {
				City.cities[item.id] = item;
			});
		});
	}

	static getById(id) {
		return this.cities[id];
	}

	static getCities() {
		return this.cities;
	}
}
export default City;
