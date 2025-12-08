import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@manojcodes77/medium-common";
import SubmitButton from "../components/SubmitButton";
import toast from 'react-hot-toast';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/authSlice';
import { FiUser, FiMail, FiLock, FiKey } from 'react-icons/fi';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.jwt) {
        dispatch(setCredentials(data.jwt));
        navigate("/blogs");
        toast.success("Welcome aboard! 🎉");
      } else {
        throw new Error(data.message || "Unexpected error");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Left: Form */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
                <p className="text-gray-500">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <FiUser className="w-4 h-4" />
                    <span>Username</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <FiMail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <FiKey className="w-4 h-4" />
                    <span>OTP</span>
                  </label>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white tracking-widest"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <FiLock className="w-4 h-4" />
                    <span>Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="off"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                <SubmitButton onSubmit={handleSubmit}>Create Account</SubmitButton>
              </form>
            </div>
          </div>

          {/* Right: Quote */}
          <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 flex-col justify-center items-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <blockquote className="text-xl text-white/90 leading-relaxed mb-6 font-light">
                "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
              </blockquote>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">JW</span>
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">Jules Winnfield</p>
                  <p className="text-white/70 text-sm">CEO, Acme Inc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

