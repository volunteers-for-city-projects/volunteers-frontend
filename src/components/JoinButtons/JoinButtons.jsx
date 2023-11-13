import './JoinButtons.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Pushbutton } from '../Pushbutton/Pushbutton';

function JoinButtons() {
	const navigate = useNavigate();
	const { isLoggedIn } = useOutletContext();

	return (
		<section className="join">
			<div className="join__container">
				<h2 className="join__title">
					Присоединяйтесь к нам и получите доступ ко всем возможностям
				</h2>
				<div className="join__items">
					<div className="join__item join__item_volunteer">
						<h3 className="join__subtitle">
							Станьте волонтёром, чтобы помочь людям, приобрести уникальный опыт
							и работать с командой единомышленников
						</h3>
						<Pushbutton
							label="Стать волонтером"
							backgroundColor="#A6C94F"
							size="large-var"
							border="none"
							color="#FFF"
							minWidth="280px"
							alignSelf="flex-end"
							disabled={isLoggedIn}
							onClick={() => navigate('/registration/volunteer')}
						/>
					</div>
					<div className="join__item join__item_organizer">
						<h3 className="join__subtitle">
							Станьте организатором, чтобы привлечь помощников и создать свою
							команду
						</h3>
						<Pushbutton
							label="Стать организатором"
							backgroundColor="#A6C94F"
							size="large-var"
							border="none"
							color="#FFF"
							minWidth="280px"
							alignSelf="flex-end"
							disabled={isLoggedIn}
							onClick={() => navigate('/registration/organizer')}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default JoinButtons;
