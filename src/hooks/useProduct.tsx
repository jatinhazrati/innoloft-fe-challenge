import { convertToRaw } from "draft-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    updateOfferDetails,
    updateProductBasicDetails,
} from "../utils/api";
import { PRODUCT_ID } from "../utils/constants";
import { IEntry, IProductDetails } from "../utils/types";

interface IUseProduct {
  handleCancel: () => void;
  handleSaveDescription: (productDetails: IProductDetails) => void;
  handleSaveOfferDetails: (
    technologies: IEntry[],
    businessModels: IEntry[]
  ) => void;
}

export const useProduct = (): IUseProduct => {
  const navigate = useNavigate();

  const handleCancel = (): void => {
    navigate("/");
  };

  const handleSaveDescription = (productDetails: IProductDetails) => {
    const updatedProductBasicDetails = {
      title: productDetails.title,
      descriptionEditor: convertToRaw(
        productDetails.descriptionEditor.getCurrentContent()
      ).blocks[0].text,
    };

    updateProductBasicDetails(PRODUCT_ID, updatedProductBasicDetails).then(
      (response) => {
        console.log("repsonse", response);
        if (+response === 200) {
          toast.success("Updated Product Basic Details Successfully!");
        } else {
          toast.error("Something went wrong!");
        }
      }
    );
  };

  const handleSaveOfferDetails = (
    technologies: IEntry[],
    businessModels: IEntry[]
  ) => {
    updateOfferDetails(PRODUCT_ID, technologies, businessModels).then(
      (response) => {
        if (+response === 200) {
          toast.success("Updated Offer Details Successfully!");
        } else {
          toast.error("Something went wrong!");
        }
      }
    );
  };

  return {
    handleCancel,
    handleSaveDescription,
    handleSaveOfferDetails,
  };
};
