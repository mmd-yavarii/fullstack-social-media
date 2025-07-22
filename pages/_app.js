import AlertProvider from '@/components/modules/AlertProvider';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <AlertProvider>
                <Component {...pageProps} />
            </AlertProvider>
        </>
    );
}
