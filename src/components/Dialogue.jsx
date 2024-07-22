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
  } = useContext(Context);

  useEffect(() => {
    setIsHomePage(false);
    getPrevChats(currentUser.uid);
    getChatById(currentUser.uid, id);
  }, []);

  useEffect(() => {
    getChatById(currentUser.uid, id);
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
