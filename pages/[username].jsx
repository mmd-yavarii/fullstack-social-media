import UsersProfile from '@/components/templates/UsersProfile';
import Posts from '@/models/Posts';
import Users from '@/models/Users';
import connectDb from '@/utils/connectDb';
import { useRouter } from 'next/router';

export default function UserDetails({ info, posts }) {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Loading...</p>;
    }

    return <UsersProfile posts={posts} info={info} />;
}

// create paths for users
export async function getStaticPaths() {
    await connectDb();

    const usernames = await Users.find({}, { username: 1, _id: 0 }).lean();
    const paths = usernames.map((u) => ({
        params: { username: u.username },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

// get user info
export async function getStaticProps(context) {
    const { username } = context.params;

    try {
        await connectDb();

        const info = await Users.findOne({ username }, { password: 0 });
        const posts = await Posts.find({ author: info._id });

        if (!info) {
            return { notFound: true };
        }

        return {
            props: {
                info: JSON.parse(JSON.stringify(info)),
                posts: JSON.parse(JSON.stringify(posts)),
            },

            revalidate: 60 * 5,
        };
    } catch (err) {
        console.error(err);
        return {
            notFound: true,
        };
    }
}
