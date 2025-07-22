import Image from 'next/image';

import styles from './PostCard.module.css';

import LikeBtn from '../elements/LikeBtn';
import PostComentsBtn from '../elements/PostComentsBtn';
import SaveBtn from '../elements/SaveBtn';
import moment from 'moment';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useAlert } from './AlertProvider';

function PostCard({ authorimage, authorusername, content, _id, createdAt, likes, comments }) {
    const showAlert = useAlert();
    const router = useRouter();
    const post = useRef();

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
                <Image src={authorimage} alt="profile" width={55} height={55} />

                <div>
                    <p>{authorusername}</p>
                    <span>{moment(createdAt).fromNow()}</span>
                </div>
            </div>

            <p className={styles.mainPostTest}>{content} </p>

            <div className={styles.controlers}>
                <LikeBtn _id={_id} countLiks={likes.length} />

                <PostComentsBtn _id={_id} commentCount={comments.length} />

                <SaveBtn _id={_id} />

                {router.asPath === '/profile' && (
                    <button className={styles.deleteBtn} onClick={deletePostHandler}>
                        <RiDeleteBinLine size="1.5rem" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default PostCard;
