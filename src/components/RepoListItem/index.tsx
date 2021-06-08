import { FC } from 'react';
import styles from './styles.module.scss';

type RepoListItemProps = {
  name: string,
  mainLanguaje: string,
  onClickAction: () => void
}

const RepoListItem: FC<RepoListItemProps> = (props) => {
  const { name, mainLanguaje, onClickAction } = props;
  return (
    <li className={styles.RepoListItem}
      onClick={onClickAction}
    >
      <h3 className={styles.repoName}>{name}</h3>
      <p>Main Language: {!!mainLanguaje ? mainLanguaje : '???'}</p>
    </li>
  )
}

export default RepoListItem;