import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegBookmark } from 'react-icons/fa6';

import { useRouter } from 'next/router';
import Image from 'next/image';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb';

import styles from './UsersProfile.module.css';
import { useEffect, useState } from 'react';
import LoaderBtn from '../elements/LoaderBtn';
import Link from 'next/link';
import UserCard from '../modules/UserCard';

function UsersProfile({ info, posts }) {
    const routter = useRouter();
    const [myOwnInfo, setMyOwnInfo] = useState([]);
    const [session, setSession] = useState('posts');

    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // get followers
    async function fetchFollowInfo(which) {
        const ids = which === 'followers' ? info.followers : which === 'followings' ? info.followings : [];

        if (!ids || !ids.length) return;
        setIsLoading(true);
        try {
            const response = await fetch('/api/explore/find-user', {
                method: 'POST',
                body: JSON.stringify({ idList: ids }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            const users = res.data || [];

            if (which === 'followers') setFollowers(users);
            else if (which === 'followings') setFollowings(users);
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (session === 'followers' && !followers.length) {
            fetchFollowInfo('followers');
        } else if (session === 'followings' && !followings.length) {
            fetchFollowInfo('followings');
        }
    }, [session]);

    //  check user token
    useEffect(() => {
        fetch('/api/auth')
            .then((res) => res.json())
            .then((res) => setMyOwnInfo(res.data));
    }, []);

    return (
        <div className={styles.page}>
            <div>
                {/* user image and info */}
                <div className={styles.infoContainer}>
                    <div className={styles.nav}>
                        <button onClick={() => routter.back()}>
                            <IoMdArrowRoundBack size="1.3rem" />
                        </button>
                        <p>
                            {info.blueTick && <TbRosetteDiscountCheckFilled color="#1c96e8" />}
                            <span>{info.username}</span>
                        </p>
                    </div>

                    <div className={styles.profileImage}>
                        <Image src={info.image} alt={info.username} fill style={{ objectFit: 'cover', borderRadius: '16px' }} />
                    </div>

                    <div className={`${styles.followInfo} blur`}>
                        <div className={session == 'posts' ? styles.selectedSession : ''} onClick={() => setSession('posts')}>
                            <span>posts</span>
                            <span>{posts.length}</span>
                        </div>

                        <div className={session == 'followers' ? styles.selectedSession : ''} onClick={() => setSession('followers')}>
                            <span>followers</span>
                            <span>{info.followers.length}</span>
                        </div>

                        <div className={session == 'followings' ? styles.selectedSession : ''} onClick={() => setSession('followings')}>
                            <span>followings</span>
                            <span>{info.followings.length}</span>
                        </div>
                    </div>
                </div>

                {/* user fullName and bio */}
                <div className={styles.nameAndBio}>
                    <p>{info.name}</p>
                    <p>{info.bio}</p>
                </div>

                {/* follow or message buttons */}
                <div className={styles.followOrMessage}>
                    {myOwnInfo._id == info._id ? (
                        <>
                            <Link href="/settings">
                                Settings <IoSettingsOutline />
                            </Link>

                            <Link href="/settings">
                                Bookmarks <FaRegBookmark />
                            </Link>
                        </>
                    ) : (
                        <>
                            <LoaderBtn isLoading={false} content="follow" />
                            <button>message</button>
                        </>
                    )}
                </div>
            </div>

            {/* show posts / followers / followings */}
            {isLoading ? (
                <p className="loadingTxt">Loading...</p>
            ) : (
                <div className={styles.showPostOrFollow}>
                    {session === 'posts' ? (
                        posts.length ? (
                            posts.map((i) => <p key={i._id}>{i.content}</p>)
                        ) : (
                            <p>there's no posts</p>
                        )
                    ) : session === 'followers' ? (
                        followers.length ? (
                            followers.map((i) => <UserCard {...i} key={i.id} />)
                        ) : (
                            <p>there's no followers</p>
                        )
                    ) : session === 'followings' ? (
                        followings.length ? (
                            followings.map((i) => <UserCard {...i} key={i.id} />)
                        ) : (
                            <p>there's no followings</p>
                        )
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default UsersProfile;
