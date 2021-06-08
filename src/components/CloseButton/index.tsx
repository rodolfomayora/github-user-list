import { FC } from 'react';
import { Cross } from '../../assets/images';
import styles from './styles.module.scss';

type CloseButtonProps = {
  onClickMethod: () => void
}

const CloseButton: FC<CloseButtonProps> = ({ onClickMethod }) => (
  <Cross className={styles.CloseButton}
    onClick={onClickMethod}
  />
);

export default CloseButton;