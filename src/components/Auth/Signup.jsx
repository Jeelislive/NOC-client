import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducers/auth";
import { server } from "../../../config";
import { useAuth } from "../../redux/auth";


function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {storetokeninLS} = useAuth();
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
      role: "applicant", // Explicitly set role to applicant
    };
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/user/new`,
        userInfo,
        config
      );
      dispatch(userExist(data.user));
      storetokeninLS(data.token);
      toast.success(data.message, { id: toastId });
      if (data.user) {
        navigate("/login");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:shadow-2xl">
        <div className="p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400">Join us and start your journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative">
                {/* Icon can be added here if desired, e.g., FiUser */}
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[#D94E3B] focus:border-transparent transition-all"
                  {...register("username", { required: "Full name is required" })}
                />
              </div>
              {errors.username && (
                <span className="text-sm text-red-500">{errors.username.message}</span>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                {/* Icon can be added here, e.g., FiMail */}
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[#D94E3B] focus:border-transparent transition-all"
                  {...register("email", { required: "Valid email is required" })}
                />
              </div>
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                {/* Icon can be added here, e.g., FiLock */}
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[#D94E3B] focus:border-transparent transition-all"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password.message}</span>
              )}
            </div>

            {/* Role Selector - Hidden as role is fixed to applicant */}
            <input type="hidden" value="applicant" {...register("role")} />

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className="w-full py-3 px-6 bg-[#D94E3B] hover:bg-[#c24534] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#D94E3B] hover:text-[#c24534] font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
