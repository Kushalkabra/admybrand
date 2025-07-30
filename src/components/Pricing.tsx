import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Crown, Zap, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import AnimatedMeshBackground from './ui/AnimatedMeshBackground';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(true);

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      description: 'Perfect for small marketing teams',
      monthlyPrice: 49,
      annualPrice: 490,
      popular: false,
      features: [
        'Up to 5 social accounts',
        'AI content generation',
        'Basic analytics',
        'Email support',
        '1,000 AI credits/month',
        'Brand voice training',
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'outline' as const,
    },
    {
      name: 'Professional',
      icon: Crown,
      description: 'Advanced AI tools for growing brands',
      monthlyPrice: 149,
      annualPrice: 1490,
      popular: true,
      features: [
        'Up to 25 social accounts',
        'Advanced AI content',
        'Smart scheduling',
        'Priority support',
        '10,000 AI credits/month',
        'A/B testing',
        'Custom integrations',
        'Advanced analytics',
        'Campaign automation',
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'default' as const,
    },
    {
      name: 'Enterprise',
      icon: Building,
      description: 'Custom AI solutions for large organizations',
      monthlyPrice: null,
      annualPrice: null,
      popular: false,
      features: [
        'Unlimited social accounts',
        'Custom AI models',
        'Dedicated support',
        'White-label solution',
        'Unlimited AI credits',
        'Custom integrations',
        'SLA guarantees',
        'On-premise deployment',
        'Custom training',
        'Dedicated CSM',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
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
              <Crown size={16} className="text-primary" />
              <span className="text-muted-foreground">Flexible Plans</span>
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
                    Simple, Transparent
                  </motion.span>
                  <br />
                  <motion.span
                    animate={{ color: swap ? 'var(--foreground)' : 'var(--gradient-from)' }}
                    transition={{ duration: 1.2 }}
                    className={!swap ? 'text-gradient' : 'text-foreground'}
                  >
                    Pricing
                  </motion.span>
                </>
              );
            })()}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
             Choose the perfect plan for your marketing team. Scale up or down as needed. 
            All plans include our core AI marketing features.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-4 mb-12"
          >
            <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  isAnnual ? 'transform translate-x-7' : ''
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="text-xs glass-card px-2 py-1 rounded-full text-primary">
                Save 20%
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className={`relative glass-card p-8 rounded-2xl ${
                plan.popular 
                  ? 'ring-2 ring-primary shadow-glow' 
                  : 'hover:shadow-glow'
              } transition-all duration-300`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="gradient-primary px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mx-auto mb-4">
                  <plan.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                {plan.monthlyPrice ? (
                  <>
                    <div className="text-4xl font-bold mb-2">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      <span className="text-lg text-muted-foreground font-normal">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-muted-foreground">
                        ${Math.round((plan.annualPrice || 0) / 12)}/month billed annually
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-4xl font-bold mb-2">Custom</div>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 glass rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                variant={plan.buttonVariant}
                className={`w-full ${
                  plan.popular 
                    ? 'gradient-primary hover:shadow-glow' 
                    : 'glass border-glass-border hover:bg-secondary'
                } transition-all duration-300`}
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Need a custom solution? Our team is here to help.
          </p>
          <Button variant="outline" className="glass border-glass-border hover:bg-secondary">
            Schedule a Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;