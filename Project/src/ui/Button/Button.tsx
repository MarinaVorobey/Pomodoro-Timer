import { Icon, TIconNames } from "../Icon/Icon";

export type TButtonProps = {
  action: () => void;
  className: string;
  text?: string;
  iconName?: TIconNames;
  iconClass?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function Button({
  action,
  className,
  iconName,
  text,
  iconClass,
  type = "button",
  disabled,
}: TButtonProps) {
  return (
    <button
      type={type}
      className={className}
      onClick={action}
      disabled={disabled ? disabled : false}
    >
      {iconName ? <Icon type={iconName} className={iconClass} /> : null}
      {text ? text : null}
    </button>
  );
}
