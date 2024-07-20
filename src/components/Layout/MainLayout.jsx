import "./MainLayout.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import PromptBar from "./PromptBar";

const MainLayout = () => {
  return (
    <div className="page-container">
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
