import { ReactNode } from "react";
import { Button } from "../Button/Button";
import ReactDOM from "react-dom";

type TModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ onClose, children }: TModalProps) {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return (
    <>
      <div id="overlay" onClick={onClose}></div>
      {ReactDOM.createPortal(
        <div className="modal">
          <div className="modal__content">
            <Button
              action={onClose}
              className="modal__close-btn"
              iconName="cross"
            />
            {children}
          </div>
        </div>,
        modalRoot
      )}
    </>
  );
}
