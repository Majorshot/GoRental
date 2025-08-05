import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
// eslint-disable-next-line
import { motion } from "motion/react";
const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();
  const location = useLocation();
  // Always scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const changeRole = async () => {
    if (!user) {
      toast.error("Please login");
      return;
    }
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-10 lg:px-20 xl:px-32 py-3 bg-white shadow-lg rounded-b-2xl border-b border-borderColor transition-all"
    >
      <Link to="/" className="flex items-center gap-2 select-none">
        <span className="text-2xl font-extrabold text-primary tracking-tight font-[Outfit]">
          GoRental
        </span>
      </Link>
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 bg-white ${
          open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"
        }`}
      >
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center w-full">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="px-3 py-1.5 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors font-medium"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        {/* BUTTONS: Always inline */}
        <div className="flex flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="px-4 py-1.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dull transition-colors w-full sm:w-auto whitespace-nowrap"
          >
            {isOwner ? "Dashboard" : "List cars"}
          </button>
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="px-4 py-1.5 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors w-full sm:w-auto whitespace-nowrap"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
      <button
        className="sm:hidden cursor-pointer ml-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="w-6 h-6"
        />
      </button>
    </motion.div>
  );
};
export default Navbar;
