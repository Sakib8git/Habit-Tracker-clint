import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthContext";
import "../../App.css";
import Button from "../../Custom Button/Button";

const Register = () => {
  const { createWithEmail, signInWithGoogle, updateUserProfile, logOut } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validatePassword = (pwd) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasMinLen = pwd.length >= 6;
    return {
      hasUpper,
      hasLower,
      hasMinLen,
      valid: hasUpper && hasLower && hasMinLen,
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { hasUpper, hasLower, hasMinLen, valid } = validatePassword(password);

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!valid) {
      const msgs = [];
      if (!hasUpper) msgs.push("an uppercase letter");
      if (!hasLower) msgs.push("a lowercase letter");
      if (!hasMinLen) msgs.push("at least 6 characters");
      toast.error(`Password must contain ${msgs.join(", ")}`);
      return;
    }

    if (typeof createWithEmail !== "function") {
      console.error(
        "createWithEmail is not available on AuthContext",
        createWithEmail
      );
      toast.error("Registration service not available");
      return;
    }

    setSubmitting(true);
    try {
      const res = await createWithEmail(email, password);

      // ✅ Show success toast
      toast.success("✅ Registration successful! Please login to continue.");

      if (typeof updateUserProfile === "function") {
        try {
          await updateUserProfile({ displayName: name, photoURL });
        } catch (updErr) {
          console.error("update profile error:", updErr);
          toast.info("Registered but profile update failed");
        }
      }

      // ✅ Force logout so navbar doesn't show user until manual login
      if (typeof logOut === "function") {
        await logOut();
      }

      navigate("/login");
    } catch (err) {
      console.error("register error:", err);
      const code = err?.code || "";
      if (code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please login.");
      } else if (code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.");
      } else if (code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else {
        toast.error(err?.message || "Registration failed. Try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    if (typeof signInWithGoogle !== "function") {
      toast.error("Google sign-in not available");
      return;
    }
    try {
      await signInWithGoogle();
      toast.success("Google signup successful");
      navigate("/");
    } catch (err) {
      console.error("google signup error:", err);
      toast.error(err?.message || "Google signup failed");
    }
  };

  return (
    <div className="page-wrapper">
      <form className="register-card" onSubmit={handleRegister}>
        <h2>Register to HabitTracker</h2>

        <div className="field">
          <input
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>
            {"Username".split("").map((c, i) => (
              <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                {c}
              </span>
            ))}
          </label>
        </div>

        <div className="field">
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            {"Email".split("").map((c, i) => (
              <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                {c}
              </span>
            ))}
          </label>
        </div>

        <div className="field">
          <input
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            {"Password".split("").map((c, i) => (
              <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                {c}
              </span>
            ))}
          </label>
        </div>

        <div className="field">
          <input
            name="photoURL"
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <label>
            {"Photo URL".split("").map((c, i) => (
              <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                {c}
              </span>
            ))}
          </label>
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? "Registering..." : "Register"}
        </Button>

        <button type="button" className="outline" onClick={handleGoogle}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="g-icon"
          />
          Continue with Google
        </button>

        <p className="muted">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
