import "./Dialogue.css";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Context } from "../context/Context";

const Dialogue = () => {
  const { prompt, loading, response, chatHistory, setChatHistory, setLoading } =
    useContext(Context);

  const [dialogueHistory, setDialogueHistory] = useState([]);
  //   const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    if (chatHistory.length !== 0) {
      const temp = chatHistory.slice(0, chatHistory.length);
      setDialogueHistory(temp);
    }
  }, [chatHistory]);

  return (
    <div className="result">
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
            // Result Output
            <p dangerouslySetInnerHTML={{ __html: response }}></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialogue;
