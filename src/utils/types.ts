import { EditorState } from "draft-js";

export type IEntry = {
  id: string;
  name: string;
};

export type IAddress = {
  country: {
    name: string;
  };
  city: {
    name: string;
  };
  street: string;
  house: string;
  zipCode: string;
  longitude: string;
  latitude: string;
};

export interface IProductDetails {
  title: string;
  descriptionEditor: EditorState;
}

export type IProductBasicDetails = {
  image: string;
  title: string;
  description: string;
};

export type IUserAndCompanyDetails = {
  companyLogo: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  companyName: string;
  address: IAddress;
};

export type IProduct = {
  productBasicDetails: IProductBasicDetails;
  userAndCompanyDetails: IUserAndCompanyDetails;
  video: string;
  offerDetails: {
    technology: { id: string; name: string }[];
    trl: { id: string; name: string };
    businessModels: { id: string; name: string }[];
    costs: string;
  };
};

export type IAppConfiguraiton = {
  id: string | number;
  logo: string;
  mainColor: string;
  hasUserSection: boolean;
};

export type IConfigurationInitialState = {
  appConfiguration: IAppConfiguraiton;
};
