import React, { useContext } from 'react';
import { Col, Row, Spacer, Text } from '@flbrt/styled';
import Link from 'next/link';
import Parallax from '../components/Parallax/Parallax';
import Chapter from '../components/Chapter/Chapter';
import ScrollbarContext from '../context/Scrollbar';
import {
  SpanBlock,
  Hero,
  Version,
  Divider,
  SlideUp,
  Line,
  Bubble,
  StickyWrapper,
  StickyTarget,
  StickyContent,
} from '../styles/common';

export default function Index() {
  const { scrollTo } = useContext(ScrollbarContext);

  return (
    <div>
      <Hero
        as={Row}
        root={['spaceM', 'n']}
        align="end"
      >
        <Text variant="display">
          <Parallax
            as={SpanBlock}
            position="top"
            speed={0.1}
          >
            FLBRT
          </Parallax>
          <Parallax
            as={Version}
            position="top"
            speed={0.4}
          >
            &#172;
          </Parallax>
          <br />
          <Parallax
            as={SpanBlock}
            position="top"
            speed={0.05}
          >
            SCROLLBAR
          </Parallax>
          <br />
          <Parallax
            as={Version}
            position="top"
            speed={0.3}
          >
            V
          </Parallax>
          <Parallax
            as={Version}
            position="top"
            speed={0.4}
          >
            1
          </Parallax>
          <Parallax
            as={Version}
            position="top"
          >
            .
          </Parallax>
          <Parallax
            as={Version}
            position="top"
            speed={0.2}
          >
            0
          </Parallax>
        </Text>
      </Hero>
      <Divider />
      <Row
        as={Spacer}
        root={['spaceL', 'n', 'spaceXL']}
      >
        <Col
          as={SlideUp}
          col={5}
        >
          <Text as="p">
            A Simple scrollbar component used by me.
            <br />
            It works on top of framer motion!
            <br />
            It provides smooth scrolling with support for parallax effects,
            toggling classes, and triggering event listeners when elements
            are in the viewport.
          </Text>
        </Col>
        <Col
          col={6}
          margin={1}
        >
          <Row column>
            <Row
              as={Line}
              justify="between"
              onClick={() => scrollTo('section-1')}
            >
              <span>01.SPEED CONTROL</span>
              <span>↓</span>
            </Row>
            <Row
              as={Line}
              justify="between"
              onClick={() => scrollTo('section-2')}
            >
              <span>Section 2</span>
              <span>↓</span>
            </Row>
            <Row
              as={Line}
              justify="between"
              onClick={() => scrollTo('section-3')}
            >
              <span>Section 3</span>
              <span>↓</span>
            </Row>
            <Row
              as={Line}
              justify="between"
              onClick={() => scrollTo('section-4')}
            >
              <span>Section 4</span>
              <span>↓</span>
            </Row>
          </Row>
        </Col>
      </Row>
      <div id="section-1">
        <Row justify="between">
          <Col
            col={4}
            style={{ paddingTop: '35vh' }}
          >
            <Parallax
              as={Spacer}
              top="spaceS"
              speed={-0.2}
            >
              <Text variant="heading">
                01.
                <br />
                SPEED CONTROL
              </Text>
              <Text>
                Each element can be animated at a different speed.
                You get to choo-choo-choose!
              </Text>
            </Parallax>
          </Col>
          <Col col={7}>
            <Parallax
              speed={0.2}
              style={{ position: 'relative' }}
            >
              <div style={{ overflow: 'hidden', fontSize: 0 }}>
                <img
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                  }}
                  src="/01.jpg"
                  alt=""
                />
              </div>
              <Text>Speed 2x</Text>
              <Bubble
                as={Parallax}
                speed={0.4}
              >
                4x
              </Bubble>
            </Parallax>
          </Col>
        </Row>
        <Row
          justify="between"
          align="end"
        >
          <Col col={4}>
            <Parallax speed={0.4}>
              <div style={{ overflow: 'hidden', fontSize: 0 }}>
                <Parallax speed={-0.15}>
                  <img
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                    }}
                    src="/02.jpg"
                    alt=""
                  />
                </Parallax>
              </div>
            </Parallax>
          </Col>
          <Col col={4}>
            <Parallax speed={0.6}>
              <div style={{ overflow: 'hidden', fontSize: 0 }}>
                <Parallax speed={-0.2}>
                  <img
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                    }}
                    src="/01.jpg"
                    alt=""
                  />
                </Parallax>
              </div>
            </Parallax>
          </Col>
        </Row>
      </div>
      <div id="section-2">
        <Row
          justify="between"
          style={{ paddingBottom: '50vh' }}
        >
          <Col
            col={4}
            style={{ paddingTop: '35vh' }}

          >
            <Parallax
              as={Spacer}
              top="spaceS"
              speed={0}
              position="sticky"
              target="#section-2"
            >
              <Text variant="heading">
                02.
                <br />
                FIXED ELEMENTS
              </Text>
              <Text>
                Create slides that stick and untick to the viewport while scrolling through.
              </Text>
            </Parallax>
          </Col>
          <Col col={7}>
            <StickyWrapper>
              <StickyTarget id="sticky-target" />
              <StickyContent>
                <img
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                  }}
                  src="/01.jpg"
                  alt=""
                />
              </StickyContent>
            </StickyWrapper>
          </Col>
        </Row>
      </div>
      <Link
        href="/about"
        scroll={false}
        passHref
      >
        <Text
          as="a"
          variant="heading"
        >
          Go to About
        </Text>
      </Link>
    </div>
  );
}
