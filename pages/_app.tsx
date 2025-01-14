import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import Head from 'next/head';
import { AppProps } from 'next/app';
import { RecoilRoot } from "recoil";
import { ClickToComponent } from 'click-to-react-component'

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <RecoilRoot>

            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="description" content="Just a simple sushi queue watcher." />
                <meta name="author" content="reemo" />
                <title>Sushi queue</title>
                <link rel='manifest' href='/manifest.json' />
                <link rel="icon" type="image/png" sizes="96x96" href="/icons/icon-192x192.png"></link>

                <meta name='theme-color' content='#1a1b1e' />

                <meta property="og:title" content="Sushi queue" />
                <meta property="og:description" content="Just a simple sushi queue watcher." />
                <meta property="og:site_name" content="Sushi queue" />

                <meta name="keywords" content="sushi,queue,call" />
            </Head>

            <MantineProvider>
                <ClickToComponent />
                <Notifications />
                <Component {...pageProps} />
            </MantineProvider>

        </RecoilRoot>
    );
}