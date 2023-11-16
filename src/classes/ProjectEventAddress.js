import AbstractEntity from './AbstarctEntity';

class ProjectEventAddress extends AbstractEntity {
	id;

	addressLine;

	street;

	house;

	block;

	/** @returns {ProjectEventAddress} */
	static createByData(data) {
		const address = super.createByData(data);
		return address;
	}
}
export default ProjectEventAddress;
