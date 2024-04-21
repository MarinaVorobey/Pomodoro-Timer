import { Button } from "../../../../ui/Button";

const NOOP = () => {};

export function TaskForm() {
  return (
    <form className="form tasks__form">
      <label className="visually-hidden" htmlFor="task-name">
        Название задачи
      </label>
      <input
        className="tasks__input"
        name="task-name"
        placeholder="Название задачи"
      ></input>
      <Button action={NOOP} text="Добавить" className="form__submit-button" />
    </form>
  );
}
