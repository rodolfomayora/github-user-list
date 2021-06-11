import { FC, useEffect } from 'react';
import { Layout, BackButton } from '../../components';
import styles from './styles.module.scss';

const NoMatch404: FC = () => {
  
  useEffect(() => {
    document.title = '404 | Github User List';
  },
  [])

  return (
    <Layout>
      <main className={styles.NoMatch404}>
        <h2 className={styles.messageCode}>404</h2>
        <p className={styles.message}>User not Found</p>
        <div className={styles.butonWrapper}>
          <BackButton path="/" label="Back to Home" />
        </div>
      </main>
    </Layout>
  )
}

export default NoMatch404;