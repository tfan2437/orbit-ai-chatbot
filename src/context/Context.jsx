import { createContext, useEffect, useState } from "react";
import { marked } from "marked";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const Context = createContext();

const ContextProvider = (props) => {
  const navigate = useNavigate();

  // support
  const [isHomePage, setIsHomePage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // user
  const [currentUser, setCurrentUser] = useState(null);
  const [userUid, setUserUid] = useState(null);

  // chat history & firebase data
  const [chatHistory, setChatHistory] = useState([]);
  const [prevChats, setPrevChats] = useState([]);

  // prompt & response
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [responseData, setResponseData] = useState("");
  const [response, setResponse] = useState("");

  // Screen Size
  const [showMobilMenu, setShowMobilMenu] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // gemini ai (vercel build problem)

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const runChat = async (prompt) => {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error during Gemini API request:", error);
      return `Error: ${error.message}`;
    }
  };

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

  const removeChatHistory = async (uid, id) => {
    try {
      await deleteDoc(doc(collection(db, "userChats", uid, "chatid"), id));
      console.log("Deleted.");
    } catch (error) {
      console.error(error);
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
    removeChatHistory,
    userUid,
    setUserUid,
    showMobilMenu,
    setShowMobilMenu,
    expanded,
    setExpanded,
    windowSize,
    setWindowSize,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
