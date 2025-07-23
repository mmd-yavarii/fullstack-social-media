import Image from 'next/image';

import { IoArrowBack } from 'react-icons/io5';

import { useRouter } from 'next/router';
// import PostList from '../modules/PostList';

import styles from './Profiles.module.css';
import { useAlert } from '../modules/AlertProvider';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import PostCard from '../modules/PostCard';

function OtherUsersPage({ userInfo, usersPosts, followerId }) {
    if (!userInfo) return;

    const showAlert = useAlert();
    const router = useRouter();
    const { username, _id, image, fullName, following, followers, bio } = userInfo;

    const [isLoading, setIsLoading] = useState(false);
    const [followersList, setFollowersList] = useState(followers);

    // follow and unfollow user handler
    async function toggleFollow() {
        const confimation = followersList.includes(followerId) ? confirm(`مطمئنی می‌خوای ${username} رو آنفالو کنی؟`) : true;
        if (!confimation || isLoading) return;

        setIsLoading(true);
        const response = await fetch('/api/account/follow-other-toggle', {
            method: 'POST',
            body: JSON.stringify({ followingId: _id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        showAlert(result.status, result.message);
        setFollowersList((prev) => (prev.includes(followerId) ? prev.filter((id) => id !== followerId) : [...prev, followerId]));
        setIsLoading(false);
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.profileImage}>
                    {/* profile and some images */}
                    <div className={styles.controls}>
                        <button onClick={() => router.back()}>
                            <IoArrowBack size="1.5rem" />
                        </button>

                        <p>{username}</p>
                    </div>

                    <Image src={image} alt="Profile Image" fill sizes="(max-width: 768px) 100vw, 410px" />

                    {/* followers and posts ionfo */}
                    <div className={`${styles.profileInfo} blur`}>
                        <div>
                            <span>Followers</span>
                            <span>{followersList.length}</span>
                        </div>

                        <div>
                            <span>Following</span>
                            <span>{following.length}</span>
                        </div>

                        <div>
                            <span>Posts</span>
                            <span>{usersPosts.length}</span>
                        </div>
                    </div>
                </div>

                {/* bio and name and follow btn */}
                <div className={styles.personamInfo}>
                    <p style={{ fontWeight: '900', fontSize: '1.1rem' }}> {fullName}</p>
                    <p>{bio}</p>

                    <div className={styles.followAndMessageSession}>
                        <button onClick={toggleFollow}>
                            {isLoading ? (
                                <PulseLoader size="0.4rem" color="#ffff" />
                            ) : followersList.includes(followerId) ? (
                                'لغو دنبال کردن'
                            ) : (
                                'دنبال کردن'
                            )}
                        </button>
                        <button onClick={() => showAlert('failed', 'ویژگی ارسال پیام موقتا غیر فعال است')}>ارسال پیام</button>
                    </div>
                </div>
            </div>

            {/* posts */}
            {usersPosts.length ? (
                usersPosts.map((i) => <PostCard key={i._id} {...i} />)
            ) : (
                <div className={styles.shareNewPost}>
                    <BiAt size="2rem" />
                    <p>هنوز پستی وجود ندارد!</p>
                    <Link href="/new-post">برای ایجاد اولین پست کلیک کنید</Link>
                </div>
            )}
        </div>
    );
}

export default OtherUsersPage;
