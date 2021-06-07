import { FC } from 'react';
import { Layout, UserListFilters, UserList } from '../../components';

const Home: FC = () => (
  <Layout>
    <UserListFilters />
    <UserList />
  </Layout>  
);

export default Home;