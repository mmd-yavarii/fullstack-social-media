import Image from 'next/image';

import styles from './UserCard.module.css';
import Link from 'next/link';

function UserCard({ image, username, fullName }) {
    return (
        <Link href={`/explore/${username}`} className={styles.container}>
            <Image src={image} alt={username} width={60} height={60} style={{ objectFit: 'cover', borderRadius: '50%' }} />

            <div>
                <p>{username}</p>
                <span>{fullName}</span>
            </div>
        </Link>
    );
}

export default UserCard;
