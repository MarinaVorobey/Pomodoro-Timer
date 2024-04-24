export type TGenericItem = {
  element: React.ReactNode;
  id: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  As?: "a" | "li" | "button" | "div";
  href?: string;
  disabled?: boolean;
};

type TGenericListProps = {
  list: TGenericItem[];
};

export function GenericList({ list }: TGenericListProps) {
  return (
    <>
      {list.map(
        ({
          As = "div",
          icon,
          element,
          onClick,
          className,
          id,
          href,
          disabled,
        }) => (
          <As
            disabled={disabled ? disabled : false}
            className={className}
            onClick={() => onClick()}
            key={id}
            href={href}
          >
            {icon && icon}
            {element}
          </As>
        )
      )}
    </>
  );
}
