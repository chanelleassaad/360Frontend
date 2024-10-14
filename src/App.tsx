import "./App.css";
import "./styles.css";
import MainView from "./pages/MainView";
import AboutUs from "./pages/AboutUs";
import OurProjects from "./pages/OurProjects";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/organisms/Footer";
import Header from "./components/organisms/Header";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <MainView />
        <section id="about" className="p-10">
          <AboutUs />
        </section>
        <section id="projects" className="p-10">
          <OurProjects />
        </section>
        <section id="contact">
          <ContactUs />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;
