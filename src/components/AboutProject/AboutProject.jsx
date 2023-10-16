import './AboutProject.scss';
import CardValues from '../CardValues/CardValues';
import valuesArray from '../../utils/valuesArray';

function AboutProject() {
	const aboutUs =
		'Платформа создана, чтобы объединить усилия волонтёров, городских администраций и организаторов мероприятий и внести совместныйвклад в развитие городской среды.';
	return (
		<section className="about-project">
			<h2 className="about-project__title">О нас</h2>
			<p className="about-project__description">{aboutUs}</p>

			<div className="about-project__container">
				<h2 className="our-values__title">Лучше Вместе - это:</h2>
				<div className="our-values__cards">
					{valuesArray.map((item) => (
						<CardValues cardValues={item} key={item.valuesId} />
					))}
				</div>
			</div>
		</section>
	);
}

export default AboutProject;
