import PropTypes from 'prop-types';
import './InputSearch.scss';

function InputSearch({ label, placeholder }) {
	function handleSubmit(event) {
		event.preventDefault();
	}

	return (
		<form className="form-search" onSubmit={handleSubmit}>
			<input
				className="form-search__input-search"
				type="text"
				id="searchInput"
				placeholder={placeholder}
				maxLength="100"
			/>
			<button className="form-search__button-search" type="submit">
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
