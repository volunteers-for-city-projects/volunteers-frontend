import PropTypes from 'prop-types';
import './InputSearch.scss';

function InputSearch({ label, placeholder }) {
	function handleSubmit(event) {
		event.preventDefault();
	}

	return (
		<form className="header__form-search" onSubmit={handleSubmit}>
			<input
				className="header__input-search"
				type="text"
				id="searchInput"
				placeholder={placeholder}
			/>
			<button className="header__button-search" type="submit">
				{label}
			</button>
		</form>
	);
}

InputSearch.propTypes = {
	placeholder: PropTypes.string.isRequired,
	label: PropTypes.string,
};

InputSearch.defaultProps = {
	label: '',
};

export default InputSearch;
