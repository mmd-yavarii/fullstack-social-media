import Image from 'next/image';

import styles from './PostCard.module.css';

import LikeBtn from '../elements/LikeBtn';
import PostComentsBtn from '../elements/PostComentsBtn';
import SaveBtn from '../elements/SaveBtn';
import moment from 'moment';

function PostCard({ authorimage, authorusername, content, _id, createdAt, likes, comments }) {
    return (
        <div className={styles.container}>
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
            </div>
        </div>
    );
}

export default PostCard;
