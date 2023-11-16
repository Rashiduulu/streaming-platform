import Logo from "../assets/images/netflix-logo.png";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="absolute m-auto inset-0 z-50">
      <div className="flex items-center justify-between container m-auto px-[10px] lg:px-[20px] 2xl:px-[150px]">
        <Link to="/signup">
          <img
            className="md:w-[220px] md:h-[140px] w-[120px] h-[100px] object-contain mr-10"
            src={Logo}
            alt="img"
          />
        </Link>

        <Link to="/login">
          <button
            type="button"
            className="py-2 px-3 rounded-lg text-white bg-red-600 text-[14px] md:text-[18px] outline-none"
          >
            Sign In
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
