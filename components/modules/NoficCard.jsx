import moment from 'moment';
import Image from 'next/image';

import styles from './NoficCard.module.css';
import Link from 'next/link';

function NoficCard({ message, senderImage, senderUsername, createdAt }) {
    return (
        <div className={styles.container}>
            <Link href={`/explore/${senderUsername}`}>
                <Image src={senderImage} alt={senderUsername} width={50} height={50} />
            </Link>

            <div>
                <Link href={`/explore/${senderUsername}`} className={styles.username}>
                    {senderUsername} <span>{moment(createdAt).fromNow()}</span>
                </Link>
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
}

export default NoficCard;
