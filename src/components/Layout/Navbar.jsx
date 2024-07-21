import "./Navbar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

// .nav {
//   width: 90%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   font-size: 22px;
//   padding: 20px;
//   color: #585858;
//   position: fixed;
// }

// .nav img {
//   width: 40px;
//   border-radius: 50%;
// }

const navbarStyle = "placeholder";

const Navbar = () => {
  return (
    <nav className="w-[95%] flex justify-between items-start px-4 py-3 fixed z-30 bg-white">
      <NavLink to={"/"}>
        <p className="text-3xl font-normal">Gemini</p>
      </NavLink>
      <img src={assets.user_icon} alt="" className="w-12 rounded-full" />
    </nav>
  );
};

export default Navbar;
