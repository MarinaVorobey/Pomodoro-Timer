import { Button } from "../../../../../ui/Button";
import { TaskForm } from "../../TaskForm/TaskForm";

type TTaskEditModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
  id: string;
  starterValue: string;
};

export function TaskEditModal({
  onCancel,
  onConfirm,
  id,
  starterValue,
}: TTaskEditModalProps) {
  return (
    <>
      <h2 className="modal__title">Редактировать задачу</h2>
      <TaskForm
        starterValue={starterValue}
        type="edit"
        additionalAction={onConfirm}
        id={id}
      />
      <Button action={onCancel} className="modal__cancel-btn" text="Отмена" />
    </>
  );
}
