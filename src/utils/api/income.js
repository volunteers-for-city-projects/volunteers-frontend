import request from './request';

const ENDPOINT = 'incomes/';
const token = () => localStorage.getItem('token');

export const getIncomes = () => request(ENDPOINT, 'GET', '', token());
export const postIncome = (data) => request(ENDPOINT, 'POST', data, token());
export const getIncome = (id) =>
	request(`${ENDPOINT}${id}/`, 'GET', '', token());
export const acceptIncome = (id) =>
	request(`${ENDPOINT}${id}/accept_incomes/`, 'POST', '', token());
export const deleteIncome = (id) =>
	request(`${ENDPOINT}${id}`, 'DELETE', '', token());
export const rejectIncome = (id) =>
	request(`${ENDPOINT}${id}/reject_incomes/`, 'PUT', '', token());
