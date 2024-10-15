import { useEffect, useState } from "react";
import PartnerCard from "../components/organisms/PartnerCard";
import profile1 from "../assets/profile1.png";
import { useSelector } from "react-redux";
import ReButton from "../components/molecules/ReButton";
import { FaEdit } from "react-icons/fa";
import EditModal from "../components/template/EditModal";
import { IPartner } from "../interfaces/IPartner";

function AboutUs() {
  const initialPartners: IPartner[] = [
    {
      _id: 1,
      fullName: "Joseph Hannouch",
      imageUrl: profile1,
      quote: "Don't Deliver a Product, Deliver Experience.",
      description: "Some details about Joseph",
    },
    {
      _id: 2,
      fullName: "Joseph Hannouch",
      imageUrl: profile1,
      quote: "Don't Deliver a Product, Deliver Experience.",
      description: "Some details about Joseph",
    },
    {
      _id: 3,
      fullName: "Joseph Hannouch",
      imageUrl: profile1,
      quote: "Don't Deliver a Product, Deliver Experience.",
      description: "Some details about Joseph",
    },
  ];

  const [partners, setPartners] = useState(initialPartners);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingPartners, setEditingPartners] = useState([...initialPartners]);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu."
  );

  const [canEdit, setCanEdit] = useState(false);
  const { userToken } = useSelector((state: any) => state.auth);

  const handleEditText = () => {
    setIsEditing(!isEditing);
  };

  const handleEditPartners = () => {
    setEditingPartners([...partners]);
    setIsPartnerModalOpen(true);
  };

  const handleSavePartners = () => {
    setPartners(editingPartners);
    setIsPartnerModalOpen(false);
  };

  const handleAddPartner = () => {
    const newPartner = {
      _id: partners.length,
      fullName: "",
      imageUrl: "",
      quote: "",
      description: "",
    };
    setEditingPartners([...editingPartners, newPartner]);
  };

  const handleDeletePartner = (id: number) => {
    setEditingPartners(editingPartners.filter((partner) => partner._id !== id));
  };

  const handlePartnerChange = (id: number, field: any, value: string) => {
    const updatedPartners = editingPartners.map((partner) =>
      partner._id === id ? { ...partner, [field]: value } : partner
    );
    setEditingPartners(updatedPartners);
  };

  useEffect(() => {
    if (userToken) setCanEdit(true);
    else setCanEdit(false);
  }, [userToken]);

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

          {canEdit && (
            <div className="flex justify-end mt-4">
              {isEditing ? (
                <>
                  <ReButton onClick={handleEditText} name="Cancel" />
                  <ReButton
                    onClick={handleEditText}
                    name="Save Changes"
                    backgroundColor="green"
                  />
                </>
              ) : (
                <ReButton icon={<FaEdit />} onClick={handleEditText} />
              )}
            </div>
          )}
        </div>

        {/* Display Partner Cards */}
        <div className="flex justify-center mt-10">
          <h1 className="section-title">MEET THE PARTNERS</h1>
          {/* Edit Partners Button */}
          {canEdit && (
            <ReButton icon={<FaEdit />} onClick={handleEditPartners} />
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-20 space-y-4 md:space-y-0">
          {partners.map((partner, index) => (
            <div key={index} className="max-w-sm">
              <PartnerCard
                name={partner.fullName}
                imageUrl={partner.imageUrl}
                description={partner.quote}
                details={partner.description}
              />
            </div>
          ))}
        </div>

        {/* Modal for Editing Partners */}
        {isPartnerModalOpen && (
          <EditModal
            isOpen={isPartnerModalOpen}
            onClose={() => setIsPartnerModalOpen(false)}
            editingItems={editingPartners}
            onSave={handleSavePartners}
            onDelete={handleDeletePartner}
            onAdd={handleAddPartner}
            type="partners"
            onChange={handlePartnerChange}
          />
        )}
      </div>
    </div>
  );
}

export default AboutUs;
