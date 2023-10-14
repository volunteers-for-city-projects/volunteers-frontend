import './JoinButtons.scss';

function JoinButtons() {
	return (
		<section className="join">
			<div className="join__container">
				<h2 className="join__title">
					Присоединяйтесь к нам <br /> и получите доступ ко всем <br />
					возможностям
				</h2>
				<div className="join__items">
					<div className="join__item">
						<h3 className="join__subtitle">
							Станьте организатором,чтобы привлечь <br /> помощников и создать
							свою команду
						</h3>
						<button className="join__button">Стать организатором</button>
					</div>
					<div className="join__item">
						<h3 className="join__subtitle">
							Cтаньте волонтёром, чтобы помочь людям, <br /> приобрести
							уникальный опыт и работать <br /> с командой единомышленников
						</h3>
						<button className="join__button">Стать волонтером</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default JoinButtons;
