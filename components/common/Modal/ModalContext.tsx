import React from "react";

export interface IModalContext {
  onHide: () => void;
}

const ModalContext = React.createContext({} as IModalContext);

export default ModalContext;
