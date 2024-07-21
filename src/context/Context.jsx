import { createContext, useEffect, useState } from "react";
import { marked } from "marked";
import runChat from "../config/GeminiAPI";

export const Context = createContext();

const ContextProvider = (props) => {
  const [isHomePage, setIsHomePage] = useState(true);
  const [loading, setLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState([]);

  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");

  const newChat = () => {
    setLoading(false);
  };

  const [responseData, setResponseData] = useState("");
  const [response, setResponse] = useState("");

  const [animationLoading, setAnimationLoading] = useState(true);

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

  // const typingAnimationString = (responseString) => {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       for (let i = 0; i < responseString.length; i++) {
  //         const nextChar = responseString[i];
  //         setTimeout(() => {
  //           setResponse((prev) => prev + nextChar);
  //         }, 4 * i);
  //       }
  //       resolve("resolve");
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // };

  // const onSent = async () => {
  //   if (response !== "" && prompt !== "") {
  //     const lastPrompt = prompt;
  //     const lastResponse = response;

  //     const latestDialogue = {
  //       prompt: lastPrompt,
  //       response: lastResponse,
  //     };
  //     setChatHistory((prev) => [...prev, latestDialogue]);
  //   }

  //   setLoading(true);
  //   setResponse("");

  //   setPrompt(input);
  //   const geminiResponse = await runChat(input);
  //   setInput("");

  //   const formatedResponse = marked(geminiResponse);
  //   setResponseData(formatedResponse);
  //   setLoading(false);

  //   await typingAnimationString(formatedResponse);
  //   if (response.length === responseData.length) {
  //     console.log("Animation is Over");
  //   } else {
  //     console.log("error");
  //   }
  // };

  const updateChathistory = () => {
    const lastPrompt = prompt;
    const lastResponse = response;

    const dialogue = {
      prompt: lastPrompt,
      response: lastResponse,
    };
    setPrompt("");
    setResponse("");
    setChatHistory((prev) => [...prev, dialogue]);
  };

  const addChathistory = (promptPara) => {
    const dialogue = {
      prompt: promptPara,
      response: "",
    };
    setChatHistory((prev) => [...prev, dialogue]);
  };

  const updateChathistoryNew = (responsePara) => {
    setChatHistory((prev) => {
      const updatedHistory = [...prev];
      if (updatedHistory.length > 0) {
        const lastDialogue = {
          ...updatedHistory[updatedHistory.length - 1],
          response: responsePara,
        };
        updatedHistory[updatedHistory.length - 1] = lastDialogue;
      }
      return updatedHistory;
    });
  };

  const onSent = async () => {
    setLoading(true);
    setResponse("");
    setAnimationLoading((prev) => !prev);

    addChathistory(input);

    setPrompt(input);
    const geminiResponse = await runChat(input);
    setInput("");

    const formatedResponse = marked(geminiResponse);
    setResponseData(formatedResponse);
    setLoading(false);

    await typingAnimationString(formatedResponse);
    setAnimationLoading(true);
  };

  useEffect(() => {
    if (response.length > 0 && response.length === responseData.length) {
      updateChathistoryNew(response);
      console.log("Animation is Over");
      setAnimationLoading((prev) => !prev);
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
    animationLoading,
    setAnimationLoading,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
