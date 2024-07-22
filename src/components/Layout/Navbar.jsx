import "./Navbar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <NavLink to={"/"}>
        <img src={assets.orbitLogoRed} alt="" className="h-14 w-auto" />
      </NavLink>
      <img
        src={assets.user_icon}
        alt=""
        className="h-14 aspect-square object-cover rounded-full"
      />
    </nav>
  );
};

export default Navbar;
