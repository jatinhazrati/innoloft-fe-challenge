import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAppConfiguraiton } from "../../utils/types";
import { CONFIGURATION_INTIIAL_STATE } from "./initialState";

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
