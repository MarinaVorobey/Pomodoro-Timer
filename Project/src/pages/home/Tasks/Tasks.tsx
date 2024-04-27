import { TaskForm } from "./TaskForm/TaskForm";
import { TaskList } from "./TaskList/TaskList";
import { TGenericItem } from "../../../util/GenericList";
import { TaskItem } from "./TaskList/TaskItem/TaskItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { useFormatTimeTasks } from "../../../hooks/useFormatTimeTasks";
import "./tasks.css";

export function Tasks() {
  const taskList = useSelector((state: RootState) => state.tasks);
  const totalTime = useSelector((state: RootState) => state.totalTime);
  const timeFormatted = useFormatTimeTasks(totalTime);

  const list: TGenericItem[] = taskList.map((t) => {
    return {
      id: t.id,
      element: <TaskItem id={t.id} tomatoes={t.tomatoes} name={t.name} />,
      onClick: () => {},
      className: "tasks__item",
      As: "li" as const,
    };
  });

  return (
    <div className="tasks">
      <TaskForm type="add" />
      <TaskList list={list} />
      <p className="tasks__time">{timeFormatted}</p>
    </div>
  );
}
