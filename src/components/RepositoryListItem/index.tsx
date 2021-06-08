import { FC } from 'react';
import styles from './styles.module.scss';

type RepositoryListItemProps = {
  name: string,
  mainLanguaje: string,
  onClickAction: () => void
}

const RepositoryListItem: FC<RepositoryListItemProps> = (props) => {
  const { name, mainLanguaje, onClickAction } = props;
  return (
    <li className={styles.RepositoryListItem}
      onClick={onClickAction}
    >
      <h3 className={styles.repoName}>{name}</h3>
      <p>Main Language: {!!mainLanguaje ? mainLanguaje : '???'}</p>
    </li>
  )
}

export default RepositoryListItem;