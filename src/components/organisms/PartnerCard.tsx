import { useState } from "react";
import colors from "../../colors";
import { GiClick } from "react-icons/gi";

interface PartnerCardProps {
  name: string;
  imageUrl: string;
  description: string;
  details: string;
}

function PartnerCard({
  name,
  imageUrl,
  description,
  details,
}: PartnerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="bg-white max-w-xs p-3 rounded-lg shadow-md">
      {/* Container with perspective to create 3D flip effect */}
      <div
        className="relative"
        style={{ perspective: "1000px" }} // Perspective for 3D effect
      >
        <div
          className={`relative w-full h-64 transition-transform duration-700`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", // Dynamically apply rotation
            cursor: "pointer",
          }}
          onClick={handleFlip}
        >
          {/* Front side (Image) */}
          <div
            className="absolute w-full h-full"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            <img
              src={imageUrl}
              alt={`${name}'s profile`}
              className="h-full w-full object-cover rounded"
            />
            <GiClick className="absolute top-2 right-2 text-xl" />
          </div>

          {/* Back side (Text) */}
          <div
            className="absolute w-full h-full flex items-center justify-center text-white"
            style={{
              backfaceVisibility: "hidden",
              backgroundColor: colors.grey,
              transform: "rotateY(180deg)",
              padding: "20px",
              overflow: "hidden",
            }}
          >
            <p className="text-sm text-center leading-relaxed">{details}</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-center mt-3">{name}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
  );
}

export default PartnerCard;
