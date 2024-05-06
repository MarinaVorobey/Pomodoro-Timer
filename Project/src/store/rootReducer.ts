import { Reducer, createReducer } from "@reduxjs/toolkit";
import { saveToStorage } from "../util/saveToStorage";
import {
  UPDATE_CURR_DATE,
  UpdateCurrDateAction,
  CHANGE_WEEK_SORT,
  ChangeWeekSortAction,
  CHANGE_TARGET_DATE,
  ChangeTargetDateAction,
  StatsActions,
} from "./actions/dailyStatsActions";
import {
  LoadSavedStateAction,
  LOAD_SAVED_STATE,
  SWITCH_THEME,
  HIDE_NOTIFICATION,
  CHANGE_SETTINGS,
  ChangeSettingsAction,
  GlobalActions,
} from "./actions/globalActions";
import {
  TaskActions,
  ADD_TASK,
  AddTaskAction,
  RENAME_TASK,
  RenameTaskAction,
  ADD_TOMATO,
  AddTomatoAction,
  REMOVE_TOMATO,
  RemoveTomatoAction,
  DELETE_TASK,
  DeleteTaskAction,
} from "./actions/taskActions";
import {
  TimerActions,
  ADD_TIME,
  TIMER_COUNT,
  PAUSE_COUNT,
  PAUSE_TIMER,
  START_TIMER,
  COMPLETE_TIMER,
  STOP_TIMER,
  SKIP_BREAK,
  SKIP_TASK,
} from "./actions/timerActions";

type TTask = {
  id: string;
  name: string;
  tomatoes: number;
};

export type TDailyStats = {
  weekDay: number;
  pausedTime: number;
  tomatoesCompletedTime: number;
  workTime: number;
  totalWorkTime: number;
  tomatoes: number;
  cancelled: number;
};

export type TNotification = {
  shown: boolean;
  taskNum: number;
  taskName: string;
  mode: "work" | "break";
  tomatoes: number;
};

export type TCurrentTask = {
  id: string;
  taskNum: number;
  name: string;
  time: number;
  totalTaskTime: number;
  passed: number;
  tomatoesPassed: number;
  tomatoesLeft: number;
  timeOfPause: number;
  isPaused: boolean;
  isStopped: boolean;
  mode: "work" | "break";
};

export type TGlobalControls = {
  tomatoTime: number;
  breakTime: number;
  longBreakTime: number;
  longBreakFrequency: number;
  notify: boolean;
};

export type RootState = {
  theme: "light" | "dark";
  currDay: string;
  totalTime: number;
  maxId: number;

  globalControls: TGlobalControls;
  notification: TNotification;
  statsControls: {
    targetDate: string;
    sortWeek: 0 | 1 | 2;
  };

  tasks: TTask[];
  currTask: TCurrentTask | null;
  stats: {
    [N: string]: TDailyStats;
  };
};

const initialState: RootState = {
  theme: "light",
  currDay: "",
  totalTime: 0,
  maxId: 1,

  globalControls: {
    tomatoTime: 100000,
    breakTime: 300000,
    longBreakTime: 900000,
    longBreakFrequency: 4,
    notify: true,
  },
  notification: {
    shown: false,
    taskNum: 1,
    taskName: "",
    mode: "work",
    tomatoes: 0,
  },
  statsControls: {
    targetDate: "",
    sortWeek: 0,
  },

  tasks: [],
  currTask: null,
  stats: {
    "2024-04-17": {
      weekDay: 3,
      pausedTime: 10000,
      tomatoesCompletedTime: 100000,
      workTime: 100000,
      totalWorkTime: 100000,
      tomatoes: 1,
      cancelled: 0,
    },
    "2024-04-18": {
      weekDay: 4,
      pausedTime: 0,
      tomatoesCompletedTime: 100000,
      workTime: 200000,
      totalWorkTime: 200000,
      tomatoes: 1,
      cancelled: 3,
    },
    "2024-04-19": {
      weekDay: 5,
      pausedTime: 10000,
      tomatoesCompletedTime: 300000,
      workTime: 300000,
      totalWorkTime: 300000,
      tomatoes: 3,
      cancelled: 0,
    },

    "2024-04-24": {
      weekDay: 3,
      pausedTime: 10000,
      tomatoesCompletedTime: 100000,
      workTime: 100000,
      totalWorkTime: 100000,
      tomatoes: 1,
      cancelled: 0,
    },
    "2024-04-25": {
      weekDay: 4,
      pausedTime: 0,
      tomatoesCompletedTime: 100000,
      workTime: 150000,
      totalWorkTime: 150000,
      tomatoes: 1,
      cancelled: 1,
    },
    "2024-04-26": {
      weekDay: 5,
      pausedTime: 100000,
      tomatoesCompletedTime: 0,
      workTime: 150000,
      totalWorkTime: 150000,
      tomatoes: 0,
      cancelled: 2,
    },
    "2024-04-27": {
      weekDay: 6,
      pausedTime: 10000,
      tomatoesCompletedTime: 200000,
      workTime: 250000,
      totalWorkTime: 250000,
      tomatoes: 2,
      cancelled: 1,
    },
  },
};

export const rootReducer: Reducer<
  RootState,
  TaskActions | TimerActions | StatsActions | GlobalActions
> = createReducer(initialState, (builder) => {
  builder
    /* Global */
    .addCase(LOAD_SAVED_STATE, (state, action: LoadSavedStateAction) => {
      const loadedState = action.savedState;
      Object.assign(state, loadedState);
    })
    .addCase(SWITCH_THEME, (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", state.theme);
      saveToStorage(state);
    })
    .addCase(HIDE_NOTIFICATION, (state) => {
      state.notification.shown = false;
      saveToStorage(state);
    })
    .addCase(CHANGE_SETTINGS, (state, action: ChangeSettingsAction) => {
      Object.assign(state.globalControls, action.settings);
      if (state.currTask && state.currTask.isStopped) {
        state.totalTime -= state.currTask.totalTaskTime;
        state.currTask.totalTaskTime = action.settings.tomatoTime;
        state.currTask.time = action.settings.tomatoTime;
        state.totalTime += state.currTask.totalTaskTime;
      }
      saveToStorage(state);
    })

    /* Tasks */
    .addCase(ADD_TASK, (state, action: AddTaskAction) => {
      state.tasks.push({
        id: `${state.maxId}`,
        name: action.name,
        tomatoes: 1,
      });
      state.maxId++;
      state.totalTime += state.globalControls.tomatoTime;
      if (!state.currTask) {
        state.currTask = {
          id: state.tasks[0].id,
          taskNum: 1,
          name: action.name,
          totalTaskTime: state.globalControls.tomatoTime,
          time: state.globalControls.tomatoTime,
          timeOfPause: 0,
          passed: 0,
          tomatoesPassed: 0,
          tomatoesLeft: 1,
          isPaused: false,
          isStopped: true,
          mode: "work",
        };
      }
      saveToStorage(state);
    })
    .addCase(RENAME_TASK, (state, action: RenameTaskAction) => {
      const task = state.tasks.find((x: TTask) => x.id === action.id);
      if (task) task.name = action.name;
      if (action.id === state.currTask?.id) {
        state.currTask.name = action.name;
      }
      saveToStorage(state);
    })
    .addCase(ADD_TOMATO, (state, action: AddTomatoAction) => {
      const task = state.tasks.find((x: TTask) => x.id === action.id);
      if (!task) return;
      task.tomatoes++;
      state.totalTime += state.globalControls.tomatoTime;
      if (action.id === state.currTask?.id) {
        state.currTask.tomatoesLeft++;
      }
      saveToStorage(state);
    })
    .addCase(REMOVE_TOMATO, (state, action: RemoveTomatoAction) => {
      const task = state.tasks.find((x: TTask) => x.id === action.id);
      if (!task || task.tomatoes <= 1) return;
      task.tomatoes--;
      state.totalTime -= state.globalControls.tomatoTime;

      if (action.id === state.currTask?.id) {
        state.currTask.tomatoesLeft--;
      }
      saveToStorage(state);
    })
    .addCase(DELETE_TASK, (state, action: DeleteTaskAction) => {
      const task = state.tasks.find((x) => x.id === action.id);
      if (task) {
        state.totalTime -= state.globalControls.tomatoTime * task.tomatoes;
      }
      state.tasks = state.tasks.filter((x: TTask) => x.id !== action.id);
      if (action.id === state.currTask?.id) {
        state.totalTime += state.currTask.totalTaskTime - state.currTask.time;
        if (!state.tasks.length) {
          state.currTask = null;
        } else {
          state.currTask = {
            id: state.tasks[0].id,
            taskNum: state.currTask.taskNum,
            name: state.tasks[0].name,
            totalTaskTime: state.globalControls.tomatoTime,
            time: state.globalControls.tomatoTime,
            timeOfPause: 0,
            passed: 0,
            tomatoesPassed: 0,
            tomatoesLeft: state.tasks[0].tomatoes,
            isPaused: false,
            isStopped: true,
            mode: "work",
          };
        }
      }
      saveToStorage(state);
    })

    /* Timer */
    .addCase(ADD_TIME, (state) => {
      if (!state.currTask) return;
      state.currTask.time += 60000;
      state.currTask.totalTaskTime += 60000;
      if (state.currTask.mode === "work") {
        state.totalTime += 60000;
      }
      saveToStorage(state);
    })
    .addCase(TIMER_COUNT, (state) => {
      if (!state.currTask) return;
      state.currTask.time -= 1000;
      state.currTask.passed += 1000;
      if (state.currTask.mode === "work") {
        state.totalTime -= 1000;
        const currDate = state.stats[state.currDay];
        if (currDate) {
          currDate.totalWorkTime += 1000;
        }
      }
      saveToStorage(state);
    })
    .addCase(PAUSE_COUNT, (state) => {
      if (!state.currTask) return;
      const currDay = state.stats[state.currDay];
      if (currDay) {
        currDay.pausedTime += 1000;
      }
      saveToStorage(state);
    })
    .addCase(PAUSE_TIMER, (state) => {
      if (!state.currTask) return;
      state.currTask.isPaused = true;
      saveToStorage(state);
    })
    .addCase(START_TIMER, (state) => {
      if (!state.currTask) return;
      state.currTask.isPaused = false;
      state.currTask.isStopped = false;
      saveToStorage(state);
    })
    .addCase(COMPLETE_TIMER, (state) => {
      if (!state.currTask) return;
      const task = state.currTask;
      const currDate = state.stats[state.currDay];
      if (state.globalControls.notify) {
        state.notification = {
          shown: true,
          taskNum: state.currTask.taskNum,
          taskName: state.currTask.name,
          tomatoes: state.currTask.tomatoesPassed,
          mode: state.currTask.mode,
        };
      }
      if (task.mode === "work") {
        task.tomatoesLeft--;
        state.tasks[0].tomatoes--;
        if (currDate) {
          currDate.tomatoes++;
          currDate.workTime += state.currTask.totalTaskTime;
          currDate.tomatoesCompletedTime += state.currTask.totalTaskTime;
        }
        task.tomatoesPassed++;

        if (task.tomatoesLeft === 0) {
          state.tasks.splice(0, 1);
          if (!state.tasks.length) {
            state.currTask = null;
          } else {
            state.currTask = {
              id: state.tasks[0].id,
              taskNum: state.currTask.taskNum + 1,
              name: state.tasks[0].name,
              totalTaskTime:
                currDate.tomatoes % state.globalControls.longBreakFrequency ===
                0
                  ? state.globalControls.longBreakTime
                  : state.globalControls.breakTime,
              time:
                currDate.tomatoes % state.globalControls.longBreakFrequency ===
                0
                  ? state.globalControls.longBreakTime
                  : state.globalControls.breakTime,
              passed: 0,
              timeOfPause: 0,
              tomatoesPassed: 0,
              tomatoesLeft: state.tasks[0].tomatoes,
              isPaused: false,
              isStopped: false,
              mode: "break",
            };
          }
        } else {
          task.passed = 0;
          task.mode = "break";
          task.time =
            currDate.tomatoes % state.globalControls.longBreakFrequency === 0
              ? state.globalControls.longBreakTime
              : state.globalControls.breakTime;
        }
      } else {
        task.mode = "work";
        task.time = state.globalControls.tomatoTime;
        task.totalTaskTime = state.globalControls.tomatoTime;
      }
      saveToStorage(state);
    })
    .addCase(STOP_TIMER, (state) => {
      if (!state.currTask) return;
      state.currTask.isPaused = false;
      state.currTask.isStopped = true;
      state.totalTime -= state.currTask.time;
      state.totalTime += state.currTask.totalTaskTime;
      const currDate = state.stats[state.currDay];
      if (currDate) {
        currDate.cancelled++;
        currDate.workTime += state.currTask.totalTaskTime - state.currTask.time;
      }
      state.currTask.passed = 0;
      state.currTask.time = state.currTask.totalTaskTime;

      saveToStorage(state);
    })
    .addCase(SKIP_BREAK, (state) => {
      if (!state.currTask) return;
      state.currTask.isPaused = false;
      state.currTask.isStopped = true;
      state.currTask.time = state.globalControls.tomatoTime;
      state.currTask.passed = 0;
      state.currTask.mode = "work";
      saveToStorage(state);
    })
    .addCase(SKIP_TASK, (state) => {
      if (!state.currTask) return;
      state.totalTime -=
        state.globalControls.tomatoTime * (state.currTask.tomatoesLeft - 1);
      state.totalTime -= state.currTask.time;
      state.tasks.splice(0, 1);
      const currDate = state.stats[state.currDay];
      if (currDate) {
        currDate.cancelled++;
        currDate.workTime += state.currTask.totalTaskTime - state.currTask.time;
      }
      if (!state.tasks.length) {
        state.currTask = null;
      } else {
        state.currTask = {
          id: state.tasks[0].id,
          taskNum: state.currTask.taskNum,
          name: state.tasks[0].name,
          totalTaskTime: state.globalControls.tomatoTime,
          time: state.globalControls.tomatoTime,
          passed: 0,
          tomatoesPassed: 0,
          timeOfPause: 0,
          tomatoesLeft: state.tasks[0].tomatoes,
          isPaused: false,
          isStopped: true,
          mode: "work",
        };
      }
      saveToStorage(state);
    })

    /* DailyStats actions */
    .addCase(UPDATE_CURR_DATE, (state, action: UpdateCurrDateAction) => {
      state.currDay = action.date;
      if (!Object.keys(state.stats).includes(action.date)) {
        state.stats[action.date] = {
          weekDay: action.weekDay,
          tomatoesCompletedTime: 0,
          totalWorkTime: 0,
          pausedTime: 0,
          tomatoes: 0,
          workTime: 0,
          cancelled: 0,
        };
      }
      state.statsControls.targetDate = action.date;
      state.statsControls.sortWeek = 0;
      for (const key of action.clean) {
        delete state.stats[key];
      }
    })
    .addCase(CHANGE_WEEK_SORT, (state, action: ChangeWeekSortAction) => {
      state.statsControls.sortWeek = action.weekShift;
      saveToStorage(state);
    })
    .addCase(CHANGE_TARGET_DATE, (state, action: ChangeTargetDateAction) => {
      state.statsControls.targetDate = action.date;
      saveToStorage(state);
    });
});
