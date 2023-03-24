import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../assets/icons/menu.svg';
import DropdownMenu from './DropdownMenu';

const NavBar = () => {
  const [expandMenu, setExpandMenu] = useState(false);
  // Turns off scroll when showing menu
  document.body.style.overflow = expandMenu ? 'hidden' : 'auto';

  return (
    <header className="relative mb-20">
      <nav className="flex border-b border-black p-4 justify-between">
        <Link to="/">
          <h1 onClick={() => setExpandMenu(false)} className="text-3xl">
            Lunch<span className="font-thin">buddy</span>
          </h1>
        </Link>
        <ul className="flex items-center justify-center gap-5">
          <li>
            <Link to={'/login'}>
              <div className="py-2 px-4 w-24 rounded border border-black text-lg text-red-400 hidden sm:block">
                Login
              </div>
            </Link>
          </li>

          <li>
            <Link to={'/register'}>
              <div className="py-2 px-4 w-24 rounded bg-gradient-to-r from-orange-300 to-red-400 text-white text-lg hidden sm:block">
                Register
              </div>
            </Link>
          </li>

          <li className="h-8">
            <button>
              <img
                className="w-8"
                src={menuIcon}
                alt="Three lined menu icon button"
                onClick={() => setExpandMenu((prev) => !prev)}
              />
            </button>
          </li>
        </ul>
      </nav>
      {expandMenu && (
        <DropdownMenu expandMenu={expandMenu} setExpandMenu={setExpandMenu} />
      )}
    </header>
  );
};

export default NavBar;
