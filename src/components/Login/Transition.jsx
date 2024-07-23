import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const Transition = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setTimeout(() => {
          window.location.reload();
          navigate("/");
        }, 2000);
      }
    });
  }, []);

  return <div className="h-screen w-screen bg-[#000] z-100"></div>;
};

export default Transition;
