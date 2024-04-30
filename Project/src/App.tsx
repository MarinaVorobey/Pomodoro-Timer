import { Provider } from "react-redux";
import { Home } from "./pages/home/Home";
import { TopNavbar } from "./ui/TopNavbar/TopNavbar";
import { store } from "./store/store";
import { LoadedStoreProvider } from "./util/LoadedStoreProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Stats } from "./pages/stats/Stats";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "statistics",
    element: <Stats />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <h1 className="visually-hidden">pomodoro_box - Таймер Помодоро</h1>
      <TopNavbar />

      <div className="container">
        <LoadedStoreProvider>
          <RouterProvider router={router} />
        </LoadedStoreProvider>
      </div>
    </Provider>
  );
}

export default App;
