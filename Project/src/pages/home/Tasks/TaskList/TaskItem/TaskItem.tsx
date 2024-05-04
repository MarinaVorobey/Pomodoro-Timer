import { useDispatch } from "react-redux";
import { Button } from "../../../../../ui/Button/Button";
import { Dropdown } from "../../../../../ui/Dropdown/Dropdown";
import { Icon } from "../../../../../ui/Icon/Icon";
import { GenericList, TGenericItem } from "../../../../../util/GenericList";
import {
  addTomato,
  deleteTask,
  removeTomato,
} from "../../../../../store/actions";
import { useState } from "react";
import { Modal } from "../../../../../ui/Modal/Modal";
import { TaskDeleteModal } from "./TaskDeleteModal";
import { TaskEditModal } from "./TaskEditModal";

type TTaskItemProps = {
  id: string;
  tomatoes: number;
  name: string;
};

export function TaskItem({ id, tomatoes, name }: TTaskItemProps) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const deleteModal: React.ReactNode = (
    <TaskDeleteModal
      onConfirm={() => {
        dispatch(deleteTask(id));
        setModalOpen(false);
      }}
      onCancel={() => setModalOpen(false)}
    />
  );
  const editModal: React.ReactNode = (
    <TaskEditModal
      starterValue={name}
      id={id}
      onConfirm={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
    />
  );

  const [modalType, setModalType] = useState(deleteModal);

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
      onClick: () => {
        setModalOpen(true);
        setModalType(editModal);
      },
      className: "task__option",
      element: "Редактировать",
      id: "3",
      icon: <Icon type="pen" className="task__option-icon" />,
      As: "button",
    },
    {
      onClick: () => {
        setModalOpen(true);
        setModalType(deleteModal);
      },
      className: "task__option",
      element: "Удалить",
      id: "4",
      icon: <Icon type="bin" className="task__option-icon" />,
      As: "button",
    },
  ];

  const optionsBtn: React.ReactNode = (
    <Button action={() => {}} className="task__options" iconName="dots" />
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
        showTopPointer={true}
      />
      {modalOpen ? (
        <Modal children={modalType} onClose={() => setModalOpen(false)} />
      ) : null}
    </>
  );
}
