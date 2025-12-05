import React, { useState } from 'react';
import { FiLoader } from 'react-icons/fi';

interface SubmitButtonProps {
    onSubmit: (e: React.FormEvent) => Promise<void>;
    children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit, children }) => {
    const [pending, setPending] = useState(false);

    const handleClick = async (e: React.FormEvent) => {
        setPending(true);
        try {
            await onSubmit(e);
        } finally {
            setPending(false);
        }
    };

    return (
        <button
            disabled={pending}
            type="submit"
            onClick={handleClick}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
            {pending ? (
                <>
                    <FiLoader className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                </>
            ) : (
                <span>{children}</span>
            )}
        </button>
    );
};

export default SubmitButton;