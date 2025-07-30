import { motion } from 'framer-motion';

// Example brand logos (replace with real brand SVGs or images as needed)
const logos = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', alt: 'Microsoft' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', alt: 'Google' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', alt: 'Amazon' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', alt: 'Netflix' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg', alt: 'Spotify' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', alt: 'IBM' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg', alt: 'Facebook' },
];

const DURATION = 18; // seconds for one full scroll

const LogoScroller = () => {
  // Duplicate logos for seamless looping
  const allLogos = [...logos, ...logos];
  return (
    <div className="w-full py-8 bg-background/80 overflow-hidden border-y border-muted">
      <motion.div
        className="flex gap-16 min-w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: DURATION }}
        style={{ willChange: 'transform' }}
      >
        {allLogos.map((logo, idx) => (
          <img
            key={idx}
            src={logo.src}
            alt={logo.alt}
            className="h-12 w-auto grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition duration-300"
            draggable={false}
            style={{ userSelect: 'none' }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoScroller;