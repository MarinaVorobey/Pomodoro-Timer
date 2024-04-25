import * as icons from "./icons";

type TIconNames =
  | "alarm-clock"
  | "arrow"
  | "bin"
  | "cancel"
  | "cross"
  | "dots"
  | "focus"
  | "minus"
  | "pen"
  | "plus"
  | "plus-transparent"
  | "stats";

type TIconProps = {
  type: TIconNames;
  className?: string;
};

type TIcons = {
  [N in TIconNames]: React.ReactNode;
};

const iconNamesToIcons: TIcons = {
  "alarm-clock": icons.AlarmClock(),
  arrow: icons.Arrow(),
  bin: icons.Bin(),
  cancel: icons.Cancel(),
  cross: icons.Cross(),
  dots: icons.Dots(),
  focus: icons.Focus(),
  minus: icons.Minus(),
  pen: icons.Pen(),
  plus: icons.Plus(),
  "plus-transparent": icons.PlusTransparent(),
  stats: icons.Stats(),
};

export function Icon({ type, className }: TIconProps) {
  return (
    <div className={`icon-container${className ? " " + className : ""}`}>
      {iconNamesToIcons[type]}
    </div>
  );
}
