//ImageGalleryItem.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { ItemList, ImgList } from './Styles/UlStyle';

const ImageGalleryItem = ({ image, onClick, index }) => {
  const handleImageClick = () => {
    onClick(image.largeImageURL);
  };

  return (
    <ItemList className="gallery-item" onClick={handleImageClick}>
      <ImgList key={index}  src={image.webformatURL} alt={image.tags} />
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
  index: PropTypes.number, // Add the "index" prop type
};

export default ImageGalleryItem;
