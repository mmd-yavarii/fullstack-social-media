import Image from 'next/image';
import styles from './UserCard.module.css';
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb';
import Link from 'next/link';

function UserCard({ disabledLink = false, name, username, image, blueTick }) {
    const content = (
        <>
            <Image src={image} alt="" width={50} height={50} />

            <div>
                <p className={styles.username}>
                    <span>{username}</span>
                    {blueTick && <TbRosetteDiscountCheckFilled color="#1c96e8" />}
                </p>
                <span>{name}</span>
            </div>
        </>
    );

    return disabledLink ? (
        <div className={styles.container}>{content}</div>
    ) : (
        <Link href={`/${username}`} className={styles.container}>
            {content}
        </Link>
    );
}

export default UserCard;
