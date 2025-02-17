import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styles from './ImageModal.module.css';

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {image && (
        <>
          <img src={image.urls.regular} alt={image.alt_description} />
          <p>Author<br />{image.user.name}</p>
          <p>Likes<br />{image.likes}</p>
          {image.description && <p>Description<br />{image.description}</p>}
        </>
      )}
    </ReactModal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
    description: PropTypes.string,
  }),
};

export default ImageModal;