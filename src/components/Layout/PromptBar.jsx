import { useContext } from "react";
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";
import "./PromptBar.css";
import { useNavigate } from "react-router-dom";
import { generateId } from "../../utils/format";

const PromptBar = () => {
  const navigate = useNavigate();
  const { input, setInput, onSent, isHomePage, setAlertMessage } =
    useContext(Context);

  const handlePromptSubmission = () => {
    onSent();
    if (isHomePage) {
      const newChatId = generateId();
      navigate(`/chat/${newChatId}`);
    }
  };

  const handleEnterSubmit = (e) => {
    if (e.key === "Enter") {
      console.log("enter");
      handlePromptSubmission();
    }
  };

  return (
    <div className="main-bottom">
      <div className="search-box">
        <input
          type="text"
          placeholder="Message Orbit"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => handleEnterSubmit(e)}
        />
        <div>
          <img
            src={assets.gallery_icon}
            alt=""
            onClick={() => setAlertMessage("Feature coming soon.")}
          />
          <img
            src={assets.mic_icon}
            alt=""
            onClick={() => setAlertMessage("Feature coming soon.")}
          />
          {input ? (
            <img
              src={assets.send_icon}
              alt=""
              onClick={() => handlePromptSubmission()}
            />
          ) : null}
        </div>
      </div>
      <p className="bottom-info">
        Orbit AI may display inaccurate information, including about people, so
        double-check its responses. Your privacy and Orbit AI apps.
      </p>
    </div>
  );
};

export default PromptBar;
