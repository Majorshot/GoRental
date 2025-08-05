import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
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
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-5 items-center p-8 w-80 sm:w-[360px] rounded-xl shadow-2xl bg-white border border-gray-200"
      >
        <FaUserCircle className="text-5xl text-primary mb-2" />
        <AnimatePresence mode="wait">
          {state === "register" ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <motion.p className="text-xl font-semibold text-center mb-0">
                Create Account
              </motion.p>
              <p className="text-sm text-gray-500 mb-2">Join us today</p>
              <div className="w-full">
                <label className="text-sm">Full Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="John Doe"
                  className="input-style"
                  type="text"
                  required
                />
              </div>
              <div className="w-full">
                <label className="text-sm">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="you@example.com"
                  className="input-style"
                  type="email"
                  required
                />
              </div>
              <div className="w-full">
                <label className="text-sm">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  className="input-style"
                  type="password"
                  required
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Already have an account?{" "}
                <span
                  onClick={() => setState("login")}
                  className="text-primary cursor-pointer font-medium"
                >
                  Sign In
                </span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md mt-2"
              >
                Create Account
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <motion.p className="text-xl font-semibold text-center mb-0">
                Login
              </motion.p>
              <p className="text-sm text-gray-500 mb-2">Welcome back</p>
              <div className="w-full">
                <label className="text-sm">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="you@example.com"
                  className="input-style"
                  type="email"
                  required
                />
              </div>
              <div className="w-full">
                <label className="text-sm">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  className="input-style"
                  type="password"
                  required
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                New here?{" "}
                <span
                  onClick={() => setState("register")}
                  className="text-primary cursor-pointer font-medium"
                >
                  Create Account
                </span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md mt-2"
              >
                Login
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
};

export default Login;
