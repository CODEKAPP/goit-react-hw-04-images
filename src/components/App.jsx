import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem';
import Button from './Modal/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { toast, Toaster } from 'react-hot-toast'; // Importa la función toast de react-hot-toast

const generateUniqueKey = id => {
  return `${id}_${Math.random()}`;
};

const API_KEY = '37237543-aa08958e4f4ec45835618d6d1';

class App extends Component {
  state = {
    images: [],
    loading: false,
    query: '',
    showModal: false,
    selectedImage: '',
  };

  // Método para manejar la búsqueda de imágenes
  handleImageSearch = async searchQuery => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const images = response.data.hits;
      this.setState({
        // images: response.data.hits,
        images,
        loading: false,
        query: searchQuery,
      });
      if (images.length === 0) {
        toast.error('No se encontraron resultados');
      } else {
        toast.success('Búsqueda exitosa!');
      }
    } catch (error) {
      toast.error('Error fetching images:', error);
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };
  //      toast.success('Búsqueda exitosa!');
  //     } catch (error) {
  //       toast.error('BError fetching images:', error);
  //       console.error('Error fetching images:', error);
  //     this.setState({ loading: false });
  //   }
  // };

  // Método para cargar más imágenes cuando se presione el botón "Load more"
  loadMoreImages = async () => {
    try {
      this.setState({ loading: true });
      const { query, images } = this.state;
      const nextPage = Math.ceil(images.length / 12) + 1;
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${nextPage}`
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching more images:', error);
      this.setState({ loading: false });
    }
  };

  // Método para mostrar la imagen seleccionada en el modal
  openModal = selectedImage => {
    // console.log('openModal - selectedImage:', selectedImage);
    this.setState({ showModal: true, selectedImage });
  };

  // Método para cerrar el modal
  closeModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, loading, showModal, selectedImage } = this.state;

    return (
      <section>
        <Searchbar onSubmit={this.handleImageSearch} />
        <ImageGallery>
          {images.map((image, index) => (
            <ImageGalleryItem
              // key={image.id + index}
              key={generateUniqueKey(image.id)}
              image={image}
              onClick={this.openModal}
            />
          ))}
        </ImageGallery>
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button onClick={this.loadMoreImages} />
        )}
        {showModal && <Modal image={selectedImage} onClose={this.closeModal} />}
        <Toaster /> {/* Agrega el componente Toaster */}
      </section>
    );
  }
}

export default App;
