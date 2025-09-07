interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;  // Make onClick optional
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;