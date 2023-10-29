import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import './CardNews.scss';

function CardNews({ card }) {
	const { tags, title, picture, created_at: date } = card;

	const originalDate = new Date(date);

	const day = originalDate.getDate();
	const month = originalDate.getMonth() + 1;
	const year = originalDate.getFullYear() % 100;

	const formattedDay = day < 10 ? `0${day}` : day;
	const formattedMonth = month < 10 ? `0${month}` : month;
	const formattedYear = year < 10 ? `0${year}` : year;

	const formattedDate = `${formattedDay}.${formattedMonth}.${formattedYear}`;

	let tagsData;
	if (tags) {
		tagsData = tags.map((item) => ({
			tag: item,
			tagId: uuidv4(),
		}));
	}

	return (
		<article className="news__cards-item">
			<ul
				className="news__card-image"
				style={{ backgroundImage: `url(${picture})` }}
			>
				{tagsData &&
					tagsData.map(({ tagId, tag }) => (
						<li key={tagId}>
							<button className="news__card-button" type="button">
								#{tag}
							</button>
						</li>
					))}
			</ul>
			<div className="news__card-container">
				<h3 className="news__card-description">{title}</h3>
				<p className="news__card-date">{formattedDate}</p>
			</div>
		</article>
	);
}

CardNews.propTypes = {
	card: PropTypes.shape({
		tags: PropTypes.arrayOf(PropTypes.string),
		title: PropTypes.string,
		picture: PropTypes.string,
		created_at: PropTypes.string,
	}),
};

CardNews.defaultProps = {
	card: PropTypes.shape({
		tags: [''],
		title: '',
		created_at: '',
		picture: null,
	}),
};

export default CardNews;
