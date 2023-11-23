import { ENDPOINT_VOLUNTEERS } from './endpoints';

import request from './request';

export const getVolunteers = () => request(ENDPOINT_VOLUNTEERS, 'GET');
