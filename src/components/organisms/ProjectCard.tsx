import { IProject } from "../../interfaces/IProject";
import "./ProjectCard.css";

interface IProjectCardProps {
  project: IProject;
  isActive: boolean;
  isLeft: boolean;
  isRight: boolean;
  activeImageIndex: number;
  onVideoClick: (project: IProject) => void;
}

const ProjectCard = ({
  project,
  isActive,
  isLeft,
  isRight,
  activeImageIndex,
  onVideoClick,
}: IProjectCardProps) => {
  let className = "card";
  if (isActive) {
    className += " active";
  } else if (isLeft) {
    className += " left";
  } else if (isRight) {
    className += " right";
  }

  const handleVideoClick = () => {
    onVideoClick(project); // Call the function passed from App
  };

  return (
    <div className={className}>
      <div className="card-header">
        <h1>{project.title}</h1>
        <div className="flex justify-between">
          <h2>{project.location}</h2>
          <h2>{project.year}</h2>
        </div>
      </div>
      {isActive ? (
        <div className="slideshow-container">
          <img
            src={project.images[activeImageIndex]}
            alt={project.title}
            className="slideshow-image"
          />
          {/* Video icon in bottom-right corner */}
          {project.video && (
            <div className="video-icon" onClick={handleVideoClick}>
              🎥
            </div>
          )}
        </div>
      ) : (
        <div className="image-container">
          <img
            src={project.images[0]}
            alt={project.title}
            className="static-image"
          />
        </div>
      )}

      <div className="card-footer">{project.description}</div>
    </div>
  );
};

export default ProjectCard;
