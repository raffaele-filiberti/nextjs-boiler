import React from 'react';
import { Text } from '@flbrt/styled';
import Link from 'next/link';

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
        variant="heading"
        tint="primary"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Enim ducimus, eos atque quibusdam rem eaque qui nesciunt?
        Earum, quasi. Saepe, exercitationem laudantium voluptatibus
        esse accusantium vero incidunt numquam eveniet sunt!
      </Text>
      <Link href="/about">
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
