import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../../../ui/Button/Button";
import { useDispatch } from "react-redux";
import { addTask, renameTask } from "../../../../store/actions";

type TTaskFormProps = {
  additionalAction?: () => void;
  type: "edit" | "add";
  id?: string;
  starterValue?: string;
};

export function TaskForm({
  additionalAction,
  type,
  id,
  starterValue,
}: TTaskFormProps) {
  const dispatch = useDispatch();
  const [formTask, setFormTask] = useState(starterValue ? starterValue : "");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (formTask.trim().length < 3) {
      setError("Введите как минимум 3 символа");
      return;
    }
    if (type === "add") {
      dispatch(addTask(formTask));
    } else {
      dispatch(renameTask(id, formTask));
    }
    if (additionalAction) additionalAction();
    return setFormTask("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    return setFormTask(e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${type === "add" ? "tasks__form" : "tasks__edit-form"}`}
    >
      <label
        className="visually-hidden"
        htmlFor={type == "add" ? "taskName" : "taskEditName"}
      >
        Название задачи
      </label>
      <input
        onBlur={() => setError("")}
        onChange={handleChange}
        id={type == "add" ? "taskName" : "taskEditName"}
        className="tasks__input"
        name={type == "add" ? "taskName" : "taskEditName"}
        placeholder="Название задачи"
        value={formTask}
      ></input>
      <Button
        action={() => {}}
        text={type === "add" ? "Добавить" : "Редактировать"}
        type="submit"
        className="form__submit-button"
      />
      {error.length > 0 ? (
        <span className="form__error-block">{error}</span>
      ) : null}
    </form>
  );
}
