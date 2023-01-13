import type { AppType } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ar-poncho/dist/css/poncho.min.css';
import '../component/charts/radar-chart.css';
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
