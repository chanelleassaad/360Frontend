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
  updateProject,
  deleteProject,
} from "../../api/ProjectsApi";
import { IProject } from "../../interfaces/IProject";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdArrowBack, MdDelete, MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function EditProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [displayImages, setDisplayImages] = useState<{
    [key: string]: string[];
  }>({});
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const [videoUrl, setVideoUrl] = useState("");

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

  const handleUpdateProject = async (project: any) => {
    try {
      await updateProject(project);
      setEditingProjectId(null);
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

  const handleGoBack = () => {
    navigate(-1);
  };

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

      setDisplayImages((prevDisplayImages) => ({
        ...prevDisplayImages,
        [projectId]: [...(prevDisplayImages[projectId] || []), ...newImageUrls],
      }));
    });
  };

  const uploadVideo = async (projectId: string, file: File) => {
    const newVideoUrl = URL.createObjectURL(file);
    setVideoUrl(newVideoUrl);
    setProjects((prev) =>
      prev.map((proj) =>
        proj._id === projectId ? { ...proj, video: newVideoUrl } : proj
      )
    );
  };

  const handleDeleteVideo = (projectId: string) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj._id === projectId ? { ...proj, video: null } : proj
      )
    );
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
        <Typography variant="h5" gutterBottom color="white">
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
                  onChange={(e) => (project.title = e.target.value)}
                  sx={{ marginRight: 2, marginBottom: 2 }}
                />
                <TextField
                  select
                  label="Year"
                  value={project.year}
                  onChange={(e) => {
                    project.year = Number(e.target.value);
                  }}
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
                  onChange={(e) => (project.location = e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  defaultValue={project.description}
                  onChange={(e) => (project.description = e.target.value)}
                  multiline
                  rows={4}
                  sx={{ marginBottom: 2 }}
                />

                {/* Video Section */}
                <Typography variant="h6" gutterBottom>
                  Video
                </Typography>
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
                    <Button
                      onClick={() => handleDeleteVideo(project._id)}
                      color="error"
                      className="pr-2"
                    >
                      Delete Video
                    </Button>
                  </>
                ) : (
                  <span>No Video Uploaded</span>
                )}
                <input
                  accept="video/*"
                  style={{ display: "none" }}
                  id={`upload-video-${project._id}`}
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      uploadVideo(project._id, file);
                    }
                  }}
                />
                <label htmlFor={`upload-video-${project._id}`}>
                  <Button component="span" startIcon={<MdAdd />}>
                    Upload New Video
                  </Button>
                </label>

                {/* Images Section */}
                <div className="flex justify-between">
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
                <Button onClick={() => handleUpdateProject(project)}>
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
