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
      <Link
        to="/"
        className="flex items-center gap-2 select-none"
        onClick={() => {
          // Always scroll to top with smooth animation when clicking Home/logo
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
        }}
      >
        <span className="text-2xl font-extrabold text-primary tracking-tight font-[Outfit]">
          GoRental
        </span>
      </Link>

      {/* Mobile Menu Overlay */}
      <div
        className={`max-sm:fixed max-sm:inset-0 max-sm:bg-gradient-to-br max-sm:from-primary/5 max-sm:via-white max-sm:to-primary/10 max-sm:backdrop-blur-sm flex flex-col sm:flex-row items-center justify-center sm:items-center gap-8 sm:gap-8 max-sm:p-8 transition-all duration-500 z-40 bg-white ${
          open ? "max-sm:translate-x-0 max-sm:opacity-100" : "max-sm:translate-x-full max-sm:opacity-0"
        }`}
      >
        {/* Mobile Menu Content Container */}
        <div className="max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:gap-12 max-sm:w-full max-sm:max-w-sm sm:contents">
          
          {/* Navigation Links */}
          <nav className="flex flex-col sm:flex-row gap-6 sm:gap-6 items-center sm:items-center w-full max-sm:w-auto">
            {menuLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: open ? 1 : 0, y: open ? 0 : 20 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="max-sm:w-full"
              >
                <Link
                  to={link.path}
                  className="block px-6 py-3 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-lg 
                           bg-gradient-to-r from-primary/10 to-primary/5 sm:bg-transparent
                           hover:from-primary hover:to-primary-dull sm:hover:bg-primary/10 
                           hover:text-white sm:hover:text-primary 
                           transition-all duration-300 font-semibold text-center sm:text-left
                           text-lg sm:text-base shadow-lg sm:shadow-none
                           border border-primary/20 sm:border-none
                           transform hover:scale-105 sm:hover:scale-100"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: open ? 1 : 0, y: open ? 0 : 30 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto max-sm:mt-4"
          >
            <button
              onClick={async () => {
                if (!user) {
                  toast.error("Please login");
                  if (setShowLogin) setShowLogin(true);
                  return;
                }
                if (isOwner) {
                  navigate("/owner");
                  setTimeout(
                    () => window.scrollTo({ top: 0, behavior: "smooth" }),
                    0
                  );
                } else {
                  await changeRole();
                  setTimeout(
                    () => window.scrollTo({ top: 0, behavior: "smooth" }),
                    0
                  );
                }
                setOpen(false);
              }}
              className="px-8 py-4 sm:px-4 sm:py-1.5 rounded-2xl sm:rounded-lg 
                       bg-gradient-to-r from-primary to-primary-dull 
                       text-white font-bold sm:font-semibold text-lg sm:text-base
                       hover:from-primary-dull hover:to-primary 
                       transition-all duration-300 w-full sm:w-auto 
                       shadow-xl sm:shadow-none hover:shadow-2xl sm:hover:shadow-none
                       transform hover:scale-105 sm:hover:scale-100
                       border-2 border-primary/30"
            >
              {isOwner ? "Dashboard" : "List cars"}
            </button>
            
            <button
              onClick={() => {
                user ? logout() : setShowLogin(true);
                setOpen(false);
              }}
              className="px-8 py-4 sm:px-4 sm:py-1.5 rounded-2xl sm:rounded-lg 
                       border-2 border-primary bg-transparent sm:bg-transparent
                       text-primary font-bold sm:font-semibold text-lg sm:text-base
                       hover:bg-primary hover:text-white 
                       transition-all duration-300 w-full sm:w-auto 
                       shadow-lg sm:shadow-none hover:shadow-xl sm:hover:shadow-none
                       transform hover:scale-105 sm:hover:scale-100"
            >
              {user ? "Logout" : "Login"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="sm:hidden cursor-pointer ml-2 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300 border border-primary/20"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <motion.img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="w-6 h-6"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>
    </motion.div>
  );
};

export default Navbar;
