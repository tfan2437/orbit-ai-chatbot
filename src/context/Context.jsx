import { createContext, useEffect, useState } from "react";
import { marked } from "marked";
import runChat from "../config/geminiAPI";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { profileImage } from "../assets/assets";

export const Context = createContext();

const ContextProvider = (props) => {
  const navigate = useNavigate();

  // support
  const [isHomePage, setIsHomePage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // user
  const [currentUser, setCurrentUser] = useState(null);

  // {
  //   uid: "0000000000",
  //   name: "user",
  //   email: "user@orbit.com",
  //   authProvider: "Orbit",
  //   profileImage: profileImage,
  // }

  // chat history & firebase data
  const [chatHistory, setChatHistory] = useState([]);
  const [prevChats, setPrevChats] = useState([]);

  // prompt & response
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [responseData, setResponseData] = useState("");
  const [response, setResponse] = useState("");

  // Open new page
  const newChat = () => {
    setLoading(false);
    setChatHistory([]);
    setInput("");
    setPrompt("");
    setResponse("");
    getPrevChats(currentUser.uid);
    navigate("/");
  };

  const openPrevChat = (id) => {
    setLoading(false);
    setChatHistory([]);
    setInput("");
    setPrompt("");
    setResponse("");
    getPrevChats(currentUser.uid);
    navigate(`/chat/${id}`);
  };

  // Firebase fetching function
  const getPrevChats = async (uid) => {
    const chatsRef = collection(db, "userChats", uid, "chatid");
    const chatsSnapshot = await getDocs(chatsRef);

    const chatsData = chatsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        chatId: data.chatId,
        chatTitle: data.chatTitle,
      };
    });

    setPrevChats(chatsData);
  };

  const getChatById = async (uid, id) => {
    const chatRef = doc(collection(db, "userChats", uid, "chatid"), id);
    const chatSnapshot = await getDoc(chatRef);

    if (chatSnapshot.exists()) {
      const chatData = chatSnapshot.data();
      setChatHistory([...chatData.dialogues]);
    }
  };

  const uploadChatHistory = async (uid, id) => {
    const chatRef = doc(collection(db, "userChats", uid, "chatid"), id);
    const chatSnapshot = await getDoc(chatRef);

    if (!chatSnapshot.exists()) {
      await setDoc(chatRef, {
        chatId: id,
        chatTitle: chatHistory[0].prompt.slice(0, 15),
        dialogues: [...chatHistory],
      });
    } else {
      await updateDoc(chatRef, { dialogues: [...chatHistory] });
    }
  };

  // Update function
  const addChathistory = (promptPara) => {
    const dialogue = {
      prompt: promptPara,
      response: "",
    };
    setChatHistory((prev) => [...prev, dialogue]);
  };

  const updateChathistory = (responsePara) => {
    return new Promise((resolve, reject) => {
      try {
        setChatHistory((prev) => {
          const updatedHistory = [...prev];
          if (updatedHistory.length > 0) {
            const lastDialogue = {
              ...updatedHistory[updatedHistory.length - 1],
              response: responsePara,
            };
            updatedHistory[updatedHistory.length - 1] = lastDialogue;
          }
          resolve(updatedHistory);
          return updatedHistory;
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  // Chat page function
  const typingAnimationString = (responseString) => {
    return new Promise((resolve, reject) => {
      try {
        for (let i = 0; i < responseString.length; i++) {
          const nextChar = responseString[i];
          setTimeout(() => {
            setResponse((prev) => prev + nextChar);
            if (i === responseString.length - 1) {
              resolve("resolve");
            }
          }, 4 * i);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const onSent = async () => {
    setLoading(true);
    setResponse("");

    addChathistory(input);
    setPrompt(input);
    const geminiResponse = await runChat(input);
    setInput("");

    const formatedResponse = marked(geminiResponse);
    setResponseData(formatedResponse);
    setLoading(false);

    await typingAnimationString(formatedResponse);
  };

  // after confirm the response animation is over update the chat dialogues
  useEffect(() => {
    const update = async () => {
      await updateChathistory(response);
    };

    if (response.length > 0 && response.length === responseData.length) {
      update();
    }
  }, [response, responseData]);

  const contextValue = {
    input,
    setInput,
    chatHistory,
    setChatHistory,
    onSent,
    prompt,
    setPrompt,
    loading,
    response,
    newChat,
    isHomePage,
    setIsHomePage,
    responseData,
    setResponseData,
    prevChats,
    setPrevChats,
    getPrevChats,
    currentUser,
    setCurrentUser,
    uploadChatHistory,
    alertMessage,
    setAlertMessage,
    getChatById,
    openPrevChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
