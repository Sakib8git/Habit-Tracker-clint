import { Link, NavLink } from "react-router";

const NavBar = () => {
  const user = null; // 🔒 placeholder for future Firebase logic
  const signOutUser = () => {}; // 🔒 placeholder function

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-10">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold text-primary">
          HabitTracker
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-6 text-sm font-medium">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/add-habit">Add Habit</NavLink>
          </li>
          <li>
            <NavLink to="/my-habits">My Habits</NavLink>
          </li>
          <li>
            <NavLink to="/browse">Browse Public Habits</NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown md:hidden navbar-end">
        <button tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/add-habit">Add Habit</NavLink>
          </li>
          <li>
            <NavLink to="/my-habits">My Habits</NavLink>
          </li>
          <li>
            <NavLink to="/browse">Browse Public Habits</NavLink>
          </li>
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className="navbar-end">
        {!user ? (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary">
              Register
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 rounded-full border border-gray-300">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/2FsfXqM/default-avatar.png"
                  }
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="text-sm font-bold">{user.displayName}</li>
              <li className="text-xs mb-2">{user.email}</li>
              <li>
                <button
                  onClick={signOutUser}
                  className="btn btn-sm btn-error text-white"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
