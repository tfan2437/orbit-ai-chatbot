import "./Home.css";
import { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { assets } from "../assets/assets";

const Main = () => {
  const { setIsHomePage, setInput, currentUser, getPrevChats } =
    useContext(Context);

  useEffect(() => {
    setIsHomePage(true);
    if (currentUser) {
      getPrevChats(currentUser.uid);
    }
  }, []);

  const cardsData = [
    {
      message: "Text inviting neighbors to barbecue",
      image: assets.chatIcon,
    },
    {
      message: "Activities to make friends in new city",
      image: assets.peopleIcon,
    },
    {
      message: "Explain superconductors",
      image: assets.learningIcon,
    },
    {
      message: "Python script for daily email reports",
      image: assets.codeIcon,
    },
  ];

  return (
    <div className="main-container">
      <div className="orbit-image">
        <img src={assets.orbitIcon} alt="" />
      </div>
      <div className="cards">
        {cardsData.map((item, index) => (
          <div
            className="card"
            key={index}
            onClick={() => setInput(item.message)}
          >
            <p>{item.message}</p>
            <img src={item.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
