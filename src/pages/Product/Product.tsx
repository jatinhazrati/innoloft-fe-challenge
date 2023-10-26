import { ContentState, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { BsClockHistory } from "react-icons/bs";
import { FaChessKnight } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import ReactPlayer from "react-player";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Badge from "../../components/Badge/Badge";
import { useProduct } from "../../hooks/useProduct";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCompleteProductDetails } from "../../redux/product/reducer";
import { getProduct, getTRLList } from "../../utils/api";
import {
  EDITOR_TOOLBAR_OPTIONS,
  INITIAL_PRODUCT_DETAILS,
  PRODUCT_ID,
} from "../../utils/constants";
import { IEntry } from "../../utils/types";

const Product = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { productBasicDetails, userAndCompanyDetails, video, offerDetails } =
    useAppSelector((state) => state.product);
  const { appConfiguration } = useAppSelector((state) => state.configuration);

  const [isEditMode, setIsEditMode] = useState(false);
  const [productDetails, setProductDetails] = useState(INITIAL_PRODUCT_DETAILS);
  const [technologies, setTechnologies] = useState<IEntry[]>([]);
  const [businessModels, setBusinessModels] = useState<IEntry[]>([]);
  const [trlOptions, setTrlOptions] = useState<IEntry[]>([]);

  const mainColor =
    appConfiguration.mainColor || import.meta.env.VITE_REACT_APP_MAIN_COLOR;
  const hasUserSection =
    appConfiguration.hasUserSection ||
    import.meta.env.VITE_REACT_APP_HAS_USER_SECTION;

  const { handleCancel, handleSaveDescription, handleSaveOfferDetails } =
    useProduct();

  useEffect(() => {
    getProduct(PRODUCT_ID).then((productDetails) => {
      dispatch(setCompleteProductDetails(productDetails));
      setProductDetails({
        title: productDetails.productBasicDetails.title,
        descriptionEditor: EditorState.createWithContent(
          ContentState.createFromText(
            productDetails.productBasicDetails.description
          )
        ),
      });

      setTechnologies(productDetails.offerDetails.technology);
      setBusinessModels(productDetails.offerDetails.businessModels);
    });
  }, []);

  useEffect(() => {
    if (location.pathname === "/product/edit") {
      getTRLList().then((trlValues) => {
        setTrlOptions(trlValues);
      });
      setIsEditMode(true);
    }
  }, [location]);

  return (
    <div className="bg-gray-200 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between">
          <Link to="/" className="flex items-center justify-center ">
            <h3 className="text-base">{"< Home"}</h3>
          </Link>
          <button
            onClick={() => navigate("/product/edit")}
            style={{ backgroundColor: mainColor }}
            className="justify-end text-white py-2 px-4 mt-2 rounded "
          >
            Edit
          </button>
        </div>

        {/* Product Details */}
        <div className="border border-gray-300 rounded-[8px] bg-white p-4 flex flex-col md:flex-row">
          <div className="md:w-8/12 flex flex-col pr-4">
            <div className="max-w-750 flex items-center justify-center">
              <img
                src={productBasicDetails.image}
                alt="Product"
                className="object-contain h-[200px] w-full"
              />
            </div>
            <div className="mt-4">
              {isEditMode ? (
                <>
                  <input
                    className="border-2 border-gray rounded my-2 w-full ps-1"
                    type="text"
                    value={productDetails.title}
                    onChange={(e) =>
                      setProductDetails((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  <div className="border-2 border-gray p-1 rounded">
                    <Editor
                      editorState={productDetails.descriptionEditor}
                      onEditorStateChange={(newState) =>
                        setProductDetails((prev) => ({
                          ...prev,
                          descriptionEditor: newState,
                        }))
                      }
                      toolbar={EDITOR_TOOLBAR_OPTIONS}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-bold text-xl">
                    {productBasicDetails.title}
                  </h3>
                  <p
                    className="mt-2"
                    dangerouslySetInnerHTML={{
                      __html: productBasicDetails?.description,
                    }}
                  />
                </>
              )}
              {isEditMode && (
                <div className="flex justify-end mt-2 gap-2">
                  <button
                    onClick={handleCancel}
                    className="border text-gray-800 py-2 px-4 mt-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleSaveDescription(productDetails);
                      handleSaveOfferDetails(technologies, businessModels);
                    }}
                    style={{ backgroundColor: mainColor }}
                    className="text-white py-2 px-4 mt-2 rounded"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {hasUserSection && (
            <div className="md:w-4/12 border-t md:border-t-0 md:border-l border-gray-300 pl-4 mt-4">
              <h6 className="font-bold md:mt-0 my-4">Offered by</h6>
              <img
                src={userAndCompanyDetails.companyLogo}
                alt="Logo"
                className="w-40 h-8 mt-2"
              />
              <div className="flex items-center mt-4">
                <img
                  src={userAndCompanyDetails.profilePicture}
                  alt="User Profile Pic"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2">
                  <p>
                    {userAndCompanyDetails.firstName +
                      " " +
                      userAndCompanyDetails.lastName}
                  </p>
                  <p>{userAndCompanyDetails.companyName}</p>
                </div>
              </div>
              <div className="flex items-center mt-8">
                <MdLocationOn size={24} color="#6B7280" />
                <p className="ml-2">
                  {userAndCompanyDetails.address.house}{" "}
                  {userAndCompanyDetails.address.street}
                </p>
              </div>
              <div className="flex items-center">
                <p className="ml-2">
                  {userAndCompanyDetails.address.zipCode}{" "}
                  {userAndCompanyDetails.address.city.name}
                  {", "}
                  {userAndCompanyDetails.address.country.name}
                </p>
              </div>
              <div className="mt-4 h-400 w-400">
                {userAndCompanyDetails.address.latitude &&
                  userAndCompanyDetails.address.longitude && (
                    <iframe
                      src={`https://maps.google.com/maps?q=${userAndCompanyDetails.address.latitude.toString()},${userAndCompanyDetails.address.longitude.toString()}&hl=es&z=14&output=embed`}
                    ></iframe>
                  )}
              </div>
            </div>
          )}
        </div>

        {/* (Video) */}
        <div className="border border-gray-300 bg-white p-4 rounded-[8px]">
          <h4 className="font-bold text-xl">Video</h4>
          <div className="mt-4 flex justify-center items-center">
            <ReactPlayer url={video} />
          </div>
        </div>

        {/* (Offer Details) */}
        <div className="border border-gray-300 bg-white p-4 rounded-[8px]">
          <h4 className="font-bold text-xl">Offer Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <div className="p-2">
                <IoSettingsOutline size={24} color="gray" />
              </div>
              <div className="ml-2 flex flex-col">
                <p className="text-gray-500">Technology</p>
                {isEditMode ? (
                  <div className="flex">
                    {technologies?.map((technology, index) => (
                      <input
                        key={index}
                        className="border-2 border-gray rounded my-2 w-full ps-1 bg-gray-200 m-1"
                        type="text"
                        value={technology.name}
                        onChange={(e) => {
                          const technologiesCopy = [...technologies];

                          technologiesCopy[index] = {
                            ...technologiesCopy[index],
                            name: e.target.value,
                          };

                          setTechnologies(technologiesCopy);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex mt-1">
                    {offerDetails.technology.map((tech) => (
                      <Badge key={tech.id} text={tech.name} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-2">
                <FaChessKnight size={24} color="gray" />
              </div>
              <div className="ml-2 flex flex-col">
                <p className="text-gray-500">Business Model</p>
                {isEditMode ? (
                  <div className="flex">
                    {businessModels.map((businessModel, index) => (
                      <input
                        key={index}
                        className="border-2 border-gray rounded my-2 w-full ps-1 bg-gray-200 m-1"
                        type="text"
                        value={businessModel.name}
                        onChange={(e) => {
                          const updatedBusinessModelsCopy = [...businessModels];

                          updatedBusinessModelsCopy[index] = {
                            ...updatedBusinessModelsCopy[index],
                            name: e.target.value,
                          };

                          setBusinessModels(updatedBusinessModelsCopy);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex mt-1">
                    {offerDetails.businessModels?.map((businessModel) => (
                      <Badge key={businessModel.id} text={businessModel.name} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-2">
                <BsClockHistory size={24} color="gray" />
              </div>
              <div className="ml-2 flex flex-col">
                <p className="text-gray-500">TRL</p>
                {isEditMode ? (
                  <select className="border-2 border-gray rounded my-2 w-full ps-1 bg-gray-200 m-1">
                    {trlOptions.map((trlOption) => (
                      <option value={trlOption.id}>{trlOption.name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="flex mt-1">
                    <Badge text={offerDetails.trl.name} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-2">
                <FaSackDollar size={24} color="gray" />
              </div>
              <div className="ml-2 flex flex-col">
                <p className="text-gray-500">Costs</p>
                <div className="flex mt-1">
                  <Badge text={offerDetails.costs} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
