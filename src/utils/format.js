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
  const largeNumber = 10000000000;
  const currentTime = Math.floor(Date.now() / 1000);
  const id = (largeNumber - currentTime).toString();
  return id;
};
