import React from 'react';
import { Grid, Text } from '@flbrt/styled';
import Link from 'next/link';
import Seo from '~/components/Seo';

type Props = {
  seo?: {
    title: string;
    description: string;
  }
};

const defaultProps = { seo: null };

const About = ({ seo }: Props): JSX.Element => (
  <Grid
    gap="l"
    align="around"
    justifyItems="center"
  >
    <Seo metadata={seo} />
    <Text variant="display">
      ABOUT
    </Text>
    <Text
      variant="base"
      align="center"
    >
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
        Go back to Home
      </Text>
    </Link>
  </Grid>
);

About.defaultProps = defaultProps;

export default About;
