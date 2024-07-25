import "./Navbar.css";
import { assets, profileImage } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { logout } from "../../config/firebase";

const Navbar = () => {
  const {
    currentUser,
    showMobilMenu,
    setShowMobilMenu,
    expanded,
    setExpanded,
  } = useContext(Context);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // padding: 10px 30px 0 20px;

  const handleShowMobileMenu = () => {
    setExpanded((prev) => !prev);
    setShowMobilMenu((prev) => !prev);
  };

  return (
    <nav className="flex justify-between items-center h-[10vh] px-[20px] py-[10px]">
      <div className="flex items-center">
        <img
          src={assets.menu}
          alt=""
          className="w-5 pb-[6px] mr-3 block sm:hidden opacity-30"
          onClick={() => handleShowMobileMenu()}
        />
        <NavLink to={"/"}>
          <img
            src={assets.orbitLogoRed}
            alt=""
            className="h-8 sm:h-12 md:h-14 w-auto"
          />
        </NavLink>
      </div>

      {!showMobilMenu && (
        <div className="relative">
          <img
            src={currentUser?.profileImage || profileImage}
            alt=""
            className="h-7 sm:h-12 md:h-14 aspect-square object-cover rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-auto pl-4 bg-white border-[1.5px] border-[#eeeeee] rounded-md shadow-lg z-30">
              <div className="flex flex-col items-end py-2">
                <p className="block px-4 py-1 text-[#999999] overflow-hidden text-nowrap text-sm sm:text-md">
                  {currentUser.name}
                </p>
                <p className="block px-4 py-1 text-[#999999] overflow-hidden text-nowrap text-sm sm:text-md">
                  {currentUser.email}
                </p>
                <p className="block px-4 py-1 text-[#999999] overflow-hidden text-nowrap text-sm sm:text-md">
                  {currentUser.authProvider}
                </p>
                <p
                  className="block px-4 py-1 text-[#000] hover:text-[#ff0000] font-bold cursor-pointer text-sm sm:text-md"
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
      )}
    </nav>
  );
};

export default Navbar;
