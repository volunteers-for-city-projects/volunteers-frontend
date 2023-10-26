import PropTypes from 'prop-types';
import './InputSearch.scss';
import iconDefault from '../../images/not-found/search.svg';

function InputSearch({ placeholder, border, width, icon }) {
	function handleSubmit(event) {
		event.preventDefault();
	}

	return (
		<form
			className="form-search"
			onSubmit={handleSubmit}
			style={{ border, width }}
		>
			<input
				className="form-search__input-search"
				type="text"
				id="searchInput"
				placeholder={placeholder}
				maxLength="100"
			/>
			<button className="form-search__button-search" type="submit">
				<img className="form-search__icon" src={icon} alt="icon-search" />
			</button>
		</form>
	);
}

InputSearch.propTypes = {
	placeholder: PropTypes.string.isRequired,
	border: PropTypes.string,
	width: PropTypes.string,
	icon: PropTypes.string,
};

InputSearch.defaultProps = {
	border: 'none',
	width: 'auto',
	icon: iconDefault,
};

export default InputSearch;
