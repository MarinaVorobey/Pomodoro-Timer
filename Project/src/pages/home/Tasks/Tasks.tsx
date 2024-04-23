import { TaskForm } from "./TaskForm/TaskForm";
import { TaskList } from "./TaskList/TaskList";
import { TGenericItem } from "../../../util/GenericList";
import { TaskItem } from "./TaskList/TaskItem/TaskItem";
import { useState } from "react";

export function Tasks() {
  const startList: TGenericItem[] = [
    {
      element: <TaskItem tomatoes={1} name="Make cake" />,
      id: "1",
      onClick: () => {},
      className: "tasks__item",
      As: "li" as const,
    },
    {
      element: <TaskItem tomatoes={1} name="Make tasks" />,
      id: "2",
      onClick: () => {},
      className: "tasks__item",
      As: "li" as const,
    },
    {
      element: <TaskItem tomatoes={1} name="Make timer" />,
      id: "3",
      onClick: () => {},
      className: "tasks__item",
      As: "li" as const,
    },
  ];

  const [list, setList] = useState(startList);

  function addTask(name: string): void {
    let maxId: number = 0;
    list.forEach((item) => {
      if (+item.id >= maxId) maxId = +item.id + 1;
    });

    return setList([
      ...list,
      {
        element: <TaskItem tomatoes={maxId} name={name} />,
        id: `${maxId}`,
        onClick: () => {},
        className: "tasks__item",
        As: "li" as const,
      },
    ]);
  }

  return (
    <div className="tasks">
      <TaskForm submitFn={addTask} />
      <TaskList list={list} />
      <p className="tasks__time">1 час 15 мин</p>
    </div>
  );
}
