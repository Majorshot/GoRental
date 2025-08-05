import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const { user } = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 select-none">
          <span className="text-xl font-bold text-primary tracking-wide font-[Outfit]">
            GoRental
          </span>
        </Link>
        <Link
          to="/"
          className="px-3 py-1.5 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors text-sm"
        >
          Home
        </Link>
      </div>
      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;
