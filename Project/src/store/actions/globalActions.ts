import { ActionCreator } from "@reduxjs/toolkit/react";
import { RootState, TGlobalControls } from "../rootReducer";

export const LOAD_SAVED_STATE = "LOAD_SAVED_STATE";
export type LoadSavedStateAction = {
  type: typeof LOAD_SAVED_STATE;
  savedState: RootState;
};

export const loadSavedState: ActionCreator<LoadSavedStateAction> = (
  savedState: RootState
) => ({
  type: LOAD_SAVED_STATE,
  savedState,
});

export const SWITCH_THEME = "SWITCH_THEME";
export type SwitchThemeAction = {
  type: typeof SWITCH_THEME;
};

export const switchTheme: ActionCreator<SwitchThemeAction> = () => ({
  type: SWITCH_THEME,
});

export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";
export type HideNotificationAction = {
  type: typeof HIDE_NOTIFICATION;
};

export const hideNotification: ActionCreator<HideNotificationAction> = () => ({
  type: HIDE_NOTIFICATION,
});

export const CHANGE_SETTINGS = "CHANGE_SETTINGS";
export type ChangeSettingsAction = {
  type: typeof CHANGE_SETTINGS;
  settings: TGlobalControls;
};

export const changeSettings: ActionCreator<ChangeSettingsAction> = (
  settings: TGlobalControls
) => ({
  type: CHANGE_SETTINGS,
  settings,
});

export type GlobalActions =
  | LoadSavedStateAction
  | SwitchThemeAction
  | HideNotificationAction
  | ChangeSettingsAction;
