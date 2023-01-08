import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@300;400;500;600;800&display=swap" rel="stylesheet" />
            <Head>
                <title>Sistema Balance</title>
                <meta name="description" content="Hernan Gomez" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
