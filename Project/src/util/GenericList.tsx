import { AnimatePresence, motion } from "framer-motion";

export type TGenericItem = {
  element: React.ReactNode;
  id: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  As?: "a" | "li" | "button" | "div";
  href?: string;
  disabled?: boolean;
  transition?: boolean;
};

type TGenericListProps = {
  list: TGenericItem[];
};

export function GenericList({ list }: TGenericListProps) {
  const item = {
    hidden: { opacity: 0, scaleX: 0 },
    show: { opacity: 1, scaleX: 1 },
    exit: {
      opacity: 0,
      scaleX: 0,
    },
  };

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
          transition,
        }) =>
          transition != true ? (
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
          ) : (
            <AnimatePresence>
              <motion.li
                initial="hidden"
                animate="show"
                exit="exit"
                key={id}
                variants={item}
              >
                <As
                  disabled={disabled ? disabled : false}
                  className={className}
                  onClick={() => onClick()}
                  href={href}
                >
                  {icon && icon}
                  {element}
                </As>
              </motion.li>
            </AnimatePresence>
          )
      )}
    </>
  );
}
