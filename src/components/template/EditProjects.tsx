import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { getProjects } from "../../api/ProjectsApi";
import { IProject } from "../../interfaces/IProject";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function EditProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleUpdateProject = async (projectId: string, updatedData: any) => {
    try {
      //   await updateProject(projectId, updatedData);
      // Optionally refresh the project list
      // fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) return <CircularProgress />; // Show a loading spinner while fetching data

  return (
    <div className="m-2">
      <div className="flex items-center">
        <MdArrowBack
          color="white"
          className="mr-2 mb-2"
          onClick={handleGoBack}
        />
        <Typography variant="h5" gutterBottom color="white">
          Edit Projects
        </Typography>
      </div>

      {projects.map((project) => (
        <Accordion key={project._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{project.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography variant="h6">Description</Typography>
              <Typography>{project.description}</Typography>
              {/* Add more fields as necessary, e.g., inputs for editing */}
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleUpdateProject(project._id, {
                    /* updatedData */
                  })
                }
              >
                Save Changes
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default EditProjects;
