import { useContext } from "react";
import { Context } from "../../context/Context";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import PromptBar from "./PromptBar";
import Alert from "../Alert/Alert";

const MainLayout = () => {
  const { alertMessage, setAlertMessage } = useContext(Context);

  return (
    <div className="page-container">
      {alertMessage.length > 0 && (
        <Alert message={alertMessage} onClose={() => setAlertMessage("")} />
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
