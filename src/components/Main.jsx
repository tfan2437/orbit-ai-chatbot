import { useContext, useEffect } from "react";
import "./Main.css";
import PromptCards from "./PromptCards";
import { Context } from "../context/Context";

const Main = () => {
  const { setIsHomePage } = useContext(Context);
  useEffect(() => {
    setIsHomePage(true);
  }, []);

  return (
    <div className="main-container">
      <PromptCards />
    </div>
  );
};

export default Main;
