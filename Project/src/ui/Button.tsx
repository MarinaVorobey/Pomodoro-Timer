import { Icon } from "./Icon/Icon";

export type TButtonProps = {
  action: () => void;
  className: string;
  text?: string;
  iconName?: string;
  iconClass?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({
  action,
  className,
  iconName,
  text,
  iconClass,
  type = "button",
}: TButtonProps) {
  return (
    <button type={type} className={className} onClick={action}>
      {iconName ? <Icon type={iconName} className={iconClass} /> : null}
      {text ? text : null}
    </button>
  );
}
