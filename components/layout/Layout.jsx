import Image from 'next/image';

import { useEffect, useState } from 'react';
import styles from './Layout.module.css';

import { GoHome, GoHomeFill } from 'react-icons/go';
import { HiOutlineUserCircle, HiUserCircle } from 'react-icons/hi2';
import { BiMessageSquareAdd, BiSolidMessageSquareAdd } from 'react-icons/bi';
import { IoSearchOutline, IoSearchSharp } from 'react-icons/io5';
import { TbMessage, TbMessageFilled } from 'react-icons/tb';

import Link from 'next/link';
import { useRouter } from 'next/router';

function Layout({ children }) {
    const [loggedInUser, setLoggedInUser] = useState(false);
    const { asPath: path } = useRouter();

    useEffect(() => {
        fetch('/api/auth')
            .then((res) => res.json())
            .then((res) => setLoggedInUser(res.data));
    }, []);

    return (
        <div>
            {children}

            {!path.includes('/auth') && (
                <footer className={styles.footer}>
                    {/* home */}
                    <Link replace={true} href="/" className={path == '/' ? styles.selected : null}>
                        {path == '/' ? <GoHomeFill /> : <GoHome />}
                    </Link>

                    {/* explore */}
                    <Link replace={true} href="/" className={path == '/' ? styles.selected : null}>
                        {path == '/' ? <IoSearchSharp /> : <IoSearchOutline />}
                    </Link>

                    {/* add new post */}
                    {loggedInUser ? (
                        <Link replace={true} href="/new-post" className={path == '/new-post' ? styles.selected : null}>
                            {path == '/new-post' ? <BiSolidMessageSquareAdd /> : <BiMessageSquareAdd />}
                        </Link>
                    ) : (
                        <Link href="/auth/login">
                            <BiMessageSquareAdd />
                        </Link>
                    )}

                    {/* message */}
                    {loggedInUser ? (
                        <Link replace={true} href="/" className={path == '/' ? styles.selected : null}>
                            {path == '/' ? <TbMessageFilled /> : <TbMessage />}
                        </Link>
                    ) : (
                        <Link href="/auth/login">
                            <TbMessage />
                        </Link>
                    )}

                    {/* profile */}
                    {loggedInUser ? (
                        <Link
                            className={path == `/${loggedInUser.username}` ? styles.selectedProf : null}
                            replace={true}
                            href={`/${loggedInUser.username}`}
                        >
                            <Image src={loggedInUser.image} alt="prof" width={30} height={30} />
                        </Link>
                    ) : (
                        <Link href="/auth/login">
                            <Image src="/profiles/default-profile.jpg" alt="prof" width={30} height={30} />
                        </Link>
                    )}
                </footer>
            )}
        </div>
    );
}

export default Layout;
