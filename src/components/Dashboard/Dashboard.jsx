import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { fetchImages } from 'servises/image-api';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal }  from 'components/Modal/Modal';


export const Dashboard = () => {
const [query, setQuery] = useState('');

const [images, setImages] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [totalHits, setTotalHits] = useState(0);
const [showModal, setShowModal] = useState(false);
const [modalImage, setModalImage] = useState('');

const totalPages = Math.ceil(totalHits/12);

// function for form/request submitting
const handleFormSubmit = (query) => {
  setQuery(query);
};
// function for LoadMore button
const handleLoadMoreClick = () => {
  setPage(state => state + 1);
};

const onShowModal = item => {
  setModalImage(item);
  setShowModal(toggleModal);
};
// modal toggle function
const toggleModal = () => {
  setShowModal(!showModal);
};

useEffect(() => {
  setQuery(query);
  setPage(1);
  setImages([]);  
}, [query]);

useEffect(() => {
 if (!query && page === 1) {
  return;
 }
 const Fetch = async () => {
  try { 
    setLoading(true);
    
    const { hits, totalHits } = await fetchImages(query, page);

    setImages(images => [...images, ...hits]);
    setTotalHits(totalHits);

    if (page === 1 && totalHits) toast.info(`We found ${totalHits} images`);
    if (page === 1 && !totalHits) toast.error(`We found ${totalHits} images`);
   } catch(error) {
     } finally {
        setLoading(false);
      }
    };
    Fetch();
    }, [query, page]);
    
  
  return (
    <div className='Dashboard'>
            <Searchbar onSubmit={handleFormSubmit} />
           {/* onShowModal  */}
            <ImageGallery query={query} images={images} onShowModal={onShowModal}/> 
            {loading && <Loader />}
            {images.length >0 && page < totalPages && (
      <Button text='Load more' onClick={handleLoadMoreClick} />)}
      {showModal && <Modal onClose={toggleModal} item={modalImage} />}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
  );
};


