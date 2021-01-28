import PropTypes from 'prop-types';
import { Spacer } from '@flbrt/styled';
import styled from 'styled-components';
import { InView } from 'react-intersection-observer';

export const Progress = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5px;

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: top;
    background-color: var(--color-primary);
  }
`;

const onChange = (inView, entry) => entry.target.setAttribute('data-in-view', inView);

export const Hero = styled(Spacer)`
  height: 100vh;
`;

export const Divider = styled(InView)`
  border-bottom: 1px solid #4d4d4d;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  
  &[data-in-view="true"] {
    transform: scaleX(1);
  }
`;

Divider.propTypes = {
  rootMargin: PropTypes.string,
  onChange: PropTypes.func,
};
Divider.defaultProps = {
  rootMargin: '0px 0px -15% 0px',
  onChange,
};

export const Line = styled(InView)`
  position: relative;
  line-height: 1;
  padding: .75em 0;
  cursor: pointer;

  &:hover {
    color: #f4511e;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-in-view="true"]:after {
    transform: scaleX(1);
  }
`;

Line.propTypes = {
  rootMargin: PropTypes.string,
  onChange: PropTypes.func,
};
Line.defaultProps = {
  rootMargin: '0px 0px -15% 0px',
  onChange,
};

export const SlideUp = styled(InView)`
  & > * {
    opacity: 0;
    transform: translateY(100%);
    transform-origin: left;
    transition-property: transform, opacity;
    transition-duration: 1s;
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-in-view="true"] > * {
    transform: scaleX(1);
    opacity: 1;
  }
`;

SlideUp.propTypes = {
  rootMargin: PropTypes.string,
  onChange: PropTypes.func,
};

SlideUp.defaultProps = {
  rootMargin: '0px 0px -15% 0px',
  onChange,
};

export const Bubble = styled.div`
  position: absolute;
  top: 30%;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #4d4d4d;
  color: #fff;
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const SpanBlock = styled.span`
  display: inline-block;
`;

export const Version = styled(SpanBlock)`
  color: #f4511e;
`;

export const StickyWrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

export const StickyTarget = styled.div`
  position: absolute;
  top: -100vh;
  bottom: -100vh;
  right: 0;
  left: 0;
`;

export const StickyContent = styled.div`
  height: 100%;
  position: absolute;
  top: -100vh;
  right: 0;
  left: 0;
`;
