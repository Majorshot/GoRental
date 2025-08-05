import React from 'react';
import { Eye, EyeOff, Mail, Lock, User, X } from 'lucide-react';

const Login = ({ setShowLogin, axios, setToken, navigate }) => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const handleClose = () => {
    setShowLogin(false);
  };

  // Handle clicking outside the modal to close it
  const handleBackdropClick = (e) => {
    // If the element that was clicked is the same as the element the event listener is on
    if (e.target === e.currentTarget) {
      setShowLogin(false);
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30 animate-fade-in"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        {/* Glass Card */}
        <div className="bg-white/80 backdrop-blur-lg border border-blue-200/50 rounded-2xl shadow-2xl p-8 shadow-blue-500/10">
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-700 hover:text-gray-900 transition-all duration-200 hover:scale-110 hover:rotate-90 z-10 rounded-full hover:bg-gray-100/50"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <User className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {state === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-600">
              {state === "login" ? "Sign in to your account" : "Join us today"}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {state === "register" && (
              <div className="relative animate-slide-down">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" size={18} />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Full Name"
                    className="w-full pl-11 pr-4 py-3 bg-white/90 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm shadow-sm"
                    type="text"
                    required
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" size={18} />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email Address"
                className="w-full pl-11 pr-4 py-3 bg-white/90 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm shadow-sm"
                type="email"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" size={18} />
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Toggle State */}
          <div className="text-center mt-6">
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
          </div>

          {/* Submit Button */}
          <button
            onClick={onSubmitHandler}
            disabled={isLoading}
            className="w-full mt-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{state === "register" ? "Create Account" : "Sign In"}</span>
            )}
          </button>

          {/* Decorative Elements */}
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-15 blur-xl"></div>
          <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-15 blur-xl"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0;
            height: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            height: auto;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;