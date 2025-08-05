import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, X } from 'lucide-react';

// Mock context hook for demo
const useAppContext = () => ({
  setShowLogin: (show) => {
    if (!show) {
      alert('Login modal would close now');
    }
  },
  axios: { post: async () => ({ data: { success: true, token: 'mock-token' } }) },
  setToken: () => {},
  navigate: () => {}
});

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const closeModal = () => {
    setShowLogin(false);
  };

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
      if (data.success) {
        navigate('/');
        setToken(data.token);
        // localStorage.setItem('token', data.token); // Removed for Claude.ai compatibility
        setShowLogin(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const formVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md"
      >
        {/* Glass Card */}
        <div className="bg-white/80 backdrop-blur-lg border border-blue-200/50 rounded-2xl shadow-2xl p-8 shadow-blue-500/10">
          {/* Close Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 text-blue-600/70 hover:text-blue-600 transition-colors"
          >
            <X size={20} />
          </motion.button>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <User className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {state === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-600">
              {state === "login" ? "Sign in to your account" : "Join us today"}
            </p>
          </motion.div>

          {/* Form Fields */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {state === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={18} />
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Full Name"
                      className="w-full pl-11 pr-4 py-3 bg-white/90 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm shadow-sm"
                      type="text"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants} className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={18} />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email Address"
                className="w-full pl-11 pr-4 py-3 bg-white/90 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm shadow-sm"
                type="email"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={18} />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                className="w-full pl-11 pr-12 py-3 bg-white/90 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm shadow-sm"
                type={showPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </motion.div>
          </div>

          {/* Toggle State */}
          <motion.div variants={itemVariants} className="text-center mt-6">
            <p className="text-gray-600">
              {state === "register" ? "Already have an account? " : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setState(state === "login" ? "register" : "login")}
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                {state === "register" ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            disabled={isLoading}
            className="w-full mt-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <span>{state === "register" ? "Create Account" : "Sign In"}</span>
            )}
          </motion.button>

          {/* Decorative Elements */}
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-15 blur-xl"></div>
          <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-15 blur-xl"></div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Login;