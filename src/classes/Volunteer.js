import User from './User';
import City from './City';
import AbstractEntity from './AbstractEntity';

class Volunteer extends AbstractEntity {
	static DATE_FIELDS = ['dateOfBirth'];

	id;

	/**
	 * @type {User}
	 */
	user;

	/**
	 * @type {integer[]}
	 */
	skills;

	photo;

	telegram;

	dateOfBirth;

	phone;

	/**
	 * @type {City} city
	 */
	city;

	getSkillsAsString() {
		return this.skills.map((item) => item.name).join(', ');
	}

	/**
	 *
	 * @param {Object} data
	 * @returns {Volunteer}
	 */
	static createByData(data) {
		const volunteer = super.createByData(data);
		volunteer.user = User.createByData(data.user);
		City.load().then(() => {
			volunteer.city = City.getById(volunteer.city);
		});
		return volunteer;
	}
}
export default Volunteer;
