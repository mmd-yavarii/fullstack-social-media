import Image from 'next/image';

import styles from './ProfilePage.module.css';
import PostCard from '../modules/PostCard';

import { IoArrowBack } from 'react-icons/io5';
import { VscSettings } from 'react-icons/vsc';
import { BiAt } from 'react-icons/bi';

import { useRouter } from 'next/router';
import Link from 'next/link';
import PostList from '../modules/PostList';

function ProfilePage({ userInfo, uerPosts }) {
    const { username, bio, followers, following, fullName, image } = userInfo;

    const router = useRouter();

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
                            <span>{uerPosts.length}</span>
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

            {/* posts */}
            {uerPosts.length ? (
                <PostList posts={uerPosts} />
            ) : (
                <div className={styles.shareNewPost}>
                    <BiAt size="2rem" />
                    <p>هنوز پستی وجود ندارد !</p>
                    <Link href="">برای ایجاد اولین پسن کلیک کنید</Link>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
