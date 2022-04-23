import ReactDOM from 'react-dom';

import React, { Fragment } from 'react';
import styles from './Modal.module.css';

import { uiActions } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    const dispatch = useDispatch();

    const toggleCartHandler =() => {
      dispatch(uiActions.toggle());
    }

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={toggleCartHandler} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}/>;
};


export default Modal;
