import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // EMAIL VALIDATION
  const validateEmail = (
    email: string
  ) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  };

  const loginUser = async () => {

    try {

      // EMPTY VALIDATION
      if (!email || !password) {

        toast.error(
          "Please fill all fields"
        );

        return;
      }

      // EMAIL VALIDATION
      if (!validateEmail(email)) {

        toast.error(
          "Please enter valid email"
        );

        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      toast.success(
        "Login successful"
      );

      // REDIRECT
      navigate("/dashboard");

    } catch (error: any) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 px-4">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* PASSWORD */}
        <div className="relative mb-6">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-3 top-3 text-sm text-blue-600 font-semibold"
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>

        </div>

        {/* BUTTON */}
        <button
          onClick={loginUser}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

        {/* REGISTER LINK */}
        <p className="text-center mt-5 text-gray-600">

          New user?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;