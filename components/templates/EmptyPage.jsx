import Image from 'next/image';

import styles from './EmptyPage.module.css';

function EmptyPage() {
    return (
        <div className={styles.container}>
            <Image src="/empty.png" alt="empty" width={100} height={100} />

            <h4>چیزی پیدا نشد</h4>
            <p>فعلاً چیزی برای نمایش وجود ندارد. بعداً دوباره سر بزنید!</p>
        </div>
    );
}

export default EmptyPage;
