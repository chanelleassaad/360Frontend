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

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="relative w-full h-full max-w-full max-h-full bg-black rounded-lg overflow-hidden">
          {/* Fullscreen Video Player */}
          <div className="flex h-full flex-col">
            <div className="flex-shrink-0 p-4 bg-gray-800 text-white flex justify-between items-center">
              <DialogTitle as="h3" className="text-lg font-semibold">
                {project.title} - Video
              </DialogTitle>
              <button onClick={onClose}>
                <IoClose />
              </button>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <iframe
                className="w-full h-full object-cover"
                src={project.video}
                title="YouTube Video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ProjectVideoModal;
