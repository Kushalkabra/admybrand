import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import AnimatedMeshBackground from './ui/AnimatedMeshBackground';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      company: 'GrowthTech',
      avatar: '👩‍💼',
      rating: 5,
      text: 'ADmyBRAND AI Suite revolutionized our content creation process. We\'re now producing 10x more high-quality content in half the time. Our engagement rates have skyrocketed by 400%!',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Digital Marketing',
      company: 'E-commerce Pro',
      avatar: '👨‍💻',
      rating: 5,
      text: 'The AI-powered campaign optimization is incredible. Our ROAS improved by 250% in just 2 months. The automated A/B testing and smart bidding saved us countless hours while maximizing results.',
    },
    {
      name: 'Emily Watson',
      role: 'Brand Manager',
      company: 'Fashion Forward',
      avatar: '👩‍🔬',
      rating: 5,
      text: 'Finally, a tool that understands our brand voice! The AI creates content that sounds exactly like us, across all channels. Our brand consistency score improved from 60% to 95%.',
    },
    {
      name: 'James Liu',
      role: 'CMO',
      company: 'StartupGrow',
      avatar: '👨‍🎯',
      rating: 5,
      text: 'As a small team, ADmyBRAND gave us superpowers. We\'re competing with enterprise marketing teams now. Lead generation increased 300% and our cost per acquisition dropped by 60%.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % testimonials.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

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

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
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
              <Star size={16} className="text-yellow-400" />
              <span className="text-muted-foreground">Customer Stories</span>
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            {(() => {
              const [swap, setSwap] = React.useState(false);
              React.useEffect(() => {
                const interval = setInterval(() => setSwap(s => !s), 2000);
                return () => clearInterval(interval);
              }, []);
              return (
                <>
                  <motion.span
                    animate={{ color: swap ? 'var(--gradient-from)' : 'var(--foreground)' }}
                    transition={{ duration: 1.2 }}
                    className={swap ? 'text-gradient' : 'text-foreground'}
                  >
                   Loved by Marketing Teams
                  </motion.span>
                  <br />
                  <motion.span
                    animate={{ color: swap ? 'var(--foreground)' : 'var(--gradient-from)' }}
                    transition={{ duration: 1.2 }}
                    className={!swap ? 'text-gradient' : 'text-foreground'}
                  >
                    Worldwide
                  </motion.span>
                </>
              );
            })()}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
           Don't just take our word for it. See what marketing leaders 
           are saying about ADmyBRAND  Suite's impact on their growth.
          </motion.p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-4xl mx-auto mb-12"
        >
          <div className="glass-card p-8 sm:p-12 rounded-2xl">
            <div className="flex items-start mb-6">
              <Quote size={32} className="text-primary opacity-50 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg sm:text-xl text-foreground leading-relaxed mb-6"
                >
                  "{testimonials[currentIndex].text}"
                </motion.p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-muted-foreground">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="hidden sm:flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevTestimonial}
                      className="glass border-glass-border hover:bg-secondary"
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextTestimonial}
                      className="glass border-glass-border hover:bg-secondary"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: '4.9/5', label: 'Average Rating' },
            { number: '10,000+', label: 'Happy Customers' },
            { number: '99%', label: 'Would Recommend' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;