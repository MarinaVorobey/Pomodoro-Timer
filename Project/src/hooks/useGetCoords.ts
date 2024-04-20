import React from "react";

type Coords = {
  left: number;
  top: number;
};

export function useGetCoords(
  containerRef: React.RefObject<HTMLDivElement>,
  dropdownOpen: boolean
) {
  const [coords, setCoords] = React.useState<Coords | null>(null);

  React.useEffect(() => {
    if (!dropdownOpen) return;

    const getCoords = (): Coords | null => {
      const box = containerRef.current?.getBoundingClientRect();

      if (box) {
        return {
          left: box.left,
          top: box.top + box.height + window.scrollY,
        };
      }

      return null;
    };

    const coords = getCoords();
    setCoords(coords);
  }, [dropdownOpen, containerRef]);

  return [coords];
}
