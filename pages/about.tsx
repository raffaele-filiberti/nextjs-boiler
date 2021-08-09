import React, { useContext } from 'react';
import { Text, Grid, Spacer } from '@flbrt/styled';
import Link from 'next/link';
import Seo from '~/components/Seo';
import Animate from '~/components/Animate';
import animations from '~/animations';
import Parallax from '~/components/Parallax/Parallax';
import Ratio from '~/components/Ratio/Ratio';
import {
  FitAbsolute, FullHeight, ImageCover, ScrollIndicator,
} from '~/styles/common';

import NavContext from '~/context/Nav';
import ScrollbarContext from '~/context/Scrollbar';

type Props = {
  seo?: {
    title: string;
    description: string;
  }
};

const defaultProps = { seo: null };

const About = ({ seo }: Props): JSX.Element => {
  const { isLoading } = useContext(NavContext);
  const { scrollTo } = useContext(ScrollbarContext);
  return (
    <>
      <Seo metadata={seo} />
      <FullHeight
        as={Animate}
        variants={animations.hero}
        enter={!isLoading}
      >
        <FitAbsolute
          as={Parallax}
          speed={-0.1}
          style={{ background: 'black' }}
        >
          <ImageCover
            src="/img01.jpg"
            alt=""
            style={{ opacity: 0.7 }}
          />
        </FitAbsolute>
        <FitAbsolute
          as={Grid}
          gap="xl"
          align="center"
          justify="center"
        >
          <Text
            variant="display"
            align="center"
            tint="white"
            as="h2"
            className="oh"
          >
            <span data-anime>
              About
            </span>
          </Text>
          <Text
            variant="base"
            align="center"
            tint="white"
            className="oh"
          >
            <span data-anime>
              THIS IS AN ABOUT PAGE TO TEST TRANSITIONS
            </span>
          </Text>
        </FitAbsolute>
        <ScrollIndicator
          className="oh"
        >
          <Text
            as="button"
            variant="base"
            align="center"
            tint="white"
            onClick={() => scrollTo('#first-section')}
          >
            <span data-anime>
              DISCOVER
            </span>
          </Text>
        </ScrollIndicator>
      </FullHeight>
      <Spacer
        root={['containerY', 'containerX']}
        id="first-section"
      >
        <Grid
          gap={8}
          as={Animate}
          variants={animations.staggeredFade}
          exit={false}
          triggerInView
        >
          <Text variant="heading">
            Staggered content 2
          </Text>
          <Text variant="base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Sint ipsum iure enim tenetur doloremque nemo nulla?
            Harum, excepturi ut enim animi asperiores accusamus
            eligendi quis eos, at neque nobis. Numquam?
          </Text>
          <Text variant="base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Enim ducimus, eos atque quibusdam rem eaque qui nesciunt?
            Earum, quasi. Saepe, exercitationem laudantium voluptatibus
            esse accusantium vero incidunt numquam eveniet sunt!
          </Text>
          <Text variant="base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Enim ducimus, eos atque quibusdam rem eaque qui nesciunt?
            Earum, quasi. Saepe, exercitationem laudantium voluptatibus
            esse accusantium vero incidunt numquam eveniet sunt!
          </Text>
          <Link
            href="/"
            scroll={false}
            passHref
          >
            <Text
              as="a"
              variant="base"
            >
              Go Home
            </Text>
          </Link>
        </Grid>
      </Spacer>
      <Ratio
        ratio="16:8"
        mask
      >
        <Parallax
          speed={-0.1}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
        >
          <ImageCover
            src="/img01.jpg"
            alt=""
          />
        </Parallax>
      </Ratio>
      <footer>
        Next.js boilerplate
      </footer>
    </>
  );
};

About.defaultProps = defaultProps;

export default About;
