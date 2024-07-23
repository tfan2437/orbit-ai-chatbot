import "./Navbar.css";
import { assets, profileImage } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { logout } from "../../config/firebase";

const Navbar = () => {
  const { currentUser } = useContext(Context);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="nav">
      <NavLink to={"/"}>
        <img src={assets.orbitLogoRed} alt="" className="h-12 md:h-14 w-auto" />
      </NavLink>

      <div className="relative">
        <img
          src={currentUser?.profileImage || profileImage}
          alt=""
          className="h-12 md:h-14 aspect-square object-cover rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-auto pl-4 bg-white border-[1.5px] border-[#eeeeee] rounded-md shadow-lg z-30">
            <div className="flex flex-col items-end py-2">
              <p className="block px-4 py-1 text-[#999999] overflow-hidden text-nowrap">
                {currentUser.name}
              </p>
              <p className="block px-4 py-1 text-[#999999] overflow-hidden text-nowrap">
                {currentUser.email}
              </p>
              <p className="block px-4 py-1 text-[#999999] overflow-hidden text-nowrap">
                {currentUser.authProvider}
              </p>
              <p
                className="block px-4 py-1 text-[#000] hover:text-[#ff0000] font-bold cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </p>
            </div>
          </div>
        )}
        <div
          className={`fixed inset-0 h-full w-full z-10 ${
            dropdownOpen ? "block" : "hidden"
          }`}
          onClick={toggleDropdown}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
