import { GenericList, TGenericItem } from "../../../../util/GenericList";
import { TaskItem } from "./TaskItem/TaskItem";

const list: TGenericItem[] = [
  {
    element: <TaskItem order="1" name="Make cake" />,
    id: "1",
    onClick: () => {},
    className: "tasks__item",
    As: "li" as const,
  },
  {
    element: <TaskItem order="2" name="Make tasks" />,
    id: "2",
    onClick: () => {},
    className: "tasks__item",
    As: "li" as const,
  },
  {
    element: <TaskItem order="3" name="Make timer" />,
    id: "3",
    onClick: () => {},
    className: "tasks__item",
    As: "li" as const,
  },
];

export function TaskList() {
  return (
    <ul className="tasks__list">
      <GenericList list={list} />
    </ul>
  );
}
