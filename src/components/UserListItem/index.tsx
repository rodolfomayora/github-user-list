import { FC } from 'react';
import { Link } from 'react-router-dom';
import PictureProfile from '../PictureProfile';
import { ChevronCircleRight} from '../../assets/images';
import styles from './styles.module.scss';

type UserListItemProps = {
  userName: string,
  pictureProfileSrc: string | null
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

        <ChevronCircleRight className={styles.icon} />
      </Link>
    </li>
  )
}

export default UserListItem;