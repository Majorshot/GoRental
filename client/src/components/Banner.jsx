import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
// eslint-disable-next-line
import { motion } from "motion/react";

const Banner = () => {
  const navigate = useNavigate();
  const { isOwner, changeRole, user, setShowLogin } = useAppContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
    >
      <div className="text-white">
        <h2 className="text-3xl font-medium">Own a Car in Kerala?</h2>
        <p className="mt-2">
          Earn extra income by listing your car on GoRental.
        </p>
        <p className="max-w-130">
          We handle insurance, KYC, and secure payments—so you can rent out your
          car with confidence, anywhere in Kerala.
        </p>

        <motion.button
          onClick={() => {
            if (!user) {
              if (typeof window !== "undefined" && window.toast) {
                window.toast.error("Please login");
              } else {
                // fallback if toast is not global
                import("react-hot-toast").then(({ default: toast }) =>
                  toast.error("Please login")
                );
              }
              if (setShowLogin) setShowLogin(true);
              return;
            }
            isOwner ? navigate("/owner") : changeRole();
          }}
          className="px-4 py-1.5 mt-5 rounded-lg bg-white text-primary font-semibold border border-primary hover:bg-primary hover:text-white transition-colors w-full sm:w-auto whitespace-nowrap shadow"
        >
          {isOwner ? "Dashboard" : "List your car"}
        </motion.button>
      </div>

      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        src={assets.banner_car_image}
        alt="car"
        className="max-h-45 mt-10"
      />
    </motion.div>
  );
};

export default Banner;
