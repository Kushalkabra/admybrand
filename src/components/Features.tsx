import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Shield, 
  Eye, 
  Zap, 
  Lock, 
  Globe, 
  Bot,
  Key,
  AlertTriangle,
  Clock,
  Users
} from 'lucide-react';
import AnimatedMeshBackground from './ui/AnimatedMeshBackground';

// Floating Particle Component
const FloatingParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 bg-primary/30 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

// Enhanced Feature Card Component
const FeatureCard = ({ feature, index }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));

  // Magnetic Assembly Animation Variants
  const magneticVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      rotateX: Math.random() * 360,
      rotateY: Math.random() * 360,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      filter: "blur(0px)",
    }
  };

  const magneticTransition = {
    type: "spring" as const,
    damping: 20,
    stiffness: 100,
    delay: index * 0.2,
    duration: 1.2,
  };

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = event.clientX - centerX;
    const y = event.clientY - centerY;
    
    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={magneticVariants}
      initial="hidden"
      whileInView="visible"
      transition={magneticTransition}
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={() => setHasAppeared(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      className="relative group cursor-pointer"
    >
      {/* Particle Materialization Effect - Only on First Appearance */}
      {!hasAppeared && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/60 rounded-full"
              initial={{
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                opacity: 1,
                scale: Math.random() * 2,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                delay: index * 0.2 + i * 0.05,
                duration: 0.8,
                ease: "easeOut"
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
            />
          ))}
        </div>
      )}
      {/* Magnetic Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, hsl(var(--primary)/0.3) 0%, transparent 60%)`,
        }}
      />
      
      {/* Main Card */}
      <motion.div
        className="relative glass-card p-8 rounded-xl overflow-hidden"
        style={{
          transform: "translateZ(50px)",
        }}
      >
        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <FloatingParticle key={i} delay={i * 0.2} />
            ))}
          </div>
        )}

        {/* Morphing Background Blob */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={isHovered ? {
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(var(--primary)) 180deg, transparent 360deg)`,
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          }}
        />

        {/* Icon Container with 3D Effect */}
        <motion.div 
          className="mb-6 relative z-10"
          style={{ transform: "translateZ(25px)" }}
        >
          <motion.div 
            className="w-12 h-12 glass rounded-lg flex items-center justify-center relative overflow-hidden"
            whileHover={{ 
              scale: 1.1,
              rotateY: 360,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Icon Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
              animate={isHovered ? {
                background: [
                  "radial-gradient(circle, transparent 30%, hsl(var(--primary)/0.2) 70%)",
                  "radial-gradient(circle, hsl(var(--primary)/0.3) 30%, transparent 70%)",
                  "radial-gradient(circle, transparent 30%, hsl(var(--primary)/0.2) 70%)",
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <feature.icon 
              size={24} 
              className={`${feature.color} relative z-10 drop-shadow-lg`} 
            />
          </motion.div>
        </motion.div>

        {/* Content with 3D Transform */}
        <motion.div style={{ transform: "translateZ(25px)" }} className="relative z-10">
          <motion.h3 
            className="text-xl font-semibold mb-4 text-foreground"
            whileHover={{ scale: 1.02 }}
          >
            {feature.title}
          </motion.h3>

          <motion.p 
            className="text-muted-foreground leading-relaxed"
            whileHover={{ scale: 1.01 }}
          >
            {feature.description}
          </motion.p>
        </motion.div>

        {/* Dynamic Border Effect */}
        <motion.div 
          className="absolute inset-0 rounded-xl border border-transparent opacity-0 group-hover:opacity-100"
          animate={isHovered ? {
            background: [
              "linear-gradient(0deg, transparent, hsl(var(--primary)/0.4), transparent)",
              "linear-gradient(90deg, transparent, hsl(var(--primary)/0.4), transparent)",
              "linear-gradient(180deg, transparent, hsl(var(--primary)/0.4), transparent)",
              "linear-gradient(270deg, transparent, hsl(var(--primary)/0.4), transparent)",
              "linear-gradient(360deg, transparent, hsl(var(--primary)/0.4), transparent)",
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            padding: "1px",
          }}
        />

        {/* Ripple Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={isHovered ? {
            background: [
              "radial-gradient(circle at center, transparent 0%, transparent 20%, hsl(var(--primary)/0.1) 21%, transparent 22%)",
              "radial-gradient(circle at center, transparent 0%, transparent 40%, hsl(var(--primary)/0.1) 41%, transparent 42%)",
              "radial-gradient(circle at center, transparent 0%, transparent 60%, hsl(var(--primary)/0.1) 61%, transparent 62%)",
              "radial-gradient(circle at center, transparent 0%, transparent 80%, hsl(var(--primary)/0.1) 81%, transparent 82%)",
              "radial-gradient(circle at center, transparent 0%, transparent 100%)",
            ]
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: Bot,
      title: 'AI Content Generator',
      description: 'Create engaging blog posts, social media content, and ad copy in seconds with our advanced AI.',
      color: 'text-blue-400',
    },
    {
      icon: Eye,
      title: 'Smart Analytics',
      description: 'Get deep insights into campaign performance with AI-powered analytics and predictions.',
      color: 'text-purple-400',
    },
    {
      icon: Zap,
      title: 'Automated Campaigns',
      description: 'Launch and optimize campaigns automatically based on real-time performance data.',
      color: 'text-yellow-400',
    },
    {
      icon: Globe,
      title: 'Multi-Channel Publishing',
      description: 'Publish content across all social platforms, email, and websites from one dashboard.',
      color: 'text-green-400',
    },
    {
      icon: Users,
      title: 'Audience Targeting',
      description: 'Leverage AI to identify and target your ideal customers across all channels.',
      color: 'text-cyan-400',
    },
    {
      icon: Key,
      title: 'Brand Voice AI',
      description: 'Maintain consistent brand voice across all content with our trained AI models.',
      color: 'text-pink-400',
    },
    {
      icon: Clock,
      title: 'Smart Scheduling',
      description: 'Optimal posting times determined by AI analysis of your audience behavior.',
      color: 'text-orange-400',
    },
    {
      icon: AlertTriangle,
      title: 'Performance Alerts',
      description: 'Real-time notifications about campaign performance and optimization opportunities.',
      color: 'text-red-400',
    },
    {
      icon: Shield,
      title: 'Compliance Guard',
      description: 'Ensure all content meets platform guidelines and regulatory requirements automatically.',
      color: 'text-indigo-400',
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Animated Mesh only */}
      <AnimatedMeshBackground showOrbs={false} direction="horizontal" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full text-sm">
              <Users size={16} className="text-primary" />
              <span className="text-muted-foreground">Enterprise Features</span>
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
           Everything You Need for
            <span className="text-gradient block">AI-Powered Marketing</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            From content creation to performance optimization, our AI suite handles 
            every aspect of modern digital marketing automatically.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Ready to secure your infrastructure?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 glass-card px-6 py-3 rounded-lg hover:bg-secondary transition-all duration-300"
          >
            <span>Explore All Features</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;