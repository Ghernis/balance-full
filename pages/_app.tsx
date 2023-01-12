import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
//import { SessionProvider } from 'next-auth/react';

const MyApp: AppType = ({
    Component,
    pageProps}) => {
    return(
        <>
            <Component {...pageProps} />
        </>
    )
};
export default trpc.withTRPC(MyApp);
