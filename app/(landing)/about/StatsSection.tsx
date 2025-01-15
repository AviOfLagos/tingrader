"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Star, School } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "50,000+",
      label: "Active Users",
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: "1M+",
      label: "Assignments Graded",
    },
    {
      icon: <School className="w-8 h-8" />,
      value: "500+",
      label: "Educational Institutions",
    },
  ];

  return (
    <div className="py-16  w-full px-4 bg-gradient-to-b bg-gradient-from-t from-primary/20 to-primary rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 bg-gradient-to-t bg-gradient-from-b from-primary to-primary rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-blue-500 mb-4"
              >
                {stat.icon}
              </motion.div>
              <motion.h3
                className="text-4xl font-bold mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
