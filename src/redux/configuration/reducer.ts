import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CONFIGURATION_INTIIAL_STATE } from "./initialState";
import { IAppConfiguraiton } from "./types";

export const configurationSlice = createSlice({
  name: "product",
  initialState: CONFIGURATION_INTIIAL_STATE,
  reducers: {
    setAppConfiguration: (state, action: PayloadAction<IAppConfiguraiton>) => {
      state.appConfiguration = action.payload;
    },
  },
});

export const { setAppConfiguration } = configurationSlice.actions;

const ConfigurationReducer = configurationSlice.reducer;
export default ConfigurationReducer;
