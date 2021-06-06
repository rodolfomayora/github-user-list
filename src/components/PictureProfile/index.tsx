import { FC } from 'react';
import { pictureProfilePlaceholder } from '../../assets/images';
import styles from './styles.module.scss';

const PictureProfile: FC = () => {
  return (
    <div className={styles.PictureProfile}>
      <div className={styles.aspectRatio1x1}>
        <img className={styles.picture}
          src={pictureProfilePlaceholder}
          alt="ejemplo" // set al dinamically
          width="30"
          height="30"
        />
      </div>
    </div>
  )
}

export default PictureProfile;