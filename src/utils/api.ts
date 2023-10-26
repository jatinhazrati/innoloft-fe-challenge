import axios from "axios";
import { IProduct } from "./types";

const baseURL = "https://api-test.innoloft.com";

export const getProduct = async (productId: number): Promise<IProduct> => {
  try {
    const response = await axios.get(`${baseURL}/product/${productId}/`);
    const productDetails = {
      productBasicDetails: {
        image: response.data.picture,
        title: response.data.name,
        description: response.data.description,
      },
      userAndCompanyDetails: {
        companyLogo: response.data.company.logo,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        profilePicture: response.data.user.profilePicture,
        companyName: response.data.company.name,
        address: response.data.company.address,
      },
      video: response.data.video,
      offerDetails: {
        technology: response.data.categories,
        trl: response.data.trl,
        businessModels: response.data.businessModels,
        costs: response.data.investmentEffort,
      },
    };

    return productDetails;
  } catch (error) {
    throw error;
  }
};

export const updateProductBasicDetails = async (
  productId: number,
  updatedProductDetails: {
    title: string;
    descriptionEditor: string;
  }
) => {
  try {
    const existingProductData = await axios.get(
      `${baseURL}/product/${productId}/`
    );
    const updatedProductData = {
      ...existingProductData.data,
      name: updatedProductDetails.title,
      description: updatedProductDetails.descriptionEditor,
    };

    const response = await axios.put(
      `${baseURL}/product/${productId}/`,
      updatedProductData
    );

    return response.status;
  } catch (error) {
    throw error;
  }
};

export const updateOfferDetails = async (
  productId: number,
  updatedTechnologies: {
    id: string;
    name: string;
  }[],
  updatedBusinessModels: {
    id: string;
    name: string;
  }[]
) => {
  try {
    const existingProductData = await axios.get(
      `${baseURL}/product/${productId}/`
    );
    const updatedOfferDetailsData = {
      ...existingProductData,
      categories: updatedTechnologies,
      businessModels: updatedBusinessModels,
    };

    const response = await axios.put(
      `${baseURL}/product/${productId}/`,
      updatedOfferDetailsData
    );

    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getTRLList = async () => {
  try {
    const response = await axios.get(`${baseURL}/trl/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAppConfiguration = async (appId: number) => {
  try {
    const response = await axios.get(`${baseURL}/configuration/${appId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
