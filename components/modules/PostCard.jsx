import Image from 'next/image';

import styles from './PostCard.module.css';

import LikeBtn from '../elements/LikeBtn';
import PostComentsBtn from '../elements/PostComentsBtn';
import SaveBtn from '../elements/SaveBtn';
import moment from 'moment';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiMessageSquareEdit } from 'react-icons/bi';

import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useAlert } from './AlertProvider';
import Link from 'next/link';
import BtnLoader from '../elements/BtnLoader';
import { PulseLoader } from 'react-spinners';

function PostCard({ authorimage, authorusername, content, _id, createdAt, likes, comments }) {
    const showAlert = useAlert();
    const router = useRouter();
    const post = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const [postContent, setPostContent] = useState(content);
    const [editValue, setEditValue] = useState(postContent);
    const [isLoading, setIsLoading] = useState(false);

    // edit a post by owner handler
    async function editHandler() {
        if (!editValue) {
            showAlert('failed', 'مقداری وارد نشده است');
            return;
        }
        const confirmation = confirm('ایا از تغیرات اطمینان دارید ؟');
        if (!confirmation) return;

        setIsLoading(true);
        const response = await fetch('/api/account/edit-post', {
            method: 'PATCH',
            body: JSON.stringify({ postId: _id, newContent: editValue }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        showAlert(result.status, result.message);
        if (response.ok) {
            setIsEditing(false);
            setPostContent(result.newContent);
        }
        setIsLoading(false);
    }

    // delete a post by post owner
    async function deletePostHandler(event) {
        const confirmation = confirm('از حذف این پست اطمینان دارید ؟');
        if (!confirmation) return;

        const response = await fetch('/api/account/delete-post', {
            method: 'POST',
            body: JSON.stringify({ postId: _id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        showAlert(result.status, result.message);

        if (response.ok) {
            console.log(post);
            post.current.style.display = 'none';
        }
    }

    return (
        <div className={styles.container} ref={post}>
            <div className={styles.postInfo}>
                {/* image and username  */}
                <Link href={router.asPath !== '/profile' ? `/explore/${authorusername}` : ''}>
                    <Image src={authorimage} alt="profile" width={55} height={55} />
                </Link>

                <div>
                    <Link href={router.asPath !== '/profile' ? `/explore/${authorusername}` : ''}>{authorusername}</Link>
                    <span>{moment(createdAt).fromNow()}</span>
                </div>
            </div>

            {/* main test */}
            {isEditing ? (
                <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)}></textarea>
            ) : (
                <p className={styles.mainPostTest}>{postContent} </p>
            )}

            {/* save changes and controler buttons session */}
            {isEditing ? (
                <div className={styles.editBtnContainer}>
                    <button onClick={editHandler}> {isLoading ? <PulseLoader size="0.5rem" color="#fff" /> : 'اعمال تغیرات'}</button>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setEditValue(content);
                        }}
                    >
                        لفو
                    </button>
                </div>
            ) : (
                <div className={styles.controlers}>
                    <LikeBtn _id={_id} countLiks={likes.length} />

                    <PostComentsBtn _id={_id} commentCount={comments.length} />

                    {router.asPath !== '/profile' && <SaveBtn _id={_id} />}

                    {router.asPath === '/profile' && (
                        <>
                            <button className={styles.deleteBtn} onClick={deletePostHandler}>
                                <RiDeleteBinLine size="1.5rem" />
                            </button>

                            <button className={styles.deleteBtn} onClick={() => setIsEditing(true)}>
                                <BiMessageSquareEdit size="1.5rem" />
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default PostCard;
