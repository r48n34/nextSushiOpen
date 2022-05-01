import { RecoilRoot, useRecoilState } from "recoil";

import Head from 'next/head';
import { AppProps } from 'next/app';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import './styles.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <RecoilRoot>
    <CacheProvider value={emotionCache}>

      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description"  content="Just a simple sushi queue watcher." />
        <meta name="author" content="reemo"/>

        <meta property="og:title" content="Sushi queue" />
        <meta property="og:description" content="Just a simple sushi queue watcher." />
        <meta property="og:site_name" content="Sushi queue" />

        <meta name="keywords" content="sushi,queue,call"/>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>

    </CacheProvider>
    </RecoilRoot>
  );
}
