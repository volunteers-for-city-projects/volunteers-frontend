import './Main.scss';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import News from '../News/News';
import JoinButtons from '../JoinButtons/JoinButtons';

function Main() {
	return (
		<main className="content">
			<Promo />
			<AboutProject />
			<News />
			<JoinButtons />
		</main>
	);
}

export default Main;
