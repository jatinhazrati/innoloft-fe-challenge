import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import {
  setAppConfiguration
} from "./redux/configuration/reducer";
import { useAppDispatch } from "./redux/hooks";
import { getAppConfiguration } from "./utils/api";
import { ROUTES } from "./utils/routes";

function App() {
  const appId = import.meta.env.VITE_REACT_APP_ID || 1;
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAppConfiguration(appId).then((appConfiguration) => {
      dispatch(setAppConfiguration(appConfiguration));
    });
  }, []);

  useEffect(() => {}, []);
  return (
    <Suspense fallback={<></>}>
      <ToastContainer />
      <Navbar />
      <div className="w-full h-full bg-gray-200">
        <Routes>
          {ROUTES.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
