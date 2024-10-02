// import { useState } from "react";

// // Define the props type
// interface PartnerCardProps {
//   name: string;
//   imageUrl: string;
//   description: string;
//   details:string
// }

// function PartnerCard({ name, imageUrl, description, details }: PartnerCardProps) {
//   const [isFlipped, setIsFlipped] = useState(false);

//   const handleFlip = () => {
//     setIsFlipped(!isFlipped);
//   };

//   return (
//     <div className="bg-white max-w-xs p-3 rounded-lg shadow-md">
//       {/* Conditionally render either the image or the text */}
//       <div>
//         {!isFlipped ? (
//           <img
//             src={imageUrl}
//             alt={`${name}'s profile`}
//             className=" animate-ping h-62 w-72 pb-4 cursor-pointer"
//             onClick={handleFlip} // Only the image will have the click event
//           />
//         ) : (
//           <div className="w-full h-full bg-white flex items-center justify-center rounded">
//             <p className="text-sm text-gray-600 text-center">{details}</p>
//           </div>
//         )}
//       </div>
//       <h3 className="text-lg font-semibold text-center">{name}</h3>
//       <p className="text-sm text-gray-600 text-center">{description}</p>
//     </div>
//   );
// }
// export default PartnerCard;


// // when i click on the text i should have again the image

import { useState } from "react";

// Define the props type
interface PartnerCardProps {
  name: string;
  imageUrl: string;
  description: string;
  details: string;
}

function PartnerCard({ name, imageUrl, description, details }: PartnerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    // Trigger the ping animation when clicking on the image
    if (!isFlipped) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsFlipped(true);
        setIsAnimating(false); // Stop the animation after the flip
      }, 500); // Adjust the delay to match the animation duration
    } else {
      setIsFlipped(false); // Flip back to the image when text is clicked
    }
  };

  return (
    <div className="bg-white max-w-xs p-3 rounded-lg shadow-md">
      {/* Conditionally render either the image or the text */}
      <div onClick={handleFlip} className="cursor-pointer">
        {!isFlipped ? (
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            className={`h-62 w-72 pb-4 ${isAnimating ? "animate-pulse" : ""}`} // Add ping animation if animating
          />
        ) : (
          <div className="w-full h-full bg-white flex items-center justify-center rounded">
            <p className="text-sm text-gray-600 text-center">{details}</p>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-center">{name}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
  );
}

export default PartnerCard;
