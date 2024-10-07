import { useState, useEffect } from "react";
import ProjectCard from "../components/organisms/ProjectCard";
import Stats from "../components/organisms/Stats";
import { IProject } from "../interfaces/IProject";
import { getProjects } from "../api/ProjectsApi";

function OurProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [current, setCurrent] = useState(0); // Start with the first project
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fetch projects data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProjects();
        setProjects(result);
        console.log(result); // Log the fetched data
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  // Image slideshow logic for active card
  useEffect(() => {
    if (projects.length > 0) {
      const interval = setInterval(() => {
        setActiveImageIndex(
          (prevIndex) => (prevIndex + 1) % projects[current].images.length
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [current, projects]);

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
      <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden">
        <div className="flex justify-center items-center h-[450px]">
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
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent border-none text-2xl cursor-pointer text-white z-10"
          onClick={handlePrev}
        >
          ‹
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent border-none text-2xl cursor-pointer text-white z-10"
          onClick={handleNext}
        >
          ›
        </button>
      </div>
      <Stats />
    </>
  );
}

export default OurProjects;
