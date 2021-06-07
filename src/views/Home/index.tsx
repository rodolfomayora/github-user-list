import { FC } from 'react';
import { Layout, Container, UserListFilters, UserList } from '../../components';
import styles from './styles.module.scss';

const Home: FC = () => (
  <Layout>
    <main className={styles.Home}>
      <Container>
        <UserListFilters />
        <UserList />
      </Container>
    </main>
  </Layout>  
);

export default Home;