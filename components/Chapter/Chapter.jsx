import React, { useCallback } from 'react';
import { Spacer } from '@flbrt/styled';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const chapterVariants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
  exit: {},
};

const variants = {
  initial: { y: '100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 1,
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.5,
    },
  },
};

const Chapter = () => {
  const { ref, inView } = useInView({ rootMargin: '0px 0px -10% 0px' });

  const addParagraphLines = useCallback(() => {
    const paragraph = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.\n
    Vitae quos pariatur blanditiis dolore dignissimos repellat\n
    accusamus accusantium nisi qui, eveniet et tempora id nesciunt\n
    similique repellendus quisquam? Ratione, est accusamus.
    `;

    return paragraph
      .trim()
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => (
        <motion.p
          variants={variants}
          style={{ willChange: 'transform' }}
          key={s}
        >
          {s}
        </motion.p>
      ));
  }, []);

  return (
    <Spacer
      top="chapterY"
      as={motion.div}
      variants={chapterVariants}
      animate={inView ? 'animate' : 'exit'}
      initial="initial"
      ref={ref}
    >
      <motion.h2
        variants={variants}
        style={{ willChange: 'transform' }}
      >
        Header inside viewport
      </motion.h2>
      <div>
        {addParagraphLines()}
      </div>
    </Spacer>
  );
};

export default Chapter;
