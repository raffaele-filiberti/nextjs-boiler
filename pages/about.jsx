import React from 'react';
import { Text } from '@flbrt/styled';
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <Text
        variant="display"
        tint="primary"
      >
        About
      </Text>
      <Text
        variant="heading"
        tint="primary"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Enim ducimus, eos atque quibusdam rem eaque qui nesciunt?
        Earum, quasi. Saepe, exercitationem laudantium voluptatibus
        esse accusantium vero incidunt numquam eveniet sunt!
      </Text>
      <div style={{ paddingTop: '100vh' }} />
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
      <div style={{ paddingTop: '100vh' }} />
    </div>
  );
}
