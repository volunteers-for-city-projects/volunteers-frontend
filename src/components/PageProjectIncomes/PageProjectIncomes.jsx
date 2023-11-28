import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bemClassHelper } from '../../utils/utils';
import Project from '../../classes/Project';
import { STATUS_SUBBMITED, STATUS_ACCEPTED } from '../../classes/ProjectIncome';
import CardIncome from '../CardIncome/CardIncome';
import PopupWindow from '../PopupWindow/PopupWindow';
import Button from '../Button/Button';
import './PageProjectIncomes.scss';

/**
 * @typedef {import('../../classes/ProjectIncome').default} Income
 * @param {Object} obj
 * @param {'application_submitted'|'rejected'|'accepted'} obj.status
 * @returns
 */
function PageProjectIncomes({ status }) {
	const navigate = useNavigate();
	const [popup, setPopup] = useState({ isOpen: false });
	const [displayCount, setDisplayCount] = useState(6);

	/** @type {[Project, @callback]} */
	const [project, setProject] = useState();

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

	const parentUrl = `/projects/${project.id}`;

	let title = '';
	let button = '';
	switch (status) {
		case STATUS_ACCEPTED:
			title = 'Участников проекта';
			button = (
				<Button size="m" onClick={() => navigate(`${parentUrl}/incomes`)}>
					Заявки участников
				</Button>
			);
			break;
		case STATUS_SUBBMITED:
			title = 'Заявок подано';
			button = (
				<Button size="m" onClick={() => navigate(`${parentUrl}/participants`)}>
					Участники проекта
				</Button>
			);
			break;
		default:
			throw new Error('Bad status value in PageProjectIncomes');
	}

	return (
		<section className={baseClass}>
			<div className={bem('#__head')}>
				<h3 className={bem('#__count')}>
					{title}: {incomes.length}
				</h3>
				{button}
			</div>
			<div className={bem('#__incomes')}>
				{incomes.slice(0, displayCount).map((income) => (
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
			{incomes.length > displayCount ? (
				<Button
					onClick={() => setDisplayCount((old) => old + 3)}
					className={bem('#__button-more')}
					size="xs"
				>
					Показать еще
				</Button>
			) : (
				''
			)}

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
