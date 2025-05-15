import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaTools, FaDatabase } from "react-icons/fa";

export default function About() {
  const skills = [
    {
      icon: <FaCode className="text-3xl" />,
      title: "Frontend Development",
      description:
        "React, Vue.js, TypeScript, Tailwind CSS, and modern JavaScript (ES6+)",
    },
    {
      icon: <FaServer className="text-3xl" />,
      title: "Backend Development",
      description: "Node.js, Express, Python, Django, and RESTful API design",
    },
    {
      icon: <FaDatabase className="text-3xl" />,
      title: "Database & Cloud",
      description: "MongoDB, PostgreSQL, Firebase, AWS, and Docker",
    },
    {
      icon: <FaTools className="text-3xl" />,
      title: "Tools & Practices",
      description:
        "Git, CI/CD, Agile methodologies, and Test-Driven Development",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Passionate Full Stack Developer
            </h3>
            <p className="text-gray-600 mb-6">
              I'm a dedicated full-stack developer with a passion for creating
              elegant, efficient, and user-friendly applications. With several
              years of experience in web development, I specialize in building
              modern web applications using cutting-edge technologies.
            </p>
            <p className="text-gray-600 mb-6">
              My approach combines technical expertise with creative
              problem-solving, ensuring that every project I work on is not only
              functional but also provides an exceptional user experience.
            </p>
            <div className="flex gap-4 text-white">
              <a
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  WebkitBackgroundClip: "initial",
                  WebkitTextFillColor: "white",
                }}
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-3 bg-white text-gray-700 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
              >
                View Projects
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{skill.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {skill.title}
                </h4>
                <p className="text-gray-600 text-sm">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
