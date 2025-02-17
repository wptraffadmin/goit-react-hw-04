import PropTypes from 'prop-types';
import { Ring } from '@uiball/loaders';
import styles from './Loader.module.css';

const Loader = ({ isLoading }) => {
  return isLoading ? (
    <div className={styles.loader}>
      <Ring size={50} lineWeight={5} speed={2} color="#E3AFBE" />
    </div>
  ) : null;
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
