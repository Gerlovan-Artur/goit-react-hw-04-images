import style from '../Searchbar/Searchbar.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    if (e.currentTarget[1].value.trim() === '') {
      return toast.error('Please, enter something', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
    onSubmit(e.currentTarget[1].value);
    e.currentTarget[1].value = '';
  };

  return (
    <header className={style.searchbar}>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.searchForm_button}>
          
        </button>
        <ToastContainer />

        <input
          className={style.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
