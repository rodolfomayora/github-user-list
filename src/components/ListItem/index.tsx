import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import PictureProfile from '../PictureProfile';

type ListItemProps = {
  userName: string,
  profilePictureSrc: string
}

const ListItem: FC<ListItemProps> = ({ userName, profilePictureSrc }) => {
  return (
    <li className={styles.ListItem}>
      <Link className={styles.listItemLink}
        to={`UserDetail/${userName}`}
      >
        <div className={styles.imageWrapper}>
          <PictureProfile />
        </div>
        <span className={styles.userName}>
          {userName}
        </span>
      </Link>
    </li>
  )
}

export default ListItem;