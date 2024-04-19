import * as icons from "./icons";

type TIconProps = {
  type: string;
  className?: string;
};

type TIconNames = {
  [N: string]: React.ReactNode;
};

const iconNames: TIconNames = {
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
      {iconNames[type]}
    </div>
  );
}
