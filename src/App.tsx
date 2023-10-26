import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import { setAppConfiguration } from "./redux/configuration/reducer";
import { useAppDispatch } from "./redux/hooks";
import { getAppConfiguration } from "./utils/api";

function App() {
  const appId = import.meta.env.VITE_REACT_APP_ID || 1;
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAppConfiguration(appId).then((appConfiguration) => {
      dispatch(setAppConfiguration(appConfiguration));
    });
  }, []);

  return (
    <Suspense fallback={<>Loading ...</>}>
      <ToastContainer />
      <Navbar />
      <div className="w-full h-full bg-gray-200">
        <Outlet />
      </div>
    </Suspense>
  );
}

export default App;
