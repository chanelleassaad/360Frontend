import "./App.css";
import "./styles.css";
import MainView from "./pages/MainView";
import AboutUs from "./pages/AboutUs";
import OurProjects from "./pages/OurProjects";
import ContactUs from "./pages/ContactUs";
import ProjectVideoModal from "./components/template/ProjectVideoModal";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null); // To pass project details

  const handleOpenModal = (project: any) => {
    setActiveProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="App">
        <MainView />
        <section id="about" className="p-10">
          <AboutUs />
        </section>
        <section id="projects" className="p-10">
          <OurProjects onVideoClick={handleOpenModal} />
        </section>
        <section id="contact">
          <ContactUs />
        </section>
      </div>
      {isModalOpen && (
        <ProjectVideoModal
          project={activeProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
