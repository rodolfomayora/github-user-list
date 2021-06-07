import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import PictureProfile from '../PictureProfile';

type UserListItemProps = {
  userName: string,
  pictureProfileSrc: string
}

const UserListItem: FC<UserListItemProps> = ({ userName, pictureProfileSrc }) => {
  return (
    <li className={styles.UserListItem}>
      <Link className={styles.listItemLink}
        to={`UserDetail/${userName}`}
      >
        <div className={styles.imageWrapper}>
          <PictureProfile
            src={pictureProfileSrc}
            userName={userName}
          />
        </div>
        <span className={styles.userName}>{userName}</span>
      </Link>
    </li>
  )
}

export default UserListItem;