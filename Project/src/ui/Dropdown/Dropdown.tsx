import React from "react";
import { useGetCoords } from "../../hooks/useGetCoords";
import { DropdownMenu } from "./DropdownMenu";

type TDropdownProps = {
  button: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  leftShift?: number;
  topShift?: number;
};

export function Dropdown({
  button,
  children,
  onClose,
  leftShift,
  topShift,
}: TDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  if (!leftShift) {
    leftShift = 0;
  }
  if (!topShift) {
    topShift = 0;
  }
  const [coords] = useGetCoords(
    containerRef,
    isDropdownOpen,
    leftShift,
    topShift
  );

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
