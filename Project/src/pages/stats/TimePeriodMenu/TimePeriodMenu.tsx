import { useState } from "react";
import { Button } from "../../../ui/Button";
import { Dropdown } from "../../../ui/Dropdown/Dropdown";
import { GenericList, TGenericItem } from "../../../util/GenericList";
import { useDispatch } from "react-redux";
import { changeWeekSort } from "../../../store/actions";

type TTimePeriodMenuProps = {
  weekShift: 0 | 1 | 2;
};

const weekNumToString = {
  0: "Эта неделя",
  1: "Прошедшая неделя",
  2: "2 недели назад",
};

export function TimePeriodMenu({ weekShift }: TTimePeriodMenuProps) {
  const dispatch = useDispatch();
  const [arrowDown, setArrowDown] = useState(true);
  const moveArrow = () => setArrowDown((prev) => !prev);

  const menuBtn: React.ReactNode = (
    <Button
      action={moveArrow}
      className={`stats-menu__btn${arrowDown ? "" : " reverse-arrow"}`}
      iconName="arrow"
      text={weekNumToString[weekShift]}
    />
  );

  const optionsList: TGenericItem[] = [
    {
      onClick: () => dispatch(changeWeekSort(0)),
      className: "stats-menu__option",
      element: "Эта неделя",
      id: "0",
      As: "button",
    },
    {
      onClick: () => dispatch(changeWeekSort(1)),
      className: "stats-menu__option",
      element: "Прошедшая неделя",
      id: "1",
      As: "button",
    },
    {
      onClick: () => dispatch(changeWeekSort(2)),
      className: "stats-menu__option",
      element: "2 недели назад",
      id: "2",
      As: "button",
    },
  ];

  return (
    <Dropdown
      button={menuBtn}
      children={
        <GenericList
          list={optionsList.filter((l) => l.id !== `${weekShift}`)}
        />
      }
      onClose={moveArrow}
    />
  );
}
