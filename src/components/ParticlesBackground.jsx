import { useState } from 'react';
import { motion } from 'framer-motion';

const ParticlesBackground = () => {
  const [particles] = useState(() => {
    const particleCount = 50;
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      initialOpacity: Math.random() * 0.5 + 0.1,
    }));
  });

  return (
    <div id="particles-bg">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: p.initialOpacity,
            x: `${p.x}vw`,
            y: `${p.y}vh`,
          }}
          animate={{
            y: [`${p.y}vh`, `${p.y - 20}vh`, `${p.y}vh`],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: 'var(--color-neon-mint)',
            filter: 'blur(1px)',
            boxShadow: '0 0 10px var(--color-neon-mint)',
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
