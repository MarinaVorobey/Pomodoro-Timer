import { ActionCreator } from "@reduxjs/toolkit/react";

export const UPDATE_CURR_DATE = "UPDATE_CURR_DATE";
export type UpdateCurrDateAction = {
  type: typeof UPDATE_CURR_DATE;
  date: string;
  weekDay: number;
  clean: string[];
};

export const updateCurrDate: ActionCreator<UpdateCurrDateAction> = (
  date: string,
  weekDay: number,
  clean: string[]
) => ({
  type: UPDATE_CURR_DATE,
  date,
  weekDay,
  clean,
});

export const CHANGE_WEEK_SORT = "CHANGE_WEEK_SORT";
export type ChangeWeekSortAction = {
  type: typeof CHANGE_WEEK_SORT;
  weekShift: 0 | 1 | 2;
};

export const changeWeekSort: ActionCreator<ChangeWeekSortAction> = (
  weekShift: 0 | 1 | 2
) => ({
  type: CHANGE_WEEK_SORT,
  weekShift,
});

export const CHANGE_TARGET_DATE = "CHANGE_TARGET_DATE";
export type ChangeTargetDateAction = {
  type: typeof CHANGE_TARGET_DATE;
  date: string;
};

export const changeTargetDate: ActionCreator<ChangeTargetDateAction> = (
  date: string
) => ({
  type: CHANGE_TARGET_DATE,
  date,
});

export type StatsActions =
  | UpdateCurrDateAction
  | ChangeWeekSortAction
  | ChangeTargetDateAction;
