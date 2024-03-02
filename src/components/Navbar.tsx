import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-carbonx-green">
      <div className=" mx-auto px-8">
        <div className="flex justify-between items-center py-8">
          <Link to="/" className="text-black text-3xl font-semibold ">
            Carbon<span className="text-carbonx-khaki">X</span>
          </Link>
          <div className="flex items-center space-x-4 text-xl hover:text-carbonx-khaki">
            <Link
              to="/profile"
              className="text-black font-semibold hover:text-carbonx-khaki transition-all"
            >
              Profile
            </Link>
            <Link
              to="/contact"
              className="text-black font-semibold hover:text-carbonx-khaki transition-all"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="text-black font-semibold hover:text-carbonx-khaki transition-all"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="hidden mobile-menu">
        <ul className="">
          <li className="active">
            <Link
              to="/profile"
              className="block text-sm px-2 py-4 text-white bg-green-700 font-semibold"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block text-sm px-2 py-4 hover:bg-green-700 transition duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block text-sm px-2 py-4 hover:bg-green-700 transition duration-300"
            >
              Log In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
