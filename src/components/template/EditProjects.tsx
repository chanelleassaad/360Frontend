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
} from "@mui/material";
import {
  getProjects,
  deleteProject,
  updateProjectData,
} from "../../api/ProjectsApi";
import { IProject } from "../../interfaces/IProject";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdArrowBack, MdDelete, MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function EditProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

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
    try {
      if (changedSections.data)
        await updateProjectData(
          project._id,
          project.description,
          project.location,
          project.year
        );
      // await updateProject(project);
      if (changedSections.images) {
        // check which images added and which deleted
        // endpoint for addded imagess
        // endpoint for deleted images
      }
      if (changedSections.video) {
        // edit or delete video
      }
      setEditingProjectId(null);
      setChangedSections({ data: false, video: false, images: false });
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (projectId: string) => {
    setEditingProjectId(projectId);
  };

  // Images
  const addImage = (projectId: string, files: FileList) => {
    if (!files) return;
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
      setChangedSections((prev) => ({ ...prev, images: true }));
    });
  };

  // Video
  const handleUploadVideo = (projectId: string, file: File) => {
    const newVideoUrl = URL.createObjectURL(file);
    console.log("Uploading video for project:", projectId);
    console.log("New Video URL:", newVideoUrl);

    // Update projects state with new video URL
    setProjects((prev) =>
      prev.map((proj) =>
        proj._id === projectId ? { ...proj, video: newVideoUrl } : proj
      )
    );

    // Mark video section as changed
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
    <div className="m-2">
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

      {projects.map((project) => (
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
                    <Button
                      onClick={() => handleDeleteVideo(project._id)}
                      color="error"
                      className="pr-2"
                    >
                      Delete Video
                    </Button>
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
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Project Image ${index}`}
                        className="h-24 w-24 object-cover"
                      />
                      <IconButton
                        size="small"
                        onClick={() =>
                          setProjects((prev) =>
                            prev.map((proj) =>
                              proj._id === project._id
                                ? {
                                    ...proj,
                                    images: proj.images.filter(
                                      (_, imgIndex) => imgIndex !== index
                                    ),
                                  }
                                : proj
                            )
                          )
                        }
                        className="absolute top-0 right-0 text-white bg-red-500 rounded-full"
                      >
                        <MdDelete />
                      </IconButton>
                    </div>
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
                        addImage(project._id, files);
                      }
                    }}
                  />
                </div>
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
                      alt={`Project Image ${index}`}
                      className="h-24 w-24 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </AccordionDetails>

          <AccordionActions>
            {editingProjectId ? (
              <>
                <Button onClick={() => setEditingProjectId(null)} color="error">
                  Cancel
                </Button>
                <Button
                  onClick={() => handleUpdateProject(project)}
                  disabled={isSaveDisabled}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleDeleteProject(project._id)}
                  color="error"
                >
                  Delete
                </Button>
                <Button onClick={() => handleEditProject(project._id)}>
                  Edit
                </Button>
              </>
            )}
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}

export default EditProjects;
