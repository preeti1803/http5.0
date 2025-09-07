import React from "react";

interface BadgeProps {
  colorClass?: string;
  text?: string;        // optional now
  icon?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode; // <-- allow children
}

export const Badge: React.FC<BadgeProps> = ({
  colorClass = "bg-gray-500",
  text,
  icon,
  className = "",
  size = "md",
  children,
}) => {
  const sizeClasses: Record<string, string> = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`${colorClass} rounded-xl text-white font-medium inline-flex items-center w-fit shadow-lg ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text || children} {/* render text or children */}
    </span>
  );
};
