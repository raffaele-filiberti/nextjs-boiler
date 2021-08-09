import React, { useEffect } from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { addEvent } from '@flbrt/utils/dom';
import { AnimatePresence } from 'framer-motion';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { createUnsubscribeCollection } from '@flbrt/utils';
import GlobalStyles from '~/styles';
import theme from '~/styles/theme';
import { pageview } from '~/lib/gtag';
import Layout from '~/components/Layout';
import breakpoints from '~/styles/breakpoints';
import SEO from '~/next-seo.config';
import { ResponsiveProvider } from '~/context/Responsive';
import { ScrollbarProvider } from '~/context/Scrollbar';
import { NavProvider } from '~/context/Nav';
import Loader from '~/components/Loader/Loader';

const setVh = () => {
  document.documentElement.style.setProperty(
    '--vh',
    `${window.innerHeight * 0.01}px`,
  );
};

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  useEffect(() => {
    const [disposableEvents, callDisposeEvents] = createUnsubscribeCollection();

    const onOrientationChange = () => {
      let removeResize;
      const afterOrientationChange = () => {
        setVh();
        removeResize();
      };
      removeResize = addEvent(window, 'resize', afterOrientationChange);
    };

    const disposeOrientationChange = addEvent(window, 'orientationchange', onOrientationChange);

    disposableEvents.push(disposeOrientationChange);

    if (!('ontouchstart' in window)) {
      const disposeResize = addEvent(window, 'resize', setVh);
      disposableEvents.push(disposeResize);
    }

    setVh();

    document.getElementById('__next').classList.add('app-loaded');

    return callDisposeEvents;
  }, []);

  return (
    <StyleSheetManager disableVendorPrefixes>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ResponsiveProvider breakpoints={breakpoints}>
          <NavProvider>
            <Loader />
            <ScrollbarProvider>
              <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <Layout key={router.route}>
                  <DefaultSeo {...SEO} />
                  <Component {...pageProps} />
                </Layout>
              </AnimatePresence>
            </ScrollbarProvider>
          </NavProvider>
        </ResponsiveProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
