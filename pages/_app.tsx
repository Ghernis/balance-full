import type { AppType } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ar-poncho/dist/css/poncho.min.css';
import { trpc } from '../utils/trpc';
import NavBar from '../component/nav';
import Footer from '../component/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth'
import type { AppProps } from 'next/app'


const MyApp: AppType = ({
    Component,
    pageProps}: AppProps<{
        session: Session;
    }>) => {
    return(
        <>
            <SessionProvider session={pageProps.session}>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
            </SessionProvider>
        </>
    )
};
export default trpc.withTRPC(MyApp);
