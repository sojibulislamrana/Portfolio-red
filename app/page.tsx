import NavBar from "@/components/sections/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <>
      {/* Global UI chrome */}
      <CustomCursor />
      <BackToTop />

      {/* Navigation */}
      <NavBar />

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
