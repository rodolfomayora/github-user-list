import { FC } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import styles from './styles.module.scss';

const Header: FC = () => (
  <header className={styles.Header}>
    <Container>
      <h1>
        <Link className={styles.link} to="/">
          Github User List
        </Link>
      </h1>
    </Container>
  </header>
);

export default Header;