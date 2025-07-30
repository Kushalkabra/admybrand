import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import AnimatedMeshBackground from './ui/AnimatedMeshBackground';
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';
import ContactForm from './ContactForm';

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

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

  const accordionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const faqs = [
    {
      question: 'How does ADmyBRAND AI Suite work?',
      answer: 'Our AI Suite analyzes your brand, audience, and market trends to generate personalized content, optimize campaigns, and automate your marketing processes. Simply connect your channels, set your preferences, and let our AI handle the rest.',
    },
    {
      question: 'Can I customize the AI to match my brand voice?',
      answer: 'Absolutely! Our Brand Voice AI learns from your existing content and can be trained on your specific tone, style, and messaging guidelines. The more content you provide, the more accurate your brand voice becomes.',
    },
    {
      question: 'What social media platforms do you support?',
      answer: 'We support all major platforms including Facebook, Instagram, Twitter, LinkedIn, TikTok, YouTube, Pinterest, and more. You can also publish to your website, email campaigns, and other marketing channels from one dashboard.',
    },
    {
      question: 'How much content can the AI generate?',
      answer: 'Content generation depends on your plan. Our Starter plan includes 1,000 AI credits per month, Professional offers 10,000 credits, and Enterprise provides unlimited generation. Each credit typically generates one piece of content.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 14-day free trial with access to all Professional features. No credit card required. You can explore the full platform and see how it transforms your marketing workflow.',
    },
    {
      question: 'Can I integrate with my existing marketing tools?',
      answer: 'Definitely! We integrate with popular tools like HubSpot, Salesforce, Google Analytics, Mailchimp, Zapier, and many more. Our API also allows custom integrations for enterprise customers.',
    },
    {
      question: 'How accurate is the AI-generated content?',
      answer: 'Our AI generates highly accurate, contextually relevant content with a 95% approval rate from our users. The AI continuously learns from performance data to improve content quality and engagement rates.',
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We provide email support for all plans, priority support for Professional users, and dedicated support for Enterprise customers. Our knowledge base, video tutorials, and community forum are available 24/7.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
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
              <HelpCircle size={16} className="text-primary" />
              <span className="text-muted-foreground">Frequently Asked</span>
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Got Questions?
            <span className="text-gradient block">We've Got Answers</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Everything you need to know about ADmyBRAND AI Suite and how it can 
            transform your marketing workflow.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={accordionVariants}
              className="mb-4"
            >
              <motion.div
                className="glass-card rounded-xl overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/20 transition-colors duration-300"
                >
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={24} className="text-primary" />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 border-t border-glass-border">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <Dialog open={open} onOpenChange={setOpen}>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6">
              Still have questions? We're here to help!
            </p>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 glass-card px-6 py-3 rounded-lg hover:bg-secondary transition-all duration-300"
              >
                <span>Contact Support</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.button>
            </DialogTrigger>
          </motion.div>
          <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-lg">
            <ContactForm />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default FAQ; 