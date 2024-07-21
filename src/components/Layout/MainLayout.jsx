import "./MainLayout.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import PromptBar from "./PromptBar";
import { useContext } from "react";
import { Context } from "../../context/Context";
import CustomAlert from "../Alert/CustomAlert";

const MainLayout = () => {
  const { alertMessage, setAlertMessage } = useContext(Context);

  return (
    <div className="page-container">
      {alertMessage.length > 0 && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setAlertMessage("")}
        />
      )}
      <Sidebar />
      <div className="main">
        <Navbar />
        <Outlet />
        <PromptBar />
      </div>
    </div>
  );
};

export default MainLayout;
