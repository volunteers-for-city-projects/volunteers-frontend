import './AboutProject.scss';

function AboutProject() {
	return (
		<section className="about-project">
			<h2 className="about-project__title">О нас</h2>
			<p className="about-project__description">
				Платформа создана, чтобы объединить усилия волонтёров, городских
				администраций <br /> и организаторов мероприятий и внести совместный
				вклад в развитие городской среды.
			</p>

			<div className="about-project__container">
				<h2 className="our-values__title">Лучше Вместе - это:</h2>
				<ul className="our-values__cards">
					<li className="our-values__item">
						<h3 className="our-values__item-title">
							Шанс вдохнуть жизнь в свой город:
						</h3>
						<p className="our-values__item-subtitle">
							Платформа предоставляет волонтерам возможность активно участвовать
							в реализации городских проектов и инициатив, чтобы оживить и
							улучшить городскую среду, создавая пространства и услуги,
							соответствующие ожиданиям жителей.
						</p>
					</li>
					<li className="our-values__item">
						<h3 className="our-values__item-title">
							Персональный рост и расширение горизонтов:
						</h3>
						<p className="our-values__item-subtitle">
							Волонтерство на платформе предоставляет уникальную возможность для
							развития профессиональных и личностных навыков. Вы сможете
							приобрести новые знания, опыт работы в команде и столкнуться с
							реальными вызовами, что способствует вашему личному росту и
							развитию.
						</p>
					</li>
					<li className="our-values__item">
						<h3 className="our-values__item-title">
							Содействие взаимодействию и взаимоподдержке:
						</h3>
						<p className="our-values__item-subtitle">
							Участие в городских проектах и инициативах помогает вам встретить
							единомышленников и создать прочные связи в городском сообществе.
							Вы будете работать рука об руку с другими волонтёрами, чтобы
							достичь общих целей и создать сильную и взаимодействующую команду.
						</p>
					</li>
					<li className="our-values__item">
						<h3 className="our-values__item-title">
							Вдохновение к позитивным переменам:
						</h3>
						<p className="our-values__item-subtitle">
							Ваше участие в проектах и инициативах на платформе будет служить
							источником вдохновения для других жителей города. Вы станете
							активным гражданином, оказывая заботу о своем городе, влияя на
							позитивные изменения и стимулируя других к активности и участию в
							общественной жизни.
						</p>
					</li>
				</ul>
			</div>
		</section>
	);
}

export default AboutProject;
