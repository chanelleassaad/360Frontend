import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  CircularProgress,
  TextField,
  IconButton,
  AccordionActions,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  getProjects,
  deleteProject,
  deleteVideo,
  uploadVideo,
  editProjectData,
  addImages,
  deleteImages,
  addProject,
} from "../../api/ProjectsApi";
import { IProject } from "../../interfaces/IProject";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdArrowBack, MdDelete, MdAdd, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReButton from "../molecules/ReButton";
import AddProjectModal from "./modals/AddProjectModal";
import DeleteModal from "./modals/DeleteModal";

function EditProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [originalProjectData, setOriginalProjectData] =
    useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [imagesToAdd, setImagesToAdd] = useState<File[]>([]);

  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [isImageDeleteModalOpen, setIsImageDeleteModalOpen] = useState(false);
  const [isVideoDeleteModalOpen, setIsVideoDeleteModalOpen] = useState(false);
  const [isProjectDeleteModalOpen, setIsProjectDeleteModalOpen] =
    useState(false);

  const [imageToDelete, setImageToDelete] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);

  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const [changedSections, setChangedSections] = useState<{
    data: boolean;
    video: boolean;
    images: boolean;
  }>({ data: false, video: false, images: false });

  const isSaveDisabled =
    !changedSections.data && !changedSections.video && !changedSections.images;
  const [isSaving, setIsSaving] = useState(false);

  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.year.toString().includes(searchQuery) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects();
        setProjects(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCancelEdit = () => {
    if (originalProjectData) {
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj._id === originalProjectData._id ? originalProjectData : proj
        )
      );
    }
    setImagesToDelete([]);
    setEditingProjectId(null);
  };

  const handleFieldChange = (
    field: keyof IProject,
    project: IProject,
    value: any
  ) => {
    (project[field] as typeof value) = value;
    setChangedSections((prev) => ({ ...prev, data: true }));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Project
  const handleUpdateProject = async (project: IProject) => {
    setIsSaving(true);
    try {
      if (changedSections.data) {
        await editProjectData(
          project._id,
          project.title,
          project.location,
          project.year,
          project.description
        );
      }

      if (changedSections.images && imagesToDelete.length > 0) {
        await deleteImages(project._id, imagesToDelete);
      }
      if (changedSections.images && imagesToAdd.length > 0) {
        await addImages(project._id, imagesToAdd);
      }

      if (changedSections.video) {
        if (project.video === null) {
          // Delete the video if it's flagged for deletion
          await deleteVideo(project._id);
        } else if (
          typeof project.video === "string" &&
          project.video.startsWith("blob:")
        ) {
          const videoBlob = await fetch(project.video).then((res) =>
            res.blob()
          );
          const videoFile = new File(
            [videoBlob],
            project.videoName || "default_name.mp4",
            { type: videoBlob.type }
          );
          await uploadVideo(project._id, videoFile);
        }
      }

      // Refresh the projects from MongoDB after saving changes
      const updatedProjects = await getProjects();
      setProjects(updatedProjects); // Update the frontend state with the latest projects from MongoDB

      setEditingProjectId(null);
      setChangedSections({ data: false, video: false, images: false });
      setIsSaving(false);
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenDeleteProjectModal = (project: any) => {
    setProjectToDelete(project);
    setIsProjectDeleteModalOpen(true);
  };

  const handleDeleteProject = async () => {
    try {
      if (projectToDelete) await deleteProject(projectToDelete._id);
      const updatedProjects = await getProjects(); // Fetch updated data
      setProjects(updatedProjects); // Update frontend state
      setIsProjectDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (projectId: string) => {
    setEditingProjectId(projectId);
    const project = projects.find((proj) => proj._id === projectId);
    if (project) {
      setOriginalProjectData({ ...project }); // Save a copy of the original project data
    }
  };

  // Add Project
  const handleOpenAddProjectModal = () => {
    setModalOpen(true);
  };

  const handleCloseAddProjectModal = () => {
    setModalOpen(false);
  };

  const handleAddProject = async (newProjectData: any) => {
    const resp = await addProject(
      newProjectData.title,
      newProjectData.location,
      newProjectData.year,
      newProjectData.description,
      newProjectData.video,
      newProjectData.images
    );

    setProjects((prevProjects) => [...prevProjects, resp]);
  };

  // Images
  const addImage = (projectId: string, files: FileList) => {
    if (!files || files.length === 0) return;

    const newImagePromises = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagePromises).then((newImageUrls) => {
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj._id === projectId
            ? {
                ...proj,
                images: Array.isArray(proj.images)
                  ? [...proj.images, ...newImageUrls]
                  : newImageUrls,
              }
            : proj
        )
      );

      // Update imagesToAdd with new File objects
      setImagesToAdd((prev) => [...prev, ...Array.from(files)]);

      // Mark the images section as changed
      setChangedSections((prev) => ({ ...prev, images: true }));
    });
  };

  const markImageForDeletion = (projectId: string, imageUrl: string) => {
    const project = projects.find((proj) => proj._id === projectId);

    // Check if there is only one image left, prevent deletion
    if (project?.images.length === 1) {
      alert("Each project must have at least one image.");
      return; // Prevent deletion if there's only one image
    }

    setImagesToDelete((prev) => [...prev, imageUrl]);
    setProjects((prev) =>
      prev.map((proj) =>
        proj._id === projectId
          ? {
              ...proj,
              images: proj.images.filter((img) => img !== imageUrl), // Temporarily remove image from the UI
            }
          : proj
      )
    );
    setChangedSections((prev) => ({ ...prev, images: true }));
  };

  const handleOpenImageDeleteModal = (image: any) => {
    setImageToDelete(image);
    setIsImageDeleteModalOpen(true);
  };

  const handleConfirmImageDelete = (projectId: any) => {
    if (imageToDelete) {
      markImageForDeletion(projectId, imageToDelete);
      setIsImageDeleteModalOpen(false);
      setImageToDelete(null);
    }
  };

  // Video
  const handleUploadVideo = (projectId: string, file: File) => {
    const newVideoUrl = URL.createObjectURL(file); // Create a URL for the selected video
    setProjects((prev) =>
      prev.map((proj) =>
        proj._id === projectId
          ? { ...proj, video: newVideoUrl, videoName: file.name } // Update video preview with the new video URL
          : proj
      )
    );
    setChangedSections((prev) => ({ ...prev, video: true }));
  };

  const handleDeleteVideo = (projectId: string) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj._id === projectId ? { ...proj, video: null } : proj
      )
    );
    setChangedSections((prev) => ({ ...prev, video: true }));
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <div className="m-2">
        <>
          {/* Header */}
          <div className="flex items-center">
            <MdArrowBack
              color="white"
              className="mr-2 mb-2 cursor-pointer"
              onClick={handleGoBack}
            />
            <Typography variant="h6" gutterBottom color="white">
              Edit Projects
            </Typography>
          </div>

          {/* Search & Add */}
          <div className="flex justify-end mb-3">
            <TextField
              variant="outlined"
              placeholder="Search by project name, year, or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="!mr-[10px] flex-grow bg-white  !rounded-lg"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdSearch />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <ReButton
              name="Add Project"
              onClick={handleOpenAddProjectModal}
              color="white"
              backgroundColor="#1976d2"
              icon={<MdAdd />}
            />
          </div>
        </>

        {filteredProjects.map((project) => (
          <Accordion key={project._id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="flex justify-between w-full pr-2">
                <Typography>{project.title}</Typography>
                <Typography>
                  {project.location} - {project.year}
                </Typography>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              {editingProjectId === project._id ? (
                <div>
                  <TextField
                    label="Title"
                    defaultValue={project.title}
                    onChange={(e) =>
                      handleFieldChange("title", project, e.target.value)
                    }
                    sx={{ marginRight: 2, marginBottom: 2 }}
                  />
                  <TextField
                    select
                    label="Year"
                    value={project.year}
                    onChange={(e) =>
                      handleFieldChange("year", project, Number(e.target.value))
                    }
                    sx={{ marginRight: 2, marginBottom: 2 }}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Location"
                    defaultValue={project.location}
                    onChange={(e) =>
                      handleFieldChange("location", project, e.target.value)
                    }
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Description"
                    fullWidth
                    defaultValue={project.description}
                    onChange={(e) =>
                      handleFieldChange("description", project, e.target.value)
                    }
                    multiline
                    rows={3}
                    sx={{ marginBottom: 2 }}
                  />

                  {/* Video Section */}
                  <div className="flex justify-between">
                    <Typography variant="h6" gutterBottom>
                      Video
                    </Typography>
                    <div>
                      {project.video && (
                        <Button
                          onClick={() => setIsVideoDeleteModalOpen(true)}
                          color="error"
                          className="pr-2"
                        >
                          Delete Video
                        </Button>
                      )}
                      <DeleteModal
                        key={project.video}
                        isOpen={isVideoDeleteModalOpen}
                        onClose={() => setIsVideoDeleteModalOpen(false)}
                        onComfirmDelete={() => handleDeleteVideo(project._id)}
                        deleteTitle="Video"
                      />
                      <label htmlFor={`upload-video-${project._id}`}>
                        <Button component="span" startIcon={<MdAdd />}>
                          Upload New Video
                        </Button>
                      </label>
                    </div>
                  </div>

                  {project.video ? (
                    <>
                      <video
                        key={project.video}
                        controls
                        width="100%"
                        style={{ maxWidth: "600px", marginBottom: "10px" }}
                      >
                        <source src={project.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </>
                  ) : (
                    <span>No Video Uploaded</span>
                  )}

                  <input
                    accept="video/*"
                    hidden
                    id={`upload-video-${project._id}`}
                    type="file"
                    onChange={(e) =>
                      e.target.files &&
                      handleUploadVideo(project._id, e.target.files[0])
                    }
                  />

                  {/* Images Section */}
                  <>
                    <div className="flex justify-between pt-5">
                      <Typography variant="h6" gutterBottom>
                        Images
                      </Typography>
                      <label htmlFor={`upload-image-${project._id}`}>
                        <Button component="span" startIcon={<MdAdd />}>
                          Add Image
                        </Button>
                      </label>
                    </div>

                    <div className="flex space-x-2 mt-2">
                      {project.images.map((image, index) => (
                        <>
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt=""
                              className="h-24 w-24 object-cover"
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleOpenImageDeleteModal(image)}
                              className="absolute top-0 right-0 text-white bg-red-500 rounded-full"
                            >
                              <MdDelete />
                            </IconButton>
                          </div>
                          <DeleteModal
                            isOpen={isImageDeleteModalOpen}
                            onClose={() => setIsImageDeleteModalOpen(false)}
                            onComfirmDelete={() =>
                              handleConfirmImageDelete(project._id)
                            }
                            deleteTitle="Image"
                            key={index + image}
                          />
                        </>
                      ))}

                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id={`upload-image-${project._id}`}
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            addImage(project._id, files); // Call addImage when images are selected
                          }
                        }}
                      />
                    </div>
                  </>
                </div>
              ) : (
                <div>
                  <Typography>{project.description}</Typography>

                  {project.video ? (
                    <video controls width="100%" style={{ maxWidth: "600px" }}>
                      <source src={project.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <span>No Video Uploaded</span>
                  )}

                  <div className="flex space-x-2 mt-2">
                    {project.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Project ${index}`}
                        className="h-24 w-24 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </AccordionDetails>

            <AccordionActions>
              {editingProjectId === project._id ? (
                <>
                  <Button onClick={handleCancelEdit} color="error">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleUpdateProject(project)}
                    disabled={isSaveDisabled || isSaving}
                  >
                    {isSaving ? "Saving... " : "Save Changes"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleOpenDeleteProjectModal(project)}
                    color="error"
                  >
                    Delete
                  </Button>
                  <DeleteModal
                    isOpen={isProjectDeleteModalOpen}
                    onClose={() => setIsProjectDeleteModalOpen(false)}
                    onComfirmDelete={() => handleDeleteProject()}
                    deleteTitle={"Project " + projectToDelete?.title}
                  />
                  <Button onClick={() => handleEditProject(project._id)}>
                    Edit
                  </Button>
                </>
              )}
            </AccordionActions>
          </Accordion>
        ))}
      </div>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseAddProjectModal}
        onAddProject={handleAddProject}
      />
    </>
  );
}

export default EditProjects;
