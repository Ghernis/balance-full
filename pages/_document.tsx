import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <body>
                <Main />
                <Head>
                    <title>Sistema Balance</title>
                    <meta name="description" content="Hernan Gomez" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@100;200;300;400;500;600;800&display=swap" rel="stylesheet" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <NextScript />
            </body>
        </Html>
    )
}
