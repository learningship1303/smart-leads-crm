import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [role, setRole] =
    useState("user");

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

  const registerUser = async () => {

    try {

      // EMPTY VALIDATION
      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;
      }

      // NAME VALIDATION
      if (name.length < 3) {

        toast.error(
          "Name must be at least 3 characters"
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

      // PASSWORD LENGTH
      if (password.length < 6) {

        toast.error(
          "Password must be at least 6 characters"
        );

        return;
      }

      // CONFIRM PASSWORD
      if (
        password !==
        confirmPassword
      ) {

        toast.error(
          "Passwords do not match"
        );

        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
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
        "Registration successful"
      );

      // REDIRECT
      navigate("/dashboard");

    } catch (error: any) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 px-4">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Register to continue
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

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
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-purple-500"
        >

          <option value="user">
            User
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        {/* BUTTON */}
        <button
          onClick={registerUser}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:opacity-50"
        >

          {loading
            ? "Creating Account..."
            : "Register"}

        </button>

        {/* LOGIN LINK */}
        <p className="text-center mt-5 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;