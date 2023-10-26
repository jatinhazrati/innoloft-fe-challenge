import { AiOutlineBell, AiOutlineDown } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import user_avatar from "../../assets/user_avatar.svg";
import { useAppSelector } from "../../redux/hooks";

export default function NavBar() {
  const { appConfiguration } = useAppSelector((state) => state.configuration);
  const mainColor =
    appConfiguration.mainColor || import.meta.env.VITE_REACT_APP_MAIN_COLOR;
  const logo =
    appConfiguration.logo || import.meta.env.VITE_REACT_APP_HAS_USER_SECTION;

  return (
    <nav className="flex p-5" style={{ backgroundColor: mainColor }}>
      <div className="flex items-center mx-auto w-full max-w-[1280px]">
        <div className="w-[240px]">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ filter: "brightness(0) invert(1)" }}
              className="w-[100px]"
            />
          </Link>
        </div>
        <div className="flex flex-1 justify-end md:justify-between">
          <div className="ml-12 hidden md:flex w-[400px] rounded-[6px] bg-white px-2 py-1/2 justify-between">
            <input
              placeholder="Enter interests, keywords, company name, etc."
              className="h-[30px] flex-1 text-[14px] text-gray-900 border-none outline-none"
            />
            <FaSearch className="mt-1.5" color="gray" />
          </div>
          <div className="hidden md:flex items-center gap-3 text-white">
            <BsFillChatDotsFill color="white" />
            <div className="hidden md:flex items-center gap-1">
              <p>EN</p>
              <AiOutlineDown color="white" />
            </div>
            <AiOutlineBell size={22} color="white" />
            <div className="hidden md:flex items-center gap-1">
              <img
                className="h-5 w-5 rounded-full"
                src={user_avatar}
                alt="User Profile Pic"
              />
              <AiOutlineDown color="white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
