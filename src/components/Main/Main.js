import './Main.css';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import OurValues from './OurValues/OurValues';
import News from './News/News';
import JoinButtons from './JoinButtons/JoinButtons';

function Main() {
	return (
		<main className="content">
			<Promo />
			<AboutProject />
			<OurValues />
			<News />
			<JoinButtons />
		</main>
	);
}

export default Main;
