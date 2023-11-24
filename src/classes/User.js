import AbstractEntity from './AbstractEntity';

class User extends AbstractEntity {
	id;

	email;

	firstName;

	lastName;

	role;

	secondName;

	getFullName() {
		return [this.firstName, this.secondName, this.lastName].join(' ');
	}

	/**
	 *
	 * @param {Object} data
	 * @returns {User}
	 */
	static createByData(data) {
		const user = super.createByData(data);
		return user;
	}
}

export default User;
