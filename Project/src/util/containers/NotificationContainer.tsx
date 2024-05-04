import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { Notification } from "../../ui/Notification/Notification";
import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";

type TNotificationContainerProps = {
  children: ReactNode;
};

export function NotificationContainer({
  children,
}: TNotificationContainerProps) {
  const notificationInfo = useSelector(
    (state: RootState) => state.notification
  );

  return (
    <>
      <AnimatePresence>
        {notificationInfo.shown ? (
          <Notification
            taskName={notificationInfo.taskName}
            taskNum={notificationInfo.taskNum}
            mode={notificationInfo.mode}
            part={notificationInfo.tomatoes + 1}
          />
        ) : null}
      </AnimatePresence>
      {children}
    </>
  );
}
