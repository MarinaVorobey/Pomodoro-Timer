import { useDispatch } from "react-redux";
import { Button } from "../../../../../ui/Button";
import { Dropdown } from "../../../../../ui/Dropdown/Dropdown";
import { Icon } from "../../../../../ui/Icon/Icon";
import { GenericList, TGenericItem } from "../../../../../util/GenericList";
import {
  addTomato,
  deleteTask,
  removeTomato,
} from "../../../../../store/actions";

type TTaskItemProps = {
  id: string;
  tomatoes: number;
  name: string;
};

const NOOP = () => {};

export function TaskItem({ id, tomatoes, name }: TTaskItemProps) {
  const dispatch = useDispatch();

  const optionsList: TGenericItem[] = [
    {
      onClick: () => dispatch(addTomato(id)),
      className: "task__option",
      element: "Увеличить",
      id: "1",
      icon: <Icon type="plus-transparent" className="task__option-icon" />,
      As: "button",
    },
    {
      onClick: () => dispatch(removeTomato(id)),
      className: "task__option",
      element: "Уменьшить",
      disabled: tomatoes == 1,
      id: "2",
      icon: <Icon type="minus" className="task__option-icon" />,
      As: "button",
    },
    {
      onClick: NOOP,
      className: "task__option",
      element: "Редактировать",
      id: "3",
      icon: <Icon type="pen" className="task__option-icon" />,
      As: "button",
    },
    {
      onClick: () => dispatch(deleteTask(id)),
      className: "task__option",
      element: "Удалить",
      id: "4",
      icon: <Icon type="bin" className="task__option-icon" />,
      As: "button",
    },
  ];

  const optionsBtn: React.ReactNode = (
    <Button action={NOOP} className="task__options" iconName="dots" />
  );

  return (
    <>
      <div className="task__text-block">
        <span className="task__tomato-num">{tomatoes}</span>
        <span className="task__name">{name}</span>
      </div>
      <Dropdown
        button={optionsBtn}
        children={<GenericList list={optionsList} />}
        leftShift={-71}
        topShift={14}
      />
    </>
  );
}
