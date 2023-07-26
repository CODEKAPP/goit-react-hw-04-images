// ImageGalleryItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { ItemList, ImgList } from './Styles/UlStyle';

const ImageGalleryItem = ({ image, onClick }) => {
  const handleImageClick = () => {
    onClick(image.largeImageURL);
  };

  return (
    <ItemList className="gallery-item" onClick={handleImageClick}>
      <ImgList src={image.webformatURL} alt={image.tags} />
    </ItemList>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
