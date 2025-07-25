import { useAlert } from '@/components/modules/AlertProvider';
import NoficCard from '@/components/modules/NoficCard';
import Notifs from '@/models/Notifs';
import Users from '@/models/Users';
import { verifyToken } from '@/utils/auth';
import { connectDb } from '@/utils/connectDb';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function Notifications({ notifs }) {
    const router = useRouter();

    // change is read after mounting
    useEffect(() => {
        fetch('/api/account/read-notifs').then((res) => {});
    }, []);

    return (
        <>
            <div className="backBtn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button onClick={() => router.back()}>
                    <IoMdArrowRoundBack size="1.5rem" />
                </button>
                <p>Notifications</p>
            </div>

            {notifs.length ? (
                notifs.map((i) => <NoficCard key={i._id} {...i} />)
            ) : (
                <p style={{ textAlign: 'center', opacity: '0.5', marginTop: '30px' }}>هیچ نوتیفیکیشنی یافت نشد</p>
            )}
        </>
    );
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const verifyedToken = verifyToken(token);

    if (!verifyedToken) {
        return {
            props: {
                notifs: [],
            },
        };
    }
    try {
        await connectDb();

        const notifs = await Notifs.find({ receiver: verifyedToken._id }).lean();

        const notifsInfo = await Promise.all(
            notifs.map(async (i) => {
                const user = await Users.findOne({ _id: i.sender }, { username: 1, image: 1 }).lean();
                return {
                    ...i,
                    senderUsername: user?.username || 'Unknown',
                    senderImage: user?.image || null,
                };
            })
        );
        const sorted = notifsInfo.sort((a, b) => {
            if (a.isRead !== b.isRead) return a.isRead - b.isRead;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return {
            props: {
                notifs: JSON.parse(JSON.stringify(sorted)),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}
