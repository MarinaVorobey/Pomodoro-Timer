import { Provider } from "react-redux";
import { Home } from "./pages/home/Home";
import { TopNavbar } from "./ui/TopNavbar/TopNavbar";
import { store } from "./store/store";
import { LoadedStoreProvider } from "./util/LoadedStoreProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Stats } from "./pages/stats/Stats";
import { TimerContainer } from "./util/containers/TimerContainer";
import { DateContainer } from "./util/containers/DateContainer";
import { NotificationContainer } from "./util/containers/NotificationContainer";
import { Settings } from "./pages/settings/Settings";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "statistics",
    element: <Stats />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <h1 className="visually-hidden">pomodoro_box - Таймер Помодоро</h1>
      <TopNavbar />

      <div className="container">
        <LoadedStoreProvider>
          <DateContainer>
            <TimerContainer>
              <NotificationContainer>
                <RouterProvider router={router} />
              </NotificationContainer>
            </TimerContainer>
          </DateContainer>
        </LoadedStoreProvider>
      </div>
    </Provider>
  );
}

export default App;
