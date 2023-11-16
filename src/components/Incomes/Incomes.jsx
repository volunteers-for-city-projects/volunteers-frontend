import PropTypes from 'prop-types';
import clsx from 'clsx';
import CardIncome from '../CardIncome/CardIncome';
import ProjectIncome from '../../classes/ProjectIncome';

import './Incomes.scss';

/**
 * Генерирует список заявок на участие в проекте
 * @typedef {import('../../classes/ProjectIncome').default} ProjectIncome
 * @param {Object} obj
 * @param {ProjectIncome[]} obj.incomes
 * @param {String} obj.className - Класс, который подмешается к основному классу элемента
 * @returns
 */
function Incomes({ incomes, className }) {
	return (
		<div className={clsx('incomes', className)}>
			{incomes.map((income) => (
				<CardIncome income={income} key={income.id} />
			))}
		</div>
	);
}
Incomes.propTypes = {
	incomes: PropTypes.arrayOf(PropTypes.instanceOf(ProjectIncome)).isRequired,
	className: PropTypes.string,
};
Incomes.defaultProps = {
	className: '',
};
export default Incomes;
