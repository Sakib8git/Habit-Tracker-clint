import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import Button from "../../Custom Button/Button";

const Login = () => {
  const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Google login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-20 px-3">
      <title>Login</title>
      <div className="w-full max-w-md bg-gray-600 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login to <span className="text-green-600">Habit-Tracker</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-900 text-white pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer text-gray-400"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <Link
              to="/reset"
              className="text-green-400 hover:text-blue-400"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit">Login</Button>
        </form>

        <div className="my-6 text-center text-gray-400">OR</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2 bg-gray-700 hover:bg-gray-900 rounded-md text-white transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-300 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-400 hover:text-blue-400">
            Register
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;