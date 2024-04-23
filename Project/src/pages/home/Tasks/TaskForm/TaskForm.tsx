import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../../../ui/Button";

type TTaskFormProps = {
  submitFn: (name: string) => void;
};

const NOOP = () => {};

export function TaskForm({ submitFn }: TTaskFormProps) {
  const [formTask, setFormTask] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (formTask.trim().length < 3) {
      setError("Введите как минимум 3 символа");
      return;
    }
    submitFn(formTask);
    return setFormTask("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    return setFormTask(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="form tasks__form">
      <label className="visually-hidden" htmlFor="taskName">
        Название задачи
      </label>
      <input
        onBlur={() => setError("")}
        onChange={handleChange}
        id="taskName"
        className="tasks__input"
        name="taskName"
        placeholder="Название задачи"
        value={formTask}
      ></input>
      <Button
        action={NOOP}
        text="Добавить"
        type="submit"
        className="form__submit-button"
      />
      {error.length > 0 ? (
        <span className="form__error-block">{error}</span>
      ) : null}
    </form>
  );
}
