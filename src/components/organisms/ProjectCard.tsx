import "./ProjectCard.css";

interface ProjectCardProps {
  project: any;
  isActive: boolean;
  isLeft: boolean;
  isRight: boolean;
  activeImageIndex: number;
}

const ProjectCard = ({
  project,
  isActive,
  isLeft,
  isRight,
  activeImageIndex,
}: ProjectCardProps) => {
  let className = "card";
  if (isActive) {
    className += " active";
  } else if (isLeft) {
    className += " left";
  } else if (isRight) {
    className += " right";
  }

  return (
    <div className={className}>
      <div className="card-header">
        <h1>{project.title}</h1>
        <h2>{project.location}</h2>
      </div>
      {isActive ? (
        <div className="slideshow-container">
          <img
            src={project.images[activeImageIndex]}
            alt={project.title}
            className="slideshow-image"
          />
        </div>
      ) : (
        <img
          src={project.images[0]}
          alt={project.title}
          className="static-image"
        />
      )}

      <div className="card-footer">{project.description}</div>
    </div>
  );
};

export default ProjectCard;
