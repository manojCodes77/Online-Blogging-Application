import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';
import { SigninInput } from '@manojcodes77/medium-common';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Signin: React.FC = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
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
        toast.success("Login successful!");
      } else {
        throw new Error(data.message || "Unexpected error");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="my-auto flex items-center justify-center bg-gray-100 mx-5">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden justify-center">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold text-gray-800">Log In to your Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>

          <form className="mt-4" onSubmit={handleSubmit}>
            {successMessage && (
              <div className="mb-4 text-sm text-green-500">
                {successMessage}
              </div>
            )}

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
            <SubmitButton onSubmit={handleSubmit}>Sign In</SubmitButton>
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

export default Signin;