import { TaskForm } from "./TaskForm/TaskForm";
import { TaskList } from "./TaskList/TaskList";
import { TGenericItem } from "../../../util/GenericList";
import { TaskItem } from "./TaskList/TaskItem/TaskItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";

export function Tasks() {
  const taskList = useSelector((state: RootState) => state.tasks);

  const list: TGenericItem[] = taskList.map((t) => {
    return {
      id: t.id,
      element: <TaskItem id={t.id} tomatoes={t.totamatoes} name={t.name} />,
      onClick: () => {},
      className: "tasks__item",
      As: "li" as const,
    };
  });

  return (
    <div className="tasks">
      <TaskForm type="add" />
      <TaskList list={list} />
      <p className="tasks__time">1 час 15 мин</p>
    </div>
  );
}
