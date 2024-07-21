import "./Dialogue.css";
import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Context } from "../context/Context";
import { useParams } from "react-router-dom";

const Dialogue = () => {
  const { id } = useParams();
  const divRef = useRef();

  const {
    prompt,
    loading,
    response,
    chatHistory,
    isHomePage,
    setIsHomePage,
    responseData,
    setResponseData,
    animationLoading,
  } = useContext(Context);

  const [dialogueHistory, setDialogueHistory] = useState([]);

  useEffect(() => {
    setIsHomePage(false);
  }, []);

  useEffect(() => {
    if (chatHistory.length !== 0) {
      const temp = chatHistory.slice(0, chatHistory.length - 1);
      setDialogueHistory(temp);
    }
  }, [chatHistory]);

  // Scroll to bottom when chatHistory or response updates
  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [response, loading, animationLoading]);

  return (
    <div className="result" ref={divRef}>
      {dialogueHistory.length !== 0 &&
        dialogueHistory.map((item, index) => (
          <div key={index}>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{item.prompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
            </div>
          </div>
        ))}
      <div>
        <div className="result-title">
          <img src={assets.user_icon} alt="" />
          <p>{prompt}</p>
        </div>
        <div className="result-data">
          <img src={assets.gemini_icon} alt="" />
          {loading ? (
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: response }}></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialogue;
