import React from 'react';
import { Row, Spacer, Text } from '@flbrt/styled';
import { Container, Wrapper, Card, Mask } from './StickyHorizontalSlider.styles';
import Parallax from '../Parallax/Parallax';

const StickyHorizontalSlider = () => (
  <Wrapper id="section-12">
    <Parallax
      speed={0}
      position="sticky"
      target="#section-12"
    >
      <Container
        as={Row}
        forwardedAs={Spacer}
        root={{ top: 'spaceS' }}
        top="spaceL"
        column
      >
        <Spacer root={{ left: 'containerX' }}>
          <Text variant="heading">
            03.
            <br />
            STICKY HORIZONTAL SLIDER
          </Text>
        </Spacer>
        <Mask>
          <Parallax
            speed={0.4}
            target="#section-12"
            direction="horizontal"
          >
            <Row
              wrapped={false}
              as={Spacer}
              left="spaceXL"
              justify="center"
            >
              <div>
                <Card>
                  Card 1
                </Card>
              </div>
              <div>
                <Card>
                  Card 2
                </Card>
              </div>
              <div>
                <Card>
                  Card 3
                </Card>
              </div>
              <div>
                <Card>
                  Card 4
                </Card>
              </div>
              <div>
                <Card>
                  Card 5
                </Card>
              </div>
              <div>
                <Card>
                  Card 6
                </Card>
              </div>
              <div>
                <Card>
                  Card 7
                </Card>
              </div>

            </Row>
          </Parallax>
        </Mask>
      </Container>
    </Parallax>
  </Wrapper>
);

StickyHorizontalSlider.propTypes = {};
StickyHorizontalSlider.defaultProps = {};

export default StickyHorizontalSlider;
