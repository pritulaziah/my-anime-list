import React from "react";
import ReactDOM from "react-dom";
import { canUseDOM } from "./utils";
import ModalBody from "./ModalBody";
import ModalContext, { IModalContext } from "./ModalContext";
import ModalHeader from "./ModalHeader";
import ModalInner from "./ModalInner";

interface IProps {
  show?: boolean;
  onHide: IModalContext["onHide"];
  children: React.ReactNode;
  size?: IModalContext["size"];
}

const Modal = ({ show = false, onHide, children, size = "md" }: IProps) => {
  if (!canUseDOM || !show) {
    return null;
  }

  const context: IModalContext = { onHide, size };

  return (
    <ModalContext.Provider value={context}>
      {ReactDOM.createPortal(
        <ModalInner>{children}</ModalInner>,
        document.body
      )}
    </ModalContext.Provider>
  );
};

Modal.Body = ModalBody;
Modal.Header = ModalHeader;

export default Modal;
