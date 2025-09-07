import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "transparent";
  size?: "sm" | "md" | "lg"; // Added size prop
  className?: string;
  children: React.ReactNode;
}

export const Buttons: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "sm", // Changed default size to small
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "rounded-xl font-medium shadow-xl transition-all transform hover:scale-105 block mx-auto"; // Added block and mx-auto to center

  const sizeClasses: Record<string, string> = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const variantClasses: Record<string, string> = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    transparent: "bg-white/80 hover:bg-white/90 text-gray-800 backdrop-blur-sm",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
