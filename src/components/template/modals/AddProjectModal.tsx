import { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { MdClose } from "react-icons/md";

const AddProjectModal = ({
  isOpen,
  onClose,
  onAddProject,
}: {
  isOpen: any;
  onClose: any;
  onAddProject: any;
}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleImageUpload = (e: any) => {
    setIsLoading(true);
    const files = Array.from(e.target.files);
    setImages(files as File[]);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleVideoUpload = (e: any) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!title || !location || !year || images.length === 0) {
      alert(
        "Please fill in all required fields and upload at least one image."
      );
      return;
    }

    // Create new project data object
    const newProject = {
      title,
      location,
      year,
      description,
      images,
      video,
    };

    onAddProject(newProject);

    setTitle("");
    setLocation("");
    setYear("");
    setDescription("");
    setImages([]);
    setVideo(null);

    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-project-modal"
      className="h-[100vh] flex items-center justify-center"
    >
      <Box className="bg-white p-6 w-[70%] mx-auto rounded-lg shadow-lg space-y-4 outline-none">
        <div className="flex justify-between">
          <Typography variant="h6" className="mb-4 text-center">
            Add New Project
          </Typography>
          <button>
            <MdClose onClick={() => onClose()} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex justify-between">
            {/* Location */}
            <TextField
              label="Location"
              variant="outlined"
              className="w-[49%]"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            {/* Year */}
            <TextField
              select
              label="Year"
              variant="outlined"
              className="w-[49%]"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* Description */}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="md:flex block ">
            {/* Image Upload */}
            <div className="mr-2 pb-2 md:pb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                required
                className="block w-full"
              />
              {isLoading ? (
                <div className="flex items-center mt-2">
                  <CircularProgress size={20} />
                  <span className="ml-2 text-blue-600">
                    Uploading images...
                  </span>
                </div>
              ) : (
                images.length > 0 && (
                  <p className="mt-2 text-green-600">
                    {images.length} images uploaded
                  </p>
                )
              )}
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="block w-full"
              />
              {video && <p className="mt-2 text-green-600">1 video uploaded</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Project
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddProjectModal;
