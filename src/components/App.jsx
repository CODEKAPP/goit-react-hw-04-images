// App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem';
import Button from './Modal/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { toast, Toaster } from 'react-hot-toast';

const generateUniqueKey = id => {
  return `${id}_${Math.random()}`;
};

const API_KEY = '37237543-aa08958e4f4ec45835618d6d1';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageSearch = async searchQuery => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const images = response.data.hits;
      setImages(images);
      setLoading(false);
      setQuery(searchQuery);
      if (images.length === 0) {
        toast.error('No se encontraron resultados');
      } else {
        toast.success('Búsqueda exitosa!');
      }
    } catch (error) {
      toast.error('Error fetching images:', error);
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    try {
      setLoading(true);
      const nextPage = Math.ceil(images.length / 12) + 1;
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${nextPage}`
      );
      setImages(prevImages => [...prevImages, ...response.data.hits]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching more images:', error);
      setLoading(false);
    }
  };

  const openModal = selectedImage => {
    setSelectedImage(selectedImage);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <section>
      <Searchbar onSubmit={handleImageSearch} />
      <ImageGallery>
        {images.map((image, index) => (
          <ImageGalleryItem
            key={generateUniqueKey(image.id)}
            image={image}
            onClick={openModal}
          />
        ))}
      </ImageGallery>
      {loading && <Loader />}
      {images.length > 0 && !loading && <Button onClick={loadMoreImages} />}
      {showModal && <Modal image={selectedImage} onClose={closeModal} />}
      <Toaster />
    </section>
  );
};

export default App;
