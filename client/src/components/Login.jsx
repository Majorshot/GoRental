import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const formVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.6
      }
    },
    exit: { 
      opacity: 0, 
      y: -40, 
      scale: 0.95,
      filter: "blur(10px)",
      transition: { duration: 0.3 }
    }
  };



  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="login-modal-bg"
        onClick={() => setShowLogin(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.form
          onSubmit={onSubmitHandler}
          onClick={(e) => e.stopPropagation()}
          variants={formVariants}
          className="relative flex flex-col gap-6 items-center p-8 w-full max-w-md mx-4 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-xl border border-gray-200/50"
        >
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl -z-10" />
          
          {/* Header Icon with animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 300,
              delay: 0.2 
            }}
            className="relative"
          >
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <FiUser className="text-2xl text-white" />
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{ zIndex: -1 }}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {state === "register" ? (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center space-y-6"
              >
                {/* Header */}
                <div className="text-center space-y-2">
                  <motion.h2 
                    className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                    layoutId="title"
                  >
                    Create Account
                  </motion.h2>
                  <motion.p 
                    className="text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Start your journey with us
                  </motion.p>
                </div>

                {/* Form Fields */}
                <div className="w-full space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                        type="text"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                        type="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Create a password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                        type={showPassword ? "text" : "password"}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Switch to Login */}
                <motion.p 
                  className="text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Already have an account?{" "}
                  <motion.span
                    onClick={() => setState("login")}
                    className="text-blue-600 cursor-pointer font-medium hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.span>
                </motion.p>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isLoading}
                  className="relative w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                    />
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center space-y-6"
              >
                {/* Header */}
                <div className="text-center space-y-2">
                  <motion.h2 
                    className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                    layoutId="title"
                  >
                    Welcome Back
                  </motion.h2>
                  <motion.p 
                    className="text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Sign in to continue your journey
                  </motion.p>
                </div>

                {/* Form Fields */}
                <div className="w-full space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                        type="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                        type={showPassword ? "text" : "password"}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Switch to Register */}
                <motion.p 
                  className="text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  New here?{" "}
                  <motion.span
                    onClick={() => setState("register")}
                    className="text-blue-600 cursor-pointer font-medium hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create Account
                  </motion.span>
                </motion.p>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isLoading}
                  className="relative w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                    />
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;