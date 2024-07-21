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

  const hanlePromptSubmission = () => {
    onSent();
    if (isHomePage) {
      const newChatId = generateId();
      navigate(`/chat/${newChatId}`);
    }
  };

  return (
    <div className="main-bottom">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a prompt here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
              onClick={() => hanlePromptSubmission()}
            />
          ) : null}
        </div>
      </div>
      <p className="bottom-info">
        Gemini may display inaccurate info, including about people, so
        double-check its responses. Your privacy and Gemini Apps
      </p>
    </div>
  );
};

export default PromptBar;
