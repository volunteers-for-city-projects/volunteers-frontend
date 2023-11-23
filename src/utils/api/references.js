import { ENDPOINT_CITIES, ENDPOINT_SKILLS } from './endpoints';

import request from './request';

export const getCities = () => request(ENDPOINT_CITIES, 'GET');
export const getSkills = () => request(ENDPOINT_SKILLS, 'GET');
