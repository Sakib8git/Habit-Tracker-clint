import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthContext";
import { FaUserEdit } from "react-icons/fa";
import Loader from "../Loader/Loader";
import "../../App.css";

const NavBar = () => {
  const { user, logOut, loading   } = useContext(AuthContext);

  const signOutUser = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="navbar rounded-2xl bg-sky-100 shadow-lg mb-2 px-4">
        {/* Start: Logo + Mobile Dropdown */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden z-50">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/add-habit">Add Habit</NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-habits">My Habits</NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/browse">Browse Public Habits</NavLink>
              </li>
            </ul>
          </div>

          <Link to="/" className="text-2xl text-green-700 font-bold">
            Habit-Tracker
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-sm font-medium">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/add-habit">Add Habit</NavLink>
                </li>
                <li>
                  <NavLink to="/my-habits">My Habits</NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/browse">Browse Public Habits</NavLink>
            </li>
          </ul>
        </div>

        {/* End: Auth Buttons or Avatar */}
        <div className="navbar-end z-50">
          {loading ? (
            <Loader />
          ) : !user ? (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="login-button">
                  <span>Login</span>
                </button>
              </Link>
              <Link to="/register">
                <button className="login-button">
                  <span>Signup</span>
                </button>
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
                  <Link
                    to="/update-profile"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <FaUserEdit className="text-lg text-primary" />
                    Update Profile
                  </Link>
                </li>
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
    </>
  );
};

export default NavBar;
