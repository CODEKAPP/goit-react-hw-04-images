//ImageGallery.jsx
import React from 'react';
import { ListStyle } from './Styles/UlStyle';

const ImageGallery = ({ children }) => {
  return <ListStyle className="gallery">{children}</ListStyle>;
};

export default ImageGallery;
