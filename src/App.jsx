import { Routes, Route, useNavigate } from "react-router-dom";
import { Context } from "./context/Context";
import { useContext, useEffect } from "react";
import { auth, db } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./components/Login/Login";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./components/Home";
import Dialogue from "./components/Dialogue";

const App = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser, getPrevChats, setUserUid } =
    useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        setCurrentUser(userData);
        setUserUid(userData.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  // Load User's chats
  useEffect(() => {
    if (currentUser) {
      getPrevChats(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:id" element={<Dialogue />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
