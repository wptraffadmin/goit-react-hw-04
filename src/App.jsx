import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
    
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
            query,
            page,
            per_page: 12,
          },
        });
        
        setImages((prev) => (page === 1 ? response.data.results : [...prev, ...response.data.results]));
        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError(error.message);
        toast.error('Failed to fetch images');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      
      {isLoading && <Loader isLoading={isLoading} />}
      
      {!error && images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;