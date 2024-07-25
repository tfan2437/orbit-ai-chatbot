import "./Dialogue.css";
import { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Context } from "../context/Context";
import { useParams } from "react-router-dom";

const Dialogue = () => {
  const divRef = useRef();
  const { id } = useParams();
  const {
    prompt,
    response,
    chatHistory,
    loading,
    setIsHomePage,
    getPrevChats,
    currentUser,
    uploadChatHistory,
    getChatById,
    userUid,
  } = useContext(Context);

  useEffect(() => {
    setIsHomePage(false);
    getPrevChats(userUid);
    getChatById(userUid, id);
  }, []);

  useEffect(() => {
    getChatById(userUid, id);
  }, [id]);

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [response, loading]);

  useEffect(() => {
    const length = chatHistory.length;
    if (length > 0 && chatHistory[length - 1].response !== "") {
      uploadChatHistory(currentUser.uid, id);
    }
  }, [chatHistory]);

  const displayDialogues =
    chatHistory.length > 0 && response === ""
      ? chatHistory.slice(0, chatHistory.length)
      : chatHistory.slice(0, chatHistory.length - 1);

  const handleCopyResponse = (targetResponse) => {
    navigator.clipboard.writeText(targetResponse);
  };

  return (
    <div className="result" ref={divRef}>
      {chatHistory.length > 0 &&
        displayDialogues.map((item, index) => {
          // Check if it's the last item and if the response is empty
          if (index === displayDialogues.length - 1 && item.response === "") {
            return null;
          }

          return (
            <div key={index}>
              <div className="result-title">
                <p>{item.prompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.aiRed} alt="" />
                <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
              </div>
              <div className="pl-[45px] pt-1 sm:pl-[60px] sm:pt-3 flex gap-1 sm:gap-2 items-center">
                <img
                  src={assets.copy}
                  alt="Copy"
                  onClick={() => handleCopyResponse(item.response)}
                  className="cursor-pointer w-4 h-4 opacity-50 hover:opacity-100 aspect-square"
                />
                <img
                  src={assets.like}
                  alt="Copy"
                  className="cursor-pointer w-4 h-4 ml-1 opacity-50 hover:opacity-100 aspect-square"
                />
                <img
                  src={assets.cool}
                  alt="Copy"
                  className="cursor-pointer w-[18px] h-[18px] opacity-50 hover:opacity-100 aspect-square"
                />
              </div>
            </div>
          );
        })}

      <div>
        <div className="result-title">{prompt !== "" && <p>{prompt}</p>}</div>
        <div className="result-data">
          {response !== "" || loading ? (
            <img src={assets.aiRed} alt="" />
          ) : null}
          {loading ? (
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          ) : (
            <p
              dangerouslySetInnerHTML={{ __html: response }}
              className="result-output"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialogue;
