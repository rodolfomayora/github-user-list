import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from '../../assets/images';
import styles from './styles.module.scss';

type BackButtonProps = {
  path: string,
  label: string
}

const BackButton: FC<BackButtonProps> = ({ path, label }) => {
  return (
    <Link className={styles.BackButton} to={path}>
      <ChevronLeft className={styles.leftIcon} />
      <span className={styles.label}>{label}</span>
    </Link>
  )
}

export default BackButton;