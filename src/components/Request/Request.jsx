import './Request.scss';
import FormRequest from '../FormRequest/FormRequest';

function Request() {
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<section className="request" id="request">
			<div className="request__title-container">
				<h2 className="request__title">Оставьте заявку</h2>
				<p className="request__subtitle">и мы обязательно с вами свяжемся </p>
			</div>
			<div className="request__form">
				<textarea
					className="request__textarea"
					name="request"
					cols="105"
					rows="10"
					placeholder="Введете сообщение для менеджера"
				/>
				<FormRequest onSubmit={handleSubmit} />
			</div>
		</section>
	);
}

export default Request;
