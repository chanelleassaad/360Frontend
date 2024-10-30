import { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/organisms/ProjectCard";
import Stats from "../components/template/Stats";
import { IProject } from "../interfaces/IProject";
import { getProjects } from "../api/ProjectsApi";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import ReButton from "../components/molecules/ReButton";
import { useNavigate } from "react-router-dom";

function OurProjects({ onVideoClick }: any) {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [current, setCurrent] = useState(0); // Start with the first project
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const startX = useRef(0);

  const [canEdit, setCanEdit] = useState(false);
  const { userToken } = useSelector((state: any) => state.auth);

  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch projects data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProjects();
        setProjects(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userToken) setCanEdit(true);
    else setCanEdit(false);
  }, [userToken]);

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

  const handleEditProjects = () => {
    navigate("/360-production/admin/edit-projects"); // Navigate to the EditProjects page
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX.current - endX;

    if (diffX > 50) {
      // Swipe left, move to the next project
      handleNext(); // Use the handleNext function to move to the next project
    } else if (diffX < -50) {
      // Swipe right, move to the previous project
      handlePrev(); // Use the handlePrev function to move to the previous project
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="section-title">OUR PROJECTS</h1>
        {/* Edit Partners Button */}
        {canEdit && <ReButton icon={<FaEdit />} onClick={handleEditProjects} />}
      </div>
      <div className="relative w-full mx-auto overflow-hidden">
        <div
          className="flex justify-center items-center h-[450px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
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
              onVideoClick={onVideoClick}
            />
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent border-none text-2xl cursor-pointer text-white z-10 "
          onClick={handlePrev}
          hidden={projects.length === 0}
        >
          ‹
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent border-none text-2xl cursor-pointer text-white z-10"
          onClick={handleNext}
          hidden={projects.length === 0}
        >
          ›
        </button>
      </div>
      <Stats />
    </>
  );
}

export default OurProjects;
