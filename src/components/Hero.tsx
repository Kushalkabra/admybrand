import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import AnimatedMeshBackground from './ui/AnimatedMeshBackground';

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState('');

  const words = ['Smarter', 'Faster', 'Better', 'Globally', 'Efficiently'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Typing animation effect
  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  const floatingIcons = [
    { Icon: Shield, delay: 0, x: 100, y: 50 },
    { Icon: Zap, delay: 2, x: -120, y: 80 },
    { Icon: Lock, delay: 4, x: 150, y: -60 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-bg"></div>
      {/* Animated Mesh and Orbs */}
      <AnimatedMeshBackground direction="horizontal" />

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
            x: [x, x + 20, x],
            y: [y, y - 20, y],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: delay,
            ease: 'easeInOut',
          }}
          style={{ left: `50%`, top: `50%`, transform: `translate(${x}px, ${y}px)` }}
        >
          <Icon size={32} />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-glow"></span>
            <span className="text-sm text-muted-foreground">
            Trusted by 50,000+ marketing teams worldwide
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
               Marketing{' '}
            </motion.span>
            <motion.span
              className="text-gradient relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
            >
              Made
            </motion.span>
            <br />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <span className="text-white font-mono">
                {currentText}
                <motion.span
                  className="inline-block w-1 h-12 bg-white ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </span>

            </motion.span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your marketing strategy with AI-powered tools for content creation, 
          social media management, and data-driven campaigns that convert.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
        >
          <Button
            size="lg"
            className="gradient-primary hover:shadow-glow transition-all duration-300 group px-8 py-4 text-lg"
          >
            Start Free Trial
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="glass border-glass-border hover:bg-secondary px-8 py-4 text-lg"
          >
            Watch Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: '300%', label: 'ROI Increase' },
            { number: '10M+', label: 'Content Pieces' },
            { number: '24/7', label: 'AI Assistant' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by world-recognized brands
          </p>

        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero; 