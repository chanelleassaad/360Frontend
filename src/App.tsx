import "./App.css";
import "./styles.css";
import MainView from "./pages/MainView";
import AboutUs from "./pages/AboutUs";
import OurProjects from "./pages/OurProjects";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <div className="App">
      <MainView />
      <section id="about">
        <AboutUs />
      </section>
      <section id="projects">
        <OurProjects />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
    </div>
  );
}

export default App;
