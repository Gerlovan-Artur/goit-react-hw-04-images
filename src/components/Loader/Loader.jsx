import { Audio } from 'react-loader-spinner';
import style from '../Loader/Loader.module.css';

export const Loader = () => {
  return (
    <div className={style.loaderDiv}>
      <Audio
        height="100"
        width="100"
        color="#3f51b5"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};