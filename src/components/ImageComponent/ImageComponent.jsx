import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './ImageComponent.scss';

function ImageComponent({ src, type, altImage }) {
	return (
		<div className="image-component__wrapper">
			<img
				src={src}
				className={clsx('image-component', `image-component__type_${type}`)}
				alt={altImage}
			/>
		</div>
	);
}

export default ImageComponent;

ImageComponent.propTypes = {
	src: PropTypes.string,
	type: PropTypes.oneOf(['entrance', 'registration']),
	altImage: PropTypes.string,
};

ImageComponent.defaultProps = {
	src: '',
	type: 'entrance',
	altImage: 'Рисунок',
};
