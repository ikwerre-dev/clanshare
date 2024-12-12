import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black">
      <div className="text-white text-xl font-semibold tracking-wider">
        <Link to={"/"}>CLAN SHARE</Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <Link to={"/"} className="text-gray-300 hover:text-white">
          Home
        </Link>

        <a
          href="https://github.com/ikwerre-dev/clanshare"
          className="text-gray-300 hover:text-white"
        >
          Github
        </a>
        <a
          href="https://robinsonhonour.me"
          className="text-gray-300 hover:text-white"
        >
          My Portfolio
        </a>
        <Link
          to={"/tunnel"}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Use Tunnel
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isMobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-purple-950/90 text-center shadow-lg z-10  border-b border-gray-200/20 md:hidden">
          <Link
            to={"/"}
            className="block text-gray-300 hover:text-white py-3 border-b border-gray-200/20"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <a
            href="https://github.com/ikwerre-dev/clanshare"
            className="block text-gray-300 hover:text-white py-3 border-b border-gray-200/20"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Github
          </a>

          <a
            href="https://robinsonhonour.me"
            className="block text-gray-300 hover:text-white py-3 border-b border-gray-200/20"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Portfolio
          </a>

          <Link
            to={"/tunnel"}
            className="block bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg mx-4 mt-2 mb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Use Tunnel
          </Link>
        </div>
      )}
    </nav>
  );
}
