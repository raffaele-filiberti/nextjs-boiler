import React from 'react';
import { Text } from '@flbrt/styled';
import Link from 'next/link';
import Parallax from '../components/Parallax/Parallax';
import Chapter from '../components/Chapter/Chapter';

export default function Index() {
  return (
    <div>
      <Text
        variant="display"
        tint="primary"
      >
        Home
      </Text>
      <Text
        as="p"
        variant="heading"
        tint="primary"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Enim ducimus, eos atque quibusdam rem eaque qui nesciunt?
        Earum, quasi. Saepe, exercitationem laudantium voluptatibus
        esse accusantium vero incidunt numquam eveniet sunt!
      </Text>
      <div style={{ paddingTop: '100vh' }} />
      <Chapter />
      <Parallax>
        <Chapter />
      </Parallax>
      <div style={{ paddingTop: '100vh' }} />
      <Chapter />
      <div style={{ paddingTop: '100vh' }} />
      <Link
        href="/about"
        scroll={false}
        passHref
      >
        <Text
          as="a"
          variant="heading"
          tint="primary"
        >
          Go to About
        </Text>
      </Link>
    </div>
  );
}
