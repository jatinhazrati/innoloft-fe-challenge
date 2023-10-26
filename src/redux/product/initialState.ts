import { IProduct } from "../../utils/types";

export const PRODUCT_INTIIAL_STATE: IProduct = {
  productBasicDetails: {
    image: "",
    title: "",
    description: "",
  },
  userAndCompanyDetails: {
    companyLogo: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    companyName: "",
    address: {
      country: {
        name: "",
      },
      city: {
        name: "",
      },
      street: "",
      house: "",
      zipCode: "",
      longitude: "",
      latitude: "",
    },
  },
  video: "",
  offerDetails: {
    technology: [],
    trl: { id: "", name: "" },
    businessModels: [],
    costs: "",
  },
};
