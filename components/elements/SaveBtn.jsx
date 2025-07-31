import { useEffect, useState } from 'react';
import styles from './Btn.module.css';

import { TbBookmark, TbBookmarkFilled } from 'react-icons/tb';

function SaveBtn({ _id }) {
    const [isBookmark, setIsBookmark] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/bookmark/check-is-bookmark', {
            method: 'POST',
            body: JSON.stringify({ postId: _id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((res) => setIsBookmark(res.isBookmarked))
            .finally(() => setIsLoading(false));
    }, []);

    // handler bookmark
    async function bookmarkHandler() {
        if (isBookmark == null) return;

        setIsBookmark(!isBookmark);
        const response = await fetch('/api/bookmark/bookmark-toggle', {
            method: 'POST',
            body: JSON.stringify({ isBookmark, postId: _id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
    }

    if (isLoading) {
        return (
            <button className={styles.btn}>
                <TbBookmark size="1.5rem" />
            </button>
        );
    } else {
        return (
            <button onClick={bookmarkHandler} className={styles.btn}>
                {isBookmark ? <TbBookmarkFilled size="1.5rem" /> : <TbBookmark size="1.5rem" />}
            </button>
        );
    }
}

export default SaveBtn;
