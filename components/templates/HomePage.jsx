import Link from 'next/link';
import Image from 'next/image';

import { FaRegBell } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';

import styles from './HomePage.module.css';
import PostCard from '../modules/PostCard';

function HomePage({ countNotifs, followingPosts, user }) {
    return (
        <>
            {/* header (buttons for bell and messages) */}
            <header className={`${styles.header}  `}>
                <Link href="/notifs">
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                        <FaRegBell size="1.5rem" />
                        {countNotifs > 0 && <span className={styles.notifCounter}>{countNotifs < 9 ? countNotifs : '+9'}</span>}
                    </span>
                </Link>

                <p style={{ fontWeight: 900 }}>Home</p>
            </header>

            {/* stories  */}
            <div className={styles.stories}>
                <Link href="" className={`${styles.myStory} ${false && styles.pending}`}>
                    <Image src={user.image} width={70} height={70} alt="user story" />

                    {!false && (
                        <span>
                            <IoMdAddCircle />
                        </span>
                    )}
                    <p>You</p>
                </Link>

                <Link href="" className={styles.pending}>
                    <Image src="/profiles/4.webp" width={70} height={70} alt="user story" />
                    <p>mmd_yavarii</p>
                </Link>
            </div>

            {/* posts */}
            <div className={styles.posts}>
                {followingPosts.length ? (
                    followingPosts.map((i) => <PostCard key={i._id} {...i} />)
                ) : (
                    <p style={{ textAlign: 'center', opacity: '0.5', marginTop: '30px' }}>هیچ پستی یافت نشد</p>
                )}
            </div>
        </>
    );
}

export default HomePage;
