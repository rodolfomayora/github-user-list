import React, { FC, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Container from '../Container';
import CloseButton from '../CloseButton';
import styles from './styles.module.scss';

type ModalProps = {
  closeModal: Function
}

const Modal: FC<ModalProps> = ({ children, closeModal }) => {
  const [modalReference, setModalReference] = useState<any>(() => {
    return document.getElementById('modal');
  });

  useEffect(() => {
    return () => setModalReference(null);
  },
  [])

  const onClickCloseModal = () => closeModal();

  const onClickStopClose = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  }

  return ReactDOM.createPortal((
    <div className={styles.Modal}
      onClick={onClickCloseModal}
    >
      <Container>
        <section className={styles.modalContent}
          onClick={onClickStopClose}
        >
          <div className={styles.buttonWrapper}>
            <CloseButton onClickMethod={onClickCloseModal} />
          </div>

          {children}

        </section>
      </Container>
    </div>
  ), modalReference);
}

export default Modal;