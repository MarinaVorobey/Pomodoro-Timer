import { Icon } from "./Icon/Icon";

type TButtonProps = {
  action: () => void;
  className: string;
  text: string;
  iconName?: string;
  iconClass?: string;
};

export function Button({
  action,
  className,
  iconName,
  text,
  iconClass,
}: TButtonProps) {
  return (
    <button className={className} onClick={action}>
      {iconName ? <Icon type={iconName} className={iconClass} /> : null}
      {text}
    </button>
  );
}
