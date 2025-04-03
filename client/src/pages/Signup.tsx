import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@manojcodes77/medium-common";
import SubmitButton from "../components/SubmitButton";
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response=await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.jwt) {
        localStorage.setItem("authToken", data.jwt);
        setUser({ token: data.jwt });
        navigate("/blogs");
        toast.success("Signup successful!");
      } else {
        throw new Error(data.message || "Unexpected error");
      }
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="my-auto flex items-center justify-center bg-gray-100 mx-5">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden justify-center">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold text-gray-800">Create an account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>

          <form className="mt-4" onSubmit={handleSubmit}>
            {successMessage && (
              <div className="mb-4 text-sm text-green-500">
                {successMessage}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your username"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">OTP</label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <SubmitButton onSubmit={handleSubmit}>Sign Up</SubmitButton>
          </form>
        </div>

        {/* Right: Quote */}
        <div className="hidden md:flex w-1/2 bg-gray-100 flex-col justify-center items-center p-8">
          <blockquote className="text-lg italic text-gray-600 text-center">
            "The customer service I received was exceptional. The support team
            went above and beyond to address my concerns."
          </blockquote>
          <p className="mt-4 text-sm font-semibold text-gray-800 text-center">
            Jules Winnfield
            <br />
            CEO, Acme Inc
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

