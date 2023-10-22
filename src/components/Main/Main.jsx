import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getNews, getPlatformAbout, sendMessage } from '../../api/main-page';
import './Main.scss';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import News from '../News/News';
import JoinButtons from '../JoinButtons/JoinButtons';
import FormRequest from '../FormRequest/FormRequest';

function Main() {
	const [news, setNews] = useState([]);
	const [plarformAbout, setPlatformAbout] = useState({});
	const [plarformPromo, setPlatformPromo] = useState({});
	const { setPlatformEmail } = useOutletContext();

	useEffect(() => {
		Promise.all([getNews(), getPlatformAbout()])
			.then(([dataNews, dataPlatformAbout]) => {
				setNews(dataNews.results);
				const { about_us: aboutUs, valuations } = dataPlatformAbout;
				const { platform_email: email } = dataPlatformAbout;
				const {
					projects_count: projectCount,
					volunteers_count: volunteersCount,
					organizers_count: organizersCount,
				} = dataPlatformAbout;
				setPlatformAbout({ aboutUs, valuations });
				setPlatformEmail(email);
				setPlatformPromo({ projectCount, volunteersCount, organizersCount });
			})
			.catch((err) => console.error(err));
	}, [setPlatformEmail]);

	const handleSendMessage = (values, { resetForm }) => {
		sendMessage(values)
			.then(() => {
				resetForm();
			})
			.catch((err) => console.error(err));
	};

	return (
		<main className="content ">
			<Promo plarformPromo={plarformPromo} />
			<AboutProject plarformAbout={plarformAbout} />
			{news && <News news={news} />}
			<JoinButtons />
			<FormRequest handleSendMessage={handleSendMessage} />
		</main>
	);
}

export default Main;
