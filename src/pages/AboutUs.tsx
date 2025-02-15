import { useEffect, useState } from "react";
import PartnerCard from "../components/organisms/PartnerCard";
import { useSelector } from "react-redux";
import ReButton from "../components/molecules/ReButton";
import { FaEdit } from "react-icons/fa";
import EditModal from "../components/template/modals/EditModal";
import { IPartner } from "../interfaces/IPartner";
import {
  getPartners,
  addPartner,
  editPartner,
  deletePartner,
} from "../api/PartnersApi";
import { getBoxDescription, editBoxDescription } from "../api/TextBoxApi";

function AboutUs() {
  const [partners, setPartners] = useState<any[]>([]);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingPartners, setEditingPartners] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const [canEdit, setCanEdit] = useState(false);
  const { userToken } = useSelector((state: any) => state.auth);

  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const partners = await getPartners();
        const boxDescription = await getBoxDescription(); // Fetch the description from the backend
        setPartners(partners);
        setText(boxDescription[0]?.description || ""); // Set the fetched description
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userToken) setCanEdit(true);
    else setCanEdit(false);
  }, [userToken]);

  // Decription Text
  const handleEditText = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveText = async () => {
    try {
      await editBoxDescription({ description: text }, userToken.accessToken);
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error saving description:", error);
    }
  };

  // Partners
  const handleEditPartners = () => {
    setEditingPartners([...partners]);
    setIsPartnerModalOpen(true);
  };

  const handleSavePartners = async () => {
    setErrorMessage(undefined);
    // Check if any partner has missing fields
    const hasMissingFields = editingPartners.some(
      (partner) => !partner.fullName || !partner.description
    );

    if (hasMissingFields) {
      setErrorMessage("Missing Fields. Please fill in all required fields");
      return;
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
          addPartner(
            {
              fullName: partner.fullName,
              description: partner.description,
              quote: partner.quote,
              imageUrl: partner.imageUrl, // Ensure all necessary fields are passed
            },
            userToken.accessToken
          )
        )
      );

      // Handle updated partners (batch update)
      const updatedExistingPartners = await Promise.all(
        updatedPartners.map((partner) =>
          editPartner(
            partner._id,
            {
              fullName: partner.fullName,
              description: partner.description,
              quote: partner.quote,
              imageUrl: partner.imageUrl, // Ensure all necessary fields are passed
            },
            userToken.accessToken
          )
        )
      );

      // Handle deleted partners (batch delete)
      await Promise.all(
        deletedPartnerIds.map((partnerId) =>
          deletePartner(partnerId, userToken.accessToken)
        )
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
    } catch (error: any) {
      // Accessing error response based on typical structure
      const message =
        error.response?.data?.message || "An unknown error occurred";
      setErrorMessage(message);
    }
  };

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

  const handleDeletePartner = async (id: number) => {
    setEditingPartners(editingPartners.filter((partner) => partner._id !== id));
  };

  const handlePartnerChange = (id: number, field: string, value: any) => {
    const updatedPartners = editingPartners.map((partner) =>
      partner._id === id ? { ...partner, [field]: value } : partner
    );
    setEditingPartners(updatedPartners);
  };

  return (
    <>
      <div className="relative bg-red-600 text-white p-2 rounded-lg shadow-lg">
        {isEditing ? (
          <textarea
            className="w-full bg-red-500 text-white p-2 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ overflow: "hidden" }}
            rows={3}
          />
        ) : (
          <p className="text-center" style={{ whiteSpace: "pre-line" }}>
            {text}
          </p>
        )}

        {canEdit && (
          <div className="flex justify-end m-0">
            {isEditing ? (
              <>
                <ReButton onClick={handleEditText} name="Cancel" />
                <ReButton
                  onClick={handleSaveText} // Use handleSaveText to save the changes
                  name="Save Changes"
                  backgroundColor="green"
                />
              </>
            ) : (
              <ReButton
                icon={<FaEdit />}
                onClick={handleEditText}
                name="Text"
              />
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

      <div className="flex flex-wrap justify-center ">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex justify-center max-w-sm w-full md:w-1/3 lg:w-1/4 my-2 p-2"
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
          errorMessage={errorMessage}
        />
      )}
    </>
  );
}

export default AboutUs;
