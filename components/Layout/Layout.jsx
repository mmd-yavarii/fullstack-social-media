import Link from 'next/link';
import styles from './Layout.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { GoHome, GoHomeFill } from 'react-icons/go';
import { HiOutlineUserCircle, HiUserCircle } from 'react-icons/hi2';
import { BiMessageSquareAdd, BiSolidMessageSquareAdd } from 'react-icons/bi';
import { IoSearchOutline, IoSearchSharp } from 'react-icons/io5';
import { TbMessage, TbMessageFilled } from 'react-icons/tb';

export default function Layout({ children }) {
    const { asPath: path, pathname } = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        fetch('/api/auth')
            .then((res) => {
                setIsLogin(res.status === 200);
            })
            .catch((err) => {
                console.error('Auth check failed:', err);
                setIsLogin(false);
            });
    }, []);

    return (
        <>
            {children}

            {!path.includes('/auth') && (
                <footer className={styles.footer}>
                    <Link replace={true} href="/" className={path == '/' || path == '/notifs' ? styles.selected : null}>
                        {path == '/' || path == '/notifs' ? <GoHomeFill /> : <GoHome />}
                    </Link>

                    <Link replace={true} href="/explore" className={path.includes('/explore') ? styles.selected : null}>
                        {path.includes('/explore') ? <IoSearchSharp /> : <IoSearchOutline />}
                    </Link>

                    <Link replace={true} href={isLogin ? '/new-post' : '/auth/login'} className={path == '/new-post' ? styles.selected : null}>
                        {path == '/new-post' ? <BiSolidMessageSquareAdd /> : <BiMessageSquareAdd />}
                    </Link>

                    {/* <Link replace={true} href={isLogin ? '' : '/auth/login'} className={path == 'mms' ? styles.selected : null}>
                        {path == 'mm' ? <TbMessageFilled /> : <TbMessage />}
                    </Link> */}

                    <Link replace={true} href={isLogin ? '/profile' : '/auth/login'} className={path.includes('/profile') ? styles.selected : null}>
                        {path.includes('/profile') ? <HiUserCircle /> : <HiOutlineUserCircle />}
                    </Link>
                </footer>
            )}
        </>
    );
}
