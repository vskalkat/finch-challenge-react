import React from "react";

interface ButtonProps {
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    disabled = false,
    children,
    onClick,
    type = "button",
    className = "",
}) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer w-fit hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
};