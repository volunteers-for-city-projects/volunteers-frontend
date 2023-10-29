import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NotFound.scss';
import clouds from '../../images/not-found/clouds.png';
import InputSearch from '../InputSearch/InputSearch';
import { Pushbutton } from '../Pushbutton/Pushbutton';

function NotFound() {
	const navigate = useNavigate();

	return (
		<section className="not-found">
			<div className="not-found__container">
				<img className="not-found__image" src={clouds} alt="not-found" />
				<div className="not-found__container-title">
					<h2 className="not-found__title">Страница не найдена</h2>
					<p className="not-found__subtitle">
						Попробуйте воспользоваться поиском или вернитесь на главную
					</p>
				</div>
				<div className="not-found__container-elements">
					<InputSearch border="1px solid #000" placeholder="Поиск инициатив" />
					<Pushbutton
						label="Перейти на главную страницу"
						color="#FFF"
						backgroundColor="#A6C94F"
						size="pre-large"
						onClick={() => navigate('/')}
						type="button"
						border="none"
					/>
				</div>
			</div>
		</section>
	);
}

NotFound.propTypes = {
	plarformPromo: PropTypes.shape({
		projectCount: PropTypes.number,
		volunteersCount: PropTypes.number,
		organizersCount: PropTypes.number,
	}),
};

NotFound.defaultProps = {
	plarformPromo: {
		projectCount: 0,
		volunteersCount: 0,
		organizersCount: 0,
	},
};

export default NotFound;
