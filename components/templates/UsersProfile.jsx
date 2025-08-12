import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegBookmark } from 'react-icons/fa6';

import { useRouter } from 'next/router';
import Image from 'next/image';

import { IoMdArrowRoundBack } from 'react-icons/io';

import styles from './UsersProfile.module.css';
import { useEffect, useState } from 'react';
import LoaderBtn from '../elements/LoaderBtn';
import Link from 'next/link';

function UsersProfile({ info, posts }) {
    const routter = useRouter();
    const [myOwnInfo, setMyOwnInfo] = useState([]);
    const [session, setSession] = useState('posts');

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
                        <p>{info.username}</p>
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
            <div className={styles.showPostOrFollow}>
                {session == 'posts' ? (
                    posts.length ? (
                        posts.map((i) => <p>{i.content}</p>)
                    ) : (
                        <p>there's no posts</p>
                    )
                ) : session == 'followers' ? (
                    posts.length ? (
                        followers.map((i) => <p>{i.username}</p>)
                    ) : (
                        <p>there's no followers</p>
                    )
                ) : session == 'followings' && posts.length ? (
                    followings.map((i) => <p>{i.username}</p>)
                ) : (
                    <p>there's no followings</p>
                )}
            </div>
        </div>
    );
}

export default UsersProfile;
