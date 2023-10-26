import { combineReducers } from "@reduxjs/toolkit";
import ProductReducer from "./product/reducer";
import ConfigurationReducer from "./configuration/reducer";

export const rootReducer = combineReducers({
  configuration: ConfigurationReducer,
  product: ProductReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
