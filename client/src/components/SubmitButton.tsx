import React, { useState } from 'react';

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
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-blue-300"
        >
            {pending ? 'Sending...' : children}
        </button>
    );
};

export default SubmitButton;