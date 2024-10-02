import { useState, useEffect } from "react";
import "./OurProjects.css";
import ProjectCard from "../components/organisms/ProjectCard";
import Stats from "../components/organisms/Stats";

const projects = [
  {
    title: "Project 1",
    location: "Jeddah, KSA",
    images: [
      "https://i.natgeofe.com/n/17a918d2-a03b-48f8-8714-8930131d38bf/MM9187_R093_FR_006.jpg",
      "https://lp-cms-production.imgix.net/features/2010/09/beirut-road-trip-52f78727dead.jpg",
    ],
    description: "Description of Project 1",
  },
  {
    title: "Project 2",
    location: "Jeddah, KSA",
    images: [
      "https://i.natgeofe.com/n/17a918d2-a03b-48f8-8714-8930131d38bf/MM9187_R093_FR_006.jpg",
      "https://lp-cms-production.imgix.net/features/2010/09/beirut-road-trip-52f78727dead.jpg",
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    title: "Project 3",
    location: "Jeddah, KSA",
    images: [
      "https://i.natgeofe.com/n/17a918d2-a03b-48f8-8714-8930131d38bf/MM9187_R093_FR_006.jpg",
      "https://lp-cms-production.imgix.net/features/2010/09/beirut-road-trip-52f78727dead.jpg",
    ],
    description: "Description of Project 3",
  },
  {
    title: "Project 4",
    location: "Jeddah, KSA",
    images: [
      "https://i.natgeofe.com/n/17a918d2-a03b-48f8-8714-8930131d38bf/MM9187_R093_FR_006.jpg",
      "https://lp-cms-production.imgix.net/features/2010/09/beirut-road-trip-52f78727dead.jpg",
    ],
    description: "Description of Project 4",
  },
  {
    title: "Project 5",
    location: "Jeddah, KSA",
    images: [
      "https://i.natgeofe.com/n/17a918d2-a03b-48f8-8714-8930131d38bf/MM9187_R093_FR_006.jpg",
      "https://lp-cms-production.imgix.net/features/2010/09/beirut-road-trip-52f78727dead.jpg",
    ],
    description: "Description of Project 5",
  },
];

function OurProjects() {
  const [current, setCurrent] = useState(1); // Starting with the second project in the middle
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Image slideshow logic for active card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex(
        (prevIndex) => (prevIndex + 1) % projects[current].images.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [current]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % projects.length);
    setActiveImageIndex(0); // Reset image index when moving to next project
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
    setActiveImageIndex(0); // Reset image index when moving to previous project
  };

  return (
    <>
      <h1 className="section-title">OUR PROJECTS</h1>
      <div className="carousel-container">
        <div className="carousel">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              isActive={index === current}
              isLeft={
                index === (current - 1 + projects.length) % projects.length
              }
              isRight={index === (current + 1) % projects.length}
              activeImageIndex={activeImageIndex}
            />
          ))}
        </div>
        <button className="left-arrow" onClick={handlePrev}>
          ‹
        </button>
        <button className="right-arrow" onClick={handleNext}>
          ›
        </button>
      </div>
      <Stats />
    </>
  );
}

export default OurProjects;
