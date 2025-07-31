import { BiSolidLike, BiLike } from 'react-icons/bi';

import styles from './Btn.module.css';

import { useEffect, useState } from 'react';

function LikeBtn({ _id, countLiks }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(countLiks);

    // check is liked by user after mounting
    useEffect(() => {
        fetch('/api/like/check-is-liked', {
            method: 'POST',
            body: JSON.stringify({ postId: _id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((res) => setIsLiked(res.isLiked));
    }, []);

    // like a post handler
    async function likeHandler() {
        if (isLiked == null) return;

        const response = await fetch('/api/like/like-toggle', {
            method: 'POST',
            body: JSON.stringify({ postId: _id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();

        if (result.status == 'liked') {
            setIsLiked(true);
            setLikeCount((prev) => prev + 1);
        } else if (result.status == 'unliked') {
            setIsLiked(false);
            setLikeCount((prev) => prev - 1);
        }
    }

    return (
        <button className={`${styles.btn} ${isLiked && styles.liked} `} onClick={likeHandler}>
            {isLiked ? <BiSolidLike size="1.5rem" /> : <BiLike size="1.5rem" />}
            <span>{likeCount}</span>
        </button>
    );
}

export default LikeBtn;
