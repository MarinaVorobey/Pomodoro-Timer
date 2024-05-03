import { Reducer, createReducer } from "@reduxjs/toolkit";
import {
  ADD_TASK,
  ADD_TIME,
  ADD_TOMATO,
  AddTaskAction,
  AddTomatoAction,
  CHANGE_WEEK_SORT,
  COMPLETE_TIMER,
  DELETE_TASK,
  DeleteTaskAction,
  LOAD_SAVED_STATE,
  LoadSavedStateAction,
  PAUSE_COUNT,
  PAUSE_TIMER,
  REMOVE_TOMATO,
  RENAME_TASK,
  RemoveTomatoAction,
  RenameTaskAction,
  SKIP_BREAK,
  SKIP_TASK,
  START_TIMER,
  STOP_TIMER,
  SWITCH_THEME,
  SwitchThemeAction,
  TIMER_COUNT,
  TaskActions,
  TimerActions,
  UPDATE_CURR_DATE,
  changeWeekSortAction,
  updateCurrDateAction,
} from "./actions";
import { saveToStorage } from "../util/saveToStorage";

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

export type RootState = {
  theme: "light" | "dark";
  currDay: string;
  totalTime: number;
  maxId: number;
  tasks: TTask[];
  currTask: TCurrentTask | null;

  stats: {
    [N: string]: TDailyStats;
  };
  statsControls: {
    targetDate: string;
    sortWeek: 0 | 1 | 2;
  };
};

const initialState: RootState = {
  theme: "light",
  currDay: "",
  totalTime: 0,
  maxId: 1,
  tasks: [],
  currTask: null,
  stats: {},
  statsControls: {
    targetDate: "",
    sortWeek: 0,
  },
};

const TOMATO_TIME = 150000;
const BREAK_TIME = 300000;
const LONG_BREAK_TIME = 900000;

export const rootReducer: Reducer<
  RootState,
  TaskActions | TimerActions | LoadSavedStateAction | SwitchThemeAction
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

    /* Tasks */
    .addCase(ADD_TASK, (state, action: AddTaskAction) => {
      state.tasks.push({
        id: `${state.maxId}`,
        name: action.name,
        tomatoes: 1,
      });
      state.maxId++;
      state.totalTime += TOMATO_TIME;
      if (!state.currTask) {
        state.currTask = {
          id: state.tasks[0].id,
          taskNum: 1,
          name: action.name,
          totalTaskTime: TOMATO_TIME,
          time: TOMATO_TIME,
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
      state.totalTime += TOMATO_TIME;
      if (action.id === state.currTask?.id) {
        state.currTask.tomatoesLeft++;
      }
      saveToStorage(state);
    })
    .addCase(REMOVE_TOMATO, (state, action: RemoveTomatoAction) => {
      const task = state.tasks.find((x: TTask) => x.id === action.id);
      if (!task || task.tomatoes <= 1) return;
      task.tomatoes--;
      state.totalTime -= TOMATO_TIME;

      if (action.id === state.currTask?.id) {
        state.currTask.tomatoesLeft--;
      }
      saveToStorage(state);
    })
    .addCase(DELETE_TASK, (state, action: DeleteTaskAction) => {
      const task = state.tasks.find((x) => x.id === action.id);
      if (task) {
        state.totalTime -= TOMATO_TIME * task.tomatoes;
      }
      state.tasks = state.tasks.filter((x: TTask) => x.id !== action.id);
      if (action.id === state.currTask?.id) {
        state.totalTime += TOMATO_TIME - state.currTask.time;
        if (!state.tasks.length) {
          state.currTask = null;
        } else {
          state.currTask = {
            id: state.tasks[0].id,
            taskNum: state.currTask.taskNum,
            name: state.tasks[0].name,
            totalTaskTime: TOMATO_TIME,
            time: TOMATO_TIME,
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
                currDate.tomatoes !== 0 && currDate.tomatoes % 4 === 0
                  ? LONG_BREAK_TIME
                  : BREAK_TIME,
              time:
                currDate.tomatoes !== 0 && currDate.tomatoes % 4 === 0
                  ? LONG_BREAK_TIME
                  : BREAK_TIME,
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
          task.time = BREAK_TIME;
        }
      } else {
        task.mode = "work";
        task.time = TOMATO_TIME;
      }
      saveToStorage(state);
    })
    .addCase(STOP_TIMER, (state) => {
      if (!state.currTask) return;
      state.currTask.isPaused = false;
      state.currTask.isStopped = true;
      state.totalTime -= state.currTask.time;
      state.totalTime += TOMATO_TIME;
      const currDate = state.stats[state.currDay];
      if (currDate) {
        currDate.cancelled++;
        currDate.workTime += state.currTask.totalTaskTime - state.currTask.time;
      }
      state.currTask.passed = 0;
      state.currTask.time = TOMATO_TIME;

      saveToStorage(state);
    })
    .addCase(SKIP_BREAK, (state) => {
      if (!state.currTask) return;
      state.currTask.isPaused = false;
      state.currTask.isStopped = true;
      state.currTask.time = TOMATO_TIME;
      state.currTask.passed = 0;
      state.currTask.mode = "work";
      saveToStorage(state);
    })
    .addCase(SKIP_TASK, (state) => {
      if (!state.currTask) return;
      state.totalTime -= TOMATO_TIME * (state.currTask.tomatoesLeft - 1);
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
          totalTaskTime: TOMATO_TIME,
          time: TOMATO_TIME,
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
    .addCase(UPDATE_CURR_DATE, (state, action: updateCurrDateAction) => {
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
      for (const key of action.clean) {
        delete state.stats[key];
      }
    })
    .addCase(CHANGE_WEEK_SORT, (state, action: changeWeekSortAction) => {
      state.statsControls.sortWeek = action.weekShift;
      saveToStorage(state);
    });
});
