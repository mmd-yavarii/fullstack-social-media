import Image from 'next/image';

import { IoArrowBack } from 'react-icons/io5';
import { BiAt } from 'react-icons/bi';

import { useRouter } from 'next/router';
import Link from 'next/link';
import PostList from '../modules/PostList';

import styles from './Profiles.module.css';
import { useAlert } from '../modules/AlertProvider';

function OtheUsersPage({ userInfo, usersPosts }) {
    if (!userInfo) return;
    const showAlert = useAlert();

    const { username, _id, image, fullName, following, followers, bio } = userInfo;

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
                            <span>{followers.length}</span>
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
                        {false ? <button>لغو دنبال کردن</button> : <button>دنبال کردن</button>}
                        <button onClick={() => showAlert('failed', 'ویژگی ارسال پیام موقتا غیر فعال است')}>ارسال پیام</button>
                    </div>
                </div>
            </div>

            {/* posts */}
            {usersPosts.length ? (
                <PostList posts={usersPosts} />
            ) : (
                <div className={styles.shareNewPost}>
                    <p>هنوز پستی وجود ندارد !</p>
                </div>
            )}
        </div>
    );
}

export default OtheUsersPage;
