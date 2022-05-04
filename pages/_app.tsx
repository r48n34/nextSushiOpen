import { RecoilRoot, useRecoilState } from "recoil";
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <RecoilRoot>
      
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description"  content="Just a simple sushi queue watcher." />
        <meta name="author" content="reemo"/>

        <meta property="og:title" content="Sushi queue" />
        <meta property="og:description" content="Just a simple sushi queue watcher." />
        <meta property="og:site_name" content="Sushi queue" />

        <meta name="keywords" content="sushi,queue,call"/>
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </RecoilRoot>
  );
}