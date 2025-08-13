import Image from 'next/image';
import styles from './NewPostPage.module.css';
import LoaderBtn from '../elements/LoaderBtn';
import { useState } from 'react';
import SearchInp from '../elements/SearchInp';
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb';
import { GoTrash } from 'react-icons/go';

function NewPostPage({ user, handler }) {
    const [form, setForm] = useState({
        author: user._id,
        authorUsername: user.username,
        authorImg: user.image,
        content: '',
        taggedUsers: [],
    });

    const [tagedUsers, setTagedUsers] = useState([]);

    // tag users handler
    function tagUser(user) {
        const isAlreadyTagged = form.taggedUsers.includes(user._id);
        if (isAlreadyTagged) return;

        setForm((prev) => ({
            ...prev,
            taggedUsers: [...prev.taggedUsers, user._id],
        }));

        setTagedUsers((prev) => [...prev, user]);
    }

    // remove tag user handler
    function removeUser(id) {
        setForm((prev) => ({
            ...prev,
            taggedUsers: prev.taggedUsers.filter((userId) => userId !== id),
        }));

        setTagedUsers((prev) => prev.filter((user) => user._id !== id));
    }

    return (
        <div className={styles.container}>
            <nav className="pageTitle">Add New Post</nav>

            {/* content */}
            <div>
                <label htmlFor="content">Post Content</label>
                <textarea
                    id="content"
                    minLength={1}
                    maxLength={200}
                    placeholder="Enter Post Content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                ></textarea>
            </div>

            {/* tag users */}
            <div className={styles.tagUsers}>
                <label htmlFor="tag">Tag Your Friends</label>
                <SearchInp onclickCardsHandler={tagUser} />

                <div className={styles.tagedContainer}>
                    {tagedUsers.map((i) => (
                        <div key={i._id} className={styles.taggedUserCard}>
                            <div className={styles.userInfo}>
                                <Image src={i.image} alt={i.username} width={30} height={30} />
                                <p>
                                    {i.username} {i.blueTick && <TbRosetteDiscountCheckFilled color="#1c96e8" />}
                                </p>
                            </div>
                            <button onClick={() => removeUser(i._id)}>
                                <GoTrash size="1.2rem" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <LoaderBtn content="Add Post" isLoading={false} onclickHandler={() => handler(form)} />
        </div>
    );
}

export default NewPostPage;
