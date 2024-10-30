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
  let cardClasses = "card transition-transform duration-500 ease-in-out";

  if (isActive) {
    cardClasses += " active transform scale-100 opacity-100 z-10";
  } else if (isLeft) {
    cardClasses += " left transform -translate-x-full scale-90 opacity-50";
  } else if (isRight) {
    cardClasses += " right transform translate-x-full scale-90 opacity-50";
  }

  const handleVideoClick = () => {
    onVideoClick(project);
  };

  return (
    <div className={cardClasses}>
      <div className="card-header bg-red-500 text-white p-2 rounded-t-md w-full">
        <h1 className="text-sm">{project.title}</h1>
        <div className="flex justify-between">
          <h2 className="text-xs">{project.location}</h2>
          <h2 className="text-xs">{project.year}</h2>
        </div>
      </div>
      {isActive ? (
        <div className="image-container relative w-full h-full">
          <img
            src={project.images[activeImageIndex]}
            alt={project.title}
            className="slideshow-image w-full h-full object-cover"
          />
          {project.video && (
            <div
              className="video-icon absolute bottom-2 right-2 bg-red-500 bg-opacity-50 p-2 rounded cursor-pointer text-2xl"
              onClick={handleVideoClick}
            >
              🎥
            </div>
          )}
        </div>
      ) : (
        <div className="image-container relative w-full h-full">
          <img
            src={project.images[0]}
            alt={project.title}
            className="static-image w-full h-full object-cover"
          />
        </div>
      )}
      <div className="card-footer bg-red-500 text-white p-2 text-xxs w-full rounded-b-md">
        {project.description}
      </div>
    </div>
  );
};

export default ProjectCard;
