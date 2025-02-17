import { useRef } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();
    if (!query) {
      toast.error('Please enter a search term');
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;