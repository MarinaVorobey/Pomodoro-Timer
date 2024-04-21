import { TaskForm } from "./TaskForm/TaskForm";
import { TaskList } from "./TaskList/TaskList";

export function Tasks() {
  return (
    <div className="tasks">
      <TaskForm />
      <TaskList />
      <p className="tasks__time">1 час 15 мин</p>
    </div>
  );
}
