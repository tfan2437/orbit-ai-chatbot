import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Main from "./components/Main";
import Dialogue from "./components/Dialogue";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";

const App = () => {
  const { currentUser, setCurrentUser, getPrevChats } = useContext(Context);

  const fakeOnAuthChange = () => {
    setCurrentUser({
      name: "Ting Wei Fan",
      uid: "tfan2437",
      email: "tfan2437@gmail.com",
    });
  };

  useEffect(() => {
    if (!currentUser) {
      fakeOnAuthChange();
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      getPrevChats(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/chat/:id" element={<Dialogue />} />
      </Route>
    </Routes>
  );
};

export default App;
