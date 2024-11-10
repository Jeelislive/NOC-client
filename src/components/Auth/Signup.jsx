import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducers/auth";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading("Please Wait...");
    const userInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role, // Include role in the signup data
    };
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:4001/user/new",
        userInfo,
        config
      );
      dispatch(userExist(data.user));
      toast.success(data.message, { id: toastId });
      console.log(data.user);
      if (data.user) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
        toast.error("Error: " + error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="font-bold text-2xl text-center mb-4">Signup</h3>

          {/* Username Input */}
          <div className="mt-4 space-y-2">
            <label htmlFor="username" className="block font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Email Input */}
          <div className="mt-4 space-y-2">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Password Input */}
          <div className="mt-4 space-y-2">
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Role Selector */}
          <div className="mt-4 space-y-2">
            <label htmlFor="role" className="block font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
              {...register("role", { required: true })}
            >
              <option value="">Select Role</option>
              {/* <option value="inspector">Inspector</option> */}
              <option value="applicant">Applicant</option>
            </select>
            {errors.role && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Signup Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#D94E3B] text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Signup"}
            </button>
          </div>

          {/* Login Link */}
          <div className="flex justify-center mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
