import Link from 'next/link';

import { FaRegBell } from 'react-icons/fa';
import { LuMessageSquareText } from 'react-icons/lu';
import { IoMdAddCircle } from 'react-icons/io';

import styles from './HomePage.module.css';
import PostCard from '../modules/PostCard';

function HomePage({ countNotifs, followingPosts }) {
    return (
        <>
            {/* header (buttons for bell and messages) */}
            <header className={`${styles.header}  `}>
                <Link href="">
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                        <FaRegBell size="1.3rem" />
                        {countNotifs > 0 && <span className={styles.notifCounter}>{countNotifs < 9 ? countNotifs : '+9'}</span>}
                    </span>
                </Link>

                <Link href="">
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                        <LuMessageSquareText size="1.3rem" />
                        {false && <span className={styles.notifCounter}>{0}</span>}
                    </span>
                </Link>
            </header>

            {/* stories  */}
            <div className={styles.stories}>
                <Link href="" className={styles.myStory}>
                    <img src="/profiles/4.webp" />
                    <span>
                        <IoMdAddCircle />
                    </span>
                    <p>You</p>
                </Link>

                <Link href="" className={styles.pending}>
                    <img src="/profiles/4.webp" />
                    <p>mmd_yavarii</p>
                </Link>
            </div>

            {/* posts */}
            {followingPosts.length ? (
                followingPosts.map((i) => <PostCard key={i._id} {...i} />)
            ) : (
                <p style={{ textAlign: 'center', opacity: '0.5', marginTop: '30px' }}>هیچ پستی یافت نشد</p>
            )}
        </>
    );
}

export default HomePage;
