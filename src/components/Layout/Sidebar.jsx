import "./Sidebar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const {
    newChat,
    prevChats,
    openPrevChat,
    setAlertMessage,
    currentUser,
    removeChatHistory,
    showMobilMenu,
    expanded,
    setExpanded,
  } = useContext(Context);

  const handleDeleteChat = async (id) => {
    await removeChatHistory(currentUser.uid, id);
    navigate("/");
  };

  const sidebarStyle = showMobilMenu ? "inline-flex" : "hidden";

  return (
    <div className={`sidebar ${window.innerWidth < 600 ? sidebarStyle : null}`}>
      <div className="top">
        {showMobilMenu ? null : (
          <img
            className="menu w-5"
            src={assets.menu}
            alt=""
            onClick={() => setExpanded((prev) => !prev)}
          />
        )}
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus} alt="" className="w-5" />
          {expanded && <p>New Chat</p>}
        </div>

        {expanded && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevChats.map((item, index) => {
              return (
                <div
                  className="recent-container group"
                  key={index}
                  onClick={() => openPrevChat(item.chatId)}
                >
                  <div className="recent-entry">
                    <img src={assets.dialogue} alt="" />
                    <p>{item.chatTitle}</p>
                  </div>
                  <img
                    src={assets.x}
                    alt=""
                    onClick={() => handleDeleteChat(item.chatId)}
                    className="w-6 h-6 opacity-0 group-hover:opacity-40 z-20 p-1"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div
          className="bottom-item"
          onClick={() => setAlertMessage("Feature coming soon.")}
        >
          <img src={assets.help} alt="" />
          {expanded && <p>Help</p>}
        </div>
        <div
          className="bottom-item"
          onClick={() => setAlertMessage("Feature coming soon.")}
        >
          <img src={assets.history} alt="" />
          {expanded && <p>Activity</p>}
        </div>
        <div
          className="bottom-item"
          onClick={() => setAlertMessage("Feature coming soon.")}
        >
          <img src={assets.setting} alt="" />
          {expanded && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
