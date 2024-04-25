type TOverlayProps = {
  onClick: () => void;
};

export function Overlay({ onClick }: TOverlayProps) {
  return <div id="overlay" onClick={onClick}></div>;
}
