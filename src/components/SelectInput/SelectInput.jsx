import PropTypes from 'prop-types';
import './SelectInput.scss';
import clsx from 'clsx';

function SelectInput({ text, isValid, options }) {
	return (
		<div className="input__select-container">
			<label className="input__select-label" htmlFor="input__select-options">
				{text}
			</label>

			<select className="input__select-options">
				{options.map((option, index) => {
					if (index === 0) {
						return (
							<option value={option} selected disabled>
								{option}
							</option>
						);
					}
					return <option value={option}>{option}</option>;
				})}
			</select>
			<span
				className={clsx('input__select-error', {
					'input__select-error-message': !isValid,
				})}
			>
				Выберите город
			</span>
		</div>
	);
}

SelectInput.propTypes = {
	text: PropTypes.string,
	isValid: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.string),
};

SelectInput.defaultProps = {
	text: 'Город*',
	isValid: true,
	options: ['Выберите город', 'Москва', 'Санкт-Петербург', 'Екатеринбург'],
};

export default SelectInput;
