import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Main from "./components/Main";
import { useEffect } from "react";
import { generateId } from "./utils/format";
import Dialogue from "./components/Dialogue";

const App = () => {
  useEffect(() => {
    // console.log(generateId());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Dialogue />} />
      </Route>
    </Routes>
  );
};

export default App;
