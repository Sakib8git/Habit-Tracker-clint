import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";
// adjust path if needed

import { AuthContext } from "../../AuthContext/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { createWithEmail, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Password validation
  const isValidPassword = (pass) => {
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    return pass.length >= 6 && hasUpper && hasLower;
  };

  // 📝 Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      toast.error(
        "Password must be at least 6 characters, with uppercase and lowercase letters."
      );
      return;
    }

    try {
      const res = await createWithEmail(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      toast.success("Account created successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // 🔵 Google login
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
    <StyledWrapper className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Create Your Account
        </h2>

        {/* Animated Name Input */}
        <div className="mb-6">
          <div className="form-control">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>
              {"Name".split("").map((char, i) => (
                <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                  {char}
                </span>
              ))}
            </label>
          </div>
        </div>

        {/* Animated Email Input */}
        <div className="mb-6">
          <div className="form-control">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>
              {"Email".split("").map((char, i) => (
                <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                  {char}
                </span>
              ))}
            </label>
          </div>
        </div>

        {/* Animated PhotoURL Input */}
        <div className="mb-6">
          <div className="form-control">
            <input
              type="text"
              required
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
            <label>
              {"Photo URL".split("").map((char, i) => (
                <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                  {char}
                </span>
              ))}
            </label>
          </div>
        </div>

        {/* Animated Password Input */}
        <div className="mb-6">
          <div className="form-control">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              {"Password".split("").map((char, i) => (
                <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                  {char}
                </span>
              ))}
            </label>
          </div>
        </div>

        {/* Register Button */}
        <button type="submit" className="btn btn-primary w-full mb-4">
          Register
        </button>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mb-6 flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </StyledWrapper>
  );
};

export default Register;

const StyledWrapper = styled.div`
  .form-control {
    position: relative;
    margin: 20px 0 40px;
    width: 100%;
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #ccc solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    color: #333;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: #3b82f6;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #999;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: #3b82f6;
    transform: translateY(-30px);
  }
`;
