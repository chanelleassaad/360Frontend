import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";

const ProjectVideoModal = ({ project, isOpen, onClose }: any) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center m-4">
        <DialogPanel className="relative w-full h-full bg-black rounded-lg overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
              <DialogTitle as="h3" className="text-lg font-semibold">
                {project.title}
              </DialogTitle>
              <button onClick={onClose}>
                <IoClose />
              </button>
            </div>
            <iframe
              className=" !w-[100%] !h-[100%] !m-0"
              src={project.video}
              title="Project Video"
              allowFullScreen
            ></iframe>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ProjectVideoModal;
