import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = evt => {
    setSearchValue(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const val = searchValue.trim();
    onSubmit(val);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className="button-label">🔍</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
