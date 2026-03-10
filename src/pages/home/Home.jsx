import PublicNavbar from "./components/PublicNavbar";
import HeroSection from "./components/HeroSection";
import TrustSection from "./components/TrustSection";
import TopDoctors from "./components/TopDoctors";
import HowItWorks from "./components/HowItWorks";
import FeaturesSection from "./components/FeaturesSection";

import PublicFooter from "./components/PublicFooter";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

const Home = () => {
  return (
    <div className="bg-white">
      <PublicNavbar />

      <div id="home">
        <HeroSection />
      </div>

      <TrustSection />

      <TopDoctors />

      <HowItWorks />

      <div id="services">
        <FeaturesSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>
      <PublicFooter />
    </div>
  );
};

export default Home;
