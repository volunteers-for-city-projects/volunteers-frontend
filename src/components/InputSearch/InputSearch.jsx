import PropTypes from 'prop-types';
import './InputSearch.scss';

function InputSearch({ label, placeholder, border, width }) {
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
				{label}
			</button>
		</form>
	);
}

InputSearch.propTypes = {
	placeholder: PropTypes.string.isRequired,
	label: PropTypes.string,
	border: PropTypes.string,
	width: PropTypes.string,
};

InputSearch.defaultProps = {
	label: '',
	border: 'none',
	width: 'auto',
};

export default InputSearch;
