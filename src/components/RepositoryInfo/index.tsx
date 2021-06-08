import { FC } from 'react';
import SecureExternalLink from '../SecureExternalLink';
import styles from './styles.module.scss';

type RepositoryInfoProps = {
  repoInfo: any
}

const RepositoryInfo: FC<RepositoryInfoProps> = ({ repoInfo }) => {

  const noHasDataMessage: string = 'Does not have';

  return (
    <article className={styles.RepositoryInfo}>
      <h2 className={styles.title}>
        {repoInfo.name}
      </h2>

      <p>
        <span className={styles.infoLabel}>Description: </span>
        {repoInfo?.description ?? noHasDataMessage}
      </p>

      <p>
        <span className={styles.infoLabel}>Main language: </span>
        {repoInfo?.language ?? noHasDataMessage}
      </p>

      <p>
        <span className={styles.infoLabel}>Link: </span>
        <SecureExternalLink path={repoInfo.html_url} />
      </p>
    </article>
  )
}

export default RepositoryInfo;