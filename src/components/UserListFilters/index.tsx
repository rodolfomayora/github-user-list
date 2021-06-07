import { FC } from 'react';
import styles from './styles.module.scss';
import QuantityFilter from '../QuantityFilter';
import SortFilter from '../SortFilter';

const UserListFilters: FC = () => (
  <div className={styles.UserListFilters}>
    <QuantityFilter />
    <SortFilter />
  </div>
);

export default UserListFilters;