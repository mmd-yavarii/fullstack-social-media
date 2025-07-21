import Link from 'next/link';

import styles from './ProfilePage.module.css';

import { LiaUserEditSolid } from 'react-icons/lia';
import { TbBookmarks } from 'react-icons/tb';
import { IoLogOutOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { IoMdArrowRoundBack } from 'react-icons/io';

function ProfileSettingPage() {
    const router = useRouter();

    async function logoutHandler() {
        const confirmation = confirm('ایا مطمعنی ؟');
        if (!confirmation) return;

        const response = await fetch('/api/auth/logout');
        const result = await response.json();
        alert(result.message);
        if (response.ok) router.replace('/auth/login');
    }

    return (
        <div className={styles.settingContainer}>
            <div className="backBtn">
                <button onClick={() => router.back()}>
                    <IoMdArrowRoundBack size="1.5rem" />
                </button>
            </div>

            <Link href="/profile/edit-profile">
                <LiaUserEditSolid size="1.5rem" />
                <span>ویرایش اطلاعات کاربری</span>
            </Link>

            <Link href="/profile/saved">
                <TbBookmarks size="1.5rem" />
                <span>پست‌های نشانه‌گذاری‌شده</span>
            </Link>

            <button className={styles.logoutBtn} onClick={logoutHandler}>
                <IoLogOutOutline size="1.5rem" />
                <span>خروج از حساب کاربری</span>
            </button>
        </div>
    );
}

export default ProfileSettingPage;
