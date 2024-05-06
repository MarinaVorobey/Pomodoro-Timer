import { ActionCreator } from "@reduxjs/toolkit/react";

export const ADD_TIME = "ADD_TIME";
export type AddTimeAction = {
  type: typeof ADD_TIME;
};

export const addTime: ActionCreator<AddTimeAction> = () => ({
  type: ADD_TIME,
});

export const TIMER_COUNT = "TIMER_COUNT";
export type TimerCountAction = {
  type: typeof TIMER_COUNT;
};

export const timerCount: ActionCreator<TimerCountAction> = () => ({
  type: TIMER_COUNT,
});

export const PAUSE_TIMER = "PAUSE_TIMER";
export type PauseTimerAction = {
  type: typeof PAUSE_TIMER;
};

export const pauseTimer: ActionCreator<PauseTimerAction> = () => ({
  type: PAUSE_TIMER,
});

export const PAUSE_COUNT = "PAUSE_COUNT";
export type PauseCountAction = {
  type: typeof PAUSE_COUNT;
};

export const pauseCount: ActionCreator<PauseCountAction> = () => ({
  type: PAUSE_COUNT,
});

export const START_TIMER = "START_TIMER";
export type StartTimerAction = {
  type: typeof START_TIMER;
};

export const startTimer: ActionCreator<StartTimerAction> = () => ({
  type: START_TIMER,
});

export const COMPLETE_TIMER = "COMPLETE_TIMER";
export type CompleteTimerAction = {
  type: typeof COMPLETE_TIMER;
};

export const completeTimer: ActionCreator<CompleteTimerAction> = () => ({
  type: COMPLETE_TIMER,
});

export const STOP_TIMER = "STOP_TIMER";
export type StopTimerAction = {
  type: typeof STOP_TIMER;
};

export const stopTimer: ActionCreator<StopTimerAction> = () => ({
  type: STOP_TIMER,
});

export const SKIP_BREAK = "SKIP_BREAK";
export type SkipBreakAction = {
  type: typeof SKIP_BREAK;
};

export const skipBreak: ActionCreator<SkipBreakAction> = () => ({
  type: SKIP_BREAK,
});

export const SKIP_TASK = "SKIP_TASK";
export type SkipTaskAction = {
  type: typeof SKIP_TASK;
};

export const skipTask: ActionCreator<SkipTaskAction> = () => ({
  type: SKIP_TASK,
});

export type TimerActions =
  | AddTimeAction
  | TimerCountAction
  | PauseTimerAction
  | StartTimerAction
  | CompleteTimerAction
  | StopTimerAction
  | SkipBreakAction
  | PauseCountAction;
