import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import './AboutProject.scss';
import CardValues from '../CardValues/CardValues';
import valuesArray from '../../utils/valuesArray';

function AboutProject({ plarformAbout }) {
	const { aboutUs, valuations } = plarformAbout;
	let valuationsData;
	if (valuations) {
		valuationsData = valuations.map((item) => ({
			...item,
			valuesId: uuidv4(),
		}));
	}

	return (
		<section className="about-project">
			<h2 className="about-project__title">О нас</h2>
			<p className="about-project__description">{aboutUs}</p>

			<div className="about-project__container">
				<h2 className="our-values__title">Лучше Вместе - это:</h2>
				<div className="our-values__cards">
					{valuationsData &&
						valuationsData.map(({ valuesId, ...cardValues }) => (
							<CardValues cardValues={cardValues} key={valuesId} />
						))}
				</div>
			</div>
		</section>
	);
}

AboutProject.propTypes = {
	plarformAbout: PropTypes.shape({
		aboutUs: PropTypes.string,
		valuations: PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string,
				description: PropTypes.string,
			})
		),
	}),
};

AboutProject.defaultProps = {
	plarformAbout: {
		aboutUs:
			'Платформа создана, чтобы объединить усилия волонтёров, городских администраций и организаторов мероприятий и внести совместныйвклад в развитие городской среды.',
		valuations: valuesArray,
	},
};

export default AboutProject;
