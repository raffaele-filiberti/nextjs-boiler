import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { motion, useTransform } from 'framer-motion';
import ScrollbarContext from '../../context/Scrollbar';

const Parallax = ({ children, className, speed }) => {
  const ref = useRef();

  const { scrollY } = useContext(ScrollbarContext);

  const y = useTransform(
    scrollY,
    (value) => value * speed,
  );

  return (
    <motion.div
      className={className}
      ref={ref}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

Parallax.propTypes = {
  children: childrenPreset.isRequired,
  className: PropTypes.string,
  speed: PropTypes.number,
};
Parallax.defaultProps = {
  className: null,
  speed: 0.1,
};

export default Parallax;
