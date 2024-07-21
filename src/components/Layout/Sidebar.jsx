import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const {
    newChat,
    onSent,
    chatHistory,
    setPrompt,
    prevChats,
    setPrevChats,
    openPrevChat,
  } = useContext(Context);

  const [expanded, setExpanded] = useState(true);

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={() => setExpanded((prev) => !prev)}
        />

        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {expanded && <p>New Chat</p>}
        </div>

        {expanded && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevChats.map((item, index) => {
              return (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => openPrevChat(item.chatId)}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.chatTitle}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {expanded && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {expanded && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {expanded && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
