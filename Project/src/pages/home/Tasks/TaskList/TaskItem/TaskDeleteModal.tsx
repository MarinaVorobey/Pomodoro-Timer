import { Button } from "../../../../../ui/Button/Button";

type TTaskDeleteModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function TaskDeleteModal({
  onCancel,
  onConfirm,
}: TTaskDeleteModalProps) {
  return (
    <>
      <h2 className="modal__title">Удалить задачу?</h2>
      <div className="modal__submit-btns">
        <Button
          action={onConfirm}
          className="modal__delete-btn"
          text="Удалить"
        />
        <Button action={onCancel} className="modal__cancel-btn" text="Отмена" />
      </div>
    </>
  );
}
