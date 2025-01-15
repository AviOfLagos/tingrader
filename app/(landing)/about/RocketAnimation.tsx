"use client";

import { motion } from 'framer-motion';

const RocketAnimation = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <motion.svg
        viewBox="0 0 400 600"
        className="w-full h-auto"
        initial="hidden"
        animate="visible"
      >
        {/* Stars background */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 400}
            cy={Math.random() * 600}
            r={1.5}
            fill="currentColor"
            className="text-primary"
            initial={{ opacity: 0.2 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Rocket */}
        <motion.g
          initial={{ y: 300 }}
          animate={{ 
            y: [300, 100, -100],
            rotate: [0, -2, 2, -2, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Rocket body */}
          <motion.path
            d="M200,300 L220,400 L180,400 Z"
            fill="currentColor"
            className="text-primary"
          />
          <motion.path
            d="M190,380 L210,380 L200,420 Z"
            fill="currentColor"
            className="text-primary/80"
          />
          
          {/* Rocket window */}
          <circle
            cx="200"
            cy="350"
            r="10"
            className="text-background"
            fill="currentColor"
          />

          {/* Flame */}
          <motion.path
            d="M190,400 Q200,440 210,400"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-orange-500"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 1],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.g>

        {/* Trail */}
        <motion.path
          d="M200,300 Q200,450 200,600"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          className="text-primary/20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.svg>
    </div>
  );
};

export default RocketAnimation;