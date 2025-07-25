import Image from 'next/image';

import styles from './Profiles.module.css';

import { IoArrowBack } from 'react-icons/io5';
import { VscSettings } from 'react-icons/vsc';
import { BiAt } from 'react-icons/bi';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import PostCard from '../modules/PostCard';
import UserCard from '../modules/UserCard';

function ProfilePage({ userInfo, userPosts, followers, following }) {
    const { username, bio, fullName, image } = userInfo;

    const router = useRouter();
    const [activeTab, setActiveTab] = useState('posts'); // posts / followers / following

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

                        <Link href="/profile/setting">
                            <VscSettings size="1.5rem" />
                        </Link>
                    </div>

                    <Image src={image} alt="Profile Image" fill sizes="(max-width: 768px) 100vw, 410px" />

                    {/* followers and posts ionfo */}
                    <div className={`${styles.profileInfo} blur`}>
                        <div onClick={() => setActiveTab('followers')} className={activeTab === 'followers' ? styles.activeTab : null}>
                            <span>Followers</span>
                            <span>{followers.length}</span>
                        </div>

                        <div onClick={() => setActiveTab('following')} className={activeTab === 'following' ? styles.activeTab : null}>
                            <span>Following</span>
                            <span>{following.length}</span>
                        </div>

                        <div onClick={() => setActiveTab('posts')} className={activeTab === 'posts' ? styles.activeTab : null}>
                            <span>Posts</span>
                            <span>{userPosts.length}</span>
                        </div>
                    </div>
                </div>

                {/* bio and name */}
                {bio.length || fullName.length ? (
                    <div className={styles.personamInfo}>
                        <p style={{ fontWeight: '900', fontSize: '1.1rem' }}> {fullName}</p>
                        <p>{bio}</p>
                    </div>
                ) : (
                    <Link href="/profile/edit-profile" className={styles.editUserPage}>
                        برای تکمیل اطلاعات کلیک کنید
                    </Link>
                )}
            </div>

            {/* posts / followers / followings */}
            {activeTab === 'posts' &&
                (userPosts.length ? (
                    userPosts.map((i) => <PostCard key={i._id} {...i} />)
                ) : (
                    <div className={styles.shareNewPost}>
                        <BiAt size="2rem" />
                        <p>هنوز پستی وجود ندارد!</p>
                        <Link href="/new-post">برای ایجاد اولین پست کلیک کنید</Link>
                    </div>
                ))}

            {activeTab === 'followers' &&
                (followers.length ? (
                    followers.map((i) => <UserCard key={i._id} {...i} />)
                ) : (
                    <div className={styles.shareNewPost}>
                        <p style={{ textAlign: 'center', opacity: '0.5', marginTop: '30px' }}>هنوز دنبال‌کننده‌ای وجود ندارد!</p>
                    </div>
                ))}

            {activeTab === 'following' &&
                (following.length ? (
                    following.map((i) => <UserCard key={i._id} {...i} />)
                ) : (
                    <div className={styles.shareNewPost}>
                        <p style={{ textAlign: 'center', opacity: '0.5', marginTop: '30px' }}>هنوز کسی را دنبال نکرده‌اید!</p>
                    </div>
                ))}
        </div>
    );
}

export default ProfilePage;
