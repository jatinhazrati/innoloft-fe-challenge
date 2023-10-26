import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PRODUCT_INTIIAL_STATE } from "./initialState";
import { IProduct } from "../../utils/types";

export const productSlice = createSlice({
  name: "product",
  initialState: PRODUCT_INTIIAL_STATE,
  reducers: {
    setCompleteProductDetails: (state, action: PayloadAction<IProduct>) => {
      state.productBasicDetails = action.payload.productBasicDetails;
      state.userAndCompanyDetails = action.payload.userAndCompanyDetails;
      state.offerDetails = action.payload.offerDetails;
      state.video = action.payload.video;
    },
  },
});

export const { setCompleteProductDetails } = productSlice.actions;

const ProductReducer = productSlice.reducer;
export default ProductReducer;
