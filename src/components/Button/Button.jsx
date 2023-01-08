import propTypes from 'prop-types';
import style from '../Button/Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={style.buttonDiv}>
      <button type="button" className={style.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
Button.propTypes = {
  onClick: propTypes.func.isRequired,
};