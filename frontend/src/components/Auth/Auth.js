"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser, clearError } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // or wherever you want to redirect
    }
  }, [isAuthenticated, navigate]);

  // Show error toast when there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignUp) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }

      // Only check password confirmation if both passwords are entered
      if (
        formData.password &&
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword
      ) {
        newErrors.confirmPassword = "Passwords don't match";
      }

      // Check if confirm password is empty when password is filled
      if (formData.password && !formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      if (isSignUp) {
        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        };
        const result = await dispatch(signupUser(userData));
        if (signupUser.fulfilled.match(result)) {
          toast.success("Account created successfully!");
        }
      } else {
        const credentials = {
          email: formData.email,
          password: formData.password,
        };
        const result = await dispatch(loginUser(credentials));
        if (loginUser.fulfilled.match(result)) {
          toast.success("Login successful!");
        }
      }
    } catch (err) {
      console.error("Authentication error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear confirm password error when either password field changes
    if (
      (name === "password" || name === "confirmPassword") &&
      errors.confirmPassword
    ) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    setErrors({});
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const inputClasses = (error) =>
    `w-full px-4 py-3 border rounded-lg transition-all duration-200
    ${
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
    }
    focus:outline-none focus:ring-2`;

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl">
          <div className="text-center">
            <motion.div
              className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-indigo-100 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg
                className="h-8 w-8 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isSignUp
                ? "Get started with your free account"
                : "Sign in to continue"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isSignUp ? "signup" : "signin"}
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {isSignUp && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className={inputClasses(errors.firstName)}
                      placeholder="John"
                      onChange={handleChange}
                      value={formData.firstName}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className={inputClasses(errors.lastName)}
                      placeholder="Doe"
                      onChange={handleChange}
                      value={formData.lastName}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </motion.div>
                </div>
              )}

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className={inputClasses(errors.email)}
                  placeholder="you@example.com"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className={inputClasses(errors.password)}
                  placeholder={
                    isSignUp ? "At least 6 characters" : "Your password"
                  }
                  onChange={handleChange}
                  value={formData.password}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </motion.div>

              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    variants={itemVariants}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={inputClasses(errors.confirmPassword)}
                      placeholder="Confirm your password"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={itemVariants} className="pt-2">
                <motion.button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  disabled={loading}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className={`h-5 w-5 ${
                        loading
                          ? "text-indigo-300"
                          : "text-indigo-500 group-hover:text-indigo-400"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isSignUp ? (
                    "Sign Up"
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex justify-center"
              ></motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200 text-sm"
                  onClick={switchMode}
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </button>
              </motion.div>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
