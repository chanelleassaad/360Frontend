// import PartnerCard from "../components/organisms/PartnerCard";
// import profile1 from "../assets/profile1.png";
// import React, { useState } from "react";

// function AboutUs() {
//   const partners = [
//     {
//       name: "Joseph Hannouch",
//       imageUrl: profile1, // Replace with actual image URL
//       description: "Don't Deliver a Product, Deliver Experience.",
//       details:
//         "HelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHHelloI am Lebnese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHello",
//     },
//     {
//       name: "Joseph Hannouch",
//       imageUrl: profile1, // Replace with actual image URL
//       description: "Don't Deliver a Product, Deliver Experience.",
//       details: "",
//     },
//     {
//       name: "Joseph Hannouch",
//       imageUrl: profile1, // Replace with actual image URL
//       description: "Don't Deliver a Product, Deliver Experience.",
//       details: "",
//     },
//   ];

//   const [isEditing, setIsEditing] = useState(false);
//   const [text, setText] = useState(
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu."
//   );

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleDeleteClick = () => {
//     // Add logic to delete or discard changes
//     setText(
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu."
//     );
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       <div className="p-6">
//         <div className="relative bg-red-600 text-white p-6 rounded-lg shadow-lg">
//       {isEditing ? (
//         <textarea
//           className="w-full bg-red-500 text-white p-2 rounded"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           rows={5}
//         />
//       ) : (
//         <p className="text-center">{text}</p>
//       )}

//       <div className="flex justify-end mt-4">
//         {isEditing ? (
//           <>
//             <button
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded mr-2"
//               onClick={handleEditClick}
//             >
//               Save
//             </button>
//             <button
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
//               onClick={handleDeleteClick}
//             >
//               Delete
//             </button>
//           </>
//         ) : (
//           <button
//             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
//             onClick={handleEditClick}
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>


//       </div>
//       <h1 className="section-title">MEET THE PARTNERS</h1>
//       <div className="flex flex-col md:flex-row justify-center items-center md:space-x-20 space-y-4 md:space-y-0">
//         {partners.map((partner, index) => (
//           <div key={index} className="max-w-sm">
//             <PartnerCard
//               name={partner.name}
//               imageUrl={partner.imageUrl}
//               description={partner.description}
//               details={partner.details}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AboutUs;


import React, { useState } from "react";
import PartnerCard from "../components/organisms/PartnerCard";
import profile1 from "../assets/profile1.png";

function AboutUs() {
  const initialPartners = [
    {
      name: "Joseph Hannouch",
      imageUrl: profile1,
      description: "Don't Deliver a Product, Deliver Experience.",
      details: "Some details about Joseph",
    },
    {
      name: "Joseph Hannouch",
      imageUrl: profile1,
      description: "Don't Deliver a Product, Deliver Experience.",
      details: "Some details about Joseph",
    },
    {
      name: "Joseph Hannouch",
      imageUrl: profile1,
      description: "Don't Deliver a Product, Deliver Experience.",
      details: "Some details about Joseph",
    },
  ];

  const [partners, setPartners] = useState(initialPartners);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingPartners, setEditingPartners] = useState([...initialPartners]);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu."
  );

  const handleEditClickText = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = () => {
    // Add logic to delete or discard changes
    setText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu."
    );
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setEditingPartners([...partners]);
    setIsPartnerModalOpen(true);
  };

  const handleSaveClick = () => {
    setPartners(editingPartners);
    setIsPartnerModalOpen(false);
  };

  const handleAddPartner = () => {
    const newPartner = {
      name: "New Partner",
      imageUrl: "", // You can choose default image logic here
      description: "New partner description",
      details: "Details about the new partner",
    };
    setEditingPartners([...editingPartners, newPartner]);
  };

  const handleDeletePartner = (index: number) => {
    setEditingPartners(editingPartners.filter((_, i) => i !== index));
  };

  const handlePartnerChange = (index: number, field: string, value: string) => {
    const updatedPartners = editingPartners.map((partner, i) =>
      i === index ? { ...partner, [field]: value } : partner
    );
    setEditingPartners(updatedPartners);
  };

  return (
    <div>
      <div className="p-6">
      <div className="relative bg-red-600 text-white p-6 rounded-lg shadow-lg">
       {isEditing ? (
          <textarea
            className="w-full bg-red-500 text-white p-2 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
          />
        ) : (
          <p className="text-center">{text}</p>
        )}

        <div className="flex justify-end mt-4">
          {isEditing ? (
            <>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded mr-2"
                onClick={handleEditClickText}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleEditClickText}
            >
              Edit
            </button>
          )}
        </div>
      </div>

        {/* Edit Partners Button */}
        <div className="flex justify-end mt-6 mb-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEditClick}
          >
            Edit Partners
          </button>
        </div>

        {/* Display Partner Cards */}
        <h1 className="section-title">MEET THE PARTNERS</h1>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-20 space-y-4 md:space-y-0">
          {partners.map((partner, index) => (
            <div key={index} className="max-w-sm">
              <PartnerCard
                name={partner.name}
                imageUrl={partner.imageUrl}
                description={partner.description}
                details={partner.details}
              />
            </div>
          ))}
        </div>

        {/* Modal for Editing Partners */}
        {isPartnerModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
              <h2 className="text-xl font-bold mb-4">Edit Partners</h2>
              <div className="flex flex-col gap-y-4">
                {editingPartners.map((partner, index) => (
                  <div key={index} className="flex items-center gap-x-4">
                    <input
                      className="text-base leading-7 p-2 rounded w-1/4"
                      placeholder="Partner Name"
                      value={partner.name}
                      onChange={(e) =>
                        handlePartnerChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      className="text-base leading-7 p-2 rounded w-1/4"
                      placeholder="Image URL"
                      value={partner.imageUrl}
                      onChange={(e) =>
                        handlePartnerChange(index, "imageUrl", e.target.value)
                      }
                    />
                    <input
                      className="text-base leading-7 p-2 rounded w-1/4"
                      placeholder="Description"
                      value={partner.description}
                      onChange={(e) =>
                        handlePartnerChange(index, "description", e.target.value)
                      }
                    />
                    <input
                      className="text-base leading-7 p-2 rounded w-1/4"
                      placeholder="Details"
                      value={partner.details}
                      onChange={(e) =>
                        handlePartnerChange(index, "details", e.target.value)
                      }
                    />
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDeletePartner(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddPartner}
                >
                  Add Partner
                </button>
                <div>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsPartnerModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutUs;
