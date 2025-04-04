import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from './SubmitButton';
import toast from 'react-hot-toast';

const SendOTP = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (data.message) {
                toast.success(data.message);
                navigate('/signup');
            } else {
                setEmail('');
                throw new Error(data.message || "Unexpected error");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
            navigate('/my-posts');
        }
    }, [navigate]);

    if (isAuthenticated) {
        return null;
    }

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
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <SubmitButton onSubmit={handleSubmit}>Send OTP</SubmitButton>
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

export default SendOTP;