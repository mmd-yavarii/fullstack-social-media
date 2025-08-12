import connectDb from '@/utils/connectDb';

export default function Home() {
    return (
        <>
            <h1>hello</h1>
        </>
    );
}

export async function getServerSideProps(context) {
    try {
        await connectDb();

        return {
            props: {},
        };
    } catch (err) {
        console.error(err);
        return {
            redirect: {
                destination: '/connection-err-page',
                permanent: false,
            },
        };
    }
}
