import React from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';


const Backdrop = (props)=>{
  return <div className={classes.backdrop} onClick={props.onClose} ></div>
};

const ModalOverlay = (props)=>{
  const style = `${classes[props.className]}`
  return <div className={style}>
    {props.children}
  </div>
};

const portalElement = document.getElementById('overlays');

const Modal = (props)=>{
  return <React.Fragment>
    {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
    {createPortal(<ModalOverlay className={props.className}>{props.children}</ModalOverlay>, portalElement)}
  </React.Fragment>
}

export default Modal;
