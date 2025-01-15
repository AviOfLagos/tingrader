"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import RocketAnimation from "./RocketAnimation";

const JourneySection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <SectionWrapper className="relative py-20 w-full flex flex-col items-center justify-center ">
      <div className="container max-w-[80vw] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Our Journey to Transform Education
              </h2>
              <p className="text-muted-foreground text-lg">
                From our humble beginnings as an innovative idea in educational
                technology, Tingrader has evolved into a comprehensive platform
                that's reshaping how educators approach assessment and feedback.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="space-y-4 border-l-2 border-primary pl-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground">
                    To empower educators with intuitive tools that make
                    assessment more efficient, consistent, and meaningful while
                    providing students with clearer paths to improvement.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground">
                    A future where technology enhances human connection in
                    education, where feedback is immediate and actionable, and
                    where every student has the opportunity to reach their full
                    potential.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary">
                    Our Values
                  </h3>
                  <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                    <li>Innovation in simplicity</li>
                    <li>Educator-centered design</li>
                    <li>Continuous improvement</li>
                    <li>Inclusive education</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Animation Column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:h-[600px] flex items-center justify-center"
          >
            <RocketAnimation />
          </motion.div>
        </div>
      </div>

    </SectionWrapper>
  );
};

export default JourneySection;
