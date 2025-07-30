import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedMeshBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  orbCount?: number;
  showOrbs?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal'; // NEW PROP
}

const AnimatedMeshBackground: React.FC<AnimatedMeshBackgroundProps> = ({ className = '', style = {}, orbCount = 6, showOrbs = true, direction = 'horizontal' }) => {
  let backgroundPositionAnim: string[];
  if (direction === 'horizontal') {
    backgroundPositionAnim = ['0% 0%', '100% 0%'];
  } else if (direction === 'vertical') {
    backgroundPositionAnim = ['0% 0%', '0% 100%'];
  } else {
    backgroundPositionAnim = ['0% 0%', '100% 100%'];
  }
  return (
    <>
      {/* Animated Mesh */}
      <motion.div 
        className={`absolute inset-0 opacity-30 pointer-events-none ${className}`}
        animate={{ 
          backgroundPosition: backgroundPositionAnim,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, hsl(var(--primary)) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, hsl(var(--accent)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 40px 40px',
          ...style,
        }}
      />
      {/* Floating Orbs */}
      {showOrbs && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(orbCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() * 0.5 + 0.8, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AnimatedMeshBackground; 