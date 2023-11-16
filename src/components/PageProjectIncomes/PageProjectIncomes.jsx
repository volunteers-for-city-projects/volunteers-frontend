import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bemClassHelper } from '../../utils/utils';

import Project from '../../classes/Project';
import Incomes from '../Incomes/Incomes';

import './PageProjectIncomes.scss';

const handleError = (e) => {
	// TODO отображение ошибок
	console.error(e);
};

function PageProjectIncomes() {
	const params = useParams();
	const { projectId } = params;
	/** @type {[Project, @callback]} */
	const [project, setProject] = useState();
	/** @type {[Incomes[], @callback]} */
	const [incomes, setIncomes] = useState([]);

	useEffect(() => {
		Project.loadOne(projectId)
			.then((loadedProject) => {
				setProject(loadedProject);
				loadedProject
					.loadIncomes()
					.then((loadedIncomes) => setIncomes(loadedIncomes))
					.catch(handleError);
			})
			.catch(handleError);
	}, [projectId]);

	if (project === undefined) return 'Загружаем данные'; // TODO отображение процесса загрузки
	if (!project) return 'Ошибка';

	// const incomes = project.getIncomes();
	const baseClass = 'page-project-incomes';
	const bem = bemClassHelper(baseClass, '#');

	return (
		<div className={baseClass}>
			<h2 className={bem('#__title')}>«{project.name}»</h2>
			<h4 className={bem('#__address')}>{project.eventAddress.addressLine}</h4>
			<h3 className={bem('#__count')}>Участников проекта: {incomes.length}</h3>
			<Incomes incomes={incomes} />
		</div>
	);
}
export default PageProjectIncomes;
