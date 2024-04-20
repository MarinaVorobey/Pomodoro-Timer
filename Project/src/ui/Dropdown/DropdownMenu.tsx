import React from "react";
import ReactDOM from "react-dom";
import { useCloseByClickout } from "../../hooks/useCloseByClickout";

type TDropdownMenuProps = {
  coords: {
    left: number;
    top: number;
  };
  onClose: () => void;
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
};

export function DropdownMenu({
  coords,
  onClose,
  children,
  containerRef,
}: TDropdownMenuProps) {
  const dropdownRoot = document.getElementById("dropdown-root");
  useCloseByClickout(containerRef, onClose);
  if (!dropdownRoot) return null;

  return (
    <div className="dropdown__container">
      {ReactDOM.createPortal(
        <div style={coords} className="dropdown__list" onClick={onClose}>
          {children}
        </div>,
        dropdownRoot
      )}
    </div>
  );
}
