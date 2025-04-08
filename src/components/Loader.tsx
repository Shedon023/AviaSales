import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles['loader-container']}>
      <div className={styles['progress-bar']}>
        <div className={styles['progress']}></div>
      </div>
    </div>
  );
};

export default Loader;
