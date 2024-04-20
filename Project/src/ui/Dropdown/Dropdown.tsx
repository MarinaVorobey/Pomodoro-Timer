import React from "react";
import { useGetCoords } from "../../utils/useGetCoords";
import { DropdownMenu } from "./DropdownMenu";

type TDropdownProps = {
  button: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
};

export function Dropdown({ button, children, onClose }: TDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [coords] = useGetCoords(containerRef, isDropdownOpen);

  return (
    <div ref={containerRef} className="dropdown">
      <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{button}</div>
      {isDropdownOpen && coords && (
        <DropdownMenu
          coords={coords}
          onClose={() => {
            setIsDropdownOpen(false);
            if (onClose) {
              onClose();
            }
          }}
          children={children}
          containerRef={containerRef}
        />
      )}
    </div>
  );
}
