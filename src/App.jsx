import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Activity from "./components/Activity";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import { db } from "./firebase/config";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    const incrementVisitorCount = async () => {
      const counterRef = doc(db, "visits", "counter");
      await updateDoc(counterRef, {
        count: increment(1),
      });
    };
    incrementVisitorCount();
  }, []);

  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      const counterRef = doc(db, "visits", "counter");
      const snapshot = await getDoc(counterRef);
      setVisitorCount(snapshot.data().count);
    };
    fetchVisitorCount();
  }, []);

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
          <div className="flex flex-col items-left justify-center space-y-4">
            <p className="text-blue-800">Total Visitors: {visitorCount}</p>
          </div>
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
