interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
}) => (
  <div className="group relative h-[200px] perspective-1000">
    <div className="preserve-3d transition-transform duration-500 ease-out group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]">
      <div className="absolute inset-0 rounded-md bg-black/30 blur-xl transform translate-y-4 scale-95 transition-all duration-500 group-hover:translate-y-8 group-hover:scale-90" />
      <div className="absolute inset-0 rounded-md backdrop-blur-sm  border border-[#ae904c]/20 transform transition-all duration-500" />
      <div
        className="relative h-[200px] rounded-md backdrop-blur-sm bg-gradient-to-b from-[#ae904c]/5 to-[#ae904c]/0 
          border border-[#ae904c]/20 group-hover:border-[#ae904c]/40
          transition-all duration-500 ease-out transform
          group-hover:-translate-y-2 group-hover:-translate-x-2 p-6"
      >
        <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ae904c]/20 via-transparent to-[#ae904c]/20 animate-gradient-shift" />
          <div className="absolute -inset-px rounded-md bg-gradient-to-r from-[#ae904c]/30 via-[#ae904c]/10 to-[#ae904c]/30 blur-sm group-hover:animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="text-[#ae904c] mb-4">{icon}</div>
          <h3 className="text-lg font-semibold mb-2 text-[#ae904c] group-hover:text-[#ae904c]/90 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/60 text-sm">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

import { BarChart3, MapPin, Users2 } from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      title: "Data-Driven Planning",
      description:
        "Leverage analytics and insights to optimize your roadshow strategy and maximize impact",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Strategic Locations",
      description:
        "Carefully selected venues that align with your target audience and objectives",
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      title: "Audience Engagement",
      description:
        "Create memorable experiences that resonate with your audience and drive results",
      icon: <Users2 className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};

export default FeatureCards;
