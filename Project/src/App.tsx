import { Home } from "./pages/home/Home";
import { TopNavbar } from "./ui/TopNavbar/TopNavbar";

function App() {
  return (
    <>
      <h1 className="visually-hidden">pomodoro_box - Таймер Помодоро</h1>
      <TopNavbar />

      <div className="container">
        <Home />
      </div>
    </>
  );
}

export default App;
