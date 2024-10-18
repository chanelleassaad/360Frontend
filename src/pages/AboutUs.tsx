import { useEffect, useState } from "react";
import PartnerCard from "../components/organisms/PartnerCard";
import { useSelector } from "react-redux";
import ReButton from "../components/molecules/ReButton";
import { FaEdit } from "react-icons/fa";
import EditModal from "../components/template/EditModal";
import { IPartner } from "../interfaces/IPartner";
import {
  getPartners,
  addPartner,
  editPartner,
  deletePartner,
} from "../api/PartnersApi";
function AboutUs() {
  const [partners, setPartners] = useState<any[]>([]);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingPartners, setEditingPartners] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu."
  );

  const [canEdit, setCanEdit] = useState(false);
  const { userToken } = useSelector((state: any) => state.auth);

  // Fetch partners from the API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getPartners();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    if (userToken) setCanEdit(true);
    else setCanEdit(false);
  }, [userToken]);

  // Toggle text edit mode
  const handleEditText = () => {
    setIsEditing(!isEditing);
  };

  // Edit partners - open modal with current partners
  const handleEditPartners = () => {
    setEditingPartners([...partners]);
    setIsPartnerModalOpen(true);
  };

  const handleSavePartners = async () => {
    // Check if any partner has missing fields
    const hasMissingFields = editingPartners.some(
      (partner) => !partner.fullName || !partner.description
    );

    if (hasMissingFields) {
      alert(
        "⚠️ Missing Fields\n\nPlease fill in all required fields (full name and description)."
      );
      return; // Stop execution if there are missing fields
    }

    // Find new partners (those that don't exist in the original partners array)
    const newPartners = editingPartners.filter(
      (editingPartner) =>
        !partners.some((partner) => partner._id === editingPartner._id)
    );

    const newPartnerIds = newPartners.map((partner) => partner._id);

    // Find deleted partners by checking which partners in the original array are not in the editing array
    const deletedPartnerIds = partners
      .filter(
        (partner) =>
          !editingPartners.some(
            (editingPartner) => editingPartner._id === partner._id
          )
      )
      .map((partner) => partner._id); // Get the IDs of deleted partners

    // Find updated partners (those that are neither new nor deleted)
    const updatedPartners = editingPartners.filter(
      (partner) =>
        !newPartnerIds.includes(partner._id) &&
        !deletedPartnerIds.includes(partner._id)
    );

    try {
      // Handle new partners (batch add)
      const addedPartners = await Promise.all(
        newPartners.map((partner) =>
          addPartner({
            fullName: partner.fullName,
            description: partner.description,
            quote: partner.quote,
            imageUrl: partner.imageUrl, // Ensure all necessary fields are passed
          })
        )
      );

      // Handle updated partners (batch update)
      const updatedExistingPartners = await Promise.all(
        updatedPartners.map((partner) =>
          editPartner(partner._id, {
            fullName: partner.fullName,
            description: partner.description,
            quote: partner.quote,
            imageUrl: partner.imageUrl, // Ensure all necessary fields are passed
          })
        )
      );

      // Handle deleted partners (batch delete)
      await Promise.all(
        deletedPartnerIds.map((partnerId) => deletePartner(partnerId))
      );

      // Update state with new and edited partners after all API calls are complete
      setPartners(() => {
        const updatedPartnersMap = updatedExistingPartners.reduce(
          (acc, partner) => {
            acc[partner._id] = { ...partner }; // Update with edited partner
            return acc;
          },
          {}
        );

        return [
          ...Object.values(updatedPartnersMap),
          ...addedPartners.map((savedPartner) => ({
            ...savedPartner,
            _id: savedPartner._id,
          })),
        ];
      });

      setIsPartnerModalOpen(false);
    } catch (error) {
      console.error("Error saving partners:", error);
    }
  };

  // Add a new partner (in UI and later to API)
  const handleAddPartner = () => {
    const newPartner: IPartner = {
      _id: Math.random(), // Temporary ID for the UI
      fullName: "",
      imageUrl: null,
      quote: "",
      description: "",
    };
    setEditingPartners([...editingPartners, newPartner]);
  };

  // Delete partner from the UI and API
  const handleDeletePartner = async (id: number) => {
    try {
      // if (id) await deletePartner(id);
      setEditingPartners(
        editingPartners.filter((partner) => partner._id !== id)
      );
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  // Handle change in partner data in the modal
  const handlePartnerChange = (id: number, field: string, value: any) => {
    const updatedPartners = editingPartners.map((partner) =>
      partner._id === id ? { ...partner, [field]: value } : partner
    );
    setEditingPartners(updatedPartners);
  };

  return (
    <div>
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
        {canEdit && <ReButton icon={<FaEdit />} onClick={handleEditPartners} />}
      </div>

      <div className="flex flex-wrap justify-center items-center ">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="max-w-sm w-full pr-0 md:w-1/3 lg:w-1/4 my-2 md:mr-10 lg:mr-0 lg:pr-3 flex justify-center"
          >
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
  );
}

export default AboutUs;
