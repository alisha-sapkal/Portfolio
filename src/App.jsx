import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Activity from "./components/Activity";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import

function App() {
  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />
      <main className="w-full max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-24 py-24 px-4 sm:px-6 lg:px-8"
        >
          <Hero />
          <About />
          <Projects />
          <Activity />
          <Contact />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default App;