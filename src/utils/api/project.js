import request from './request';

const ENDPOINT = 'projects/';
const token = () => localStorage.getItem('token');

export const getProjects = () => request(ENDPOINT, 'GET', '', token());
export const getProject = (id) =>
	request(`${ENDPOINT}${id}/`, 'GET', '', token());
