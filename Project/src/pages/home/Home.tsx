import { Tutorial } from "./Tutorial/Tutorial";

export function Home() {
  return (
    <main className="main">
      <div className="main__left">
        <Tutorial />
      </div>
      <div className="main__right"></div>
    </main>
  );
}
