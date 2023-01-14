import type { AppType } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ar-poncho/dist/css/poncho.min.css';
import { trpc } from '../utils/trpc';
import NavBar from '../component/nav';
import Footer from '../component/Footer';
//import { SessionProvider } from 'next-auth/react';

const MyApp: AppType = ({
    Component,
    pageProps}) => {
    return(
        <>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
        </>
    )
};
export default trpc.withTRPC(MyApp);
