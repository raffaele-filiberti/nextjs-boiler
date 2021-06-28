import React from 'react';
import { Text, Grid } from '@flbrt/styled';
import Link from 'next/link';
import Seo from '~/components/Seo';

type Props = {
  seo?: {
    title: string;
    description: string;
  }
}

const defaultProps = { seo: null };

const Index = ({ seo }: Props): JSX.Element => (
  <Grid
    gap="l"
    align="space-around"
    justifyItems="center"
  >
    <Seo metadata={seo} />
    <Text variant="display">
      HOME
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
      href="/about"
      scroll={false}
      passHref
    >
      <Text
        as="a"
        variant="base"
      >
        Go to About
      </Text>
    </Link>
  </Grid>
);

Index.defaultProps = defaultProps;

export default Index;
