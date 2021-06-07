import { FC } from 'react';
import Header from '../Header';
import Container from '../Container';
import styles from './styles.module.scss';

const Layout: FC = ({ children }) => (
  <>
    <Header />
    <main className={styles.mainContent}>
      <Container>
        {children}
      </Container>
    </main>
  </>
);

export default Layout;