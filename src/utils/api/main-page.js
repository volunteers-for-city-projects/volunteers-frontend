import request from './request';
import {
	ENDPOINT_MAIN_PAGE_NEWS,
	ENDPOINT_MAIN_PAGE_PLATFORM_ABOUT,
	ENDPOINT_MAIN_PAGE_FEEDBACK,
	ENDPOINT_MAIN_PAGE_SEARCH,
} from './endpoints';

const getNews = () => request(ENDPOINT_MAIN_PAGE_NEWS, 'GET');

const getPlatformAbout = () =>
	request(ENDPOINT_MAIN_PAGE_PLATFORM_ABOUT, 'GET');

const getSearchProject = (search) =>
	request(`${ENDPOINT_MAIN_PAGE_SEARCH}?search=${search}`, 'GET');

const sendMessage = (value) =>
	request(ENDPOINT_MAIN_PAGE_FEEDBACK, 'POST', value);

export { getNews, getPlatformAbout, getSearchProject, sendMessage };
