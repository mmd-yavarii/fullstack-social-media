import { FaRegCommentDots } from 'react-icons/fa';

import styles from './Btn.module.css';

function PostComentsBtn({ _id, commentCount }) {
    return (
        <button className={styles.btn}>
            <FaRegCommentDots size="1.5rem" />
            <span>{commentCount}</span>
        </button>
    );
}

export default PostComentsBtn;
