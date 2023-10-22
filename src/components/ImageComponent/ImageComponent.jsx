import React from 'react';
import { useImage } from 'react-image';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './ImageComponent.scss';

function ImageComponent({ srcList, type, altImage }) {
	const { src } = useImage({
		srcList,
		useSuspense: false,
	});

	return (
		<img
			src={src}
			className={clsx('image-component', `image-component__type_${type}`)}
			alt={altImage}
		/>
	);
}

export default ImageComponent;

ImageComponent.propTypes = {
	srcList: PropTypes.string,
	type: PropTypes.oneOf(['entrance', 'registration']),
	altImage: PropTypes.string,
};

ImageComponent.defaultProps = {
	srcList: '',
	type: 'entrance',
	altImage: 'Рисунок',
};
