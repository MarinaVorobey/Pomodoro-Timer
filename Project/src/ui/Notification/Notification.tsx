import ReactDOM from "react-dom";
import { Icon } from "../Icon/Icon";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { hideNotification } from "../../store/actions/globalActions";

type TNotificationProps = {
  taskName: string;
  taskNum: number;
  mode: "work" | "break";
  part: number;
};

export function Notification({
  taskName,
  taskNum,
  mode,
  part,
}: TNotificationProps) {
  const dispatch = useDispatch();
  const notificationRoot = document.getElementById("notification-root");
  const audio = new Audio("/audio/notification-sound.mp3");

  useEffect(() => {
    audio.play();
    setTimeout(() => dispatch(hideNotification()), 3000);
  }, []);

  if (!notificationRoot) return null;

  const effects = {
    hidden: { right: "-500px" },
    show: { right: "25px" },
    exit: {
      right: "-500px",
    },
  };

  return (
    <>
      {ReactDOM.createPortal(
        <motion.div
          variants={effects}
          initial="hidden"
          animate="show"
          exit="exit"
          className="notification"
          key="notification"
        >
          <Icon type="bell" className={`notification__icon--${mode}`} />
          <div className="notification__text">
            <p className="notification__task">
              <span className="notification__task-num">{`Задача ${taskNum} - `}</span>
              <span className="notification__task-name">{taskName}</span>
            </p>
            <p className="notification__results">
              <span className="notification__message">Таймер завершен:</span>
              <span
                className={`notification__task-part notification__task-part--${mode}`}
              >{`${mode === "work" ? " Помидор" : " Перерыв"} ${part}`}</span>
            </p>
          </div>
        </motion.div>,
        notificationRoot
      )}
    </>
  );
}
