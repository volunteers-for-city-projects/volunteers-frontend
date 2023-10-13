import PropTypes from 'prop-types';
import './FormRequest.scss';
import InputRequest from '../InputRequest/InputRequest';

function FormRequest({ onSubmit }) {
	return (
		<form className="form-request" name="form-request" onSubmit={onSubmit}>
			<InputRequest
				type="text"
				htmlFor="first-name"
				label="Имя*"
				placeholder="Введите ваше имя"
			/>
			<InputRequest
				type="text"
				htmlFor="phone"
				label="Телефон*"
				placeholder="Введите ваш номер телефона"
			/>
			<InputRequest
				type="text"
				htmlFor="first-name"
				label="Emai*"
				placeholder="Введите ваш email"
			/>
			<button className="form-request__button" type="submit">
				Оставить заявку
			</button>
		</form>
	);
}

FormRequest.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default FormRequest;
