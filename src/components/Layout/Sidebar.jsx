import "./Sidebar.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const { newChat, onSent, chatHistory, setPrompt } = useContext(Context);

  const [showLarge, setShowLarge] = useState(false);

  const loadPrompt = async (prompt) => {
    setPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={() => setShowLarge((prev) => !prev)}
        />

        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {showLarge && <p>New Chat</p>}
        </div>

        {showLarge && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {chatHistory.map((item, index) => {
              return (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => loadPrompt(item)}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {showLarge && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {showLarge && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {showLarge && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
