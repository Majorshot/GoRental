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
    <>
      {/* Main Navbar */}
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

        {/* Desktop Menu */}
        <div className="hidden sm:flex flex-row items-center gap-8">
          {/* Navigation Links */}
          <nav className="flex flex-row gap-6 items-center">
            {menuLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="px-3 py-1.5 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex flex-row items-center gap-6">
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
              }}
              className="px-4 py-1.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dull transition-colors whitespace-nowrap"
            >
              {isOwner ? "Dashboard" : "List cars"}
            </button>
            
            <button
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
              className="px-4 py-1.5 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden cursor-pointer ml-2 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300 border border-primary/20 relative z-60"
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

      {/* Mobile Menu Overlay */}
      <div
        className={`sm:hidden fixed inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10 backdrop-blur-sm z-40 transition-all duration-500 ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* Mobile Menu Content - starts below navbar */}
        <div className="flex flex-col items-center justify-center h-full pt-20 pb-8 px-8">
          <div className="flex flex-col items-center gap-12 w-full max-w-sm">
            
            {/* Navigation Links */}
            <nav className="flex flex-col gap-6 items-center w-full">
              {menuLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: open ? 1 : 0, y: open ? 0 : 20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="w-full"
                >
                  <Link
                    to={link.path}
                    className="block px-6 py-3 rounded-xl 
                             bg-gradient-to-r from-primary/10 to-primary/5
                             hover:from-primary hover:to-primary-dull 
                             hover:text-white 
                             transition-all duration-300 font-semibold text-center
                             text-lg shadow-lg
                             border border-primary/20
                             transform hover:scale-105"
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
              className="flex flex-col items-center gap-4 w-full"
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
                className="px-8 py-4 rounded-2xl 
                         bg-gradient-to-r from-primary to-primary-dull 
                         text-white font-bold text-lg
                         hover:from-primary-dull hover:to-primary 
                         transition-all duration-300 w-full 
                         shadow-xl hover:shadow-2xl
                         transform hover:scale-105
                         border-2 border-primary/30"
              >
                {isOwner ? "Dashboard" : "List cars"}
              </button>
              
              <button
                onClick={() => {
                  user ? logout() : setShowLogin(true);
                  setOpen(false);
                }}
                className="px-8 py-4 rounded-2xl 
                         border-2 border-primary bg-transparent
                         text-primary font-bold text-lg
                         hover:bg-primary hover:text-white 
                         transition-all duration-300 w-full 
                         shadow-lg hover:shadow-xl
                         transform hover:scale-105"
              >
                {user ? "Logout" : "Login"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
