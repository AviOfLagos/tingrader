"use client";

import React from "react";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "2021",
    title: "Company Founded",
    description:
      "Started with a vision to revolutionize educational grading systems",
  },
  {
    year: "2022",
    title: "First Major Release",
    description: "Launched our core grading platform with innovative features",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded to serve educational institutions worldwide",
  },
  {
    year: "2024",
    title: "AI Integration",
    description: "Introduced advanced AI-powered grading assistance",
  },
];

const TimelineSection = () => {
  return (
    <section className="p-16 w-full bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Our Journey
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-900" />

          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center justify-between mb-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="w-5/12" />
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 z-10">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-full h-full rounded-full bg-blue-500"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-5/12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                <div className="text-blue-500 font-bold mb-2">
                  {milestone.year}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {milestone.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
