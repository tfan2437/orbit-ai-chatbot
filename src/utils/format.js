export const formatResponseArray = (response) => {
  return new Promise((resolve, reject) => {
    try {
      let responseArray = response.split("**");
      let tempString = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          tempString += responseArray[i];
        } else {
          tempString += "<b>" + responseArray[i] + "</b>";
        }
      }

      tempString = tempString.split("*").join("<br>");
      responseArray = tempString.split(" ");
      resolve(responseArray);
    } catch (error) {
      reject(error);
    }
  });
};

export const generateId = () => {
  const random1 = Math.random().toString(36).substring(2, 10);
  const random2 = Math.random().toString(36).substring(2, 10);
  return random1 + random2;
};
