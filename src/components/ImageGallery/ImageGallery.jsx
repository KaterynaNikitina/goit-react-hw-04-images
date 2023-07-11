import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from 'components/ImageGallery/ImageGallery.styled';

export const ImageGallery = ({ query, images, onShowModal }) => {
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
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onShowModal: PropTypes.func.isRequired,
};
