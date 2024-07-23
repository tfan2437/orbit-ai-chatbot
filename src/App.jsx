import { Routes, Route, useNavigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Main from "./components/Main";
import Dialogue from "./components/Dialogue";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";
import Login from "./components/Login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Transition from "./components/Login/Transition";

const App = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser, getPrevChats } = useContext(Context);

  // const fakeOnAuthChange = () => {
  //   setCurrentUser({
  //     name: "Ting Wei Fan",
  //     uid: "tfan2437",
  //     email: "tfan2437@gmail.com",
  //   });
  // };

  // useEffect(() => {
  //   if (!currentUser) {
  //     fakeOnAuthChange();
  //   }
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        setCurrentUser(userData);
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
        <Route path="/" element={<Main />} />
        <Route path="/chat/:id" element={<Dialogue />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
