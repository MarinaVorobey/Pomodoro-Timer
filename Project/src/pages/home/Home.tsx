import { Tasks } from "./Tasks/Tasks";
import { Timer } from "./Timer/Timer";
import { Tutorial } from "./Tutorial/Tutorial";

export function Home() {
  return (
    <main className="main">
      <div className="main__left">
        <Tutorial />
        <Tasks />
      </div>
      <div className="main__right">
        <Timer />
      </div>
    </main>
  );
}
