/* eslint-disable max-len */
import { isArray, isFunction } from '@flbrt/utils/type';
import anime, { AnimeParams } from 'animejs';

export type CustomAnimeParams = {
  delay?: number;
  startDelay?: number;
  duration?: number;
  easing?: string;
};

type CreateAnimeParams = AnimeParams & { removeProperty?: string[] };
type CreateAnimeSetterFn = (params: AnimeParams) => (params: { targets: AnimeParams['targets'] }) => void;
type CreateAnimeFn = (params: CreateAnimeParams) => ({
  targets,
  ...customParams
}: CustomAnimeParams & { targets: AnimeParams['targets'] }) => Promise<void>;

const createAnimeSetter: CreateAnimeSetterFn = (params) => async ({ targets }) => anime.set(targets, params);

const createAnime: CreateAnimeFn = ({
  removeProperty,
  complete,
  ...params
}) => async ({
  targets,
  startDelay,
  ...customParams
}) => anime({
  ...params,
  ...customParams,
  targets,
  complete: isArray(removeProperty)
    ? (anim) => {
      removeProperty.forEach((prop) => {
        anim.animatables.forEach(({ target }) => {
          target.style.removeProperty(prop);
        });
      });
      if (isFunction(complete)) {
        complete(anim);
      }
    }
    : complete,
}).finished;

const createStaggeredWrapper = (fn: any) => ({
  selector = ':scope > *',
  ...params
}: any) => async ({
  targets,
  ...customParams
}) => {
  const newTargets = targets.querySelectorAll(selector);
  return fn(params)({
    targets: newTargets,
    ...customParams,
  });
};

const createStaggeredAnime: CreateAnimeFn = createStaggeredWrapper(createAnime);
const createStaggeredAnimeSetter: CreateAnimeSetterFn = createStaggeredWrapper(createAnimeSetter);

export default {
  fade: {
    initial: createAnimeSetter({
      opacity: 0,
    }),
    enter: createAnime({
      opacity: 1,
      easing: 'easeOutExpo',
      duration: 1000,
    }),
    exit: createAnime({
      opacity: 0,
      easing: 'easeOutExpo',
      duration: 1000,
    }),
  },
  staggeredFade: {
    initial: createStaggeredAnimeSetter({
      opacity: 0,
      translateY: 100,
    }),
    enter: createStaggeredAnime({
      opacity: 1,
      translateY: 0,
      easing: 'easeOutExpo',
      duration: 1000,
      delay: anime.stagger(100),
    }),
    exit: createStaggeredAnime({
      opacity: 0,
      easing: 'easeOutExpo',
      duration: 1000,
      translateY: -100,
      delay: anime.stagger(100),
    }),
  },
  slideUp: {
    initial: createAnimeSetter({
      translateY: '-100%',
    }),
    enter: createAnime({
      translateY: 0,
      easing: 'easeOutExpo',
      duration: 1000,
      removeProperty: ['transform'],
    }),
    exit: createAnime({
      translateY: '-100%',
      easing: 'easeOutExpo',
      duration: 1000,
    }),
  },
  hero: {
    initial: createStaggeredAnimeSetter({
      selector: '[data-anime]',
      translateY: '150%',
      rotate: 15,
      transformOrigin: '0% 100%',
    }),
    enter: createStaggeredAnime({
      selector: '[data-anime]',
      translateY: 0,
      rotate: 0,
      transformOrigin: '0% 100%',
      easing: 'easeOutExpo',
      duration: 1000,
      delay: anime.stagger(100),
    }),
  },
};
