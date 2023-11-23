import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bemClassHelper } from '../../utils/utils';
import Project from '../../classes/Project';
import { STATUS_SUBBMITED, STATUS_ACCEPTED } from '../../classes/ProjectIncome';
import CardIncome from '../CardIncome/CardIncome';
import PopupWindow from '../PopupWindow/PopupWindow';
import arrow from '../../images/icon-strelka.svg';
import './PageProjectIncomes.scss';

/**
 * @typedef {import('../../classes/ProjectIncome').default} Income
 * @param {Object} obj
 * @param {'application_submitted'|'rejected'|'accepted'} obj.status
 * @returns
 */
function PageProjectIncomes({ status }) {
	const [popup, setPopup] = useState({ isOpen: false });

	/** @type {[Project, @callback]} */
	const [project, setProject] = useState();
	// console.log(setProject);

	/** @type {[Income[], @callback]} */
	const [incomes, setIncomes] = useState([]);

	const { setModal, setIsLoading } = useOutletContext();

	const params = useParams();
	const { projectId } = params;

	const openPopup = (text, type, errorArray = []) => {
		setPopup({
			text,
			type,
			isOpen: true,
			errorArray,
			styleType: 'modal',
		});

		setTimeout(() => {
			setPopup({
				isOpen: false,
			});
		}, 3000);
	};

	useEffect(() => {
		Project.loadOne(projectId)
			.then((loadedProject) => setProject(loadedProject))
			.catch((e) => openPopup('', 'error', e));
	}, [projectId, status, setIsLoading]);

	useEffect(() => {
		if (!project) return;

		project
			.loadIncomes(status)
			.then((loadedIncomes) => setIncomes(loadedIncomes))
			.catch((e) => openPopup('', 'error', e));
	}, [project, status, setIsLoading]);

	if (project === undefined) return 'Загружаем данные'; // TODO отображение процесса загрузки
	if (!project) return 'Ошибка'; // TODO отображение окна с ошибкой

	/**
	 * Обработка результатов запросов к API
	 * @param {Promise} promise
	 * @param {Income} income
	 */
	const processPromise = (promise, income, message) => {
		promise
			.then(() => {
				const filtered = incomes.filter((item) => item.id !== income.id);
				setIncomes(filtered);
				setModal({ isOpen: false });
				openPopup(message, 'success');
			})
			.catch((e) => {
				openPopup(message, 'error', e);
			});
	};

	/**
	 * @param {Income} income
	 */
	const handleAccept = (income) =>
		processPromise(
			income.accept(),
			income,
			'Заявка принята, уведомление отправлено волонтёру'
		);

	/**
	 * @param {Income} income
	 */
	const handleRemove = (income) =>
		processPromise(
			income.delete(),
			income,
			'Участник удален из проекта, уведомление отправлено волонтёру'
		);

	/**
	 * @param {Income} income
	 */
	const handleReject = (income) =>
		processPromise(
			income.reject(),
			income,
			'Заявка отклонена, уведомление отправлено волонтёру'
		);

	const baseClass = 'page-project-incomes';
	const bem = bemClassHelper(baseClass, '#');

	let title = '';
	let pageName = '';
	switch (status) {
		case STATUS_ACCEPTED:
			title = 'Участников проекта';
			pageName = 'Участники';
			break;
		case STATUS_SUBBMITED:
			title = 'Заявок подано';
			pageName = 'Заявки';
			break;
		default:
			throw new Error('Bad status value in PageProjectIncomes');
	}
	const crumbs = [
		{
			id: 1,
			text: 'Главная',
			path: '/',
		},
		{
			id: 2,
			text: 'Проекты',
			path: '/projects',
		},
		{
			id: 3,
			text: `Проект «${project.name.trim()}»`,
			path: `/projects/${project.id}`,
		},
		{
			id: 4,
			text: pageName,
			path: window.location,
		},
	];
	return (
		<section className={baseClass}>
			<ul className="crumbs">
				{crumbs.map((item) => (
					<li key={item.id} className="crumbs__item">
						<Link to={item.path} className="router__link">
							{' '}
							{item.text}{' '}
						</Link>

						{item.id !== 4 && (
							<img className="crumbs__separator" src={arrow} alt="стрелка" />
						)}
					</li>
				))}
			</ul>

			<h2 className={bem('#__title')}>«{project.name}»</h2>
			<h4 className={bem('#__address')}>{project.eventAddress.addressLine}</h4>
			<h3 className={bem('#__count')}>
				{title}: {incomes.length}
			</h3>

			<div className={bem('#__incomes')}>
				{incomes.map((income) => (
					<CardIncome
						income={income}
						key={income.id}
						layout={income.statusIncomes}
						handleAccept={handleAccept}
						handleRemove={handleRemove}
						handleReject={handleReject}
						setModal={setModal}
					/>
				))}
			</div>

			{popup?.isOpen &&
				createPortal(
					<PopupWindow {...popup} className={bem('#__popup')} />,
					document.body
				)}
		</section>
	);
}

PageProjectIncomes.propTypes = {
	status: PropTypes.oneOf(['application_submitted', 'rejected', 'accepted'])
		.isRequired,
};

export default PageProjectIncomes;
