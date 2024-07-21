import { useContext, useEffect } from "react";
import "./Main.css";
import PromptCards from "./PromptCards";
import { Context } from "../context/Context";

const Main = () => {
  const { isHomePage, setIsHomePage } = useContext(Context);
  useEffect(() => {
    setIsHomePage(true);
    console.log(isHomePage);
  }, []);

  return (
    <div className="main-container">
      <PromptCards />
    </div>
  );
};

export default Main;
