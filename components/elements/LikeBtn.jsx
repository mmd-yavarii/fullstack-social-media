import { BiSolidLike, BiLike } from 'react-icons/bi';

import styles from './Btn.module.css';

import { useState } from 'react';

function LikeBtn({ _id, countLiks }) {
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState(countLiks);

    function likeHandler() {
        setIsLike((prev) => !prev);
        setLikeCount((prev) => (!isLike ? prev + 1 : prev - 1));
    }

    return (
        <button className={`${styles.btn} ${isLike && styles.liked} `} onClick={likeHandler}>
            {isLike ? <BiSolidLike size="1.5rem" /> : <BiLike size="1.5rem" />}
            <span>{likeCount}</span>
        </button>
    );
}

export default LikeBtn;
