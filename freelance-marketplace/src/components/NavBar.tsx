"use client";

import { useEffect, useState } from "react";
import { CloudCog, Menu, X } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const checkUserStatus = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserRole(user);
      setIsLoggedIn(true);
    } else {
      setUserRole(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUserStatus();

    const handleUserLoggedIn = () => {
      checkUserStatus();
    };

    window.addEventListener("userLoggedIn", handleUserLoggedIn);
    return () => {
      window.removeEventListener("userLoggedIn", handleUserLoggedIn);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const renderLinks = () => {
    return (
      <>
        <Link href="/about" className="text-gray-600 hover:text-gray-900">
          About Us
        </Link>
        {isLoggedIn ? (
          userRole === "client" ? (
            <>
              <Link
                href="/Findfreelancer"
                className="text-gray-600 hover:text-gray-900"
              >
                Find a Freelancer
              </Link>
              <Link
                href="/proposals"
                className="text-gray-600 hover:text-gray-900"
              >
                Proposals
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/findClient"
                className="text-gray-600 hover:text-gray-900"
              >
                Find a Client
              </Link>

              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          )
        ) : (
          <>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </>
        )}
      </>
    );
  };

  return (
    <nav className="container mx-auto p-4 flex items-center justify-between relative z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
        <span className="font-bold text-xl">Freebird</span>
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-6">{renderLinks()}</div>

      {/* Mobile  */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-gray-600 hover:text-gray-900"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center gap-4 p-4 z-40">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
          {renderLinks()}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
