import { FC } from 'react';
import styles from './styles.module.scss';

const Loader: FC = () => {
  return (
    <div className={styles.Loader}>
      <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader;