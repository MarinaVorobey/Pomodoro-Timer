export type TGenericItem = {
  element: React.ReactNode;
  id: string;
  onClick: (id: string) => void;
  icon?: React.ReactNode;
  className?: string;
  As?: "a" | "li" | "button" | "div";
  href?: string;
};

type TGenericListProps = {
  list: TGenericItem[];
};

export function GenericList({ list }: TGenericListProps) {
  return (
    <>
      {list.map(
        ({ As = "div", icon, element, onClick, className, id, href }) => (
          <As
            className={className}
            onClick={() => onClick(id)}
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
