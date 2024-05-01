import { useState } from "react";
import { Button } from "../../../ui/Button";
import { Dropdown } from "../../../ui/Dropdown/Dropdown";
import { GenericList, TGenericItem } from "../../../util/GenericList";

export function TimePeriodMenu() {
  const [arrowDown, setArrowDown] = useState(true);
  const moveArrow = () => setArrowDown((prev) => !prev);

  const menuBtn: React.ReactNode = (
    <Button
      action={moveArrow}
      className={`stats-menu__btn${arrowDown ? "" : " reverse-arrow"}`}
      iconName="arrow"
      text="Эта неделя"
    />
  );

  const optionsList: TGenericItem[] = [
    {
      onClick: () => {},
      className: "stats-menu__option",
      element: "Эта неделя",
      id: "1",
      As: "button",
    },
    {
      onClick: () => {},
      className: "stats-menu__option",
      element: "Прошедшая неделя",
      id: "2",
      As: "button",
    },
    {
      onClick: () => {},
      className: "stats-menu__option",
      element: "2 недели назад",
      id: "3",
      As: "button",
    },
  ];

  return (
    <Dropdown
      button={menuBtn}
      children={<GenericList list={optionsList} />}
      onClose={moveArrow}
    />
  );
}
