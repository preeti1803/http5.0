// GamificationCard component
interface GamificationCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  description: string;
  bgColor?: string; // optional background gradient
}

const GamificationCard: React.FC<GamificationCardProps> = ({
  icon,
  title,
  value,
  description,
  bgColor = "from-yellow-400 to-yellow-500", // default gradient
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg bg-gradient-to-r ${bgColor} text-white transition transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <span className="text-3xl font-bold mb-2">{value}</span>
      <p className="text-sm text-white/90 text-center">{description}</p>
    </div>
  );
};
export default GamificationCard;
