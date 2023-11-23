import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bemClassHelper } from '../../utils/utils';

import Project from '../../classes/Project';
import Incomes from '../Incomes/Incomes';

import './PageProjectIncomes.scss';

import { STATUS_SUBBMITED, STATUS_ACCEPTED } from '../../classes/ProjectIncome';

const handleError = (e) => {
	// TODO отображение ошибок
	console.error(e);
};

/**
 * @param {Object} obj
 * @param {'application_submitted'|'rejected'|'accepted'} obj.status
 * @returns
 */
function PageProjectIncomes({ status }) {
	const params = useParams();
	const { projectId } = params;
	/** @type {[Project, @callback]} */
	const [project, setProject] = useState();
	/** @type {[Incomes[], @callback]} */
	const [incomes, setIncomes] = useState([]);

	useEffect(() => {
		Project.loadOne(projectId)
			.then((loadedProject) => setProject(loadedProject))
			.catch(handleError);
	}, [projectId, status]);

	useEffect(() => {
		if (project)
			project
				.loadIncomes() /* TODO filter by status */
				.then((loadedIncomes) => setIncomes(loadedIncomes))
				.catch(handleError);
	}, [project, status]);

	if (project === undefined) return 'Загружаем данные'; // TODO отображение процесса загрузки
	if (!project) return 'Ошибка';

	// const incomes = project.getIncomes();
	const baseClass = 'page-project-incomes';
	const bem = bemClassHelper(baseClass, '#');

	let title = '';
	switch (status) {
		case STATUS_ACCEPTED:
			title = 'Участников проекта';
			break;
		case STATUS_SUBBMITED:
			title = 'Заявок подано';
			break;
		default:
			throw new Error('Bad status value in PageProjectIncomes');
	}
	return (
		<div className={baseClass}>
			<h2 className={bem('#__title')}>«{project.name}»</h2>
			<h4 className={bem('#__address')}>{project.eventAddress.addressLine}</h4>
			<h3 className={bem('#__count')}>
				{title}: {incomes.length}
			</h3>
			<Incomes incomes={incomes} />
		</div>
	);
}

PageProjectIncomes.propTypes = {
	status: PropTypes.oneOf(['application_submitted', 'rejected', 'accepted'])
		.isRequired,
};

export default PageProjectIncomes;
