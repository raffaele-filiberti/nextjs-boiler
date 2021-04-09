import React from 'react';
import { Text } from '@flbrt/styled';
import Link from 'next/link';
import Seo from '~/components/Seo';

type Props = {
  seo?: {
    title: string;
    description: string;
  }
}

const defaultProps = { seo: null };

const About = ({ seo }: Props): JSX.Element => (
  <div>
    <Seo metadata={seo} />
    <Text variant="display">
      ABOUT
    </Text>
    <Text variant="heading">
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
        variant="heading"
      >
        Go back to Home
      </Text>
    </Link>
  </div>
);

About.defaultProps = defaultProps;

export default About;
