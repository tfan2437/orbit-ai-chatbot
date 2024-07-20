import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <nav className="nav">
      <p>Gemini</p>
      <img src={assets.user_icon} alt="" />
    </nav>
  );
};

export default Navbar;
