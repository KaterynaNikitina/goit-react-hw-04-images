import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { fetchImages } from 'servises/image-api';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from 'components/ImageGallery/ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal }  from 'components/Modal/Modal';

export const ImageGallery = ({ query }) => {

const [search, setSearch] = useState('');
const [images, setImages] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [totalHits, setTotalHits] = useState(0);
const [showModal, setShowModal] = useState(false);
const [modalImage, setModalImage] = useState('');
// const [error, setError] = useState(null);

const totalPages = Math.ceil(totalHits/12);

useEffect(() => {
  setSearch(query);
  setPage(1);
  setImages([]);  
}, [query]);

useEffect(() => {
 if (!search && page === 1) {
  return;
 }
 const Fetch = async () => {
  try { 
    setLoading(true);
    
    const { hits, totalHits } = await fetchImages(search, page);

    setImages(image => [...images, ...hits]);
    setTotalHits(totalHits);

    if (page === 1 && totalHits) toast.info(`We found ${totalHits} images`);
    if (page === 1 && !totalHits) toast.error(`We found ${totalHits} images`);
   } catch(error) {
     } finally {
        setLoading(false);
      }
    };
    Fetch();
    }, [search, page]);

    const handleLoadMoreClick = () => {
          setPage(state => state + 1);
        };
    
        const onShowModal = item => {
          setModalImage(item);
          setShowModal(toggleModal);
        };

        const toggleModal = () => {
          setShowModal(!showModal);
        };
 
  return (
    <>
    {images.length > 0 && (
    <List>
      {images.map(image => (
        <ImageGalleryItem
          item={image}
          key={image.id}
          onShowModal={onShowModal}
        />
      ))}
    </List>
    )}
    {loading && <Loader />}
    {images.length >0 && page < totalPages && (
      <Button text='Load more' onClick={handleLoadMoreClick} />)}
      {showModal && <Modal onClose={toggleModal} item={modalImage} />}
    </>
  );
};


ImageGallery.propTypes = {
  query: PropTypes.string.isRequired
};

