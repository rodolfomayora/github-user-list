import { FC, useContext } from 'react';
import { filterStateContext } from '../../context/filters';
import { UserListItem } from '../../components';
import userListSampleData from '../../utils/userListSampleData';
import styles from './styles.module.scss';

const UserList: FC = () => {

  const { downwardSort, currentQuantityItems } = useContext(filterStateContext);

  const copyUserList: Array<any> = [...userListSampleData];

  return (
    <ol className={styles.UserList}>
      {!!copyUserList.length &&
        (downwardSort
          ? copyUserList.reverse()
          : copyUserList
        )
        .slice(0, currentQuantityItems)
        .map((item: any) => (
          <UserListItem key={item.id}
            userName={item.login}
            // pictureProfileSrc={item.avatar_url}
            pictureProfileSrc={null}
          />
      ))}
    </ol>
  )
}

export default UserList;