import { createContext, useState } from "react";
import runChat from "../config/GeminiAPI";
import { formatResponseArray } from "../utils/format";
import { marked } from "marked";

export const Context = createContext();

const ContextProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState("");

  const [chatHistory, setChatHistory] = useState([]);

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const newChat = () => {
    setLoading(false);
  };

  const typingAnimation = (responseArray) => {
    return new Promise((resolve, reject) => {
      try {
        for (let i = 0; i < responseArray.length; i++) {
          const nextWord = responseArray[i];
          setTimeout(() => {
            setResponse((prev) => prev + nextWord + " ");
          }, 20 * i);
        }
        resolve("resolve");
      } catch (error) {
        reject(error);
      }
    });
  };

  const onSent = async () => {
    if (response !== "" && prompt !== "") {
      const lastPrompt = prompt;
      const lastResponse = response;

      const latestDialogue = {
        prompt: lastPrompt,
        response: lastResponse,
      };
      setChatHistory((prev) => [...prev, latestDialogue]);
    }

    setLoading(true);
    setResponse("");

    setPrompt(input);
    const responseData = await runChat(input);
    setInput("");

    const formatedArray = await formatResponseArray(responseData);
    await typingAnimation(formatedArray);

    const rawMarkup = marked(responseData);
    console.log(rawMarkup);

    setLoading(false);
  };

  // setInput("");

  // const formatedResponseTag = await formatResponseToHTML(responseData);
  // setResponse(formatedResponseTag);

  // const latestDialogue = {
  //   prompt: currentPrompt,
  //   response: formatedResponse.join(" "),
  // };

  // update chathistory and upload to firebase
  // setChatHistory((prev) => [...prev, latestDialogue]);

  // const onSentOld = async () => {
  //   setLoading(true);
  //   setPrompt(input);
  //   setResponse("");

  //   // const formatedResponseTag = await formatResponseToHTML(responseData);
  //   // console.log(formatedResponseTag);

  //   setLoading(false);
  // };

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
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
