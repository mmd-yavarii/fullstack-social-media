import Layout from '@/components/Layout/Layout';
import AlertProvider from '@/components/modules/AlertProvider';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <AlertProvider>
                <Component {...pageProps} />
            </AlertProvider>
        </Layout>
    );
}
