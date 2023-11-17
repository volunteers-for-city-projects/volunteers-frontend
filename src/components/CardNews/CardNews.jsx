import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import './CardNews.scss';

function CardNews({ card }) {
	const { tags, title, picture, created_at: date } = card;

	const tagsData = useMemo(() => {
		if (tags) {
			return tags.map((item) => ({
				tag: item,
				tagId: uuidv4(),
			}));
		}
		return [];
	}, [tags]);

	return (
		<article className="news__cards-item">
			<div
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
			</div>
			<div className="news__card-container">
				<h3 className="news__card-description">{title}</h3>
				<p className="news__card-date">{date.split(' ')[0]}</p>
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
