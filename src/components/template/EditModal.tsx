import { MdAdd, MdDelete } from "react-icons/md";
import ReButton from "../molecules/ReButton";
import { IPartner } from "../../interfaces/IPartner";
import { IStat } from "../../interfaces/IStat";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItems: (IStat | IPartner)[];
  onSave: (items: (IStat | IPartner)[]) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  type: "partners" | "stats";
  onChange: (
    id: number,
    field: keyof IPartner | keyof IStat,
    value: string
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
  if (!isOpen) return null;

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
          { placeholder: "Stat Name", field: "title" as keyof IStat },
          { placeholder: "Value", field: "description" as keyof IStat },
        ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
        <h2 className="text-xl font-bold mb-4">
          Edit {type === "partners" ? "Partners" : "Stats"}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                {inputFields.map(({ placeholder }) => (
                  <th key={placeholder} className="p-2 border-b">
                    {placeholder}
                  </th>
                ))}
                <th className="p-2 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {editingItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  {inputFields.map(({ field }) => (
                    <td key={field as string} className="p-2 border-b">
                      <input
                        className="text-base leading-7 p-2 rounded w-full"
                        value={(item as any)[field] || ""}
                        onChange={(e) =>
                          onChange(item._id, field, e.target.value)
                        }
                      />
                    </td>
                  ))}
                  <td className="p-2 border-b">
                    <ReButton
                      icon={
                        <MdDelete className="text-red-500 hover:text-red-700" />
                      }
                      onClick={() => onDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <ReButton
            onClick={onAdd}
            icon={<MdAdd />}
            backgroundColor="black"
            name={type === "partners" ? " Add Partner" : "Add Stat"}
          />
          <div className="flex">
            <ReButton name="Cancel" onClick={onClose} color="black" />
            <ReButton
              name="Save Changes"
              onClick={() => onSave(editingItems)}
              backgroundColor="green"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
