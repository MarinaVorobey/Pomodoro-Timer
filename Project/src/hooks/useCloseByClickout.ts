import React from "react";

export function useCloseByClickout(
  ref: React.RefObject<HTMLDivElement>,
  onClose?: () => void
) {
  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        onClose?.();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onClose, ref]);
}
