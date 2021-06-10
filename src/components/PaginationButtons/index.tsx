import { FC } from 'react';
import { ChevronLeft } from '../../assets/images'
import styles from './styles.module.scss';

type PaginationButtonsProps = {
  currentPage: number,
  disablePreviousAction: boolean,
  nextPageAction: () => any,
  previousPageAction: () => any,
}

const PaginationButtons: FC<PaginationButtonsProps> = (props) => {

  const { currentPage, disablePreviousAction } = props;
  const { nextPageAction, previousPageAction } = props;

  const buttonStyles: any = {
    'true': `${styles.button} ${styles.disable}`,
    'false': styles.button
  }

  return (
    <div className={styles.PaginationButtons}>
      
      <div className={buttonStyles[String(disablePreviousAction)]}
        onClick={() => !disablePreviousAction && previousPageAction()}
      >
        Prev
      </div>

      <span className={styles.pageCounter}>
        Page: {currentPage}
      </span>

      <div className={styles.button}
        onClick={() => nextPageAction()}
      >
        Next
      </div>
    </div>
  )
}

export default PaginationButtons;