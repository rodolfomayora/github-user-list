import { FC } from 'react';
import { pictureProfilePlaceholder } from '../../assets/images';
import styles from './styles.module.scss';

type PictureProfileProps = {
  src: string | null,
  userName: string
}

const PictureProfile: FC<PictureProfileProps> = ({ src, userName }) => {
  return (
    <div className={styles.PictureProfile}>
      <div className={styles.aspectRatio1x1}>
        <img className={styles.picture}
          src={!!src ? src : pictureProfilePlaceholder}
          alt={userName}
          width="30"
          height="30"
        />
      </div>
    </div>
  )
}

export default PictureProfile;