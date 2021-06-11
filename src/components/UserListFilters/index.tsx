import { FC } from 'react';
import styles from './styles.module.scss';
import UserQuantityFilter from '../UserQuantityFilter';
import UserArrangeFilter from '../UserArrangeFilter';

const UserListFilters: FC = () => (
  <div className={styles.UserListFilters}>
    <UserQuantityFilter />
    <UserArrangeFilter />
  </div>
);

export default UserListFilters;