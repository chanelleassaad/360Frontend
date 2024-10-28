import { useEffect, useState } from "react";
import { MdAdd, MdClose, MdDelete } from "react-icons/md";
import { Button } from "@mui/material";
import { IPartner } from "../../../interfaces/IPartner";
import { IStat } from "../../../interfaces/IStat";
import ReButton from "../../molecules/ReButton";
import DeleteModal from "./DeleteModal";
import React from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItems: (IStat | IPartner)[];
  onSave: (items: (IStat | IPartner)[]) => Promise<void>;
  onDelete: (id: number) => void;
  onAdd: () => void;
  type: "partners" | "stats";
  onChange: (
    id: number,
    field: keyof IPartner | keyof IStat,
    value: string | File
  ) => void;
}

const EditModal = ({
  isOpen,
  onClose,
  editingItems,
  onSave,
  onDelete,
  onAdd,
  type,
  onChange,
}: EditModalProps) => {
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<{ [key: number]: string }>(
    {}
  );
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null); // State to keep track of the item to delete

  // Prevent background scroll when modal is open
  useEffect(() => {
    setIsSaveDisabled(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle image selection
  const handleImageChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(id, "imageUrl", file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [id]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
    setIsSaveDisabled(false);
  };

  // Define input fields based on the type (partners or stats)
  const inputFields =
    type === "partners"
      ? [
          { placeholder: "Partner Name", field: "fullName" as keyof IPartner },
          { placeholder: "Image URL", field: "imageUrl" as keyof IPartner },
          { placeholder: "Quote", field: "quote" as keyof IPartner },
          {
            placeholder: "Description",
            field: "description" as keyof IPartner,
          },
        ]
      : [
          { placeholder: "Title", field: "title" as keyof IStat },
          { placeholder: "Description", field: "description" as keyof IStat },
        ];

  // Handle overlay click to close modal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  // Handle save and manage loading state
  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(editingItems);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg max-w-[90vw] relative ">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4 text-center">
            Edit {type === "partners" ? "Partners" : "Stats"}
          </h2>
          <ReButton icon={<MdClose />} onClick={onClose} color="black" />
        </div>

        <div className="overflow-auto max-h-[60vh]">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                {inputFields.map(({ placeholder }) => (
                  <th key={placeholder} className="p-2 border-b text-left">
                    {placeholder}
                  </th>
                ))}
                <th className="p-2 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {editingItems.map((item) => (
                <React.Fragment key={item._id}>
                  <tr className="hover:bg-gray-100">
                    {inputFields.map(({ field }) => (
                      <td key={field as string} className="p-2 border-b">
                        {field === "imageUrl" ? (
                          <div className="flex flex-col items-center space-y-2">
                            <input
                              type="file"
                              accept="image/*"
                              className="text-base p-2 rounded"
                              onChange={(e) => handleImageChange(item._id, e)}
                            />
                            {/* Show previously uploaded image or the newly selected image */}
                            {(imagePreviews[item._id] ||
                              (item as any).imageUrl) && (
                              <img
                                src={
                                  imagePreviews[item._id] ||
                                  (item as any).imageUrl
                                }
                                alt="Preview"
                                className="w-20 h-20 object-cover border rounded-md"
                              />
                            )}
                          </div>
                        ) : field === "description" ? (
                          <textarea
                            className="text-base p-2 rounded border"
                            value={(item as any)[field] || ""}
                            onChange={(e) => {
                              setIsSaveDisabled(false);
                              onChange(item._id, field, e.target.value);
                            }}
                            rows={1} // Adjust the number of rows as needed
                          />
                        ) : (
                          <input
                            required
                            className="text-base p-2 rounded border "
                            value={(item as any)[field] || ""}
                            onChange={(e) => {
                              setIsSaveDisabled(false);
                              onChange(item._id, field, e.target.value);
                            }}
                          />
                        )}
                      </td>
                    ))}
                    <td className="p-2 border-b">
                      <ReButton
                        icon={
                          <MdDelete className="text-red-500 hover:text-red-700" />
                        }
                        onClick={() => {
                          setIsSaveDisabled(false);
                          setDeleteItemId(item._id); // Set the item to delete
                          setIsOpenDelete(true);
                        }}
                      />
                    </td>
                  </tr>
                  <DeleteModal
                    isOpen={isOpenDelete}
                    onClose={() => setIsOpenDelete(false)}
                    onComfirmDelete={() => {
                      if (deleteItemId !== null) {
                        onDelete(deleteItemId); // Use the stored ID
                      }
                      setIsOpenDelete(false);
                    }}
                    deleteTitle={type === "partners" ? "Partner" : "Stat"}
                  />
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <ReButton
            onClick={onAdd}
            icon={<MdAdd />}
            backgroundColor="black"
            name={type === "partners" ? "Add Partner" : "Add Stat"}
          />
          <div className="flex space-x-4">
            <Button onClick={handleSave} disabled={loading || isSaveDisabled}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
