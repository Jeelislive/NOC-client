import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducers/auth";
import { server } from "../../../config";
import { useAuth } from "../../redux/auth";
import { useGoogleLogin } from '@react-oauth/google'; // Added for Google Login
import { FiMail, FiLock, FiUser, FiArrowRight, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storetokeninLS } = useAuth();

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  }, []);

  const onSubmit = async (formdata) => {
    const toastId = toast.loading("Authenticating...");
    const userInfo = { // Role removed from here
      email: formdata.email,
      password: formdata.password,
    };

    try {
      const { data } = await axios.post(`${server}/user/login`, userInfo, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      
      dispatch(userExist(data.user));
      storetokeninLS(data.token);
      toast.success("Welcome back!", { id: toastId });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again later.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  const googleLoginSuccess = async (tokenResponse) => {
    const toastId = toast.loading("Authenticating with Google...");
    try {
      // Fetch user information from Google
      const googleUserInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      const { email, sub: googleId, given_name: username } = googleUserInfo.data;

      const backendResponse = await axios.post(
        `${server}/user/google-login`,
        { email, googleId, username },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(userExist(backendResponse.data.user));
      storetokeninLS(backendResponse.data.token);
      toast.success(`Welcome, ${backendResponse.data.user.username}!`, { id: toastId });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Google login failed. Please try again.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  const googleLoginError = (error) => {
    console.error("Google login error:", error);
    toast.error("Google login failed. Please try again.");
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: googleLoginSuccess,
    onError: googleLoginError,
  });


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:shadow-2xl">
        <div className="p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[#D94E3B] focus:border-transparent transition-all"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <span className="text-sm text-red-500">Valid email is required</span>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[#D94E3B] focus:border-transparent transition-all"
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && (
                <span className="text-sm text-red-500">Password is required</span>
              )}
            </div>

            {/* Role Selector - Removed as per requirement */}
            {/*
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Role
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent appearance-none focus:ring-2 focus:ring-[#D94E3B] focus:border-transparent transition-all"
                  {...register("role")} // Removed required true as role is not explicitly selected by user during login
                >
                  <option value="applicant">Applicant</option>
                </select>
                <FiArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-[#D94E3B] hover:bg-[#c24534] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiLogIn className="text-xl" /> {/* Changed Icon */}
                  <span>Login</span> {/* Changed Text */}
                </>
              )}
            </button>
          </form>

          {/* OR Separator */}
          <div className="flex items-center space-x-2">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="text-gray-500 dark:text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={() => loginWithGoogle()}
            className="w-full py-3 px-6 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-2xl" />
            <span>Sign in with Google</span>
          </button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#D94E3B] hover:text-[#c24534] font-medium transition-colors"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;