import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const Home = () => {
  const navigate = useNavigate();

  const { appConfiguration } = useAppSelector((state) => state.configuration);
  const mainColor =
    appConfiguration.mainColor || import.meta.env.VITE_REACT_APP_MAIN_COLOR;
    
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-3xl">Innoloft FE Challenge</h2>
        <button
          onClick={() => navigate("/product")}
          style={{ backgroundColor: mainColor }}
          className="text-white py-2 px-4 mt-2 rounded"
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default Home;
