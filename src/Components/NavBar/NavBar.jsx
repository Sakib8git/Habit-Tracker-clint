import { Link, NavLink } from "react-router";
import styled from "styled-components";

const NavBar = () => {
  const user = null; // 🔒 placeholder for future Firebase logic
  const signOutUser = () => {}; // 🔒 placeholder function

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Start: Logo + Mobile Dropdown */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
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
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/add-habit">Add Habit</NavLink></li>
            <li><NavLink to="/my-habits">My Habits</NavLink></li>
            <li><NavLink to="/browse">Browse Public Habits</NavLink></li>
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl text-primary font-bold">
          HabitTracker
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 text-sm font-medium">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/add-habit">Add Habit</NavLink></li>
          <li><NavLink to="/my-habits">My Habits</NavLink></li>
          <li><NavLink to="/browse">Browse Public Habits</NavLink></li>
        </ul>
      </div>

      {/* End: Auth Buttons or Avatar */}
      <div className="navbar-end">
        {!user ? (
          <div className="flex gap-2 items-center">
            <StyledWrapper>
              <Link to="/login">
                <button><span>Login</span></button>
              </Link>
            </StyledWrapper>
            <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full border border-gray-300">
                <img
                  src={user.photoURL || "https://i.ibb.co/2FsfXqM/default-avatar.png"}
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
                <button onClick={signOutUser} className="btn btn-sm btn-error text-white">
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

// ✅ Styled login button wrapper
const StyledWrapper = styled.div`
  button {
    outline: none;
    cursor: pointer;
    border: none;
    padding: 0.5rem 1.5rem;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    position: relative;
    display: inline-block;
    letter-spacing: 0.05rem;
    font-weight: 700;
    font-size: 15px;
    border-radius: 500px;
    overflow: hidden;
    background: #66ff66;
    color: ghostwhite;
  }

  button span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
  }

  button:hover span {
    color: black;
  }

  button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -10%;
    width: 120%;
    height: 100%;
    background: #000;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
    z-index: 0;
  }

  button:hover::before {
    transform: translate3d(100%, 0, 0);
  }
`;