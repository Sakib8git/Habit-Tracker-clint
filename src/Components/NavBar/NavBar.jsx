import { Link, NavLink } from "react-router";
import styled from "styled-components";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthContext";
import { FaUserEdit } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import Loader from "../Loader/Loader";

const NavBar = () => {
  const { user, logOut, refreshNavUser, loading } = useContext(AuthContext);

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

          <Link to="/" className=" text-2xl  text-green-700 font-bold">
            HabitTracker
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
            <div className="flex gap-2 items-center">
              <StyledWrapper>
                <div className="flex gap-4">
                  
                 <Link to="/login">
                  <button >
                    <span>Login</span>
                  </button>
                </Link>
                <Link to="/register">
                  <button>
                    <span>SIgnup</span>
                  </button>
                </Link> 
                </div>
                
              </StyledWrapper>
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
                  <label
                    htmlFor="update-profile-modal"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <FaUserEdit className="text-lg text-primary" />
                    Update Profile
                  </label>
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

      {/* ✅ Modal */}
      {user && (
        <UpdateProfileModal user={user} refreshNavUser={refreshNavUser} />
      )}
    </>
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

// ✅ Modal Component
const UpdateProfileModal = ({ user, refreshNavUser }) => {
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
      refreshNavUser(updatedUser);
      toast.success("Profile updated");
      document.getElementById("update-profile-modal").checked = false;
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {/* daisy khala */}
      <input
        type="checkbox"
        id="update-profile-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Profile</h3>

          <div className="form-control mb-3">
            <label className="label">Name</label>
            <input
              type="text"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-control mb-3">
            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered"
              value={user?.email}
              disabled
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input input-bordered"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          <div className="modal-action">
            <label htmlFor="update-profile-modal" className="btn btn-outline">
              Close
            </label>
            <button onClick={handleUpdate} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
