"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/avi.jpeg",
    bio: "Former educator with 10+ years experience in EdTech",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/avi.jpeg",
    bio: "AI specialist with a passion for education",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product",
    image: "/avi.jpeg",
    bio: "Product leader focused on user experience",
  },
];

const TeamSection = () => {
  return (
    <SectionWrapper className="py-20 my-20 w-full">
      <div className="container max-w-[80vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Meet Our Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate educators and technologists working together to transform
            education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="relative h-[560px] overflow-hidden rounded-2xl bg-card border">
                <div className="aspect-w-3 aspect-h-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={500}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-4 mt-4"
                  >
                    {[Linkedin, Twitter, Mail].map((Icon, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TeamSection;
